# InteractiveCustomUIPage

**Package:** `com.hypixel.hytale.server.core.entity.entities.player.pages`

**Type:** abstract class

**Extends:** `CustomUIPage`

## Constructors

```java
public InteractiveCustomUIPage(@Nonnull PlayerRef playerRef, @Nonnull CustomPageLifetime lifetime, @Nonnull BuilderCodec eventDataCodec)
```

## Static Fields

| Name | Type |
|------|------|
| `LOGGER` | `HytaleLogger` |

## Fields

| Name | Type |
|------|------|
| `eventDataCodec` | `BuilderCodec` |

## Methods

| Method | Returns |
|--------|--------|
| `handleDataEvent(@Nonnull Ref ref, @Nonnull Store store, @Nonnull Object data)` | `void` |
| `sendUpdate(@Nullable UICommandBuilder commandBuilder, @Nullable UIEventBuilder eventBuilder, boolean clear)` | `void` |
| `handleDataEvent(@Nonnull Ref ref, @Nonnull Store store, String rawData)` | `void` |
| `sendUpdate(@Nullable UICommandBuilder commandBuilder, boolean clear)` | `void` |

