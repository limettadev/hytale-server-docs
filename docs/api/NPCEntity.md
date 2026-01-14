# NPCEntity

**Package:** `com.hypixel.hytale.server.npc.entities`

**Type:** class

**Extends:** `LivingEntity implements INonPlayerCharacter`

## Constructors

```java
public NPCEntity()
```

```java
public NPCEntity(@Nonnull World world)
```

## Static Fields

| Name | Type |
|------|------|
| `CODEC` | `BuilderCodec` |

## Fields

| Name | Type |
|------|------|
| `roleName` | `String` |
| `roleIndex` | `int` |
| `role` | `Role` |
| `spawnRoleIndex` | `int` |
| `spawnRoleName` | `String` |
| `spawnConfigurationName` | `String` |
| `environmentIndex` | `int` |
| `spawnConfigurationIndex` | `int` |
| `isSpawnTracked` | `boolean` |
| `isDespawning` | `boolean` |
| `isPlayingDespawnAnim` | `boolean` |
| `despawnRemainingSeconds` | `float` |
| `despawnCheckRemainingSeconds` | `float` |
| `despawnAnimationRemainingSeconds` | `float` |
| `cachedEntityHorizontalSpeedMultiplier` | `float` |
| `leashPoint` | `Vector3d` |
| `leashHeading` | `float` |
| `leashPitch` | `float` |
| `hasLeashPosition` | `boolean` |
| `hoverPhase` | `float` |
| `hoverHeight` | `double` |
| `initialModelScale` | `float` |
| `spawnInstant` | `Instant` |
| `pathManager` | `PathManager` |
| `damageData` | `DamageData` |
| `blackboardBlockTypeView` | `BlockTypeView` |
| `blackboardBlockTypeSets` | `IntList` |
| `blackboardBlockChangeView` | `BlockEventView` |
| `blackboardBlockChangeSets` | `Map` |
| `blackboardEntityEventView` | `EntityEventView` |
| `blackboardEntityEventSets` | `Map` |
| `alarmStore` | `AlarmStore` |
| `worldgenId` | `int` |
| `reservedBy` | `Set` |
| `oldPosition` | `Vector3d` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getComponentType()` | `ComponentType` |
| `setAppearance(@Nonnull Ref ref, @Nonnull String name, @Nonnull ComponentAccessor componentAccessor)` | `boolean` |

## Methods

| Method | Returns |
|--------|--------|
| `getAlarmStore()` | `AlarmStore` |
| `createDefaultInventory()` | `Inventory` |
| `Inventory((short)` | `return new` |
| `getRole()` | `Role` |
| `invalidateCachedHorizontalSpeedMultiplier()` | `void` |
| `storeTickStartPosition(@Nonnull Vector3d position)` | `void` |
| `tickDespawnAnimationRemainingSeconds(float dt)` | `boolean` |
| `setDespawnAnimationRemainingSeconds(float seconds)` | `void` |
| `tickDespawnRemainingSeconds(float dt)` | `boolean` |
| `setDespawnRemainingSeconds(float seconds)` | `void` |
| `setDespawning(boolean despawning)` | `void` |
| `setPlayingDespawnAnim(boolean playingDespawnAnim)` | `void` |
| `tickDespawnCheckRemainingSeconds(float dt)` | `boolean` |
| `setDespawnCheckRemainingSeconds(float seconds)` | `void` |
| `setInitialModelScale(float scale)` | `void` |
| `getOldPosition()` | `Vector3d` |
| `playAnimation(@Nonnull Ref ref, @Nonnull AnimationSlot animationSlot, @Nullable String animationId, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `clearDamageData()` | `void` |
| `setToDespawn()` | `void` |
| `setDespawnTime(float time)` | `void` |
| `getDespawnTime()` | `double` |
| `canBreathe(@Nonnull Ref ref, @Nonnull BlockMaterial breathingMaterial, int fluidId, @Nonnull ComponentAccessor componentAccessor)` | `boolean` |
| `getDamageData()` | `DamageData` |
| `getCanCauseDamage(@Nonnull Ref attackerRef, @Nonnull ComponentAccessor componentAccessor)` | `boolean` |
| `onFlockSetState(@Nonnull Ref ref, @Nonnull String state, @Nullable String subState, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `onFlockSetTarget(@Nonnull String targetSlot, @Nonnull Ref target)` | `void` |
| `saveLeashInformation(@Nonnull Vector3d position, @Nonnull Vector3f rotation)` | `void` |
| `saveLeashBlockType()` | `void` |
| `requiresLeashPosition()` | `boolean` |
| `getLeashPoint()` | `Vector3d` |
| `setLeashPoint(@Nonnull Vector3d leashPoint)` | `void` |
| `getLeashHeading()` | `float` |
| `setLeashHeading(float leashHeading)` | `void` |
| `getLeashPitch()` | `float` |
| `setLeashPitch(float leashPitch)` | `void` |
| `getHoverPhase()` | `float` |
| `setHoverPhase(float hoverPhase)` | `void` |
| `getHoverHeight()` | `double` |
| `setHoverHeight(double hoverHeight)` | `void` |
| `getRoleName()` | `String` |
| `setRoleName(String roleName)` | `void` |
| `getRoleIndex()` | `int` |
| `setRoleIndex(int roleIndex)` | `void` |
| `setRole(Role role)` | `void` |
| `getSpawnRoleIndex()` | `int` |
| `setSpawnRoleIndex(int spawnRoleIndex)` | `void` |
| `getBlockTypeBlackboardView(@Nonnull Ref ref, @Nonnull Store store)` | `BlockTypeView` |
| `removeBlockTypeBlackboardView()` | `BlockTypeView` |
| `initBlockTypeBlackboardView(@Nonnull Ref ref, ComponentAccessor componentAccessor)` | `void` |
| `initBlockChangeBlackboardView(@Nonnull Ref ref, ComponentAccessor componentAccessor)` | `void` |
| `addBlackboardBlockTypeSets(IntList blackboardBlockSets)` | `void` |
| `getBlackboardBlockTypeSets()` | `IntList` |
| `addBlackboardBlockChangeSets(@Nonnull BlockEventType type, @Nonnull IntSet sets)` | `void` |
| `getBlackboardBlockChangeSet(BlockEventType type)` | `IntSet` |
| `getBlackboardBlockChangeSets()` | `Map` |
| `notifyBlockChange(@Nonnull BlockEventType type, @Nonnull EventNotification notification)` | `void` |
| `addBlackboardEntityEventSets(@Nonnull EntityEventType type, @Nonnull IntSet sets)` | `void` |
| `getBlackboardEntityEventSet(@Nonnull EntityEventType type)` | `IntSet` |
| `getBlackboardEntityEventSets()` | `Map` |
| `notifyEntityEvent(@Nonnull EntityEventType type, @Nonnull EntityEventNotification notification)` | `void` |
| `setEnvironment(int env)` | `void` |
| `getEnvironment()` | `int` |
| `getSpawnConfiguration()` | `int` |
| `setSpawnConfiguration(int spawnConfigurationIndex)` | `void` |
| `updateSpawnTrackingState(boolean newState)` | `boolean` |
| `isDespawning()` | `boolean` |
| `isPlayingDespawnAnim()` | `boolean` |
| `getRoleDebugFlags()` | `EnumSet` |
| `setRoleDebugFlags(@Nonnull EnumSet flags)` | `void` |
| `setSpawnInstant(@Nonnull Instant spawned)` | `void` |
| `getSpawnInstant()` | `Instant` |
| `setInventorySize(int hotbarCapacity, int inventoryCapacity, int offHandCapacity)` | `void` |
| `getLegacyWorldgenId()` | `int` |
| `getPathManager()` | `PathManager` |
| `setAppearance(@Nonnull Ref ref, @Nonnull ModelAsset modelAsset, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `getCurrentHorizontalSpeedMultiplier(@Nullable Ref ref, @Nullable ComponentAccessor componentAccessor)` | `float` |
| `toString()` | `String` |
| `getNPCTypeId()` | `String` |
| `getNPCTypeIndex()` | `int` |
| `addReservation(@Nonnull UUID playerUUID)` | `void` |
| `removeReservation(@Nonnull UUID playerUUID)` | `void` |
| `isReserved()` | `boolean` |
| `isReservedBy(@Nonnull UUID playerUUID)` | `boolean` |

