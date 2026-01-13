# EntityEventSystem

**Package:** `com.hypixel.hytale.component.system`

**Type:** abstract class

**Extends:** `EventSystem implements QuerySystem`

## Constructors

```java
protected EntityEventSystem(@Nonnull Class eventType)
```

## Methods

| Method | Returns |
|--------|--------|
| `handle(int var1, @Nonnull ArchetypeChunk var2, @Nonnull Store var3, @Nonnull CommandBuffer var4, @Nonnull EcsEvent var5)` | `abstract void` |
| `handleInternal(int index, @Nonnull ArchetypeChunk archetypeChunk, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer, @Nonnull EcsEvent event)` | `void` |

