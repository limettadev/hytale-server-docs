# Entity Spawn

Entity spawning in Hytale uses the ECS lifecycle system rather than traditional events. When entities are added to the world, a `RefSystem` can detect and respond to them.

::: info API Reference
See full API: [NPCEntity](/api/NPCEntity) | [RefSystem](/api/RefSystem)
:::

::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events) and [ECS Architecture](/concepts/ecs).
:::

::: tip Key Concept
Entity spawning uses `AddReason.SPAWN` to distinguish newly spawned entities from entities being loaded from save data (`AddReason.LOAD`).
:::

## Listening for Entity Spawns

Use a `RefSystem` to detect when entities are added to the world:

```java
import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.RefSystem;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import com.hypixel.hytale.server.npc.entities.NPCEntity;
import javax.annotation.Nonnull;

public class EntitySpawnListener extends RefSystem {

    @Nonnull
    @Override
    public Query getQuery() {
        // Listen for all NPCs
        return NPCEntity.getComponentType();
    }

    @Override
    public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                               @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        // Only handle spawns, not loads from save data
        if (reason != AddReason.SPAWN) {
            return;
        }

        NPCEntity npc = (NPCEntity) store.getComponent(ref, NPCEntity.getComponentType());
        String npcType = npc.getRoleName();  // e.g., "Creature_Skeleton"

        System.out.println("Entity spawned: " + npcType);
    }

    @Override
    public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                                @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        // Called when entity is removed
    }
}
```

## Cancelling/Preventing Spawns

### Method 1: Remove on Spawn

The simplest approach is to remove the entity immediately when it spawns:

```java
public class BlockCreeperSpawns extends RefSystem {

    @Nonnull
    @Override
    public Query getQuery() {
        return NPCEntity.getComponentType();
    }

    @Override
    public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                               @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        if (reason != AddReason.SPAWN) {
            return;
        }

        NPCEntity npc = (NPCEntity) store.getComponent(ref, NPCEntity.getComponentType());

        // Block specific entity types
        if (npc.getRoleName().equals("Creature_Creeper")) {
            commandBuffer.removeEntity(ref, RemoveReason.REMOVE);
        }
    }

    @Override
    public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                                @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {}
}
```

### Method 2: Using FailedSpawnComponent

Hytale has a built-in mechanism for preventing spawns. When an entity has a `FailedSpawnComponent`, the `FailedSpawnSystem` automatically removes it:

```java
import com.hypixel.hytale.server.npc.components.FailedSpawnComponent;

// When spawning programmatically with a pre-add callback
NPCPlugin.get().spawnEntity(store, roleIndex, position, rotation, null,
    (npc, holder, s) -> {
        // Add FailedSpawnComponent to prevent spawn based on condition
        if (shouldBlockSpawn()) {
            holder.addComponent(FailedSpawnComponent.getComponentType(),
                               new FailedSpawnComponent());
        }
    },
    null  // post-spawn callback
);
```

## Disabling All Entity Spawning

### World Config Setting

Each world has a configuration option to disable NPC spawning entirely:

```java
World world = Universe.get().getWorld("myworld");
WorldConfig config = world.getWorldConfig();

// Disable all environmental NPC spawning
config.setSpawningNPC(false);

// Check if spawning is enabled
boolean spawningEnabled = config.isSpawningNPC();
```

### Setting on World Creation

```java
Universe.get().addWorld("arena", "void", null).thenAccept(world -> {
    // Disable spawning in the arena world
    world.getWorldConfig().setSpawningNPC(false);
});
```

### Freeze All NPCs

You can also freeze all NPCs in a world (prevents movement and AI):

```java
world.getWorldConfig().setAllNPCFrozen(true);
```

## Spawning Entities Programmatically

### Basic NPC Spawn

```java
import com.hypixel.hytale.math.vector.Vector3d;
import com.hypixel.hytale.math.vector.Vector3f;
import com.hypixel.hytale.server.npc.NPCPlugin;

// Get the entity store from your context
Store<EntityStore> store = world.getEntityStore().getStore();

// Spawn position and rotation
Vector3d position = new Vector3d(100, 65, 200);
Vector3f rotation = new Vector3f(0, 0, 0);  // pitch, yaw, roll

// Spawn by NPC type name
NPCPlugin.get().spawnNPC(store, "Creature_Skeleton", null, position, rotation);
```

### Spawn with Callbacks

```java
NPCPlugin.get().spawnEntity(store, roleIndex, position, rotation, null,
    // Pre-add callback - modify entity before it's added to world
    (npc, holder, s) -> {
        // Add custom components to the holder
        holder.addComponent(MyCustomComponent.getComponentType(),
                           new MyCustomComponent());
    },
    // Post-spawn callback - runs after successful spawn
    (npc, ref, s) -> {
        System.out.println("Spawned entity with ref: " + ref);
    }
);
```

