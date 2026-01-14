# WorldConfig

**Package:** `com.hypixel.hytale.server.core.universe.world`

**Type:** class

## Constructors

```java
public WorldConfig()
```

```java
private WorldConfig(Void dummy)
```

## Static Fields

| Name | Type |
|------|------|
| `VERSION` | `int` |
| `INITIAL_GAME_DAY_START_HOUR` | `int` |
| `INITIAL_GAME_DAY_START_MINS` | `int` |
| `PLUGIN_CODEC` | `MapKeyMapCodec` |
| `CODEC` | `BuilderCodec` |
| `CODEC` | `BuilderCodec` |
| `DEFAULT_PREGENERATE_REGION` | `Box2D` |

## Fields

| Name | Type |
|------|------|
| `hasChanged` | `transient AtomicBoolean` |
| `uuid` | `UUID` |
| `displayName` | `String` |
| `seed` | `long` |
| `spawnProvider` | `ISpawnProvider` |
| `worldGenProvider` | `IWorldGenProvider` |
| `worldMapProvider` | `IWorldMapProvider` |
| `chunkStorageProvider` | `IChunkStorageProvider` |
| `chunkConfig` | `ChunkConfig` |
| `isTicking` | `boolean` |
| `isBlockTicking` | `boolean` |
| `isPvpEnabled` | `boolean` |
| `isFallDamageEnabled` | `boolean` |
| `isGameTimePaused` | `boolean` |
| `gameTime` | `Instant` |
| `forcedWeather` | `String` |
| `clientEffects` | `ClientEffectWorldSettings` |
| `requiredPlugins` | `Map` |
| `gameMode` | `GameMode` |
| `isSpawningNPC` | `boolean` |
| `isSpawnMarkersEnabled` | `boolean` |
| `isAllNPCFrozen` | `boolean` |
| `gameplayConfig` | `String` |
| `deathConfigOverride` | `DeathConfig` |
| `daytimeDurationSecondsOverride` | `Integer` |
| `nighttimeDurationSecondsOverride` | `Integer` |
| `isCompassUpdating` | `boolean` |
| `isSavingPlayers` | `boolean` |
| `canSaveChunks` | `boolean` |
| `saveNewChunks` | `boolean` |
| `canUnloadChunks` | `boolean` |
| `isObjectiveMarkersEnabled` | `boolean` |
| `deleteOnUniverseStart` | `boolean` |
| `deleteOnRemove` | `boolean` |
| `resourceStorageProvider` | `IResourceStorageProvider` |
| `defaultSpawnProvider` | `transient ISpawnProvider` |
| `isSavingConfig` | `transient boolean` |
| `pregenerateRegion` | `Box2D` |
| `keepLoadedRegion` | `Box2D` |

## Static Methods

| Method | Returns |
|--------|--------|
| `formatDisplayName(@Nonnull String name)` | `String` |
| `load(@Nonnull Path path)` | `CompletableFuture` |
| `save(@Nonnull Path path, WorldConfig worldConfig)` | `CompletableFuture` |

## Methods

