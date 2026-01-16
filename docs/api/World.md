# World

**Package:** `com.hypixel.hytale.server.core.universe.world`

**Type:** class

**Extends:** `TickingThread`

**Implements:** `Executor`, `ExecutorMetricsRegistry.ExecutorMetric`, `ChunkAccessor`, `IWorldChunks`, `IMessageReceiver`

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
| `taskQueue` | `Deque` |
| `alive` | `AtomicBoolean` |
| `eventRegistry` | `EventRegistry` |
| `isTicking` | `boolean` |
| `isPaused` | `boolean` |
| `tick` | `long` |

## Methods

| Method | Returns |
|--------|--------|
| `init()` | `CompletableFuture` |
| `stopIndividualWorld()` | `void` |
| `getName()` | `String` |
| `isAlive()` | `boolean` |
| `getWorldConfig()` | `WorldConfig` |
| `getDeathConfig()` | `DeathConfig` |
| `isTicking()` | `boolean` |
| `setTicking(boolean ticking)` | `void` |
| `isPaused()` | `boolean` |
| `setPaused(boolean paused)` | `void` |
| `getTick()` | `long` |
| `getLogger()` | `HytaleLogger` |
| `setTps(int tps)` | `void` |
| `execute(@Nonnull Runnable command)` | `void` |
| `consumeTaskQueue()` | `void` |
| `getChunkStore()` | `ChunkStore` |
| `getEntityStore()` | `EntityStore` |
| `getChunkLighting()` | `ChunkLightingManager` |
| `getWorldMapManager()` | `WorldMapManager` |
| `getWorldPathConfig()` | `WorldPathConfig` |
| `getNotificationHandler()` | `WorldNotificationHandler` |
| `getEventRegistry()` | `EventRegistry` |
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
| `addPlayer(@Nonnull PlayerRef playerRef)` | `CompletableFuture` |
| `addPlayer(@Nonnull PlayerRef playerRef, @Nullable Transform transform)` | `CompletableFuture` |
| `drainPlayersTo(@Nonnull World fallbackTargetWorld)` | `CompletableFuture` |
| `getGameplayConfig()` | `GameplayConfig` |
| `getFeatures()` | `Map` |
| `loadChunkIfInMemory(long index)` | `WorldChunk` |
| `getChunkIfInMemory(long index)` | `WorldChunk` |
| `getChunkIfLoaded(long index)` | `WorldChunk` |
| `getChunkIfNonTicking(long index)` | `WorldChunk` |
| `getChunkAsync(long index)` | `CompletableFuture` |
| `getNonTickingChunkAsync(long index)` | `CompletableFuture` |

