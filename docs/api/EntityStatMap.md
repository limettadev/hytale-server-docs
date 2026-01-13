# EntityStatMap

**Package:** `com.hypixel.hytale.server.core.modules.entitystats`

**Type:** class

**Implements:** `Component`

## Constructors

```java
public EntityStatMap()
```

## Static Fields

| Name | Type |
|------|------|
| `VERSION` | `int` |
| `CODEC` | `BuilderCodec` |

## Fields

| Name | Type |
|------|------|
| `unknown` | `Map` |
| `values` | `EntityStatValue[]` |
| `selfUpdates` | `Int2ObjectMap` |
| `selfStatValues` | `Int2ObjectMap` |
| `otherUpdates` | `Int2ObjectMap` |
| `isSelfNetworkOutdated` | `boolean` |
| `isNetworkOutdated` | `boolean` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getComponentType()` | `ComponentType` |
| `makeInitChange(@Nonnull EntityStatValue value)` | `EntityStatUpdate` |
| `toPacket(@Nullable Int2ObjectMap modifiers)` | `Int2ObjectMap` |

## Methods

| Method | Returns |
|--------|--------|
| `size()` | `int` |
| `get(int index)` | `EntityStatValue` |
| `get(String entityStat)` | `EntityStatValue` |
| `update()` | `void` |
| `getModifier(int index, String key)` | `Modifier` |
| `putModifier(int index, String key, Modifier modifier)` | `Modifier` |
| `putModifier(Predictable predictable, int index, String key, Modifier modifier)` | `Modifier` |
| `removeModifier(int index, String key)` | `Modifier` |
| `removeModifier(Predictable predictable, int index, String key)` | `Modifier` |
| `setStatValue(int index, float newValue)` | `float` |
| `setStatValue(Predictable predictable, int index, float newValue)` | `float` |
| `addStatValue(int index, float amount)` | `float` |
| `addStatValue(Predictable predictable, int index, float amount)` | `float` |
| `subtractStatValue(int index, float amount)` | `float` |
| `subtractStatValue(Predictable predictable, int index, float amount)` | `float` |
| `minimizeStatValue(int index)` | `float` |
| `minimizeStatValue(Predictable predictable, int index)` | `float` |
| `maximizeStatValue(int index)` | `float` |
| `maximizeStatValue(Predictable predictable, int index)` | `float` |
| `resetStatValue(int index)` | `float` |
| `resetStatValue(Predictable predictable, int index)` | `float` |
| `getSelfUpdates()` | `Int2ObjectMap` |
| `getSelfStatValues()` | `Int2ObjectMap` |
| `consumeSelfUpdates()` | `Int2ObjectMap` |
| `clearUpdates()` | `void` |
| `consumeOtherUpdates()` | `Int2ObjectMap` |
| `updatesToProtocol(@Nonnull Int2ObjectMap localUpdates)` | `Int2ObjectOpenHashMap` |
| `createInitUpdate(boolean all)` | `Int2ObjectMap` |
| `consumeSelfNetworkOutdated()` | `boolean` |
| `consumeNetworkOutdated()` | `boolean` |
| `addInitChange(int index, @Nonnull EntityStatValue value)` | `void` |
| `addChange(Predictable predictable, int index, @Nonnull EntityStatOp op, float previousValue, float value)` | `void` |
| `addChange(Predictable predictable, int index, @Nonnull EntityStatOp op, float previousValue, float value, Map modifierMap)` | `void` |
| `addChange(Predictable predictable, int index, EntityStatOp op, float previousValue, String key, @Nullable Modifier modifier)` | `void` |
| `tryMergeUpdate(@Nonnull List updates, @Nonnull EntityStatOp op, float value, @Nullable Map modifierMap, boolean isPredictable)` | `boolean` |
| `processStatChanges(Predictable predictable, @Nonnull Int2FloatMap entityStats, ValueType valueType, @Nonnull ChangeStatBehaviour changeStatBehaviour)` | `void` |
| `toString()` | `String` |
| `clone()` | `EntityStatMap` |
| `EntityStatUpdate(EntityStatOp.Init, false, value.get()` | `return new` |

