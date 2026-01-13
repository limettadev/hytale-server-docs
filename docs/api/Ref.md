# Ref

**Package:** `com.hypixel.hytale.component`

**Type:** class

## Constructors

```java
public Ref(@Nonnull Store store)
```

```java
public Ref(@Nonnull Store store, int index)
```

## Static Fields

| Name | Type |
|------|------|
| `EMPTY_ARRAY` | `Ref[]` |

## Fields

| Name | Type |
|------|------|
| `store` | `Store` |
| `index` | `volatile int` |
| `hashCode` | `transient volatile int` |
| `invalidatedBy` | `volatile Throwable` |

## Methods

| Method | Returns |
|--------|--------|
| `getStore()` | `Store` |
| `getIndex()` | `int` |
| `setIndex(int index)` | `void` |
| `invalidate()` | `void` |
| `invalidate(@Nullable Throwable invalidatedBy)` | `void` |
| `validate()` | `void` |
| `isValid()` | `boolean` |
| `equals(@Nullable Object o)` | `boolean` |
| `equals(@Nullable Ref o)` | `boolean` |
| `hashCode()` | `int` |
| `hashCode0()` | `int` |
| `toString()` | `String` |

