# Block Break & Place

Hytale provides cancellable events for block breaking and placing, allowing plugins to control building and destruction.

::: info API Reference
See full API: [EntityEventSystem](/api/EntityEventSystem)
:::

::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events).
:::

## Events Overview

| Event | Description | Cancellable |
|-------|-------------|-------------|
| `BreakBlockEvent` | Fired when a block is fully broken | Yes |
| `PlaceBlockEvent` | Fired when a block is placed | Yes |
| `DamageBlockEvent` | Fired when a block takes damage (mining progress) | Yes |

## Handling Block Break

Use an `EntityEventSystem` to listen for break events:

```java
import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.EntityEventSystem;
import com.hypixel.hytale.math.vector.Vector3i;
import com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.event.events.ecs.BreakBlockEvent;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class BlockBreakHandler extends EntityEventSystem<BreakBlockEvent> {

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Nonnull
    @Override
    public Class<BreakBlockEvent> getEventType() {
        return BreakBlockEvent.class;
    }

    @Override
    public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull BreakBlockEvent event,
                       @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        Vector3i position = event.getTargetBlock();
        BlockType blockType = event.getBlockType();

        System.out.println("Block broken: " + blockType.getId() +
                          " at " + position.getX() + ", " + position.getY() + ", " + position.getZ());
    }
}
```

## Handling Block Place

```java
import com.hypixel.hytale.server.core.event.events.ecs.PlaceBlockEvent;
import com.hypixel.hytale.server.core.inventory.ItemStack;

public class BlockPlaceHandler extends EntityEventSystem<PlaceBlockEvent> {

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Nonnull
    @Override
    public Class<PlaceBlockEvent> getEventType() {
        return PlaceBlockEvent.class;
    }

    @Override
    public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull PlaceBlockEvent event,
                       @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        Vector3i position = event.getTargetBlock();
        ItemStack item = event.getItemInHand();

        if (item != null) {
            System.out.println("Placed: " + item.getItemId() +
                              " at " + position.getX() + ", " + position.getY() + ", " + position.getZ());
        }
    }
}
```

## Preventing Block Breaking

Cancel the event to prevent the block from being broken:

```java
public class ProtectedAreaHandler extends EntityEventSystem<BreakBlockEvent> {

    private static final Vector3i PROTECTED_MIN = new Vector3i(-50, 0, -50);
    private static final Vector3i PROTECTED_MAX = new Vector3i(50, 256, 50);

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Nonnull
    @Override
    public Class<BreakBlockEvent> getEventType() {
        return BreakBlockEvent.class;
    }

    @Override
    public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull BreakBlockEvent event,
                       @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        Vector3i pos = event.getTargetBlock();

        // Check if block is in protected area
        if (isInProtectedArea(pos)) {
            event.setCancelled(true);

            // Notify player
            Player player = (Player) store.getComponent(ref, Player.getComponentType());
            player.getPlayerRef().sendMessage(Message.raw("You cannot break blocks here!"));
        }
    }

    private boolean isInProtectedArea(Vector3i pos) {
        return pos.getX() >= PROTECTED_MIN.getX() && pos.getX() <= PROTECTED_MAX.getX() &&
               pos.getY() >= PROTECTED_MIN.getY() && pos.getY() <= PROTECTED_MAX.getY() &&
               pos.getZ() >= PROTECTED_MIN.getZ() && pos.getZ() <= PROTECTED_MAX.getZ();
    }
}
```

## Preventing Block Placement

```java
public class NoBuildZoneHandler extends EntityEventSystem<PlaceBlockEvent> {

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Nonnull
    @Override
    public Class<PlaceBlockEvent> getEventType() {
        return PlaceBlockEvent.class;
    }

    @Override
    public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull PlaceBlockEvent event,
                       @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        Vector3i pos = event.getTargetBlock();

        // Prevent building above Y=200
        if (pos.getY() > 200) {
            event.setCancelled(true);

            Player player = (Player) store.getComponent(ref, Player.getComponentType());
            player.getPlayerRef().sendMessage(Message.raw("Cannot build this high!"));
        }
    }
}
```

## Block Damage Events

The `DamageBlockEvent` fires each time a block takes mining damage. You can modify or prevent the damage:

```java
public class MiningBoostHandler extends EntityEventSystem<DamageBlockEvent> {

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Nonnull
    @Override
    public Class<DamageBlockEvent> getEventType() {
        return DamageBlockEvent.class;
    }

    @Override
    public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull DamageBlockEvent event,
                       @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        // Double mining speed
        float originalDamage = event.getDamage();
        event.setDamage(originalDamage * 2.0f);

        // Or prevent damage entirely
        // event.setCancelled(true);
    }
}
```

## Event Properties

### BreakBlockEvent

| Method | Returns | Description |
|--------|---------|-------------|
| `getTargetBlock()` | `Vector3i` | Position of the broken block |
| `setTargetBlock(Vector3i)` | `void` | Change which block is affected |
| `getBlockType()` | `BlockType` | Type of block being broken |
| `getItemInHand()` | `ItemStack` | Tool used (nullable) |
| `setCancelled(boolean)` | `void` | Prevent the break |
| `isCancelled()` | `boolean` | Check if cancelled |

### PlaceBlockEvent

