# Player Chat

The `PlayerChatEvent` fires when a player sends a chat message. This is an EventBus event (not ECS), so you register it with `getEventRegistry()`.

::: info API Reference
See full API: [PlayerChatEvent](/api/PlayerChatEvent) | [Message](/api/Message) | [PlayerRef](/api/PlayerRef)
:::

::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events) (specifically the EventBus section).
:::

## Basic Usage

```java
@Override
protected void setup() {
    getEventRegistry().register(PlayerChatEvent.class, event -> {
        PlayerRef sender = event.getSender();
        String message = event.getContent();

        System.out.println(sender.getUsername() + ": " + message);
    });
}
```

## Modifying Chat Messages

You can change the message content before it's sent:

```java
getEventRegistry().register(PlayerChatEvent.class, event -> {
    // Replace bad words
    String filtered = event.getContent().replace("badword", "****");
    event.setContent(filtered);
});
```

## Adding Prefixes/Ranks

Use a custom formatter to add prefixes or change message format:

```java
getEventRegistry().register(PlayerChatEvent.class, event -> {
    PlayerRef sender = event.getSender();

    // Set custom formatter with rank prefix
    event.setFormatter((player, message) -> {
        String rank = getPlayerRank(player);  // Your rank system
        return Message.raw("[" + rank + "] " + player.getUsername() + ": " + message);
    });
});
```

### Default Format

The default formatter produces messages like:
```
<username>: message
```

Using the translation key `server.chat.playerMessage` with params `username` and `message`.

## Cancelling Messages

Block messages from being sent:

```java
getEventRegistry().register(EventPriority.EARLY, PlayerChatEvent.class, event -> {
    // Block messages containing spam
    if (event.getContent().toLowerCase().contains("spam")) {
        event.setCancelled(true);
        event.getSender().sendMessage(Message.raw("Message blocked: spam detected"));
    }
});
```

## Filtering Recipients

Control who receives the message:

```java
getEventRegistry().register(PlayerChatEvent.class, event -> {
    List<PlayerRef> targets = event.getTargets();

    // Remove certain players from receiving the message
    targets.removeIf(player -> isPlayerMuted(player));

    event.setTargets(targets);
});
```

## Event Properties[^1]

| Method | Returns | Description |
|--------|---------|-------------|
| `getSender()` | `PlayerRef` | Player who sent the message |
| `setSender(PlayerRef)` | `void` | Change the apparent sender |
| `getContent()` | `String` | The message text |
| `setContent(String)` | `void` | Modify the message |
| `getTargets()` | `List<PlayerRef>` | Players who will receive the message |
| `setTargets(List)` | `void` | Change recipients |
| `getFormatter()` | `Formatter` | Current message formatter |
| `setFormatter(Formatter)` | `void` | Set custom formatter |
| `isCancelled()` | `boolean` | Check if cancelled |
| `setCancelled(boolean)` | `void` | Cancel the message |

## Full Plugin Example

```java
package com.example.chat;

import com.hypixel.hytale.common.plugin.PluginManifest;
import com.hypixel.hytale.event.EventPriority;
import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.event.events.player.PlayerChatEvent;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import javax.annotation.Nonnull;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class ChatPlugin extends JavaPlugin {

    public static final PluginManifest MANIFEST = PluginManifest
        .corePlugin(ChatPlugin.class)
        .build();

    // Store player ranks (in real plugin, load from database)
    private final Map<UUID, String> playerRanks = new ConcurrentHashMap<>();

    public ChatPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        // Add rank prefixes to chat
        getEventRegistry().register(PlayerChatEvent.class, this::handleChat);

        this.getLogger().info("Chat plugin loaded!");
    }

    private void handleChat(PlayerChatEvent event) {
        PlayerRef sender = event.getSender();
        String rank = playerRanks.getOrDefault(sender.getUuid(), "Member");

        // Custom formatter with rank
        event.setFormatter((player, message) ->
            Message.raw("[" + rank + "] " + player.getUsername() + ": " + message)
        );
    }

    // Called by other plugins or commands to set rank
    public void setPlayerRank(UUID playerId, String rank) {
        playerRanks.put(playerId, rank);
    }
}
```

## Async Nature

`PlayerChatEvent` implements `IAsyncEvent`, meaning handlers can perform async operations if needed. For simple modifications, synchronous handling is fine.

## See Also

- [Event System](/concepts/events) - Understanding both event systems
- [Player Component](/reference/components/player) - Player data access
- [Message](/api/Message) - Creating formatted messages

[^1]: See [PlayerChatEvent API](/api/PlayerChatEvent) for all available methods and the `Formatter` interface
