# PlayerRef

**Package:** `com.hypixel.hytale.server.core.universe`

**Type:** class

**Implements:** `Component`, `MetricProvider`, `IMessageReceiver`

## Constructors

```java
public PlayerRef(@Nonnull Holder holder, @Nonnull UUID uuid, @Nonnull String username, @Nonnull String language, @Nonnull PacketHandler packetHandler, @Nonnull ChunkTracker chunkTracker)
```

## Static Fields

| Name | Type |
|------|------|
| `METRICS_REGISTRY` | `MetricsRegistry` |
| `COMPONENT_METRICS_REGISTRY` | `MetricsRegistry` |
| `LOGGER` | `HytaleLogger` |

## Fields

| Name | Type |
|------|------|
| `uuid` | `UUID` |
| `username` | `String` |
| `packetHandler` | `PacketHandler` |
| `chunkTracker` | `ChunkTracker` |
| `hiddenPlayersManager` | `HiddenPlayersManager` |
| `language` | `String` |
| `entity` | `Ref` |
| `holder` | `Holder` |
| `worldUuid` | `UUID` |
| `transform` | `Transform` |
| `headRotation` | `Vector3f` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getComponentType()` | `ComponentType` |

## Methods

| Method | Returns |
|--------|--------|
| `addToStore(@Nonnull Store store)` | `Ref` |
| `addedToStore(Ref ref)` | `void` |
| `removeFromStore()` | `Holder` |
| `isValid()` | `boolean` |
| `getReference()` | `Ref` |
| `getHolder()` | `Holder` |
| `getComponent(@Nonnull ComponentType componentType)` | `Component` |
| `getUuid()` | `UUID` |
| `getUsername()` | `String` |
| `getPacketHandler()` | `PacketHandler` |
| `getChunkTracker()` | `ChunkTracker` |
| `getHiddenPlayersManager()` | `HiddenPlayersManager` |
| `getLanguage()` | `String` |
| `setLanguage(@Nonnull String language)` | `void` |
| `getTransform()` | `Transform` |
| `getWorldUuid()` | `UUID` |
| `getHeadRotation()` | `Vector3f` |
| `updatePosition(@Nonnull World world, @Nonnull Transform transform, @Nonnull Vector3f headRotation)` | `void` |
| `replaceHolder(@Nonnull Holder holder)` | `void` |
| `clone()` | `Component` |
| `toMetricResults()` | `MetricResults` |
| `referToServer(@Nonnull String host, int port)` | `void` |
| `referToServer(@Nonnull String host, int port, @Nullable byte[] data)` | `void` |
| `sendMessage(@Nonnull Message message)` | `void` |

