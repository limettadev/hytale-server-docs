# Respawn Event

The respawn event triggers when a player respawns after death. It's detected when `DeathComponent` is **removed** from the entity.

::: info API Reference
See full API: [RespawnSystems](/api/RespawnSystems) | [DeathComponent](/api/DeathComponent) | [Inventory](/api/Inventory) | [ItemContainer](/api/ItemContainer)
:::

::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events).
:::

## Overview

| Property | Value |
|----------|-------|
| Component | `DeathComponent` |
| Base Handler | `RespawnSystems.OnRespawnSystem`[^1] |
| Trigger | `DeathComponent` removed from entity |

## Creating a Handler[^1]

Extend `RespawnSystems.OnRespawnSystem` and override `onComponentRemoved`:

```java
package com.example.myplugin;

import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.inventory.ItemStack;
import com.hypixel.hytale.server.core.modules.entity.damage.DeathComponent;
import com.hypixel.hytale.server.core.modules.entity.damage.RespawnSystems;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class GiveItemsOnRespawn extends RespawnSystems.OnRespawnSystem {

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Override
    public void onComponentRemoved(@Nonnull Ref<EntityStore> ref,
                                    @Nonnull DeathComponent component,
                                    @Nonnull Store store,
                                    @Nonnull CommandBuffer commandBuffer) {
        // Player just respawned

        Player player = (Player) store.getComponent(ref, Player.getComponentType());

        // Give starter items (add to hotbar first, then storage)[^2]
        player.getInventory().getCombinedHotbarFirst().addItemStack(new ItemStack("Tool_Sword_Wood", 1));
        player.getInventory().getCombinedHotbarFirst().addItemStack(new ItemStack("Consumable_Apple", 5));

        // Send welcome back message
        player.sendMessage(Message.raw("Welcome back!"));
    }
}
```

## Common Use Cases

### Respawn Kit[^2]

```java
@Override
public void onComponentRemoved(@Nonnull Ref<EntityStore> ref,
                                @Nonnull DeathComponent component,
                                @Nonnull Store store,
                                @Nonnull CommandBuffer commandBuffer) {

    Player player = (Player) store.getComponent(ref, Player.getComponentType());

    // Clear inventory first (optional)
    player.getInventory().clear();

    // Give respawn kit (add to hotbar first, then storage)
    ItemContainer container = player.getInventory().getCombinedHotbarFirst();
    container.addItemStack(new ItemStack("Tool_Sword_Wood", 1));
    container.addItemStack(new ItemStack("Tool_Pickaxe_Wood", 1));
    container.addItemStack(new ItemStack("Block_Torch", 16));
    container.addItemStack(new ItemStack("Consumable_Bread", 10));
}
```

### Apply Effects on Respawn

```java
@Override
public void onComponentRemoved(@Nonnull Ref<EntityStore> ref,
                                @Nonnull DeathComponent component,
                                @Nonnull Store store,
                                @Nonnull CommandBuffer commandBuffer) {

    // Get effect controller
    EffectControllerComponent effects = (EffectControllerComponent)
        commandBuffer.getComponent(ref, EffectControllerComponent.getComponentType());

    if (effects != null) {
        // Apply spawn protection effect (your custom effect)
        effects.applyEffect(ref, "SpawnProtection", 10.0f, commandBuffer);
    }
}
```

### Teleport to Spawn

```java
@Override
public void onComponentRemoved(@Nonnull Ref<EntityStore> ref,
                                @Nonnull DeathComponent component,
                                @Nonnull Store store,
                                @Nonnull CommandBuffer commandBuffer) {

    TransformComponent transform = (TransformComponent)
        commandBuffer.getComponent(ref, TransformComponent.getComponentType());

    if (transform != null) {
        // Teleport to spawn point
        Vector3d spawnPoint = new Vector3d(0, 100, 0);
        transform.setPosition(spawnPoint);
    }
}
```

## Built-in Respawn Handlers

| Handler | Purpose |
|---------|---------|
| `ResetStatsRespawnSystem` | Resets all stats (health, stamina, etc.) |
| `ResetPlayerRespawnSystem` | Sets spawn time |
| `ClearEntityEffectsRespawnSystem` | Removes all effects |
| `ClearInteractionsRespawnSystem` | Clears interactions |
| `RespawnControllerRespawnSystem` | Handles respawn location |
| `CheckBrokenItemsRespawnSystem` | Warns about broken items |

## Registration

```java
@Override
protected void setup() {
    ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();
    registry.registerSystem(new GiveItemsOnRespawn());
}
```

## See Also

- [Event System](/concepts/events) - How component events work
- [Death Event](/reference/events/death) - The death that precedes respawn
- [Player Join](/reference/events/player-join) - Initial spawn handling

[^1]: See [RespawnSystems API](/api/RespawnSystems) for base class methods
[^2]: See [Inventory API](/api/Inventory) for container access methods and [ItemContainer API](/api/ItemContainer) for `addItemStack()`, `clear()`, etc.
