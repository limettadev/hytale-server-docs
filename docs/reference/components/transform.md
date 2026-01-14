# TransformComponent

The `TransformComponent` stores an entity's position and rotation in the world.

::: info API Reference
See full API: [TransformComponent](/api/TransformComponent)
:::

::: tip Concepts
Before reading this, familiarize yourself with [Components](/concepts/components).
:::

## Overview

| Property | Value |
|----------|-------|
| Class | `com.hypixel.hytale.server.core.modules.entity.component.TransformComponent` |
| Component Type | `TransformComponent.getComponentType()` |

## Getting the Component

```java
// From Ref
TransformComponent transform = (TransformComponent)
    commandBuffer.getComponent(ref, TransformComponent.getComponentType());

// From ArchetypeChunk
TransformComponent transform = (TransformComponent)
    chunk.getComponent(index, TransformComponent.getComponentType());
```

## Position[^1]

```java
// Get position
Vector3d position = transform.getPosition();

double x = position.getX();
double y = position.getY();
double z = position.getZ();

// Set position (teleport)
transform.setPosition(new Vector3d(100, 64, 200));

// Or modify existing
position.set(100, 64, 200);
```

## Rotation

```java
// Get rotation
Vector3f rotation = transform.getRotation();

float yaw = rotation.getYaw();     // Horizontal rotation
float pitch = rotation.getPitch(); // Vertical rotation
float roll = rotation.getRoll();   // Roll (usually 0)

// Set rotation
transform.setRotation(new Vector3f(yaw, pitch, 0));
```

## Example: Get Player Location

```java
public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                           @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {

    Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());
    TransformComponent transform = (TransformComponent)
        commandBuffer.getComponent(ref, TransformComponent.getComponentType());

    if (transform != null) {
        Vector3d pos = transform.getPosition();
        System.out.println("Player at: " + pos.getX() + ", " + pos.getY() + ", " + pos.getZ());
    }
}
```

## Example: Teleport Player

```java
public void teleportPlayer(Ref<EntityStore> ref, CommandBuffer commandBuffer,
                            double x, double y, double z) {

    TransformComponent transform = (TransformComponent)
        commandBuffer.getComponent(ref, TransformComponent.getComponentType());

    if (transform != null) {
        transform.setPosition(new Vector3d(x, y, z));
    }
}
```

## Example: Calculate Distance

```java
public double getDistance(Ref<EntityStore> ref1, Ref<EntityStore> ref2,
                           CommandBuffer commandBuffer) {

    TransformComponent t1 = (TransformComponent)
        commandBuffer.getComponent(ref1, TransformComponent.getComponentType());
    TransformComponent t2 = (TransformComponent)
        commandBuffer.getComponent(ref2, TransformComponent.getComponentType());

    if (t1 == null || t2 == null) return -1;

    Vector3d p1 = t1.getPosition();
    Vector3d p2 = t2.getPosition();

    double dx = p1.getX() - p2.getX();
    double dy = p1.getY() - p2.getY();
    double dz = p1.getZ() - p2.getZ();

    return Math.sqrt(dx*dx + dy*dy + dz*dz);
}
```

## Related Components

| Component | Description |
|-----------|-------------|
| `HeadRotation` | Head direction (separate from body) |
| `Velocity` | Movement velocity |

```java
// Head rotation (for looking direction)
HeadRotation headRotation = (HeadRotation)
    commandBuffer.getComponent(ref, HeadRotation.getComponentType());
Vector3f headDir = headRotation.getRotation();

// Velocity
Velocity velocity = (Velocity)
    commandBuffer.getComponent(ref, Velocity.getComponentType());
Vector3d vel = velocity.getVelocity();
```

## See Also

- [Components Concept](/concepts/components) - How components work
- [Player Component](/reference/components/player) - Player data

[^1]: See [TransformComponent API](/api/TransformComponent) for `getPosition()`, `setPosition()`, `getRotation()`, `setRotation()`, and `teleportPosition()`
