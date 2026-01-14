# UIEventBuilder

**Package:** `com.hypixel.hytale.server.core.ui.builder`

**Type:** class

## Static Fields

| Name | Type |
|------|------|
| `LOGGER` | `HytaleLogger` |
| `EMPTY_EVENT_BINDING_ARRAY` | `CustomUIEventBinding[]` |

## Fields

| Name | Type |
|------|------|
| `events` | `List` |

## Methods

| Method | Returns |
|--------|--------|
| `addEventBinding(CustomUIEventBindingType type, String selector)` | `UIEventBuilder` |
| `addEventBinding(CustomUIEventBindingType type, String selector, boolean locksInterface)` | `UIEventBuilder` |
| `addEventBinding(CustomUIEventBindingType type, String selector, EventData data)` | `UIEventBuilder` |
| `addEventBinding(CustomUIEventBindingType type, String selector, @Nullable EventData data, boolean locksInterface)` | `UIEventBuilder` |
| `getEvents()` | `CustomUIEventBinding[]` |

