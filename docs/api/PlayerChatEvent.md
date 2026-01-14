# PlayerChatEvent

**Package:** `com.hypixel.hytale.server.core.event.events.player`

**Type:** class

**Implements:** `IAsyncEvent`, `ICancellable`

## Constructors

```java
public PlayerChatEvent(@Nonnull PlayerRef sender, @Nonnull List targets, @Nonnull String content)
```

## Static Fields

| Name | Type |
|------|------|
| `DEFAULT_FORMATTER` | `Formatter` |

## Fields

| Name | Type |
|------|------|
| `sender` | `PlayerRef` |
| `targets` | `List` |
| `content` | `String` |
| `formatter` | `Formatter` |
| `cancelled` | `boolean` |

## Methods

| Method | Returns |
|--------|--------|
| `getSender()` | `PlayerRef` |
| `setSender(@Nonnull PlayerRef sender)` | `void` |
| `getTargets()` | `List` |
| `setTargets(@Nonnull List targets)` | `void` |
| `getContent()` | `String` |
| `setContent(@Nonnull String content)` | `void` |
| `getFormatter()` | `Formatter` |
| `setFormatter(@Nonnull Formatter formatter)` | `void` |
| `isCancelled()` | `boolean` |
| `setCancelled(boolean cancelled)` | `void` |
| `toString()` | `String` |
| `format(@Nonnull PlayerRef var1, @Nonnull String var2)` | `Message` |