| Method | Returns |
|--------|--------|
| `getUuid()` | `UUID` |
| `setUuid(UUID uuid)` | `void` |
| `isDeleteOnUniverseStart()` | `boolean` |
| `setDeleteOnUniverseStart(boolean deleteOnUniverseStart)` | `void` |
| `isDeleteOnRemove()` | `boolean` |
| `setDeleteOnRemove(boolean deleteOnRemove)` | `void` |
| `isSavingConfig()` | `boolean` |
| `setSavingConfig(boolean savingConfig)` | `void` |
| `getDisplayName()` | `String` |
| `setDisplayName(String name)` | `void` |
| `getSeed()` | `long` |
| `setSeed(long seed)` | `void` |
| `getSpawnProvider()` | `ISpawnProvider` |
| `setSpawnProvider(ISpawnProvider spawnProvider)` | `void` |
| `setDefaultSpawnProvider(@Nonnull IWorldGen generator)` | `void` |
| `getWorldGenProvider()` | `IWorldGenProvider` |
| `setWorldGenProvider(IWorldGenProvider worldGenProvider)` | `void` |
| `getWorldMapProvider()` | `IWorldMapProvider` |
| `setWorldMapProvider(IWorldMapProvider worldMapProvider)` | `void` |
| `getChunkStorageProvider()` | `IChunkStorageProvider` |
| `setChunkStorageProvider(IChunkStorageProvider chunkStorageProvider)` | `void` |
| `getChunkConfig()` | `ChunkConfig` |
| `setChunkConfig(@Nonnull ChunkConfig chunkConfig)` | `void` |
| `isTicking()` | `boolean` |
| `setTicking(boolean ticking)` | `void` |
| `isBlockTicking()` | `boolean` |
| `setBlockTicking(boolean ticking)` | `void` |
| `isPvpEnabled()` | `boolean` |
| `isFallDamageEnabled()` | `boolean` |
| `setPvpEnabled(boolean pvpEnabled)` | `void` |
| `isGameTimePaused()` | `boolean` |
| `setGameTimePaused(boolean gameTimePaused)` | `void` |
| `getGameTime()` | `Instant` |
| `setGameTime(Instant gameTime)` | `void` |
| `getForcedWeather()` | `String` |
| `setForcedWeather(String forcedWeather)` | `void` |
| `setClientEffects(ClientEffectWorldSettings clientEffects)` | `void` |
| `getClientEffects()` | `ClientEffectWorldSettings` |
| `getRequiredPlugins()` | `Map` |
| `setRequiredPlugins(Map requiredPlugins)` | `void` |
| `getGameMode()` | `GameMode` |
| `setGameMode(GameMode gameMode)` | `void` |
| `isSpawningNPC()` | `boolean` |
| `setSpawningNPC(boolean spawningNPC)` | `void` |
| `isSpawnMarkersEnabled()` | `boolean` |
| `setIsSpawnMarkersEnabled(boolean spawnMarkersEnabled)` | `void` |
| `isAllNPCFrozen()` | `boolean` |
| `setIsAllNPCFrozen(boolean allNPCFrozen)` | `void` |
| `getGameplayConfig()` | `String` |
| `setGameplayConfig(String gameplayConfig)` | `void` |
| `getDeathConfigOverride()` | `DeathConfig` |
| `getDaytimeDurationSecondsOverride()` | `Integer` |
| `getNighttimeDurationSecondsOverride()` | `Integer` |
| `isCompassUpdating()` | `boolean` |
| `setCompassUpdating(boolean compassUpdating)` | `void` |
| `isSavingPlayers()` | `boolean` |
| `setSavingPlayers(boolean savingPlayers)` | `void` |
| `canUnloadChunks()` | `boolean` |
| `setCanUnloadChunks(boolean unloadingChunks)` | `void` |
| `canSaveChunks()` | `boolean` |
| `setCanSaveChunks(boolean savingChunks)` | `void` |
| `shouldSaveNewChunks()` | `boolean` |
| `setSaveNewChunks(boolean saveNewChunks)` | `void` |
| `isObjectiveMarkersEnabled()` | `boolean` |
| `setObjectiveMarkersEnabled(boolean objectiveMarkersEnabled)` | `void` |
| `getResourceStorageProvider()` | `IResourceStorageProvider` |
| `setResourceStorageProvider(@Nonnull IResourceStorageProvider resourceStorageProvider)` | `void` |
| `markChanged()` | `void` |
| `consumeHasChanged()` | `boolean` |
| `getPregenerateRegion()` | `Box2D` |
| `setPregenerateRegion(@Nullable Box2D pregenerateRegion)` | `void` |
| `getKeepLoadedRegion()` | `Box2D` |
| `setKeepLoadedRegion(@Nullable Box2D keepLoadedRegion)` | `void` |

