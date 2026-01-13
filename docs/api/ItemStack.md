# ItemStack

**Package:** `com.hypixel.hytale.server.core.inventory`

**Type:** class

**Implements:** `NetworkSerializable`

## Constructors

```java
public ItemStack(@Nonnull String itemId, int quantity, @Nullable BsonDocument metadata)
```

```java
public ItemStack(@Nonnull String itemId, int quantity, double durability, double maxDurability, @Nullable BsonDocument metadata)
```

```java
public ItemStack(@Nonnull String itemId)
```

```java
public ItemStack(@Nonnull String itemId, int quantity)
```

```java
protected ItemStack()
```

## Static Fields

| Name | Type |
|------|------|
| `EMPTY_ARRAY` | `ItemStack[]` |
| `CODEC` | `BuilderCodec` |
| `EMPTY` | `ItemStack` |
| `BLOCK_STATE` | `String` |

## Fields

| Name | Type |
|------|------|
| `itemId` | `String` |
| `quantity` | `int` |
| `durability` | `double` |
| `maxDurability` | `double` |
| `overrideDroppedItemAnimation` | `boolean` |
| `metadata` | `BsonDocument` |
| `cachedPacket` | `ItemWithAllMetadata` |

## Static Methods

| Method | Returns |
|--------|--------|
| `isEmpty(@Nullable ItemStack itemFrom)` | `boolean` |
| `isStackableWith(@Nullable ItemStack a, ItemStack b)` | `boolean` |
| `isEquivalentType(@Nullable ItemStack a, ItemStack b)` | `boolean` |
| `isSameItemType(@Nullable ItemStack a, @Nullable ItemStack b)` | `boolean` |
| `fromPacket(@Nullable ItemQuantity packet)` | `ItemStack` |

## Methods

| Method | Returns |
|--------|--------|
| `getItemId()` | `String` |
| `getQuantity()` | `int` |
| `getMetadata()` | `BsonDocument` |
| `isUnbreakable()` | `boolean` |
| `isBroken()` | `boolean` |
| `getMaxDurability()` | `double` |
| `getDurability()` | `double` |
| `isEmpty()` | `boolean` |
| `getOverrideDroppedItemAnimation()` | `boolean` |
| `setOverrideDroppedItemAnimation(boolean b)` | `void` |
| `getBlockKey()` | `String` |
| `getItem()` | `Item` |
| `isValid()` | `boolean` |
| `withDurability(double durability)` | `ItemStack` |
| `withMaxDurability(double maxDurability)` | `ItemStack` |
| `withIncreasedDurability(double inc)` | `ItemStack` |
| `withRestoredDurability(double maxDurability)` | `ItemStack` |
| `withState(@Nonnull String state)` | `ItemStack` |
| `withQuantity(int quantity)` | `ItemStack` |
| `withMetadata(@Nullable BsonDocument metadata)` | `ItemStack` |
| `withMetadata(@Nonnull KeyedCodec keyedCodec, @Nullable Object data)` | `ItemStack` |
| `withMetadata(@Nonnull String key, @Nonnull Codec codec, @Nullable Object data)` | `ItemStack` |
| `withMetadata(@Nonnull String key, @Nullable BsonValue bsonValue)` | `ItemStack` |
| `toPacket()` | `ItemWithAllMetadata` |
| `isStackableWith(@Nullable ItemStack itemStack)` | `boolean` |
| `isEquivalentType(@Nullable ItemStack itemStack)` | `boolean` |
| `getFromMetadataOrNull(@Nonnull KeyedCodec keyedCodec)` | `Object` |
| `getFromMetadataOrNull(@Nonnull String key, @Nonnull Codec codec)` | `Object` |
| `getFromMetadataOrDefault(@Nonnull String key, @Nonnull BuilderCodec codec)` | `Object` |
| `equals(@Nullable Object o)` | `boolean` |
| `hashCode()` | `int` |
| `toString()` | `String` |

