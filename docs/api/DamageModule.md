# DamageModule

**Package:** `com.hypixel.hytale.server.core.modules.entity.damage`

**Type:** class

**Extends:** `JavaPlugin`

## Constructors

```java
public DamageModule(@Nonnull JavaPluginInit init)
```

## Static Fields

| Name | Type |
|------|------|
| `MANIFEST` | `PluginManifest` |
| `instance` | `DamageModule` |

## Fields

| Name | Type |
|------|------|
| `deathComponentType` | `ComponentType` |
| `deferredCorpseRemovalComponentType` | `ComponentType` |
| `gatherDamageGroup` | `SystemGroup` |
| `filterDamageGroup` | `SystemGroup` |
| `inspectDamageGroup` | `SystemGroup` |
| `dependencies` | `Set` |

## Static Methods

| Method | Returns |
|--------|--------|
| `get()` | `DamageModule` |

## Methods

| Method | Returns |
|--------|--------|
| `setup()` | `void` |
| `getDeathComponentType()` | `ComponentType` |
| `getDeferredCorpseRemovalComponentType()` | `ComponentType` |
| `getGatherDamageGroup()` | `SystemGroup` |
| `getFilterDamageGroup()` | `SystemGroup` |
| `getInspectDamageGroup()` | `SystemGroup` |
| `OrderGatherFilter()` | `public` |
| `getDependencies()` | `Set` |

