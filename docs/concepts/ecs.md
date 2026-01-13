# ECS Architecture

The Hytale server uses an **Entity Component System (ECS)** architecture. Understanding this is fundamental to working with the API.

## Core Concepts

### Entities

Entities are unique identifiers (references) for game objects. An entity by itself has no data - it's just an ID.

```java
Ref<EntityStore> ref;  // Reference to an entity
```

### Components

Components are pure data containers attached to entities. Examples:
- `Player` - Player-specific data
- `TransformComponent` - Position and rotation
- `EntityStatMap` - Health, stamina, etc.
- `DeathComponent` - Added when entity dies

```java
// Get a component from an entity
Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());
TransformComponent transform = (TransformComponent) commandBuffer.getComponent(ref, TransformComponent.getComponentType());
```

### Systems

Systems contain the logic. They operate on entities that have specific components. Systems don't store state - they process components.

```java
public class MySystem extends EntityTickingSystem {
    @Override
    public Query getQuery() {
        return Player.getComponentType();  // Only run on entities with Player component
    }

    @Override
    public void tick(float dt, int index, ArchetypeChunk chunk, Store store, CommandBuffer buffer) {
        // Logic here runs every tick for matching entities
    }
}
```

## Queries

Queries define which entities a system operates on:

```java
// Single component
Query query = Player.getComponentType();

// Multiple required components (AND)
Query query = Query.and(Player.getComponentType(), TransformComponent.getComponentType());

// Exclude components (NOT)
Query query = Query.and(Player.getComponentType(), Query.not(DeathComponent.getComponentType()));
```

## Store and CommandBuffer

- **Store** - Read-only access to the current state
- **CommandBuffer** - Queues modifications to be applied safely

```java
// Reading (use Store or CommandBuffer)
Player player = (Player) store.getComponent(ref, Player.getComponentType());

// Writing (use CommandBuffer)
commandBuffer.putComponent(ref, SomeComponent.getComponentType(), newComponent);
commandBuffer.removeComponent(ref, SomeComponent.getComponentType());
```

## ArchetypeChunk

In tick systems, entities are processed in batches called chunks for performance:

```java
public void tick(float dt, int index, ArchetypeChunk chunk, Store store, CommandBuffer buffer) {
    // Get component for this specific entity in the chunk
    Player player = (Player) chunk.getComponent(index, Player.getComponentType());

    // Get the entity reference
    Ref<EntityStore> ref = chunk.getReferenceTo(index);
}
```

## See Also

- [Event System](/concepts/events) - How events work in the ECS
- [Components](/concepts/components) - Common components reference
- [System Groups](/concepts/system-groups) - Controlling execution order
