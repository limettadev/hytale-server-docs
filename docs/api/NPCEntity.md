# NPCEntity

`com.hypixel.hytale.server.npc.entities.NPCEntity`

NPC (Non-Player Character) entity component. Extends `LivingEntity` and implements `INonPlayerCharacter`.

## Static Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getComponentType()` | `ComponentType` | Get the component type for querying |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getRoleName()` | `String` | Get the NPC type name (e.g., "Creature_Skeleton") |
| `setRoleName(String)` | `void` | Set the NPC type name |
| `getRoleIndex()` | `int` | Get the NPC type index |
| `setRoleIndex(int)` | `void` | Set the NPC type index |
| `getRole()` | `Role` | Get the Role object controlling behavior |
| `setRole(Role)` | `void` | Set the Role object |
| `getSpawnRoleIndex()` | `int` | Get original spawn role index |
| `getInventory()` | `Inventory` | Get NPC inventory (inherited) |

## Position & Movement

| Method | Returns | Description |
|--------|---------|-------------|
| `getLeashPoint()` | `Vector3d` | Get spawn/leash anchor point |
| `setLeashPoint(Vector3d)` | `void` | Set spawn/leash anchor point |
| `getLeashHeading()` | `float` | Get spawn heading direction |
| `setLeashHeading(float)` | `void` | Set spawn heading direction |
| `getLeashPitch()` | `float` | Get spawn pitch |
| `setLeashPitch(float)` | `void` | Set spawn pitch |
| `getOldPosition()` | `Vector3d` | Get position from previous tick |
| `requiresLeashPosition()` | `boolean` | Whether NPC needs leash position |
| `saveLeashInformation(Vector3d, Vector3f)` | `void` | Save spawn position and rotation |

## Hovering

| Method | Returns | Description |
|--------|---------|-------------|
| `getHoverPhase()` | `float` | Get hover animation phase |
| `setHoverPhase(float)` | `void` | Set hover animation phase |
| `getHoverHeight()` | `double` | Get hover height |
| `setHoverHeight(double)` | `void` | Set hover height |

## Despawn Control

| Method | Returns | Description |
|--------|---------|-------------|
| `setToDespawn()` | `void` | Mark NPC for despawning |
| `getDespawnTime()` | `double` | Get remaining despawn time |
| `setDespawnTime(float)` | `void` | Set despawn countdown |
| `setDespawning(boolean)` | `void` | Set despawn state |
| `setPlayingDespawnAnim(boolean)` | `void` | Set despawn animation state |

## Combat & Damage

| Method | Returns | Description |
|--------|---------|-------------|
| `getDamageData()` | `DamageData` | Get damage tracking data |
| `clearDamageData()` | `void` | Reset damage data |
| `getCanCauseDamage(Ref, ComponentAccessor)` | `boolean` | Check if NPC can deal damage |
| `canBreathe(Ref, BlockMaterial, int, ComponentAccessor)` | `boolean` | Check breathing in material |

## Animation

| Method | Returns | Description |
|--------|---------|-------------|
| `playAnimation(Ref, AnimationSlot, String, ComponentAccessor)` | `void` | Play animation on slot |

## Flock Integration

| Method | Returns | Description |
|--------|---------|-------------|
| `onFlockSetState(Ref, String, String, ComponentAccessor)` | `void` | Handle flock state change |
| `onFlockSetTarget(String, Ref)` | `void` | Handle flock target assignment |

## Example Usage

```java
// In a RefSystem listening for NPC spawns
NPCEntity npc = (NPCEntity) store.getComponent(ref, NPCEntity.getComponentType());

// Get NPC type
String type = npc.getRoleName();  // e.g., "Creature_Skeleton"
int typeIndex = npc.getRoleIndex();

// Get spawn position
Vector3d spawnPoint = npc.getLeashPoint();

// Mark for despawn
npc.setToDespawn();
npc.setDespawnTime(5.0f);  // Despawn in 5 seconds
```

## See Also

- [Entity Spawn](/reference/events/entity-spawn) - Handling entity spawns
- [Player](/api/Player) - Player entity component
