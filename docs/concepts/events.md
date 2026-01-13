# Event System

Events in Hytale are processed through the [ECS architecture](/concepts/ecs). There are two main patterns for handling events.

## Event Types

### 1. ECS Events (Invoked Events)

These are event objects dispatched through the ECS system. Handlers extend `EntityEventSystem`.

**Examples:** [Damage](/reference/events/damage)

```java
public class MyDamageHandler extends DamageEventSystem {
    @Override
    public void handle(int index, ArchetypeChunk chunk, Store store,
                       CommandBuffer buffer, Damage damage) {
        // Handle the damage event
    }
}
```

Key characteristics:
- Extend a base event system class (e.g., `DamageEventSystem`)
- Implement `handle()` method
- Can be cancelled via `event.setCancelled(true)`
- Can modify the event (e.g., `damage.setAmount()`)
- Run in defined [system groups](/concepts/system-groups)

### 2. Component Change Events

These trigger when a component is added/removed from an entity. Handlers extend `RefChangeSystem`.

**Examples:** [Death](/reference/events/death), [Respawn](/reference/events/respawn)

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

Key characteristics:
- Extend `RefChangeSystem` or a wrapper like `OnDeathSystem`
- Override `onComponentAdded()` and/or `onComponentRemoved()`
- React to state changes rather than explicit events

### 3. Entity Lifecycle Events

These trigger when entities are added/removed from the world. Handlers extend `RefSystem`.

**Examples:** [Player Join](/reference/events/player-join)

```java
public class MyJoinHandler extends RefSystem {
    @Override
    public void onEntityAdded(Ref ref, AddReason reason, Store store, CommandBuffer buffer) {
        // Entity was added to the world
    }

    @Override
    public void onEntityRemove(Ref ref, RemoveReason reason, Store store, CommandBuffer buffer) {
        // Entity is being removed from the world
    }
}
```

## Cancellable Events

ECS events that extend `CancellableEcsEvent` can be cancelled:

```java
public void handle(..., Damage damage) {
    if (someCondition) {
        damage.setCancelled(true);  // Stops further processing
        return;
    }
}
```

::: warning
Only cancel events in the **filter** [system group](/concepts/system-groups). Cancelling in the inspect group has no effect since the action already happened.
:::

## Registering Event Handlers

All handlers are registered in your plugin's `setup()` method:

```java
@Override
protected void setup() {
    ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();

    registry.registerSystem(new MyDamageHandler());
    registry.registerSystem(new MyDeathHandler());
    registry.registerSystem(new MyJoinHandler());
}
```

## See Also

- [System Groups](/concepts/system-groups) - Control when your handler runs
- [Damage Event](/reference/events/damage) - Full damage event reference
- [Death Event](/reference/events/death) - Full death event reference
