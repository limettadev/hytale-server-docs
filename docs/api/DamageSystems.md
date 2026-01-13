# DamageSystems

**Package:** `com.hypixel.hytale.server.core.modules.entity.damage`

**Type:** class

## Static Fields

| Name | Type |
|------|------|
| `DEFAULT_DAMAGE_DELAY` | `float` |
| `NPCS_QUERY` | `Query` |
| `CAUSE_DESYNC` | `boolean` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `PLAYER_SPATIAL_RESOURCE_TYPE` | `ResourceType` |
| `TRANSFORM_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `TRANSFORM_COMPONENT_TYPE` | `ComponentType` |
| `PLAYER_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `DAMAGE_DATA_COMPONENT_TYPE` | `ComponentType` |
| `TIME_RESOURCE_TYPE` | `ResourceType` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `DEPENDENCIES` | `Set` |
| `DAMAGE_AMOUNT_DROWNING` | `float` |
| `DAMAGE_AMOUNT_SUFFOCATION` | `float` |
| `MODEL_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `TRANSFORM_COMPONENT_TYPE` | `ComponentType` |
| `MIN_DAMAGE` | `double` |
| `QUERY` | `Query` |
| `DEPENDENCIES` | `Set` |
| `MIN_DAMAGE` | `double` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `TRANSFORM_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `EVENT_ON_HIT_TAG_INDEX` | `int` |
| `EVENT_ON_KILL_TAG_INDEX` | `int` |
| `ON_HIT` | `ReticleEvent` |
| `ON_KILL` | `ReticleEvent` |
| `TRANSFORM_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `TRANSFORM_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `TRANSFORM_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `PLAYER_KNOCKBACK_SCALE` | `float` |
| `QUERY` | `Query` |

## Fields

| Name | Type |
|------|------|
| `visibleComponentType` | `ComponentType` |
| `uiComponentListComponentType` | `ComponentType` |
| `query` | `Query` |
| `flatModifier` | `int` |
| `multiplierModifier` | `float` |
| `inheritedParentId` | `DamageCause` |

## Static Methods

| Method | Returns |
|--------|--------|
| `executeDamage(@Nonnull Ref ref, @Nonnull ComponentAccessor componentAccessor, @Nonnull Damage damage)` | `void` |
| `executeDamage(int index, @Nonnull ArchetypeChunk chunk, @Nonnull CommandBuffer commandBuffer, @Nonnull Damage damage)` | `void` |
| `executeDamage(@Nonnull Ref ref, @Nonnull CommandBuffer commandBuffer, @Nonnull Damage damage)` | `void` |
| `queueUpdateFor(@Nonnull Ref ref, float damageAmount, @Nullable Float hitAngleDeg, @Nonnull EntityTrackerSystems.EntityViewer viewer)` | `void` |
| `getResistanceModifiers(@Nonnull World world, @Nonnull ItemContainer inventory, boolean canApplyItemStackPenalties, @Nullable EffectControllerComponent effectControllerComponent)` | `Map` |
| `calculateResistanceEntryModifications(@Nonnull Map.Entry entry, @Nonnull World world, @Nonnull Map result, boolean canApplyItemStackPenalties, boolean itemStackIsBroken, double flatResistance)` | `void` |
| `addResistanceModifiersFromEntityEffects(Map resistanceModifiers, EffectControllerComponent effectControllerComponent)` | `void` |

## Methods

| Method | Returns |
|--------|--------|
| `getGroup()` | `SystemGroup` |
| `getQuery()` | `Query` |
| `handle(int index, @Nonnull ArchetypeChunk archetypeChunk, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer, @Nonnull Damage damage)` | `void` |
| `handle(int index, @NonNullDecl ArchetypeChunk archetypeChunk, @NonNullDecl Store store, @NonNullDecl CommandBuffer commandBuffer, @NonNullDecl Damage event)` | `void` |
| `handleInternal(int index, @Nonnull ArchetypeChunk archetypeChunk, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer, @Nonnull Damage damage)` | `void` |
| `getDependencies()` | `Set` |
| `CanBreathe()` | `public` |
| `tick(float dt, int index, @Nonnull ArchetypeChunk archetypeChunk, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `isParallel(int archetypeChunkSize, int taskCount)` | `boolean` |
| `OutOfWorldDamage()` | `public` |
| `tick(float dt, int systemIndex, @NonNullDecl Store store)` | `void` |
| `handle(int index, @Nonnull ArchetypeChunk archetypeChunk, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer, @Nonnull Damage event)` | `void` |
| `EntityUIEvents()` | `public` |

