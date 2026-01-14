# CustomUIPage

**Package:** `com.hypixel.hytale.server.core.entity.entities.player.pages`

**Type:** abstract class

## Constructors

```java
public CustomUIPage(@Nonnull PlayerRef playerRef, @Nonnull CustomPageLifetime lifetime)
```

## Fields

| Name | Type |
|------|------|
| `playerRef` | `PlayerRef` |
| `lifetime` | `CustomPageLifetime` |

## Methods

| Method | Returns |
|--------|--------|
| `setLifetime(@Nonnull CustomPageLifetime lifetime)` | `void` |
| `getLifetime()` | `CustomPageLifetime` |
| `handleDataEvent(@Nonnull Ref ref, @Nonnull Store store, String rawData)` | `void` |
| `build(@Nonnull Ref var1, @Nonnull UICommandBuilder var2, @Nonnull UIEventBuilder var3, @Nonnull Store var4)` | `abstract void` |
| `rebuild()` | `void` |
| `sendUpdate()` | `void` |
| `sendUpdate(@Nullable UICommandBuilder commandBuilder)` | `void` |
| `sendUpdate(@Nullable UICommandBuilder commandBuilder, boolean clear)` | `void` |
| `close()` | `void` |
| `onDismiss(@Nonnull Ref ref, @Nonnull Store store)` | `void` |

