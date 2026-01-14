# NPCPlugin

**Package:** `com.hypixel.hytale.server.npc`

**Type:** class

**Extends:** `JavaPlugin`

## Constructors

```java
public NPCPlugin(@Nonnull JavaPluginInit init)
```

## Static Fields

| Name | Type |
|------|------|
| `FACTORY_CLASS_ROLE` | `String` |
| `FACTORY_CLASS_BODY_MOTION` | `String` |
| `FACTORY_CLASS_HEAD_MOTION` | `String` |
| `FACTORY_CLASS_ACTION` | `String` |
| `FACTORY_CLASS_SENSOR` | `String` |
| `FACTORY_CLASS_INSTRUCTION` | `String` |
| `FACTORY_CLASS_TRANSIENT_PATH` | `String` |
| `FACTORY_CLASS_ACTION_LIST` | `String` |
| `ROLE_ASSETS_PATH` | `String` |
| `instance` | `NPCPlugin` |
| `NULL_ROTATION` | `Vector3f` |
| `PRIORITY_LOAD_NPC` | `short` |
| `PRIORITY_SPAWN_VALIDATION` | `short` |
| `CODEC` | `BuilderCodec` |

## Fields

| Name | Type |
|------|------|
| `builderDescriptors` | `List` |
| `builderManager` | `BuilderManager` |
| `validateBuilder` | `boolean` |
| `maxBlackboardBlockCountPerType` | `int` |
| `logFailingTestErrors` | `boolean` |
| `presetCoverageTestNPCs` | `String[]` |
| `pathChangeRevision` | `AtomicInteger` |
| `benchmarkLock` | `Lock` |
| `roleTickDistribution` | `Int2ObjectMap` |
| `roleSensorSupportDistribution` | `Int2ObjectMap` |
| `roleTickDistributionAll` | `TimeDistributionRecorder` |
| `roleSensorSupportDistributionAll` | `SensorSupportBenchmark` |
| `autoReload` | `boolean` |
| `attitudeMap` | `AttitudeMap` |
| `itemAttitudeMap` | `ItemAttitudeMap` |
| `config` | `Config` |
| `blackboardResourceType` | `ResourceType` |
| `combatDataPoolResourceType` | `ResourceType` |
| `roleChangeQueueResourceType` | `ResourceType` |
| `newSpawnStartTickingQueueResourceType` | `ResourceType` |
| `sortBufferProviderResourceResourceType` | `ResourceType` |
| `aStarNodePoolProviderSimpleResourceType` | `ResourceType` |
| `npcSpatialResource` | `ResourceType` |
| `combatDataComponentType` | `ComponentType` |
| `npcTestDataComponentType` | `ComponentType` |
| `beaconSupportComponentType` | `ComponentType` |
| `npcBlockEventSupportComponentType` | `ComponentType` |
| `playerBlockEventSupportComponentType` | `ComponentType` |
| `npcEntityEventSupportComponentType` | `ComponentType` |
| `playerEntityEventSupportComponentType` | `ComponentType` |
| `stepComponentType` | `ComponentType` |
| `failedSpawnComponentType` | `ComponentType` |
| `timersComponentType` | `ComponentType` |
| `stateEvaluatorComponentType` | `ComponentType` |
| `valueStoreComponentType` | `ComponentType` |
| `generateDescriptors` | `boolean` |
| `generateDescriptorsFile` | `boolean` |
| `autoReload` | `boolean` |
| `validateBuilder` | `boolean` |
| `maxBlackboardBlockType` | `int` |
| `logFailingTestErrors` | `boolean` |
| `presetCoverageTestNPCs` | `String[]` |

## Static Methods

| Method | Returns |
|--------|--------|
| `get()` | `NPCPlugin` |
| `reloadNPCsWithRole(int roleIndex)` | `void` |
| `buildRole(@Nonnull Builder roleBuilder, @Nonnull BuilderInfo builderInfo, @Nonnull BuilderSupport builderSupport, int roleIndex)` | `Role` |
| `onBalanceAssetsChanged(@Nonnull LoadedAssetsEvent event)` | `void` |
| `onBalanceAssetsRemoved(@Nonnull RemovedAssetsEvent event)` | `void` |

## Methods