| Method | Returns | Description |
|--------|---------|-------------|
| `getTargetBlock()` | `Vector3i` | Position where block will be placed |
| `setTargetBlock(Vector3i)` | `void` | Change placement position |
| `getRotation()` | `RotationTuple` | Block rotation |
| `setRotation(RotationTuple)` | `void` | Change block rotation |
| `getItemInHand()` | `ItemStack` | Item being placed (nullable) |
| `setCancelled(boolean)` | `void` | Prevent placement |
| `isCancelled()` | `boolean` | Check if cancelled |

### DamageBlockEvent

| Method | Returns | Description |
|--------|---------|-------------|
| `getTargetBlock()` | `Vector3i` | Position of damaged block |
| `getBlockType()` | `BlockType` | Type of block |
| `getCurrentDamage()` | `float` | Current block health |
| `getDamage()` | `float` | Damage being applied |
| `setDamage(float)` | `void` | Modify damage amount |
| `getItemInHand()` | `ItemStack` | Tool used (nullable) |
| `setCancelled(boolean)` | `void` | Prevent damage |

## Disabling Block Modification Globally

You can disable all block breaking/placing at the world level:

```java
World world = Universe.get().getWorld("myworld");
WorldConfig config = world.getWorldConfig();

// Disable block breaking
config.setBlockBreakingAllowed(false);

// Disable block placement
config.setBlockPlacementAllowed(false);

// Disable block gathering (interaction)
config.setBlockGatheringAllowed(false);
```

## Restricting by Block Type

```java
public class BlockTypeRestriction extends EntityEventSystem<BreakBlockEvent> {

    // Block types that cannot be broken
    private static final Set<String> PROTECTED_BLOCKS = Set.of(
        "Block_Bedrock",
        "Block_Barrier",
        "Block_Spawner"
    );

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Nonnull
    @Override
    public Class<BreakBlockEvent> getEventType() {
        return BreakBlockEvent.class;
    }

    @Override
    public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull BreakBlockEvent event,
                       @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        String blockId = event.getBlockType().getId();

        if (PROTECTED_BLOCKS.contains(blockId)) {
            event.setCancelled(true);
        }
    }
}
```

## Full Plugin Example

```java
package com.example.buildprotection;

import com.hypixel.hytale.common.plugin.PluginManifest;
import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.EntityEventSystem;
import com.hypixel.hytale.math.vector.Vector3i;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.event.events.ecs.BreakBlockEvent;
import com.hypixel.hytale.server.core.event.events.ecs.PlaceBlockEvent;
import com.hypixel.hytale.server.core.modules.interaction.InteractionModule;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import com.hypixel.hytale.server.core.message.Message;
import javax.annotation.Nonnull;

public class BuildProtectionPlugin extends JavaPlugin {

    public static final PluginManifest MANIFEST = PluginManifest
        .corePlugin(BuildProtectionPlugin.class)
        .depends(InteractionModule.class)
        .build();

    public BuildProtectionPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();

        registry.registerSystem(new SpawnProtection());
        registry.registerSystem(new PlaceProtection());

        this.getLogger().info("BuildProtection plugin loaded!");
    }

    // Protect spawn area from block breaking
    public static class SpawnProtection extends EntityEventSystem<BreakBlockEvent> {
        private static final int SPAWN_RADIUS = 100;

        @Nonnull
        @Override
        public Query getQuery() {
            return Player.getComponentType();
        }

        @Nonnull
        @Override
        public Class<BreakBlockEvent> getEventType() {
            return BreakBlockEvent.class;
        }

        @Override
        public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull BreakBlockEvent event,
                           @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
            Vector3i pos = event.getTargetBlock();

            // Protect area around world origin
            if (Math.abs(pos.getX()) < SPAWN_RADIUS && Math.abs(pos.getZ()) < SPAWN_RADIUS) {
                event.setCancelled(true);

                Player player = (Player) store.getComponent(ref, Player.getComponentType());
                player.getPlayerRef().sendMessage(
                    Message.raw("Spawn area is protected from block breaking!")
                );
            }
        }
    }

    // Protect spawn area from block placement
    public static class PlaceProtection extends EntityEventSystem<PlaceBlockEvent> {
        private static final int SPAWN_RADIUS = 100;

        @Nonnull
        @Override
        public Query getQuery() {
            return Player.getComponentType();
        }

        @Nonnull
        @Override
        public Class<PlaceBlockEvent> getEventType() {
            return PlaceBlockEvent.class;
        }

        @Override
        public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull PlaceBlockEvent event,
                           @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
            Vector3i pos = event.getTargetBlock();

            if (Math.abs(pos.getX()) < SPAWN_RADIUS && Math.abs(pos.getZ()) < SPAWN_RADIUS) {
                event.setCancelled(true);

                Player player = (Player) store.getComponent(ref, Player.getComponentType());
                player.getPlayerRef().sendMessage(
                    Message.raw("Spawn area is protected from building!")
                );
            }
        }
    }
}
```

## See Also

- [Event System](/concepts/events) - How events work
- [ECS Architecture](/concepts/ecs) - Understanding the component system
- [Player](/reference/components/player) - Player component reference

::: info API Reference
See the full API documentation:
- [EntityEventSystem](/api/EntityEventSystem) - Base class for event handlers
:::