### Getting NPC Type Index

```java
// Get the index for an NPC type name
int skeletonIndex = NPCPlugin.get().getIndex("Creature_Skeleton");

if (skeletonIndex >= 0) {
    NPCPlugin.get().spawnEntity(store, skeletonIndex, position, rotation, null, null);
}
```

## Spawn Control Examples

### Limit Spawns Per World

```java
public class SpawnLimiter extends RefSystem {
    private static final int MAX_NPCS = 100;

    @Nonnull
    @Override
    public Query getQuery() {
        return NPCEntity.getComponentType();
    }

    @Override
    public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                               @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        if (reason != AddReason.SPAWN) {
            return;
        }

        // Count existing NPCs
        int npcCount = store.getEntityCount();  // Simplified - would need query

        if (npcCount > MAX_NPCS) {
            commandBuffer.removeEntity(ref, RemoveReason.REMOVE);
        }
    }

    @Override
    public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                                @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {}
}
```

### Region-Based Spawn Control

```java
public class SafeZoneSpawnBlocker extends RefSystem {
    private final Vector3d safeZoneCenter = new Vector3d(0, 64, 0);
    private final double safeZoneRadius = 50.0;

    @Nonnull
    @Override
    public Query getQuery() {
        return NPCEntity.getComponentType();
    }

    @Override
    public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                               @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        if (reason != AddReason.SPAWN) {
            return;
        }

        TransformComponent transform = (TransformComponent) store.getComponent(
            ref, TransformComponent.getComponentType());

        if (transform != null) {
            Vector3d pos = transform.getPosition();
            double distance = pos.distance(safeZoneCenter);

            // Remove entities that spawn in safe zone
            if (distance < safeZoneRadius) {
                commandBuffer.removeEntity(ref, RemoveReason.REMOVE);
            }
        }
    }

    @Override
    public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                                @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {}
}
```

## Full Plugin Example

```java
package com.example.spawncontrol;

import com.hypixel.hytale.common.plugin.PluginManifest;
import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.RefSystem;
import com.hypixel.hytale.server.core.entity.component.TransformComponent;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import com.hypixel.hytale.server.npc.NPCPlugin;
import com.hypixel.hytale.server.npc.entities.NPCEntity;
import javax.annotation.Nonnull;
import java.util.Set;

public class SpawnControlPlugin extends JavaPlugin {

    public static final PluginManifest MANIFEST = PluginManifest
        .corePlugin(SpawnControlPlugin.class)
        .depends(NPCPlugin.class)
        .build();

    // Entity types to block from spawning
    private static final Set<String> BLOCKED_ENTITIES = Set.of(
        "Creature_Creeper",
        "Creature_Zombie"
    );

    public SpawnControlPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();
        registry.registerSystem(new SpawnFilter());

        this.getLogger().info("SpawnControl plugin loaded!");
    }

    public static class SpawnFilter extends RefSystem {

        @Nonnull
        @Override
        public Query getQuery() {
            return NPCEntity.getComponentType();
        }

        @Override
        public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                                   @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
            // Only filter spawns, not loads
            if (reason != AddReason.SPAWN) {
                return;
            }

            NPCEntity npc = (NPCEntity) store.getComponent(ref, NPCEntity.getComponentType());
            String entityType = npc.getRoleName();

            // Block specific entity types
            if (BLOCKED_ENTITIES.contains(entityType)) {
                commandBuffer.removeEntity(ref, RemoveReason.REMOVE);
                return;
            }

            // Log spawns for debugging
            TransformComponent transform = (TransformComponent) store.getComponent(
                ref, TransformComponent.getComponentType());
            if (transform != null) {
                System.out.println("Spawned " + entityType + " at " + transform.getPosition());
            }
        }

        @Override
        public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                                    @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
            // Optional: track despawns
        }
    }
}
```

## AddReason and RemoveReason

| AddReason | Description |
|-----------|-------------|
| `SPAWN` | Entity is newly spawned (by world generation, commands, or plugins) |
| `LOAD` | Entity is being loaded from saved world data |

| RemoveReason | Description |
|--------------|-------------|
| `REMOVE` | Entity is being permanently removed (death, despawn, plugin removal) |
| `UNLOAD` | Entity is being unloaded (chunk unload) but will be saved |

## See Also

- [ECS Architecture](/concepts/ecs) - Understanding the component system
- [Event System](/concepts/events) - How events work
- [World Management](/reference/systems/worlds) - World configuration options
- [Player Join](/reference/events/player-join) - Similar RefSystem pattern for players

::: info API Reference
See the full API documentation:
- [NPCEntity](/api/NPCEntity) - NPC entity component
- [RefSystem](/api/RefSystem) - Entity lifecycle system
:::
