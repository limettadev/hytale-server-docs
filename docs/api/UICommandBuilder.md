# UICommandBuilder

**Package:** `com.hypixel.hytale.server.core.ui.builder`

**Type:** class

## Static Fields

| Name | Type |
|------|------|
| `CODEC_MAP` | `Map` |
| `EMPTY_COMMAND_ARRAY` | `CustomUICommand[]` |

## Fields

| Name | Type |
|------|------|
| `commands` | `List` |

## Methods

| Method | Returns |
|--------|--------|
| `clear(String selector)` | `UICommandBuilder` |
| `remove(String selector)` | `UICommandBuilder` |
| `append(String documentPath)` | `UICommandBuilder` |
| `append(String selector, String documentPath)` | `UICommandBuilder` |
| `appendInline(String selector, String document)` | `UICommandBuilder` |
| `insertBefore(String selector, String documentPath)` | `UICommandBuilder` |
| `insertBeforeInline(String selector, String document)` | `UICommandBuilder` |
| `setBsonValue(String selector, BsonValue bsonValue)` | `UICommandBuilder` |
| `set(String selector, @Nonnull Value ref)` | `UICommandBuilder` |
| `setNull(String selector)` | `UICommandBuilder` |
| `set(String selector, @Nonnull String str)` | `UICommandBuilder` |
| `set(String selector, @Nonnull Message message)` | `UICommandBuilder` |
| `set(String selector, boolean b)` | `UICommandBuilder` |
| `set(String selector, float n)` | `UICommandBuilder` |
| `set(String selector, int n)` | `UICommandBuilder` |
| `set(String selector, double n)` | `UICommandBuilder` |
| `setObject(String selector, @Nonnull Object data)` | `UICommandBuilder` |
| `set(String selector, @Nonnull Object[] data)` | `UICommandBuilder` |
| `set(String selector, @Nonnull List data)` | `UICommandBuilder` |
| `getCommands()` | `CustomUICommand[]` |

