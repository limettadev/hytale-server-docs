# Store

**Package:** `com.hypixel.hytale.component`

**Type:** class

**Implements:** `ComponentAccessor`

## Static Fields

| Name | Type |
|------|------|
| `EMPTY_ARRAY` | `Store[]` |
| `METRICS_REGISTRY` | `MetricsRegistry` |

## Fields

| Name | Type |
|------|------|
| `registry` | `ComponentRegistry` |
| `externalData` | `Object` |
| `resourceStorage` | `IResourceStorage` |
| `commandBuffers` | `Deque` |
| `thread` | `Thread` |
| `parallelTask` | `ParallelTask` |
| `forEachTask` | `ParallelTask` |
| `fetchTask` | `ParallelTask` |
| `processing` | `ProcessingCounter` |
| `shutdown` | `boolean` |
| `entitiesSize` | `int` |
| `refs` | `Ref[]` |
| `entityToArchetypeChunk` | `int[]` |
| `entityChunkIndex` | `int[]` |
| `systemIndexToArchetypeChunkIndexes` | `BitSet[]` |
| `archetypeChunkIndexesToSystemIndex` | `BitSet[]` |
| `archetypeToIndexMap` | `Object2IntMap` |
| `archetypeSize` | `int` |
| `archetypeChunkReuse` | `BitSet` |
| `archetypeChunks` | `ArchetypeChunk[]` |
| `resources` | `Resource[]` |
| `systemMetrics` | `HistoricMetric[]` |
| `disableProcessingAssert` | `boolean` |
| `count` | `int` |

## Methods

