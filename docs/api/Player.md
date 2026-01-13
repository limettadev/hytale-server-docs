# Player

**Package:** `com.hypixel.hytale.server.core.entity.entities`

**Type:** class

**Extends:** `LivingEntity implements CommandSender, PermissionHolder, MetricProvider`

## Static Fields

| Name | Type |
|------|------|
| `METRICS_REGISTRY` | `MetricsRegistry` |
| `PLAYER_CONFIG_DATA` | `KeyedCodec` |
| `CODEC` | `BuilderCodec` |
| `DEFAULT_VIEW_RADIUS_CHUNKS` | `int` |
| `RESPAWN_INVULNERABILITY_TIME_NANOS` | `long` |
| `MAX_TELEPORT_INVULNERABILITY_MILLIS` | `long` |
| `MAX_VELOCITY_SAMPLE_COUNT` | `int` |
| `VELOCITY_SAMPLE_LENGTH` | `int` |
| `velocitySampleWeights` | `double[][]` |

## Fields

| Name | Type |
|------|------|
| `playerRef` | `PlayerRef` |
| `data` | `PlayerConfigData` |
| `worldMapTracker` | `WorldMapTracker` |
| `windowManager` | `WindowManager` |
| `pageManager` | `PageManager` |
| `hudManager` | `HudManager` |
| `hotbarManager` | `HotbarManager` |
| `gameMode` | `GameMode` |
| `clientViewRadius` | `int` |
| `lastSpawnTimeNanos` | `long` |
| `velocitySamples` | `double[]` |
| `velocitySampleCount` | `int` |
| `velocitySampleIndex` | `int` |
| `overrideBlockPlacementRestrictions` | `boolean` |
| `readyId` | `AtomicInteger` |
| `waitingForClientReady` | `AtomicReference` |
| `executeTriggers` | `boolean` |
| `executeBlockDamage` | `boolean` |
| `firstSpawn` | `boolean` |
| `mountEntityId` | `int` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getComponentType()` | `ComponentType` |
| `getRespawnPosition(@Nonnull Ref ref, @Nonnull String worldName, @Nonnull ComponentAccessor componentAccessor)` | `Transform` |
| `ensureNoCollisionAtRespawnPosition(PlayerRespawnPointData playerRespawnPointData, Box playerHitbox, World world)` | `Pair` |
| `setGameMode(@Nonnull Ref playerRef, @Nonnull GameMode gameMode, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `initGameMode(@Nonnull Ref playerRef, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `setGameModeInternal(@Nonnull Ref playerRef, @Nonnull GameMode gameMode, @Nonnull MovementManager movementManager, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `runOnSwitchToGameMode(@Nonnull Ref ref, @Nonnull GameMode gameMode)` | `void` |

## Methods

| Method | Returns |
|--------|--------|
| `copyFrom(@Nonnull Player oldPlayerComponent)` | `void` |
| `init(@Nonnull UUID uuid, @Nonnull PlayerRef playerRef)` | `void` |
| `setNetworkId(int id)` | `void` |
| `createDefaultInventory()` | `Inventory` |
| `Inventory()` | `return new` |
| `setInventory(Inventory inventory)` | `Inventory` |
| `remove()` | `boolean` |
| `moveTo(@Nonnull Ref ref, double locX, double locY, double locZ, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `getPlayerConfigData()` | `PlayerConfigData` |
| `markNeedsSave()` | `void` |
| `unloadFromWorld()` | `void` |
| `applyMovementStates(@Nonnull Ref ref, @Nonnull SavedMovementStates savedMovementStates, @Nonnull MovementStates movementStates, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `startClientReadyTimeout()` | `void` |
| `handleClientReady(boolean forced)` | `void` |
| `sendInventory()` | `void` |
| `saveConfig(@Nonnull World world, @Nonnull Holder holder)` | `CompletableFuture` |
| `getPlayerConnection()` | `PacketHandler` |
| `getWorldMapTracker()` | `WorldMapTracker` |
| `getWindowManager()` | `WindowManager` |
| `getPageManager()` | `PageManager` |
| `getHudManager()` | `HudManager` |
| `getHotbarManager()` | `HotbarManager` |
| `isFirstSpawn()` | `boolean` |
| `setFirstSpawn(boolean firstSpawn)` | `void` |
| `resetManagers(@Nonnull Holder holder)` | `void` |
| `notifyPickupItem(@Nonnull Ref ref, @Nonnull ItemStack itemStack, @Nullable Vector3d position, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `isOverrideBlockPlacementRestrictions()` | `boolean` |
| `setOverrideBlockPlacementRestrictions(@Nonnull Ref ref, boolean overrideBlockPlacementRestrictions, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `sendMessage(@Nonnull Message message)` | `void` |
| `hasPermission(@Nonnull String id)` | `boolean` |
| `hasPermission(@Nonnull String id, boolean def)` | `boolean` |
| `addLocationChange(@Nonnull Ref ref, double deltaX, double deltaY, double deltaZ, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `configTriggerBlockProcessing(boolean triggers, boolean blockDamage, @Nonnull CollisionResultComponent collisionResultComponent)` | `void` |
| `resetVelocity(@Nonnull Velocity velocity)` | `void` |
| `processVelocitySample(double dt, @Nonnull Vector3d position, @Nonnull Velocity velocity)` | `void` |
| `Transform(((PlayerRespawnPointData)` | `return new` |
| `Transform((Vector3d)` | `return new` |
| `hasSpawnProtection()` | `boolean` |
| `isWaitingForClientReady()` | `boolean` |
| `isHiddenFromLivingEntity(@Nonnull Ref ref, @Nonnull Ref targetRef, @Nonnull ComponentAccessor componentAccessor)` | `boolean` |
| `setClientViewRadius(int clientViewRadius)` | `void` |
| `getClientViewRadius()` | `int` |
| `getViewRadius()` | `int` |
| `canDecreaseItemStackDurability(@Nonnull Ref ref, @Nonnull ComponentAccessor componentAccessor)` | `boolean` |
| `canApplyItemStackPenalties(@Nonnull Ref ref, @Nonnull ComponentAccessor componentAccessor)` | `boolean` |
| `updateItemStackDurability(@Nonnull Ref ref, @Nonnull ItemStack itemStack, ItemContainer container, int slotId, double durabilityChange, @Nonnull ComponentAccessor componentAccessor)` | `ItemStackSlotTransaction` |
| `toMetricResults()` | `MetricResults` |
| `setLastSpawnTimeNanos(long lastSpawnTimeNanos)` | `void` |
| `getSinceLastSpawnNanos()` | `long` |
| `getPlayerRef()` | `PlayerRef` |
| `getMountEntityId()` | `int` |
| `setMountEntityId(int mountEntityId)` | `void` |
| `getGameMode()` | `GameMode` |
| `hashCode()` | `int` |
| `equals(@Nullable Object o)` | `boolean` |
| `toString()` | `String` |
| `getDisplayName()` | `String` |

