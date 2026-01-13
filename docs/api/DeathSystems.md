# DeathSystems

**Package:** `com.hypixel.hytale.server.core.modules.entity.damage`

**Type:** class

## Static Fields

| Name | Type |
|------|------|
| `ENTITY_STAT_MAP_COMPONENT_TYPE` | `ComponentType` |
| `INTERACTION_MANAGER_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `QUERY` | `Query` |
| `DEPENDENCIES` | `Set` |
| `INTERACTIONS_COMPONENT_TYPE` | `ComponentType` |
| `INTERACTION_MANAGER_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |
| `DEPENDENCIES` | `Set` |
| `QUERY` | `Query` |
| `DEFERRED_CORPSE_REMOVAL_COMPONENT_TYPE` | `ComponentType` |
| `QUERY` | `Query` |

## Fields

| Name | Type |
|------|------|
| `query` | `Query` |
| `dependencies` | `Set` |

## Static Methods

| Method | Returns |
|--------|--------|
| `playDeathAnimation(@Nonnull Ref ref, @Nonnull DeathComponent deathComponent, @Nullable ModelComponent modelComponent, @Nonnull MovementStatesComponent movementStatesComponent, @Nonnull ComponentAccessor componentAccessor)` | `void` |

## Methods

| Method | Returns |
|--------|--------|
| `componentType()` | `ComponentType` |
| `onComponentSet(@Nonnull Ref ref, DeathComponent oldComponent, @Nonnull DeathComponent newComponent, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `onComponentRemoved(@Nonnull Ref ref, @Nonnull DeathComponent component, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `getDependencies()` | `Set` |
| `getQuery()` | `Query` |
| `onComponentAdded(@Nonnull Ref ref, @Nonnull DeathComponent component, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `DeathAnimation()` | `public` |
| `onEntityAdded(@Nonnull Ref ref, @Nonnull AddReason reason, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `onEntityRemove(@Nonnull Ref ref, @Nonnull RemoveReason reason, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |
| `tick(float dt, int index, @Nonnull ArchetypeChunk archetypeChunk, @Nonnull Store store, @Nonnull CommandBuffer commandBuffer)` | `void` |