| Method | Returns |
|--------|--------|
| `setup()` | `void` |
| `onSchemaGenerate(@Nonnull GenerateSchemaEvent event)` | `void` |
| `start()` | `void` |
| `getBlackboardResourceType()` | `ResourceType` |
| `getCombatDataPoolResourceType()` | `ResourceType` |
| `getRoleChangeQueueResourceType()` | `ResourceType` |
| `getNewSpawnStartTickingQueueResourceType()` | `ResourceType` |
| `getSortBufferProviderResourceResourceType()` | `ResourceType` |
| `getAStarNodePoolProviderSimpleResourceType()` | `ResourceType` |
| `getNpcSpatialResource()` | `ResourceType` |
| `getCombatDataComponentType()` | `ComponentType` |
| `getNpcTestDataComponentType()` | `ComponentType` |
| `getBeaconSupportComponentType()` | `ComponentType` |
| `getNpcBlockEventSupportComponentType()` | `ComponentType` |
| `getPlayerBlockEventSupportComponentType()` | `ComponentType` |
| `getNpcEntityEventSupportComponentType()` | `ComponentType` |
| `getPlayerEntityEventSupportComponentType()` | `ComponentType` |
| `getStepComponentType()` | `ComponentType` |
| `getFailedSpawnComponentType()` | `ComponentType` |
| `getTimersComponentType()` | `ComponentType` |
| `getStateEvaluatorComponentType()` | `ComponentType` |
| `getValueStoreComponentType()` | `ComponentType` |
| `setupNPCLoading()` | `void` |
| `getPresetCoverageTestNPCs()` | `String[]` |
| `spawnNPC(@Nonnull Store store, @Nonnull String npcType, @Nullable String groupType, @Nonnull Vector3d position, @Nonnull Vector3f rotation)` | `Pair` |
| `onNPCGroupsLoaded(LoadedAssetsEvent event)` | `void` |
| `onNPCGroupsRemoved(RemovedAssetsEvent event)` | `void` |
| `onAttitudeGroupsLoaded(@Nonnull LoadedAssetsEvent event)` | `void` |
| `onAttitudeGroupsRemoved(RemovedAssetsEvent event)` | `void` |
| `onItemAttitudeGroupsLoaded(@Nonnull LoadedAssetsEvent event)` | `void` |
| `onItemAttitudeGroupsRemoved(RemovedAssetsEvent event)` | `void` |
| `putItemAttitudeGroups()` | `void` |
| `onPathChange(WorldPathChangedEvent event)` | `void` |
| `getPathChangeRevision()` | `int` |
| `onNPCsLoaded(AllNPCsLoadedEvent event)` | `void` |
| `putNPCGroups()` | `void` |
| `putAttitudeGroups()` | `void` |
| `getName(int builderIndex)` | `String` |
| `getIndex(String builderName)` | `int` |
| `tryGetCachedValidRole(int roleIndex)` | `Builder` |
| `getBuilderInfo(Builder builder)` | `BuilderInfo` |
| `getRoleTemplateNames(boolean spawnableOnly)` | `List` |
| `hasRoleName(String roleName)` | `boolean` |
| `validateSpawnableRole(String roleName)` | `void` |
| `getRoleBuilderInfo(int roleIndex)` | `BuilderInfo` |
| `setBuilderInvalid(int builderIndex)` | `void` |
| `getAttitudeMap()` | `AttitudeMap` |
| `getItemAttitudeMap()` | `ItemAttitudeMap` |
| `testAndValidateRole(@Nullable BuilderInfo builderInfo)` | `boolean` |
| `forceValidation(int builderIndex)` | `void` |
| `spawnEntity(@Nonnull Store store, int roleIndex, @Nonnull Vector3d position, Vector3f rotation, Model spawnModel, TriConsumer postSpawn)` | `Pair` |
| `spawnEntity(@Nonnull Store store, int roleIndex, @Nonnull Vector3d position, @Nullable Vector3f rotation, @Nullable Model spawnModel, @Nullable TriConsumer preAddToWorld, @Nullable TriConsumer postSpawn)` | `Pair` |
| `prepareRoleBuilderInfo(int roleIndex)` | `BuilderInfo` |
| `onModelsChanged(@Nonnull LoadedAssetsEvent event)` | `void` |
| `generateDescriptors()` | `void` |
| `saveDescriptors()` | `void` |
| `getBuilderManager()` | `BuilderManager` |
| `getMaxBlackboardBlockCountPerType()` | `int` |
| `isLogFailingTestErrors()` | `boolean` |
| `startRoleBenchmark(double seconds, @Nonnull Consumer onFinished)` | `boolean` |
| `collectRoleTick(int roleIndex, long nanos)` | `void` |
| `isBenchmarkingRole()` | `boolean` |
| `startSensorSupportBenchmark(double seconds, @Nonnull Consumer onFinished)` | `boolean` |
| `isBenchmarkingSensorSupport()` | `boolean` |
| `isBenchmarking()` | `boolean` |
| `collectSensorSupportPlayerList(int roleIndex, long getNanos, double maxPlayerDistanceSorted, double maxPlayerDistance, double maxPlayerDistanceAvoidance, int numPlayers)` | `void` |
| `collectSensorSupportEntityList(int roleIndex, long getNanos, double maxEntityDistanceSorted, double maxEntityDistance, double maxEntityDistanceAvoidance, int numEntities)` | `void` |
| `collectSensorSupportLosTest(int roleIndex, boolean cacheHit, long time)` | `void` |
| `collectSensorSupportInverseLosTest(int roleIndex, boolean cacheHit)` | `void` |
| `collectSensorSupportFriendlyBlockingTest(int roleIndex, boolean cacheHit)` | `void` |
| `collectSensorSupportTickDone(int roleIndex)` | `void` |
| `registerCoreComponentType(String name, @Nonnull Supplier builder)` | `NPCPlugin` |
| `setRoleBuilderNeedsReload(Builder builder)` | `void` |
| `registerCoreFactories()` | `void` |
| `isGenerateDescriptors()` | `boolean` |
| `isGenerateDescriptorsFile()` | `boolean` |
| `isAutoReload()` | `boolean` |
| `isValidateBuilder()` | `boolean` |
| `getMaxBlackboardBlockType()` | `int` |
| `NPCEntityRegenerateStatsSystem()` | `public` |

