# Components

Components are data containers attached to entities. They define what an entity "is" and "has".

## Accessing Components

```java
// From a Ref (entity reference)
Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());

// From an ArchetypeChunk (in tick systems)
Player player = (Player) chunk.getComponent(index, Player.getComponentType());
```

## Common Components

### Entity Data

| Component | Description | Key Methods |
|-----------|-------------|-------------|
| `Player` | Player-specific data | `getInventory()`, `getGameMode()`, `sendMessage()` |
| `TransformComponent` | Position & rotation | `getPosition()`, `getRotation()` |
| `Velocity` | Movement velocity | `getVelocity()` |
| `HeadRotation` | Head direction | `getRotation()` |
| `Nameplate` | Display name | `getText()` |
| `ModelComponent` | Entity model | `getModel()` |

### Stats & Effects

| Component | Description | Key Methods |
|-----------|-------------|-------------|
| `EntityStatMap` | Health, stamina, etc. | `get(statType)`, `setStatValue()` |
| `EffectControllerComponent` | Active effects | `getActiveEffects()`, `clearEffects()` |
| `DamageDataComponent` | Combat tracking | `getLastCombatAction()` |

### State Components

| Component | Description | When Present |
|-----------|-------------|--------------|
| `DeathComponent` | Death info | Entity is dead |
| `Invulnerable` | Marker | Entity can't be damaged |
| `Intangible` | Marker | Entity can't be hit |

## Checking Component Existence

```java
// Check if entity has a component
Archetype<EntityStore> archetype = chunk.getArchetype();
boolean isDead = archetype.contains(DeathComponent.getComponentType());
boolean isPlayer = archetype.contains(Player.getComponentType());
```

## Adding/Removing Components

```java
// Add a component
commandBuffer.putComponent(ref, SomeComponent.getComponentType(), new SomeComponent());

// Remove a component
commandBuffer.removeComponent(ref, SomeComponent.getComponentType());

// Try to remove (no error if missing)
commandBuffer.tryRemoveComponent(ref, SomeComponent.getComponentType());
```

## Component Types in Queries

Use components to filter which entities your system processes:

```java
@Override
public Query getQuery() {
    return Query.and(
        Player.getComponentType(),           // Must have Player
        TransformComponent.getComponentType(), // Must have Transform
        Query.not(DeathComponent.getComponentType())  // Must NOT be dead
    );
}
```

## See Also

- [ECS Architecture](/concepts/ecs) - How components fit in the ECS
- [Player Component](/reference/components/player) - Full Player reference
- [TransformComponent](/reference/components/transform) - Position & rotation
