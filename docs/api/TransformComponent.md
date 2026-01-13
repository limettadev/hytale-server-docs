# TransformComponent

**Package:** `com.hypixel.hytale.server.core.modules.entity.component`

**Type:** class

**Implements:** `Component`

## Constructors

```java
public TransformComponent()
```

```java
public TransformComponent(@Nonnull Vector3d position, @Nonnull Vector3f rotation)
```

## Static Fields

| Name | Type |
|------|------|
| `CODEC` | `BuilderCodec` |

## Fields

| Name | Type |
|------|------|
| `position` | `Vector3d` |
| `rotation` | `Vector3f` |
| `sentTransform` | `ModelTransform` |
| `chunk` | `WorldChunk` |
| `chunkRef` | `Ref` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getComponentType()` | `ComponentType` |

## Methods

| Method | Returns |
|--------|--------|
| `getPosition()` | `Vector3d` |
| `setPosition(@Nonnull Vector3d position)` | `void` |
| `teleportPosition(@Nonnull Vector3d position)` | `void` |
| `getRotation()` | `Vector3f` |
| `setRotation(@Nonnull Vector3f rotation)` | `void` |
| `getTransform()` | `Transform` |
| `Transform(this.position, this.rotation)` | `return new` |
| `teleportRotation(@Nonnull Vector3f rotation)` | `void` |
| `getSentTransform()` | `ModelTransform` |
| `getChunk()` | `WorldChunk` |
| `getChunkRef()` | `Ref` |
| `markChunkDirty(@Nonnull ComponentAccessor componentAccessor)` | `void` |
| `setChunkLocation(@Nullable Ref chunkRef, @Nullable WorldChunk chunk)` | `void` |
| `clone()` | `TransformComponent` |

