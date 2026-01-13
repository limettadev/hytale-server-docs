# Creating a Plugin

This guide walks through setting up a Hytale server plugin from scratch.

## Project Setup

### 1. Create a Gradle Project

Create a new directory for your plugin and set up the following structure:

```
my-plugin/
├── build.gradle.kts
├── settings.gradle.kts
└── src/
    └── main/
        └── java/
            └── com/
                └── example/
                    └── myplugin/
                        └── MyPlugin.java
```

### 2. Configure Gradle

**settings.gradle.kts:**
```kotlin
rootProject.name = "my-plugin"
```

**build.gradle.kts:**
```kotlin
plugins {
    java
}

group = "com.example"
version = "1.0.0"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    // Hytale Server JAR - adjust path for your OS
    // Windows:
    implementation(files("${System.getProperty("user.home")}/AppData/Roaming/Hytale/install/release/package/game/latest/Server/HytaleServer.jar"))

    // macOS:
    // implementation(files("${System.getProperty("user.home")}/Library/Application Support/Hytale/install/release/package/game/latest/Server/HytaleServer.jar"))

    // Linux:
    // implementation(files("${System.getProperty("user.home")}/.local/share/Hytale/install/release/package/game/latest/Server/HytaleServer.jar"))

    // Annotations
    compileOnly("com.google.code.findbugs:jsr305:3.0.2")
}

tasks.jar {
    archiveBaseName.set("my-plugin")
}
```

### 3. Build and Install

```bash
# Build the plugin
./gradlew build

# Copy to plugins folder
cp build/libs/my-plugin-1.0.0.jar /path/to/server/plugins/
```

## Plugin Structure

A plugin is a Java class that extends `JavaPlugin`:

```java
package com.example.myplugin;

import com.hypixel.hytale.common.plugin.PluginManifest;
import com.hypixel.hytale.component.ComponentRegistryProxy;
import com.hypixel.hytale.server.core.modules.entity.damage.DamageModule;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class MyPlugin extends JavaPlugin {

    // Plugin manifest - declares dependencies
    public static final PluginManifest MANIFEST = PluginManifest
        .corePlugin(MyPlugin.class)
        .depends(DamageModule.class)  // Depend on modules you use
        .build();

    public MyPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        // Get the entity store registry
        ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();

        // Register your systems here
        registry.registerSystem(new MyDamageHandler());
        registry.registerSystem(new MyDeathHandler());

        // Register commands
        this.getCommandRegistry().registerCommand(new MyCommand());

        // Log startup
        this.getLogger().info("MyPlugin loaded!");
    }
}
```

## Plugin Manifest

The manifest declares your plugin's identity and dependencies:

```java
public static final PluginManifest MANIFEST = PluginManifest
    .corePlugin(MyPlugin.class)
    .depends(DamageModule.class)      // Required dependency
    .depends(EntityModule.class)       // Another dependency
    .build();
```

Common modules to depend on:
- `DamageModule` - For damage/death events
- `EntityModule` - For entity components
- `InteractionModule` - For interaction handling
- `EntityStatsModule` - For health/stats

## Registering Systems

Systems are registered in `setup()`:

```java
@Override
protected void setup() {
    ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();

    // Event handlers
    registry.registerSystem(new MyDamageHandler());

    // Tick systems
    registry.registerSystem(new MyTickSystem());

    // Component change listeners
    registry.registerSystem(new MyDeathHandler());
}
```

## Example: Starter Kit Plugin

A complete plugin that gives players items on first join and respawn:

```java
package com.example.starterkit;

import com.hypixel.hytale.common.plugin.PluginManifest;
import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.RefSystem;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.inventory.ItemStack;
import com.hypixel.hytale.server.core.modules.entity.damage.DamageModule;
import com.hypixel.hytale.server.core.modules.entity.damage.DeathComponent;
import com.hypixel.hytale.server.core.modules.entity.damage.RespawnSystems;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class StarterKitPlugin extends JavaPlugin {

    public static final PluginManifest MANIFEST = PluginManifest
        .corePlugin(StarterKitPlugin.class)
        .depends(DamageModule.class)
        .build();

    public StarterKitPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();
        registry.registerSystem(new GiveItemsOnFirstJoin());
        registry.registerSystem(new GiveItemsOnRespawn());

        this.getLogger().info("StarterKit plugin loaded!");
    }

    // Give items when player first joins
    public static class GiveItemsOnFirstJoin extends RefSystem {
        @Nonnull
        @Override
        public Query getQuery() {
            return Player.getComponentType();
        }

        @Override
        public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                                   @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
            Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());
            if (player.isFirstSpawn()) {
                giveStarterKit(player);
            }
        }

        @Override
        public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                                    @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {}
    }

    // Give items when player respawns after death
    public static class GiveItemsOnRespawn extends RespawnSystems.OnRespawnSystem {
        @Nonnull
        @Override
        public Query getQuery() {
            return Player.getComponentType();
        }

        @Override
        public void onComponentRemoved(@Nonnull Ref<EntityStore> ref, @Nonnull DeathComponent component,
                                        @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
            Player player = (Player) store.getComponent(ref, Player.getComponentType());
            giveStarterKit(player);
        }
    }

    private static void giveStarterKit(Player player) {
        player.getInventory().addItemStack(new ItemStack("Tool_Sword_Wood", 1));
        player.getInventory().addItemStack(new ItemStack("Tool_Pickaxe_Wood", 1));
        player.getInventory().addItemStack(new ItemStack("Food_Apple", 10));
    }
}
```

## See Also

- [ECS Architecture](/concepts/ecs) - Understanding the component system
- [Event System](/concepts/events) - Handling events
- [Damage Event](/reference/events/damage) - Example event handler
- [World Management](/reference/systems/worlds) - Working with worlds
