# EntityUIComponent

**Package:** `com.hypixel.hytale.server.core.modules.entityui.asset`

**Type:** abstract class

**Implements:** `JsonAssetWithMap`, `NetworkSerializable`

## Constructors

```java
protected EntityUIComponent()
```

## Static Fields

| Name | Type |
|------|------|
| `CODEC` | `AssetCodecMapCodec` |
| `ABSTRACT_CODEC` | `BuilderCodec` |
| `ASSET_STORE` | `AssetStore` |

## Fields

| Name | Type |
|------|------|
| `id` | `String` |
| `hitboxOffset` | `Vector2f` |
| `cachedPacket` | `transient SoftReference` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getAssetStore()` | `AssetStore` |
| `getAssetMap()` | `IndexedLookupTableAssetMap` |
| `getUnknownFor(String id)` | `EntityUIComponent` |

## Methods

| Method | Returns |
|--------|--------|
| `Unknown(id)` | `return new` |
| `getId()` | `String` |
| `toString()` | `String` |
| `Unknown(String id)` | `public` |

