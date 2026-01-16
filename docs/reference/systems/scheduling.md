# Scheduling Tasks

This guide covers how to schedule delayed and repeating tasks in your plugin.

::: info API Reference
See full API: [HytaleServer](/api/HytaleServer) | [World](/api/World)
:::

## Overview

Hytale provides two mechanisms for scheduling tasks:

| Method | Thread | Use Case |
|--------|--------|----------|
| `HytaleServer.SCHEDULED_EXECUTOR` | Background thread | Async operations, timers, cleanup tasks |
| `world.execute()` | World thread | Code that accesses world/entity state |

::: warning Thread Safety
Tasks scheduled via `SCHEDULED_EXECUTOR` run on a background thread. If they need to access world state (entities, components, chunks), you **must** use `world.execute()` to run that code on the world thread.
:::

## One-Time Delayed Tasks[^1]

Use `schedule()` to run a task once after a delay:

```java
import com.hypixel.hytale.server.core.HytaleServer;
import java.util.concurrent.TimeUnit;

// Run after 5 seconds
HytaleServer.SCHEDULED_EXECUTOR.schedule(() -> {
    System.out.println("5 seconds have passed!");
}, 5, TimeUnit.SECONDS);

// Run after 100 milliseconds
HytaleServer.SCHEDULED_EXECUTOR.schedule(() -> {
    System.out.println("100ms later!");
}, 100, TimeUnit.MILLISECONDS);
```

### Cancelling a Scheduled Task

The `schedule()` method returns a `ScheduledFuture` that can be cancelled:

```java
import java.util.concurrent.ScheduledFuture;

ScheduledFuture<?> task = HytaleServer.SCHEDULED_EXECUTOR.schedule(() -> {
    System.out.println("This might not run!");
}, 10, TimeUnit.SECONDS);

// Cancel before it runs
task.cancel(false);
```

## Repeating Tasks[^2]

### Fixed Rate

Use `scheduleAtFixedRate()` for tasks that should run at consistent intervals, regardless of how long each execution takes:

```java
// Run every 10 seconds, starting after 10 seconds
HytaleServer.SCHEDULED_EXECUTOR.scheduleAtFixedRate(() -> {
    System.out.println("Ping!");
}, 10, 10, TimeUnit.SECONDS);

// Run every second, starting immediately
HytaleServer.SCHEDULED_EXECUTOR.scheduleAtFixedRate(() -> {
    broadcastStatus();
}, 0, 1, TimeUnit.SECONDS);
```

### Fixed Delay

Use `scheduleWithFixedDelay()` for tasks where the delay should be measured from when the previous execution **completes**:

```java
// Run 5 minutes after each completion
HytaleServer.SCHEDULED_EXECUTOR.scheduleWithFixedDelay(() -> {
    saveData(); // May take variable time
}, 5, 5, TimeUnit.MINUTES);
```

### Rate vs Delay

| Method | Timing | Best For |
|--------|--------|----------|
| `scheduleAtFixedRate` | Runs every N time units regardless of execution time | Regular intervals (pings, broadcasts) |
| `scheduleWithFixedDelay` | Waits N time units after previous completion | Tasks with variable execution time (saves, cleanup) |

## Running on the World Thread[^3]

When you need to access world state from a scheduled task, use `world.execute()` to safely run code on the world's thread:

```java
// Schedule a delayed task that modifies world state
HytaleServer.SCHEDULED_EXECUTOR.schedule(() -> {
    // This runs on the scheduler thread - can't safely access world state here

    world.execute(() -> {
        // This runs on the world thread - safe to access entities, components, etc.
        Player player = store.getComponent(ref, Player.getComponentType());
        player.sendMessage(Message.raw("Time's up!"));
    });
}, 30, TimeUnit.SECONDS);
```

### Direct World Thread Execution

If you're already on the world thread and want to queue something for the next tick, you can use `world.execute()` directly:

```java
// Queue for next tick (useful for deferring operations)
world.execute(() -> {
    // Runs on next world tick
    doSomething();
});
```

