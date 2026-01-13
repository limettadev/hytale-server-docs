# Player Component

The `Player` component contains player-specific data like inventory, game mode, and messaging.

::: info API Reference
See full API: [Player](/api/Player) | [PlayerRef](/api/PlayerRef)
:::

## Overview

| Property | Value |
|----------|-------|
| Class | `com.hypixel.hytale.server.core.entity.entities.Player` |
| Component Type | `Player.getComponentType()` |

## Getting the Component

```java
// From Ref
Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());

// From ArchetypeChunk
Player player = (Player) chunk.getComponent(index, Player.getComponentType());
```

## Key Methods

### Inventory

```java
Inventory inventory = player.getInventory();

// Add items
inventory.addItemStack(new ItemStack("Wood Sword", 1));
inventory.addItemStack(new ItemStack("Apple", 10));

// Get specific slots
ItemStack inHand = inventory.getItemInHand();
byte activeSlot = inventory.getActiveHotbarSlot();

// Check for broken items
boolean hasBroken = inventory.containsBrokenItem();

// Clear inventory
inventory.clear();

// Drop all items
List<ItemStack> dropped = inventory.dropAllItemStacks();
```

### Messaging

```java
// Send a message to the player
player.sendMessage(Message.raw("Hello!"));
player.sendMessage(Message.translation("server.general.welcome"));

// With color
player.sendMessage(Message.raw("Error!").color("#ff5555"));
```

### Game Mode

```java
GameMode mode = player.getGameMode();

if (mode == GameMode.Creative) {
    // Player is in creative mode
}

if (mode == GameMode.Survival) {
    // Player is in survival mode
}
```

### Spawn Info

```java
// Check if first time in this world
if (player.isFirstSpawn()) {
    // Give starter items
}

// Get spawn time
long spawnTime = player.getLastSpawnTimeNanos();

// Check spawn protection
if (player.hasSpawnProtection()) {
    // Player is protected
}
```

### Player Data

```java
// Get player config data
PlayerConfigData configData = player.getPlayerConfigData();

// Get per-world data
PlayerWorldData worldData = configData.getPerWorldData(world.getName());
```

## Related Components

To get full player information, you often need multiple components:

```java
// Player data
Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());

// Position and rotation
TransformComponent transform = (TransformComponent)
    commandBuffer.getComponent(ref, TransformComponent.getComponentType());

// Network/connection info
PlayerRef playerRef = (PlayerRef)
    commandBuffer.getComponent(ref, PlayerRef.getComponentType());
String username = playerRef.getUsername();

// Display name
Nameplate nameplate = (Nameplate)
    commandBuffer.getComponent(ref, Nameplate.getComponentType());

// Stats (health, stamina, etc.)
EntityStatMap stats = (EntityStatMap)
    commandBuffer.getComponent(ref, EntityStatMap.getComponentType());
```

## Example: Full Player Handler

```java
public class PlayerInfoHandler extends RefSystem {

    @Nonnull
    @Override
    public Query getQuery() {
        return Query.and(
            Player.getComponentType(),
            PlayerRef.getComponentType(),
            TransformComponent.getComponentType()
        );
    }

    @Override
    public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                               @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {

        Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());
        PlayerRef playerRef = (PlayerRef) commandBuffer.getComponent(ref, PlayerRef.getComponentType());
        TransformComponent transform = (TransformComponent)
            commandBuffer.getComponent(ref, TransformComponent.getComponentType());

        String username = playerRef.getUsername();
        Vector3d position = transform.getPosition();
        GameMode mode = player.getGameMode();

        System.out.println(username + " joined at " + position + " in " + mode + " mode");

        if (player.isFirstSpawn()) {
            player.getInventory().addItemStack(new ItemStack("Wood Sword", 1));
            player.sendMessage(Message.raw("Welcome, " + username + "!"));
        }
    }

    @Override
    public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                                @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {}
}
```

## See Also

- [Components Concept](/concepts/components) - How components work
- [TransformComponent](/reference/components/transform) - Position and rotation
- [Player Join Event](/reference/events/player-join) - Handle player joins
