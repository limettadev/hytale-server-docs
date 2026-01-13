# Event System

Hytale has **two separate event systems** for different purposes:

| System | Use Case | Registration |
|--------|----------|--------------|
| **EventBus** | Server-wide events (player connect, chat, world events) | `getEventRegistry().register()` |
| **ECS Events** | Entity-specific events (damage, block break, death) | `getEntityStoreRegistry().registerSystem()` |

## EventBus (Server Events)

The EventBus handles global server events using simple lambda registration. This is the simpler approach for most common events.

### Basic Registration

```java
@Override
protected void setup() {
    // Register for player chat events
    getEventRegistry().register(PlayerChatEvent.class, event -> {
        PlayerRef sender = event.getSender();
        String message = event.getContent();
        System.out.println(sender.getUsername() + " said: " + message);
    });

    // Register for player connections
    getEventRegistry().register(PlayerConnectEvent.class, event -> {
        PlayerRef player = event.getPlayerRef();
        System.out.println(player.getUsername() + " connected!");
    });
}
```

### Global vs Key-Based Registration

```java
// Global - receives ALL events of this type
getEventRegistry().registerGlobal(PlayerChatEvent.class, event -> {
    // Handle all chat messages
});

// Key-based - receives events for a specific key
getEventRegistry().register(SomeKeyedEvent.class, myKey, event -> {
    // Handle events only for this key
});

// Unhandled - receives events that no key-based handler processed
getEventRegistry().registerUnhandled(SomeKeyedEvent.class, event -> {
    // Fallback handler
});
```

### Event Priority

Control handler execution order with priorities:

```java
import com.hypixel.hytale.event.EventPriority;

// Run before other handlers
getEventRegistry().register(EventPriority.EARLY, PlayerChatEvent.class, event -> {
    // Runs first - can modify event before others see it
});

// Run after other handlers
getEventRegistry().register(EventPriority.LATE, PlayerChatEvent.class, event -> {
    // Runs last - sees final state
});
```

### Cancelling EventBus Events

Events implementing `ICancellable` can be cancelled:

```java
getEventRegistry().register(EventPriority.EARLY, PlayerChatEvent.class, event -> {
    if (event.getContent().contains("spam")) {
        event.setCancelled(true);  // Message won't be sent
    }
});
```

### Common EventBus Events

| Event | Description |
|-------|-------------|
| `PlayerConnectEvent` | Player connecting to server |
| `PlayerDisconnectEvent` | Player disconnecting |
| `PlayerChatEvent` | Player sends chat message (cancellable) |
| `AddPlayerToWorldEvent` | Player being added to a world |
| `StartWorldEvent` | World has started |
| `AddWorldEvent` | World being added to universe |
| `RemoveWorldEvent` | World being removed |

### Async Events

Some events are asynchronous and return `CompletableFuture`:

```java
getEventRegistry().registerAsync(SomeAsyncEvent.class, event -> {
    return CompletableFuture.supplyAsync(() -> {
        // Do async work
        return null;
    });
});
```

## ECS Events (Entity Events)

ECS events are for entity-specific interactions processed through the [ECS architecture](/concepts/ecs). They require extending system classes.

### ECS Event Handlers

Extend `EntityEventSystem` for event-based handlers:

```java
public class MyDamageHandler extends EntityEventSystem<Damage> {
    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();  // Only for players
    }

    @Nonnull
    @Override
    public Class<Damage> getEventType() {
        return Damage.class;
    }

    @Override
    public void handle(@Nonnull Ref<EntityStore> ref, @Nonnull Damage event,
                       @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        // Handle damage to the entity
        if (event.getAmount() > 50) {
            event.setCancelled(true);  // Block massive damage
        }
    }
}
```

Register in `setup()`:
```java
getEntityStoreRegistry().registerSystem(new MyDamageHandler());
```

### Component Change Events

React to component additions/removals with `RefChangeSystem`:

```java
public class MyDeathHandler extends DeathSystems.OnDeathSystem {
    @Override
    public void onComponentAdded(Ref ref, DeathComponent component,
                                  Store store, CommandBuffer buffer) {
        // Entity just died (DeathComponent was added)
    }

    @Override
    public void onComponentRemoved(Ref ref, DeathComponent component,
                                    Store store, CommandBuffer buffer) {
        // Entity respawned (DeathComponent was removed)
    }
}
```

### Entity Lifecycle Events

React to entities being added/removed with `RefSystem`:

```java
public class EntitySpawnListener extends RefSystem {
    @Override
    public void onEntityAdded(Ref ref, AddReason reason, Store store, CommandBuffer buffer) {
        if (reason == AddReason.SPAWN) {
            // New entity spawned
        }
    }

    @Override
    public void onEntityRemove(Ref ref, RemoveReason reason, Store store, CommandBuffer buffer) {
        // Entity being removed
    }
}
```

### System Groups

ECS events run in defined [system groups](/concepts/system-groups) that control when your handler executes relative to others:

```java
@Nonnull
@Override
public SystemGroup getGroup() {
    return DamageModule.get().getFilterDamageGroup();  // Run in filter phase
}
```

::: warning
Only cancel ECS events in the **filter** group. Cancelling in the inspect group has no effect since the action already happened.
:::

## When to Use Which System

| Scenario | System | Example |
|----------|--------|---------|
| Player connects/disconnects | EventBus | `PlayerConnectEvent` |
| Player chat messages | EventBus | `PlayerChatEvent` |
| World lifecycle | EventBus | `StartWorldEvent` |
| Damage to entities | ECS | `Damage` event |
| Block break/place | ECS | `BreakBlockEvent` |
| Entity spawn/despawn | ECS | `RefSystem` |
| Death/respawn | ECS | `DeathComponent` changes |

## See Also

- [System Groups](/concepts/system-groups) - Control when ECS handlers run
- [ECS Architecture](/concepts/ecs) - Understanding the component system
- [Player Chat](/reference/events/player-chat) - Chat event reference
- [Damage Event](/reference/events/damage) - Damage event reference
