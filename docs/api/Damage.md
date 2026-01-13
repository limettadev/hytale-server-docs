# Damage

**Package:** `com.hypixel.hytale.server.core.modules.entity.damage`

**Type:** class

**Extends:** `CancellableEcsEvent implements IMetaStore`

## Constructors

```java
public Damage(@Nonnull Source source, @Nonnull DamageCause damageCause, float amount)
```

```java
public Damage(@Nonnull Source source, int damageCauseIndex, float amount)
```

## Static Fields

| Name | Type |
|------|------|
| `MESSAGE_GENERAL_DAMAGE_CAUSE_UNKNOWN` | `Message` |
| `META_REGISTRY` | `MetaRegistry` |
| `HIT_LOCATION` | `MetaKey` |
| `HIT_ANGLE` | `MetaKey` |
| `IMPACT_PARTICLES` | `MetaKey` |
| `IMPACT_SOUND_EFFECT` | `MetaKey` |
| `PLAYER_IMPACT_SOUND_EFFECT` | `MetaKey` |
| `CAMERA_EFFECT` | `MetaKey` |
| `DEATH_ICON` | `MetaKey` |
| `BLOCKED` | `MetaKey` |
| `STAMINA_DRAIN_MULTIPLIER` | `MetaKey` |
| `CAN_BE_PREDICTED` | `MetaKey` |
| `KNOCKBACK_COMPONENT` | `MetaKey` |
| `NULL_SOURCE` | `Source` |
| `COMMAND_NAME_UNKNOWN` | `String` |

## Fields

| Name | Type |
|------|------|
| `metaStore` | `IMetaStoreImpl` |
| `initialAmount` | `float` |
| `damageCauseIndex` | `int` |
| `source` | `Source` |
| `amount` | `float` |
| `modelParticles` | `ModelParticle[]` |
| `worldParticles` | `WorldParticle[]` |
| `viewDistance` | `double` |
| `soundEventIndex` | `int` |
| `type` | `String` |
| `sourceRef` | `Ref` |
| `projectile` | `Ref` |
| `commandSender` | `CommandSender` |
| `commandName` | `String` |

## Static Methods

| Method | Returns |
|--------|--------|
| `CameraEffect(int cameraEffectIndex)` | `record` |

## Methods

| Method | Returns |
|--------|--------|
| `getDamageCauseIndex()` | `int` |
| `setDamageCauseIndex(int damageCauseIndex)` | `void` |
| `getCause()` | `DamageCause` |
| `getSource()` | `Source` |
| `setSource(@Nonnull Source source)` | `void` |
| `getAmount()` | `float` |
| `setAmount(float amount)` | `void` |
| `getInitialAmount()` | `float` |
| `getDeathMessage(@Nonnull Ref targetRef, @Nonnull ComponentAccessor componentAccessor)` | `Message` |
| `getMetaStore()` | `IMetaStoreImpl` |
| `Particles(@Nullable ModelParticle[] modelParticles, @Nullable WorldParticle[] worldParticles, double viewDistance)` | `public` |
| `getModelParticles()` | `ModelParticle[]` |
| `setModelParticles(@Nullable ModelParticle[] modelParticles)` | `void` |
| `getWorldParticles()` | `WorldParticle[]` |
| `setWorldParticles(@Nullable WorldParticle[] worldParticles)` | `void` |
| `getViewDistance()` | `double` |
| `setViewDistance(double viewDistance)` | `void` |
| `SoundEffect(int soundEventIndex)` | `public` |
| `setSoundEventIndex(int soundEventIndex)` | `void` |
| `getSoundEventIndex()` | `int` |
| `getEffectIndex()` | `int` |
| `getDeathMessage(@Nonnull Damage info, @Nonnull Ref targetRef, @Nonnull ComponentAccessor componentAccessor)` | `default Message` |
| `EnvironmentSource(@Nonnull String type)` | `public` |
| `getType()` | `String` |
| `EntitySource(@Nonnull Ref sourceRef)` | `public` |
| `getRef()` | `Ref` |
| `ProjectileSource(@Nonnull Ref shooter, @Nonnull Ref projectile)` | `public` |
| `getProjectile()` | `Ref` |
| `CommandSource(@Nonnull CommandSender commandSender, @Nonnull AbstractCommand cmd)` | `public` |
| `CommandSource(@Nonnull CommandSender commandSender, @Nullable String commandName)` | `public` |

