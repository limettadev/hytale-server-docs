# LocalizableString

**Package:** `com.hypixel.hytale.server.core.ui`

**Type:** class

## Static Fields

| Name | Type |
|------|------|
| `CODEC` | `LocalizableStringCodec` |
| `MESSAGE_OBJECT_CODEC` | `BuilderCodec` |

## Fields

| Name | Type |
|------|------|
| `stringValue` | `String` |
| `messageId` | `String` |
| `messageParams` | `Map` |

## Static Methods

| Method | Returns |
|--------|--------|
| `fromString(String str)` | `LocalizableString` |
| `fromMessageId(String messageId)` | `LocalizableString` |
| `fromMessageId(String messageId, Map params)` | `LocalizableString` |

## Methods

| Method | Returns |
|--------|--------|
| `fromMessageId(messageId, (Map)` | `return` |
| `decode(BsonValue bsonValue, @Nonnull ExtraInfo extraInfo)` | `LocalizableString` |
| `encode(@Nonnull LocalizableString t, @Nonnull ExtraInfo extraInfo)` | `BsonValue` |
| `toSchema(@Nonnull SchemaContext context)` | `Schema` |

