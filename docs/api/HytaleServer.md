# HytaleServer

**Package:** `com.hypixel.hytale.server.core`

**Type:** class

## Constructors

```java
public HytaleServer()
```

## Static Fields

| Name | Type |
|------|------|
| `DEFAULT_PORT` | `int` |
| `SCHEDULED_EXECUTOR` | `ScheduledExecutorService` |
| `METRICS_REGISTRY` | `MetricsRegistry` |
| `LOGGER` | `HytaleLogger` |
| `instance` | `HytaleServer` |

## Fields

| Name | Type |
|------|------|
| `aliveLock` | `Semaphore` |
| `booting` | `AtomicBoolean` |
| `booted` | `AtomicBoolean` |
| `shutdown` | `AtomicReference` |
| `eventBus` | `EventBus` |
| `pluginManager` | `PluginManager` |
| `commandManager` | `CommandManager` |
| `hytaleServerConfig` | `HytaleServerConfig` |
| `boot` | `Instant` |
| `bootStart` | `long` |
| `pluginsProgress` | `int` |

## Static Methods

| Method | Returns |
|--------|--------|
| `get()` | `HytaleServer` |

## Methods

| Method | Returns |
|--------|--------|
| `getEventBus()` | `EventBus` |
| `getPluginManager()` | `PluginManager` |
| `getCommandManager()` | `CommandManager` |
| `getConfig()` | `HytaleServerConfig` |
| `boot()` | `void` |
| `shutdownServer()` | `void` |
| `shutdownServer(@Nonnull ShutdownReason reason)` | `void` |
| `shutdown0(@Nonnull ShutdownReason reason)` | `void` |
| `doneSetup(PluginBase plugin)` | `void` |
| `doneStart(PluginBase plugin)` | `void` |
| `doneStop(PluginBase plugin)` | `void` |
| `sendSingleplayerProgress()` | `void` |
| `getServerName()` | `String` |
| `isBooting()` | `boolean` |
| `isBooted()` | `boolean` |
| `isShuttingDown()` | `boolean` |
| `getBoot()` | `Instant` |
| `getBootStart()` | `long` |
| `getShutdownReason()` | `ShutdownReason` |
| `sendSingleplayerSignal(String message)` | `void` |
| `reportSingleplayerStatus(String message)` | `void` |
| `reportSaveProgress(@Nonnull World world, int saved, int total)` | `void` |

