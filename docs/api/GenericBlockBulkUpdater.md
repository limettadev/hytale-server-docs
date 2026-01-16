# GenericBlockBulkUpdater

**Package:** `com.hypixel.hytale.server.core.universe.world`

**Type:** interface

## Static Fields

| Name | Type |
|------|------|
| `SAVE_INTERVAL` | `float` |
| `DEFAULT` | `String` |
| `METRICS_REGISTRY` | `ExecutorMetricsRegistry` |

## Fields

| Name | Type |
|------|------|
| `logger` | `HytaleLogger` |
| `name` | `String` |
| `savePath` | `Path` |
| `worldConfig` | `WorldConfig` |
| `chunkStore` | `ChunkStore` |
| `entityStore` | `EntityStore` |
| `chunkLighting` | `ChunkLightingManager` |
| `worldMapManager` | `WorldMapManager` |
| `worldPathConfig` | `WorldPathConfig` |
| `acceptingTasks` | `AtomicBoolean` |
| `taskQueue` | `Deque` |
| `alive` | `AtomicBoolean` |
| `eventRegistry` | `EventRegistry` |
| `notificationHandler` | `WorldNotificationHandler` |
| `isTicking` | `boolean` |
| `isPaused` | `boolean` |
| `tick` | `long` |
| `random` | `Random` |
| `entitySeed` | `AtomicInteger` |
| `players` | `Map` |
| `playerRefs` | `Collection` |
| `features` | `Map` |
| `gcHasRun` | `volatile boolean` |

## Static Methods

| Method | Returns |
|--------|--------|
| `setTimeDilation(float timeDilationModifier, @Nonnull ComponentAccessor componentAccessor)` | `void` |

## Methods

| Method | Returns |
|--------|--------|
| `World(@Nonnull String name, @Nonnull Path savePath, @Nonnull WorldConfig worldConfig)` | `public` |
| `init()` | `CompletableFuture` |
| `onStart()` | `void` |
| `stopIndividualWorld()` | `void` |
| `validateDeleteOnRemove()` | `void` |
| `isIdle()` | `boolean` |
| `tick(float dt)` | `void` |
| `onShutdown()` | `void` |
| `setTps(int tps)` | `void` |
| `getName()` | `String` |
| `isAlive()` | `boolean` |
| `getWorldConfig()` | `WorldConfig` |
| `getDeathConfig()` | `DeathConfig` |
| `getDaytimeDurationSeconds()` | `int` |
| `getNighttimeDurationSeconds()` | `int` |
| `isTicking()` | `boolean` |
| `setTicking(boolean ticking)` | `void` |
| `isPaused()` | `boolean` |
| `setPaused(boolean paused)` | `void` |
| `getTick()` | `long` |
| `getLogger()` | `HytaleLogger` |
| `isCompassUpdating()` | `boolean` |
| `setCompassUpdating(boolean compassUpdating)` | `void` |
| `getBlockBulkRelative(@Nonnull Long2ObjectMap blocks, @Nonnull IntUnaryOperator xConvert, @Nonnull IntUnaryOperator yConvert, @Nonnull IntUnaryOperator zConvert, @Nonnull GenericBlockBulkUpdater consumer)` | `void` |
| `loadChunkIfInMemory(long index)` | `WorldChunk` |
| `getChunkIfInMemory(long index)` | `WorldChunk` |
| `getChunkIfLoaded(long index)` | `WorldChunk` |
| `getChunkIfNonTicking(long index)` | `WorldChunk` |
| `getChunkAsync(long index)` | `CompletableFuture` |
| `getNonTickingChunkAsync(long index)` | `CompletableFuture` |
| `getPlayers()` | `List` |
| `getEntity(@Nonnull UUID uuid)` | `Entity` |
| `getEntityRef(@Nonnull UUID uuid)` | `Ref` |
| `getPlayerCount()` | `int` |
| `getPlayerRefs()` | `Collection` |
| `trackPlayerRef(@Nonnull PlayerRef playerRef)` | `void` |
| `untrackPlayerRef(@Nonnull PlayerRef playerRef)` | `void` |
| `spawnEntity(Entity entity, @Nonnull Vector3d position, Vector3f rotation)` | `Entity` |
| `addEntity(Entity entity, @Nonnull Vector3d position, @Nullable Vector3f rotation, @Nonnull AddReason reason)` | `Entity` |
| `sendMessage(@Nonnull Message message)` | `void` |
| `execute(@Nonnull Runnable command)` | `void` |
| `consumeTaskQueue()` | `void` |
| `getChunkStore()` | `ChunkStore` |
| `getEntityStore()` | `EntityStore` |
| `getChunkLighting()` | `ChunkLightingManager` |
| `getWorldMapManager()` | `WorldMapManager` |
| `getWorldPathConfig()` | `WorldPathConfig` |
| `getNotificationHandler()` | `WorldNotificationHandler` |
| `getEventRegistry()` | `EventRegistry` |
| `addPlayer(@Nonnull PlayerRef playerRef)` | `CompletableFuture` |
| `addPlayer(@Nonnull PlayerRef playerRef, @Nullable Transform transform)` | `CompletableFuture` |
| `addPlayer(@Nonnull PlayerRef playerRef, @Deprecated(forRemoval = true)` | `CompletableFuture` |
| `onFinishPlayerJoining(@Nonnull Player playerComponent, @Nonnull PlayerRef playerRefComponent, @Nonnull PacketHandler packetHandler, boolean broadcastJoin)` | `PlayerRef` |
| `onSetupPlayerJoining(@Nonnull Holder holder, @Nonnull Player playerComponent, @Nonnull PlayerRef playerRefComponent, @Nonnull PacketHandler packetHandler, @Nullable Transform transform, boolean clearWorld, boolean fadeInOut)` | `void` |
| `drainPlayersTo(@Nonnull World fallbackTargetWorld)` | `CompletableFuture` |
| `getGameplayConfig()` | `GameplayConfig` |
| `getFeatures()` | `Map` |
| `isFeatureEnabled(@Nonnull ClientFeature feature)` | `boolean` |
| `registerFeature(@Nonnull ClientFeature feature, boolean enabled)` | `void` |
| `broadcastFeatures()` | `void` |
| `getSavePath()` | `Path` |
| `updateEntitySeed(@Nonnull Store store)` | `void` |
| `markGCHasRun()` | `void` |
| `consumeGCHasRun()` | `boolean` |
| `hashCode()` | `int` |
| `equals(@Nullable Object o)` | `boolean` |
| `toString()` | `String` |
| `validate(@Nonnull StringBuilder errors, @Nonnull IPrefabBuffer.RawBlockConsumer blockValidator, @Nonnull EnumSet options)` | `void` |
| `getBlock(BlockSection blockSection, ChunkStore chunkStore, int x, int y, int z)` | `int` |
| `getFiller(BlockSection blockSection, ChunkStore chunkStore, int x, int y, int z)` | `int` |
| `getRotationIndex(BlockSection blockSection, ChunkStore chunkStore, int x, int y, int z)` | `int` |
| `apply(World var1, Object var2, long var3, WorldChunk var5, int var6, int var7, int var8, int var9, int var10, int var11)` | `void` |