## Practical Examples

### Delayed Teleport with Countdown

```java
public void teleportWithCountdown(PlayerRef playerRef, World targetWorld,
                                   double x, double y, double z) {
    World currentWorld = playerRef.getWorld();
    Player player = currentWorld.getEntityStore().getStore()
        .getComponent(playerRef.getReference(), Player.getComponentType());

    // Countdown: 3, 2, 1
    for (int i = 3; i > 0; i--) {
        final int count = i;
        HytaleServer.SCHEDULED_EXECUTOR.schedule(() -> {
            currentWorld.execute(() -> {
                player.sendMessage(Message.raw("Teleporting in " + count + "..."));
            });
        }, 3 - i, TimeUnit.SECONDS);
    }

    // Teleport after 3 seconds
    HytaleServer.SCHEDULED_EXECUTOR.schedule(() -> {
        currentWorld.execute(() -> {
            // Add teleport logic here
        });
    }, 3, TimeUnit.SECONDS);
}
```

### Auto-Save System

```java
public class AutoSavePlugin extends JavaPlugin {
    private ScheduledFuture<?> saveTask;

    @Override
    public void onEnable() {
        // Save every 5 minutes
        saveTask = HytaleServer.SCHEDULED_EXECUTOR.scheduleWithFixedDelay(() -> {
            saveAllPlayerData();
        }, 5, 5, TimeUnit.MINUTES);
    }

    @Override
    public void onDisable() {
        if (saveTask != null) {
            saveTask.cancel(false);
        }
        // Final save
        saveAllPlayerData();
    }
}
```

### Delayed Action with Entity Check

```java
public void doDelayedAction(Ref<EntityStore> ref, Store<EntityStore> store,
                             World world, int delaySeconds) {
    Player player = store.getComponent(ref, Player.getComponentType());

    player.sendMessage(Message.raw("Something will happen in " + delaySeconds + " seconds..."));

    HytaleServer.SCHEDULED_EXECUTOR.schedule(() -> {
        world.execute(() -> {
            // Always check entity still exists before accessing components
            if (ref.isValid()) {
                Player p = store.getComponent(ref, Player.getComponentType());
                p.sendMessage(Message.raw("Time's up!"));
            }
        });
    }, delaySeconds, TimeUnit.SECONDS);
}
```

### Repeating World Broadcast

```java
public void startHourlyAnnouncements(World world) {
    HytaleServer.SCHEDULED_EXECUTOR.scheduleAtFixedRate(() -> {
        world.execute(() -> {
            world.sendMessage(Message.raw("[Server] Remember to take breaks!"));
        });
    }, 1, 1, TimeUnit.HOURS);
}
```

## Tick-Based Timing

The server runs at 30 TPS (ticks per second). One tick is approximately 33.3ms:

```java
// Convert ticks to milliseconds
long ticksToMs(int ticks) {
    return ticks * 1000L / 30;
}

// Schedule for "next tick" (approximately)
HytaleServer.SCHEDULED_EXECUTOR.schedule(() -> {
    world.execute(() -> {
        // Runs roughly on next tick
    });
}, 33, TimeUnit.MILLISECONDS);
```

::: tip
For precise tick-based timing, consider using a system that runs every tick and tracks its own counters, rather than relying on the scheduler.
:::

## See Also

- [System Groups](/concepts/system-groups) - Creating tick-based systems
- [HytaleServer API](/api/HytaleServer) - Server instance methods
- [World API](/api/World) - World thread execution

[^1]: `HytaleServer.SCHEDULED_EXECUTOR.schedule()` is a standard Java `ScheduledExecutorService` method. See [HytaleServer API](/api/HytaleServer).

[^2]: `scheduleAtFixedRate()` and `scheduleWithFixedDelay()` are standard Java `ScheduledExecutorService` methods. The executor is a single-threaded daemon thread named "Scheduler".

[^3]: `World.execute()` adds the runnable to the world's task queue, which is consumed at the start of each tick. See [World API](/api/World).
