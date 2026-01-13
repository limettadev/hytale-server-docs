# CommandBuffer

**Package:** `com.hypixel.hytale.component`

**Type:** class

**Implements:** `ComponentAccessor`

## Constructors

```java
protected CommandBuffer(@Nonnull Store store)
```

## Fields

| Name | Type |
|------|------|
| `store` | `Store` |
| `queue` | `Deque` |
| `trackedRef` | `Ref` |
| `trackedRefRemoved` | `boolean` |
| `parentBuffer` | `CommandBuffer` |
| `thread` | `Thread` |

## Methods

| Method | Returns |
|--------|--------|
| `getStore()` | `Store` |
| `run(@Nonnull Consumer consumer)` | `void` |
| `getComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `Component` |
| `getArchetype(@Nonnull Ref ref)` | `Archetype` |
| `getResource(@Nonnull ResourceType resourceType)` | `Resource` |
| `getExternalData()` | `Object` |
| `addEntities(@Nonnull Holder[] holders, @Nonnull AddReason reason)` | `Ref[]` |
| `addEntity(@Nonnull Holder holder, @Nonnull AddReason reason)` | `Ref` |
| `addEntities(@Nonnull Holder[] holders, int holderStart, @Nonnull Ref[] refs, int refStart, int length, @Nonnull AddReason reason)` | `void` |
| `addEntity(@Nonnull Holder holder, @Nonnull Ref ref, @Nonnull AddReason reason)` | `Ref` |
| `copyEntity(@Nonnull Ref ref, @Nonnull Holder target)` | `Holder` |
| `tryRemoveEntity(@Nonnull Ref ref, @Nonnull RemoveReason reason)` | `void` |
| `removeEntity(@Nonnull Ref ref, @Nonnull RemoveReason reason)` | `void` |
| `removeEntity(@Nonnull Ref ref, @Nonnull Holder target, @Nonnull RemoveReason reason)` | `Holder` |
| `ensureComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `void` |
| `ensureAndGetComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `Component` |
| `addComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `Component` |
| `addComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType, @Nonnull Component component)` | `void` |
| `replaceComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType, @Nonnull Component component)` | `void` |
| `removeComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `void` |
| `tryRemoveComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `void` |
| `putComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType, @Nonnull Component component)` | `void` |
| `invoke(@Nonnull Ref ref, @Nonnull EcsEvent param)` | `void` |
| `invoke(@Nonnull EntityEventType systemType, @Nonnull Ref ref, @Nonnull EcsEvent param)` | `void` |
| `invoke(@Nonnull EcsEvent param)` | `void` |
| `invoke(@Nonnull WorldEventType systemType, @Nonnull EcsEvent param)` | `void` |
| `track(@Nonnull Ref ref)` | `void` |
| `testRemovedTracked(@Nonnull Ref ref)` | `void` |
| `consumeWasTrackedRefRemoved()` | `boolean` |
| `consume()` | `void` |
| `fork()` | `CommandBuffer` |
| `mergeParallel(@Nonnull CommandBuffer commandBuffer)` | `void` |
| `setThread()` | `boolean` |
| `validateEmpty()` | `void` |

