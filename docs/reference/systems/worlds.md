# World Management

Worlds in Hytale are managed through the `Universe` class. Each world runs on its own thread and contains entities via an `EntityStore`.

::: info API Reference
See full API: [JavaPlugin](/api/JavaPlugin) | [WorldConfig](/api/WorldConfig) | [Store](/api/Store)
:::

::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events) and [Creating a Plugin](/getting-started/plugin).
:::

## Accessing Worlds

### From an Event Handler

```java
// In any event handler, get the world from EntityStore
World world = ((EntityStore) commandBuffer.getExternalData()).getWorld();
```

### From Universe

```java
Universe universe = Universe.get();

// Get a world by name
World world = universe.getWorld("myworld");

// Get the default world
World defaultWorld = universe.getDefaultWorld();

// Get all worlds
Map<String, World> worlds = universe.getWorlds();
```

## Creating Worlds

### Programmatically

```java
Universe universe = Universe.get();

// Create a new world (returns CompletableFuture)
universe.addWorld("myworld").thenAccept(world -> {
    System.out.println("World created: " + world.getName());
});

// With specific generator type
universe.addWorld("flatworld", "flat", null).thenAccept(world -> {
    System.out.println("Flat world created!");
});
```

### Generator Types

| Type | Description |
|------|-------------|
| `default` | Standard world generation |
| `flat` | Flat terrain |
| `void` | Empty void world |
| `dummy` | Minimal generation |

## World Configuration[^1]

Each world has a `WorldConfig` that controls its behavior:

```java
WorldConfig config = world.getWorldConfig();

// World settings
config.isPvpEnabled();           // PvP enabled?
config.isFallDamageEnabled();    // Fall damage?
config.isTicking();              // Is world ticking?
config.isSpawningNPC();          // NPC spawning enabled?
config.getGameMode();            // Default game mode

// Time settings
config.isGameTimePaused();
config.getGameTime();

// Saving settings
config.isSavingPlayers();
config.canSaveChunks();
```

## World Properties

```java
// Basic info
String name = world.getName();
UUID uuid = world.getWorldConfig().getUuid();
Path savePath = world.getSavePath();

// Players in world
Collection<PlayerRef> players = world.getPlayerRefs();
int playerCount = players.size();

// Configuration
GameplayConfig gameplay = world.getGameplayConfig();
DeathConfig death = world.getDeathConfig();
CombatConfig combat = gameplay.getCombatConfig();
```

## Moving Players Between Worlds

```java
// Get the player's current world
World currentWorld = ((EntityStore) commandBuffer.getExternalData()).getWorld();

// Get target world
World targetWorld = Universe.get().getWorld("lobby");

// Move player to another world
if (targetWorld != null) {
    Transform spawnPoint = new Transform(0, 100, 0, 0, 0, 0);
    targetWorld.addPlayer(playerRef, spawnPoint);
}
```

## Listening for World Events

### World Start Event

```java
import com.hypixel.hytale.server.core.universe.world.events.StartWorldEvent;

// In your plugin setup
HytaleServer.get().getEventBus()
    .on(StartWorldEvent.class)
    .forWorld("myworld")  // Optional: filter by world name
    .subscribe(event -> {
        World world = event.getWorld();
        System.out.println("World started: " + world.getName());
    });
```

### World Add/Remove Events

```java
import com.hypixel.hytale.server.core.universe.world.events.AddWorldEvent;
import com.hypixel.hytale.server.core.universe.world.events.RemoveWorldEvent;

// Listen for new worlds
HytaleServer.get().getEventBus()
    .on(AddWorldEvent.class)
    .subscribe(event -> {
        if (!event.isCancelled()) {
            World world = event.getWorld();
            System.out.println("World added: " + world.getName());
        }
    });
```

## Broadcasting to World

```java
// Send message to all players in a world
World world = ((EntityStore) commandBuffer.getExternalData()).getWorld();
for (PlayerRef playerRef : world.getPlayerRefs()) {
    playerRef.sendMessage(Message.raw("Hello everyone!"));
}

// Or use the world as a message receiver
world.sendMessage(Message.raw("Server announcement!"));
```

## Example: Multi-World Plugin

```java
package com.example.multiworld;

import com.hypixel.hytale.common.plugin.PluginManifest;
import com.hypixel.hytale.server.core.HytaleServer;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.universe.Universe;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.events.StartWorldEvent;
import javax.annotation.Nonnull;

public class MultiWorldPlugin extends JavaPlugin {

    public static final PluginManifest MANIFEST = PluginManifest
        .corePlugin(MultiWorldPlugin.class)
        .build();

    public MultiWorldPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        // Create additional worlds on startup
        createWorlds();

        // Listen for world starts
        HytaleServer.get().getEventBus()
            .on(StartWorldEvent.class)
            .subscribe(event -> {
                World world = event.getWorld();
                this.getLogger().info("World started: " + world.getName());
            });
    }

    private void createWorlds() {
        Universe universe = Universe.get();

        // Create a lobby world (flat)
        if (universe.getWorld("lobby") == null) {
            universe.addWorld("lobby", "flat", null)
                .thenAccept(world -> this.getLogger().info("Lobby world created"))
                .exceptionally(e -> {
                    this.getLogger().warning("Failed to create lobby: " + e.getMessage());
                    return null;
                });
        }

        // Create a minigame world (void)
        if (universe.getWorld("arena") == null) {
            universe.addWorld("arena", "void", null)
                .thenAccept(world -> this.getLogger().info("Arena world created"))
                .exceptionally(e -> {
                    this.getLogger().warning("Failed to create arena: " + e.getMessage());
                    return null;
                });
        }
    }
}
```

## Default World

The server has a default world configured in the server config. Players join this world by default.

```java
// Get default world
World defaultWorld = Universe.get().getDefaultWorld();

// The default world name is in server config
// HytaleServer.get().getConfig().getDefaults().getWorld()
```

## World Removal

```java
Universe universe = Universe.get();

// Remove a world (moves players to default world)
universe.removeWorld("myworld").thenAccept(v -> {
    System.out.println("World removed");
});

// World can be configured to delete on remove
WorldConfig config = world.getWorldConfig();
config.setDeleteOnRemove(true);  // Delete world files when removed
```

## See Also

- [Player Join Event](/reference/events/player-join) - Handle players joining worlds
- [Creating a Plugin](/getting-started/plugin) - Plugin setup guide

[^1]: See [WorldConfig API](/api/WorldConfig) for all configuration options including `setSpawningNPC()`, `setIsAllNPCFrozen()`, `setDeleteOnRemove()`, etc.
