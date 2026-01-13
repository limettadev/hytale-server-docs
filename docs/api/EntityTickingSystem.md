# EntityTickingSystem

**Package:** `com.hypixel.hytale.component.system.tick`

**Type:** abstract class

**Extends:** `ArchetypeTickingSystem`

## Fields

| Name | Type |
|------|------|
| `system` | `EntityTickingSystem` |
| `dt` | `float` |
| `archetypeChunk` | `ArchetypeChunk` |
| `store` | `Store` |
| `commandBuffer` | `CommandBuffer` |

## Static Methods

| Method | Returns |
|--------|--------|
| `maybeUseParallel(int archetypeChunkSize, int taskCount)` | `boolean` |
| `useParallel(int archetypeChunkSize, int taskCount)` | `boolean` |
| `doTick(@Nonnull EntityTickingSystem system, float dt, @Nonnull ArchetypeChunk archetypeChunk, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `invokeParallelTask(@Nonnull ParallelTask parallelTask, @Nonnull CommandBuffer commandBuffer)` | `void` |

## Methods

| Method | Returns |
|--------|--------|
| `isParallel(int archetypeChunkSize, int taskCount)` | `boolean` |
| `tick(float dt, @Nonnull ArchetypeChunk archetypeChunk, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `tick(float var1, int var2, @Nonnull ArchetypeChunk var3, @Nonnull Store var4, @Nonnull CommandBuffer var5)` | `abstract void` |
| `init(EntityTickingSystem system, float dt, ArchetypeChunk archetypeChunk, Store store, CommandBuffer commandBuffer)` | `void` |
| `accept(int index)` | `void` |
| `clear()` | `void` |

