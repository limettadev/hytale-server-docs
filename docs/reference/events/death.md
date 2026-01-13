# Death Event

The death event triggers when an entity dies. It's a [component-based event](/concepts/events#2-component-change-events) - death is detected when `DeathComponent` is added to an entity.

::: info API Reference
See full API: [DeathComponent](/api/DeathComponent) | [DeathSystems](/api/DeathSystems)
:::

::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events).
:::

## Overview

| Property | Value |
|----------|-------|
| Component | `DeathComponent` |
| Base Handler | `DeathSystems.OnDeathSystem` |
| Trigger | `DeathComponent` added to entity |

## The DeathComponent

**Location:** `com.hypixel.hytale.server.core.modules.entity.damage.DeathComponent`

When an entity's health reaches zero, `DeathComponent` is added automatically. This component contains:

| Property | Description |
|----------|-------------|
| `getDeathCause()` | The `DamageCause` that killed the entity |
| `getDeathInfo()` | The `Damage` object that caused death |
| `getDeathMessage()` | Message shown on death screen |
| `isShowDeathMenu()` | Whether to show respawn screen |
| `getItemsLostOnDeath()` | Items that were dropped |
| `getItemsLossMode()` | How items are lost (ALL, CONFIGURED, NONE) |

## Creating a Handler

Extend `DeathSystems.OnDeathSystem`:

```java
package com.example.myplugin;

import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.modules.entity.damage.*;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class MyDeathHandler extends DeathSystems.OnDeathSystem {

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();  // Only handle player deaths
    }

    @Override
    public void onComponentAdded(@Nonnull Ref<EntityStore> ref,
                                  @Nonnull DeathComponent component,
                                  @Nonnull Store store,
                                  @Nonnull CommandBuffer commandBuffer) {
        // Entity just died

        Player player = (Player) store.getComponent(ref, Player.getComponentType());

        // Get death info
        Damage deathInfo = component.getDeathInfo();
        DamageCause cause = component.getDeathCause();

        System.out.println("Player died from: " + cause.getId());

        // Check who killed them
        if (deathInfo != null && deathInfo.getSource() instanceof Damage.EntitySource source) {
            Ref<EntityStore> killerRef = source.getRef();
            if (killerRef.isValid()) {
                // Do something with the killer
                Player killer = (Player) store.getComponent(killerRef, Player.getComponentType());
                if (killer != null) {
                    killer.sendMessage(Message.raw("You killed someone!"));
                }
            }
        }

        // Modify death behavior
        component.setShowDeathMenu(true);
        component.setItemsLossMode(DeathConfig.ItemsLossMode.NONE);  // Keep items
    }
}
```

## Common Use Cases

### Track Kill Statistics

```java
@Override
public void onComponentAdded(@Nonnull Ref<EntityStore> ref,
                              @Nonnull DeathComponent component,
                              @Nonnull Store store,
                              @Nonnull CommandBuffer commandBuffer) {

    Damage deathInfo = component.getDeathInfo();
    if (deathInfo == null) return;

    if (deathInfo.getSource() instanceof Damage.EntitySource source) {
        Ref<EntityStore> killerRef = source.getRef();
        if (killerRef.isValid()) {
            Player killer = (Player) store.getComponent(killerRef, Player.getComponentType());
            if (killer != null) {
                // Increment kill counter (your custom logic)
                incrementKills(killer);
            }
        }
    }
}
```

### Prevent Item Loss

```java
@Override
public void onComponentAdded(@Nonnull Ref<EntityStore> ref,
                              @Nonnull DeathComponent component,
                              @Nonnull Store store,
                              @Nonnull CommandBuffer commandBuffer) {

    // Keep all items on death
    component.setItemsLossMode(DeathConfig.ItemsLossMode.NONE);

    // Or configure partial loss
    component.setItemsLossMode(DeathConfig.ItemsLossMode.CONFIGURED);
    component.setItemsAmountLossPercentage(25.0);  // Lose 25% of items
}
```

### Custom Death Message

```java
@Override
public void onComponentAdded(@Nonnull Ref<EntityStore> ref,
                              @Nonnull DeathComponent component,
                              @Nonnull Store store,
                              @Nonnull CommandBuffer commandBuffer) {

    component.setDeathMessage(Message.raw("You have fallen!"));
}
```

## Built-in Death Handlers

The system includes these handlers:

| Handler | Purpose |
|---------|---------|
| `ClearHealth` | Sets health to 0 |
| `ClearInteractions` | Cancels current interactions |
| `ClearEntityEffects` | Removes all effects |
| `PlayerKilledPlayer` | Sends "you killed X" message |
| `DropPlayerDeathItems` | Drops inventory items |
| `PlayerDropItemsConfig` | Configures item loss |
| `RunDeathInteractions` | Runs death interaction chain |
| `KillFeed` | Broadcasts kill feed |
| `PlayerDeathScreen` | Shows respawn UI |
| `DeathAnimation` | Plays death animation |
| `CorpseRemoval` | Removes corpse after delay |

## Registration

```java
@Override
protected void setup() {
    ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();
    registry.registerSystem(new MyDeathHandler());
}
```

## See Also

- [Event System](/concepts/events) - How component events work
- [Damage Event](/reference/events/damage) - The damage that causes death
- [Respawn Event](/reference/events/respawn) - Handling respawns
