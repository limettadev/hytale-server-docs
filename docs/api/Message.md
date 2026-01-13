# Message

**Package:** `com.hypixel.hytale.server.core`

**Type:** class

## Constructors

```java
protected Message(@Nonnull String message, boolean i18n)
```

```java
protected Message()
```

```java
public Message(@Nonnull FormattedMessage message)
```

## Static Fields

| Name | Type |
|------|------|
| `MESSAGE_CODEC` | `BuilderCodec` |
| `PARAM_CODEC` | `Codec` |
| `MAYBE_BOOL_CODEC` | `Codec` |
| `CODEC` | `FunctionCodec` |

## Fields

| Name | Type |
|------|------|
| `message` | `FormattedMessage` |

## Static Methods

| Method | Returns |
|--------|--------|
| `empty()` | `Message` |
| `translation(@Nonnull String messageId)` | `Message` |
| `raw(@Nonnull String message)` | `Message` |
| `parse(@Nonnull String message)` | `Message` |
| `join(@Nonnull Message... messages)` | `Message` |

## Methods

| Method | Returns |
|--------|--------|
| `param(@Nonnull String key, @Nonnull String value)` | `Message` |
| `param(@Nonnull String key, boolean value)` | `Message` |
| `param(@Nonnull String key, double value)` | `Message` |
| `param(@Nonnull String key, int value)` | `Message` |
| `param(@Nonnull String key, long value)` | `Message` |
| `param(@Nonnull String key, float value)` | `Message` |
| `param(@Nonnull String key, @Nonnull Message formattedMessage)` | `Message` |
| `bold(boolean bold)` | `Message` |
| `italic(boolean italic)` | `Message` |
| `monospace(boolean monospace)` | `Message` |
| `color(@Nonnull String color)` | `Message` |
| `color(@Nonnull Color color)` | `Message` |
| `link(@Nonnull String url)` | `Message` |
| `insert(@Nonnull Message formattedMessage)` | `Message` |
| `insert(@Nonnull String message)` | `Message` |
| `insertAll(@Nonnull Message... formattedMessages)` | `Message` |
| `insertAll(@Nonnull List formattedMessages)` | `Message` |
| `getRawText()` | `String` |
| `getMessageId()` | `String` |
| `getColor()` | `String` |
| `getChildren()` | `List` |
| `getAnsiMessage()` | `String` |
| `getFormattedMessage()` | `FormattedMessage` |
| `toString()` | `String` |
| `decode(BsonValue bsonValue, ExtraInfo extraInfo)` | `ParamValue` |
| `encode(ParamValue paramValue, ExtraInfo extraInfo)` | `BsonValue` |
| `decodeJson(@Nonnull RawJsonReader reader, ExtraInfo extraInfo)` | `ParamValue` |
| `toSchema(@Nonnull SchemaContext context)` | `Schema` |
| `encode(MaybeBool maybeBool, ExtraInfo extraInfo)` | `BsonValue` |
| `decodeJson(@NonNullDecl RawJsonReader reader, ExtraInfo extraInfo)` | `MaybeBool` |