| Method | Returns |
|--------|--------|
| `takeCommandBuffer()` | `CommandBuffer` |
| `CommandBuffer(this)` | `return new` |
| `storeCommandBuffer(@Nonnull CommandBuffer commandBuffer)` | `void` |
| `getStoreIndex()` | `int` |
| `getRegistry()` | `ComponentRegistry` |
| `getExternalData()` | `Object` |
| `getResourceStorage()` | `IResourceStorage` |
| `getParallelTask()` | `ParallelTask` |
| `getFetchTask()` | `ParallelTask` |
| `getSystemMetrics()` | `HistoricMetric[]` |
| `isShutdown()` | `boolean` |
| `onAdd(@Nonnull ComponentRegistry.Data data)` | `void` |
| `shutdown()` | `void` |
| `shutdown0(@Nonnull ComponentRegistry.Data data)` | `void` |
| `saveAllResources()` | `CompletableFuture` |
| `saveAllResources0(@Nonnull ComponentRegistry.Data data)` | `CompletableFuture` |
| `getEntityCount()` | `int` |
| `getEntityCountFor(@Nonnull Query query)` | `int` |
| `getEntityCountFor(int systemIndex)` | `int` |
| `getArchetypeChunkCount()` | `int` |
| `collectArchetypeChunkData()` | `ArchetypeChunkData[]` |
| `getArchetypeChunkCountFor(int systemIndex)` | `int` |
| `setEntityChunkIndex(@Nonnull Ref ref, int newEntityChunkIndex)` | `void` |
| `addEntity(@Nonnull Archetype archetype, @Nonnull AddReason reason)` | `Ref` |
| `addEntity(@Nonnull Holder holder, @Nonnull AddReason reason)` | `Ref` |
| `addEntity(@Nonnull Holder holder, @Nonnull Ref ref, @Nonnull AddReason reason)` | `Ref` |
| `addEntities(@Nonnull Holder[] holders, @Nonnull AddReason reason)` | `Ref[]` |
| `addEntities(@Nonnull Holder[] holders, int start, int length, @Nonnull AddReason reason)` | `Ref[]` |
| `addEntities(@Nonnull Holder[] holders, @Nonnull Ref[] refs, @Nonnull AddReason reason)` | `void` |
| `addEntities(@Nonnull Holder[] holders, int holderStart, @Nonnull Ref[] refs, int refStart, int length, @Nonnull AddReason reason)` | `void` |
| `copyEntity(@Nonnull Ref ref)` | `Holder` |
| `copyEntity(@Nonnull Ref ref, @Nonnull Holder holder)` | `Holder` |
| `copySerializableEntity(@Nonnull Ref ref)` | `Holder` |
| `copySerializableEntity(@Nonnull Ref ref, @Nonnull Holder holder)` | `Holder` |
| `getArchetype(@Nonnull Ref ref)` | `Archetype` |
| `__internal_getArchetype(@Nonnull Ref ref)` | `Archetype` |
| `removeEntity(@Nonnull Ref ref, @Nonnull RemoveReason reason)` | `Holder` |
| `removeEntity(@Nonnull Ref ref, @Nonnull Holder holder, @Nonnull RemoveReason reason)` | `Holder` |
| `removeEntity(@Nonnull Ref ref, @Nonnull Holder holder, @Nonnull RemoveReason reason, @Nullable Throwable proxyReason)` | `Holder` |
| `removeEntities(@Nonnull Ref[] refs, @Nonnull RemoveReason reason)` | `Holder[]` |
| `removeEntities(@Nonnull Ref[] refs, int start, int length, @Nonnull RemoveReason reason)` | `Holder[]` |
| `removeEntities(@Nonnull Ref[] refs, @Nonnull Holder[] holders, @Nonnull RemoveReason reason)` | `Holder[]` |
| `removeEntities(@Nonnull Ref[] refArr, int refStart, @Nonnull Holder[] holders, int holderStart, int length, @Nonnull RemoveReason reason)` | `Holder[]` |
| `ensureComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `void` |
| `ensureAndGetComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `Component` |
| `addComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `Component` |
| `addComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType, @Nonnull Component component)` | `void` |
| `replaceComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType, @Nonnull Component component)` | `void` |
| `putComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType, @Nonnull Component component)` | `void` |
| `getComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `Component` |
| `__internal_getComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `Component` |
| `removeComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `void` |
| `tryRemoveComponent(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `void` |
| `removeComponentIfExists(@Nonnull Ref ref, @Nonnull ComponentType componentType)` | `boolean` |
| `replaceResource(@Nonnull ResourceType resourceType, @Nonnull Resource resource)` | `void` |
| `getResource(@Nonnull ResourceType resourceType)` | `Resource` |
| `__internal_getResource(@Nonnull ResourceType resourceType)` | `Resource` |
| `forEachChunk(@Nonnull BiConsumer consumer)` | `void` |
| `forEachChunk(@Nonnull BiPredicate predicate)` | `boolean` |
| `forEachChunk(Query query, @Nonnull BiConsumer consumer)` | `void` |
| `forEachChunk(Query query, @Nonnull BiPredicate predicate)` | `boolean` |
| `forEachChunk(int systemIndex, @Nonnull BiConsumer consumer)` | `void` |
| `forEachChunk(int systemIndex, @Nonnull BiPredicate predicate)` | `boolean` |
| `forEachEntityParallel(IntBiObjectConsumer consumer)` | `void` |
| `forEachEntityParallel(Query query, IntBiObjectConsumer consumer)` | `void` |
| `fetch(@Nonnull SystemType systemType, Object query, @Nonnull List results)` | `void` |
| `fetch(@Nonnull Collection refs, @Nonnull SystemType systemType, Object query, @Nonnull List results)` | `void` |
| `invoke(@Nonnull Ref ref, @Nonnull EcsEvent param)` | `void` |
| `invoke(@Nonnull EntityEventType systemType, @Nonnull Ref ref, @Nonnull EcsEvent param)` | `void` |
| `invoke(@Nonnull EcsEvent param)` | `void` |
| `invoke(@Nonnull WorldEventType systemType, @Nonnull EcsEvent param)` | `void` |
| `internal_invoke(CommandBuffer sourceCommandBuffer, Ref ref, EcsEvent param)` | `void` |
| `internal_invoke(CommandBuffer sourceCommandBuffer, @Nonnull EntityEventType systemType, Ref ref, EcsEvent param)` | `void` |
| `internal_invoke(CommandBuffer sourceCommandBuffer, EcsEvent param)` | `void` |
| `internal_invoke(CommandBuffer sourceCommandBuffer, @Nonnull WorldEventType systemType, EcsEvent param)` | `void` |
| `tick(float dt)` | `void` |
| `pausedTick(float dt)` | `void` |
| `tickInternal(float dt, SystemType tickingSystemType)` | `void` |
| `tick(ArchetypeTickingSystem system, float dt, int systemIndex)` | `void` |
| `updateData(@Nonnull ComponentRegistry.Data oldData, @Nonnull ComponentRegistry.Data data)` | `void` |
| `updateData(@Nonnull ComponentRegistry.Data oldData, @Nonnull ComponentRegistry.Data newData, DataChange dataChange)` | `void` |
| `updateData0(@Nonnull ComponentRegistry.Data oldData, @Nonnull ComponentRegistry.Data newData, DataChange dataChange)` | `void` |
| `updateArchetypeIndexes(@Nonnull ComponentRegistry.Data data)` | `void` |
| `assertWriteProcessing()` | `void` |
| `isProcessing()` | `boolean` |
| `assertThread()` | `void` |
| `isInThread()` | `boolean` |
| `isAliveInDifferentThread()` | `boolean` |
| `toString()` | `String` |
| `datachunk_addComponent(@Nonnull Ref ref, int fromArchetypeIndex, @Nonnull ComponentType componentType, @Nonnull Component component, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `findOrCreateArchetypeChunk(@Nonnull Archetype archetype)` | `int` |
| `removeArchetypeChunk(int archetypeIndex)` | `void` |
| `isHeld()` | `boolean` |
| `lock()` | `void` |
| `lockInterruptibly()` | `void` |
| `tryLock()` | `boolean` |
| `tryLock(long time, @Nonnull TimeUnit unit)` | `boolean` |
| `unlock()` | `void` |
| `newCondition()` | `Condition` |

