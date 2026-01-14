# Player Join Event

The player join event triggers when a player entity is added to the world. This includes first-time spawns and returning players.

::: info API Reference
See full API: [Player](/api/Player) | [RefSystem](/api/RefSystem) | [PlayerRef](/api/PlayerRef) | [ItemContainer](/api/ItemContainer)
:::

::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events).
:::

## Overview

| Property | Value |
|----------|-------|
| Base Handler | `RefSystem`[^1] |
| Trigger | Entity with `Player` component added to world |
| Key Method | `player.isFirstSpawn()`[^2] to check first join |

## Creating a Handler[^1]

Extend `RefSystem` and check for the `Player` component:

```java
package com.example.myplugin;

import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.RefSystem;
import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.inventory.ItemStack;
import com.hypixel.hytale.server.core.inventory.container.ItemContainer;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class PlayerJoinHandler extends RefSystem {

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Override
    public void onEntityAdded(@Nonnull Ref<EntityStore> ref,
                               @Nonnull AddReason reason,
                               @Nonnull Store store,
                               @Nonnull CommandBuffer commandBuffer) {

        Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());

        // Check if this is their first time in this world
        if (player.isFirstSpawn()) {
            // First time player - give starter kit
            giveStarterKit(player);
            player.sendMessage(Message.raw("Welcome to the server!"));
        } else {
            // Returning player
            player.sendMessage(Message.raw("Welcome back!"));
        }
    }

    @Override
    public void onEntityRemove(@Nonnull Ref<EntityStore> ref,
                                @Nonnull RemoveReason reason,
                                @Nonnull Store store,
                                @Nonnull CommandBuffer commandBuffer) {
        // Player left the world
    }

    private void giveStarterKit(Player player) {
        // Add items to hotbar first, then storage[^3]
        ItemContainer container = player.getInventory().getCombinedHotbarFirst();
        container.addItemStack(new ItemStack("Tool_Sword_Wood", 1));
        container.addItemStack(new ItemStack("Tool_Pickaxe_Wood", 1));
        container.addItemStack(new ItemStack("Block_Torch", 16));
        container.addItemStack(new ItemStack("Consumable_Apple", 10));
    }
}
```

## First Spawn vs Returning

Use `player.isFirstSpawn()` to distinguish:

```java
@Override
public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                           @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {

    Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());

    if (player.isFirstSpawn()) {
        // FIRST TIME in this world
        // - Give starter items
        // - Show tutorial
        // - Set initial spawn point
    } else {
        // RETURNING player
        // - Restore previous state
        // - Show MOTD
    }
}
```

::: info
`isFirstSpawn()` is per-world. A player can be "first spawn" in World A but not in World B.
:::

## Getting Player Position

The player's position is on the [TransformComponent](/reference/components/transform):

```java
@Override
public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                           @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {

    Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());
    TransformComponent transform = (TransformComponent)
        commandBuffer.getComponent(ref, TransformComponent.getComponentType());

    if (transform != null) {
        Vector3d position = transform.getPosition();
        System.out.println("Player spawned at: " +
            position.getX() + ", " + position.getY() + ", " + position.getZ());
    }
}
```

## Common Use Cases

### Welcome Message

```java
@Override
public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                           @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {

    Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());
    PlayerRef playerRef = (PlayerRef) commandBuffer.getComponent(ref, PlayerRef.getComponentType());

    String username = playerRef.getUsername();
    player.sendMessage(Message.raw("Welcome, " + username + "!"));
}
```

### Broadcast Join Message

```java
@Override
public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                           @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {

    PlayerRef playerRef = (PlayerRef) commandBuffer.getComponent(ref, PlayerRef.getComponentType());
    String username = playerRef.getUsername();

    // Get world and broadcast to all players
    World world = ((EntityStore) commandBuffer.getExternalData()).getWorld();
    for (PlayerRef otherPlayer : world.getPlayerRefs()) {
        otherPlayer.sendMessage(Message.raw(username + " joined the game"));
    }
}
```

### Player Leave Handling

```java
@Override
public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                            @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {

    Player player = (Player) store.getComponent(ref, Player.getComponentType());
    PlayerRef playerRef = (PlayerRef) store.getComponent(ref, PlayerRef.getComponentType());

    if (playerRef != null) {
        System.out.println(playerRef.getUsername() + " left the game");
        // Save player data, cleanup, etc.
    }
}
```

## Registration

```java
@Override
protected void setup() {
    ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();
    registry.registerSystem(new PlayerJoinHandler());
}
```

## See Also

- [Event System](/concepts/events) - How lifecycle events work
- [Respawn Event](/reference/events/respawn) - Respawn after death
- [Player Component](/reference/components/player) - Player data access

[^1]: See [RefSystem API](/api/RefSystem) for `onEntityAdded()` and `onEntityRemove()` methods
[^2]: See [Player API](/api/Player) for `isFirstSpawn()`, `sendMessage()`, and `getInventory()`
[^3]: See [ItemContainer API](/api/ItemContainer) for `addItemStack()` and other inventory manipulation methods
