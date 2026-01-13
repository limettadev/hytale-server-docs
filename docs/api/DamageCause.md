# DamageCause

**Package:** `com.hypixel.hytale.server.core.modules.entity.damage`

**Type:** class

**Implements:** `JsonAssetWithMap`

## Constructors

```java
public DamageCause()
```

```java
public DamageCause(@Nonnull String id)
```

```java
public DamageCause(@Nonnull String id, @Nonnull String inherits, boolean durabilityLoss, boolean staminaLoss, boolean bypassResistances)
```

## Static Fields

| Name | Type |
|------|------|
| `CODEC` | `AssetBuilderCodec` |
| `ASSET_STORE` | `AssetStore` |
| `VALIDATOR_CACHE` | `ValidatorCache` |
| `CHILD_ASSET_CODEC` | `Codec` |
| `PHYSICAL` | `DamageCause` |
| `PROJECTILE` | `DamageCause` |
| `COMMAND` | `DamageCause` |
| `DROWNING` | `DamageCause` |
| `ENVIRONMENT` | `DamageCause` |
| `FALL` | `DamageCause` |
| `OUT_OF_WORLD` | `DamageCause` |
| `SUFFOCATION` | `DamageCause` |

## Fields

| Name | Type |
|------|------|
| `id` | `String` |
| `inherits` | `String` |
| `durabilityLoss` | `boolean` |
| `staminaLoss` | `boolean` |
| `bypassResistances` | `boolean` |
| `damageTextColor` | `String` |
| `animationId` | `String` |
| `deathAnimationId` | `String` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getAssetStore()` | `AssetStore` |
| `getAssetMap()` | `IndexedLookupTableAssetMap` |

## Methods

| Method | Returns |
|--------|--------|
| `getId()` | `String` |
| `isDurabilityLoss()` | `boolean` |
| `isStaminaLoss()` | `boolean` |
| `doesBypassResistances()` | `boolean` |
| `getInherits()` | `String` |
| `getAnimationId()` | `String` |
| `getDeathAnimationId()` | `String` |

