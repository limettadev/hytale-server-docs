# Showing UI to Players

This guide covers how to display custom UI pages and HUD elements to players.

::: info API Reference
See full API: [CustomUIPage](/api/CustomUIPage) | [InteractiveCustomUIPage](/api/InteractiveCustomUIPage)
:::

## Opening a UI Page

To show a UI page to a player, use `player.getPageManager().openCustomPage()`:

```java
Player player = store.getComponent(ref, Player.getComponentType());
player.getPageManager().openCustomPage(ref, store, new MyPage(playerRef));
```

## Basic Page Example

A minimal interactive UI page:

```java
package com.example.myplugin;

import com.hypixel.hytale.codec.Codec;
import com.hypixel.hytale.codec.KeyedCodec;
import com.hypixel.hytale.codec.builder.BuilderCodec;
import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.protocol.packets.interface_.CustomPageLifetime;
import com.hypixel.hytale.protocol.packets.interface_.CustomUIEventBindingType;
import com.hypixel.hytale.server.core.entity.entities.player.pages.InteractiveCustomUIPage;
import com.hypixel.hytale.server.core.ui.builder.EventData;
import com.hypixel.hytale.server.core.ui.builder.UICommandBuilder;
import com.hypixel.hytale.server.core.ui.builder.UIEventBuilder;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class MyPage extends InteractiveCustomUIPage<MyPage.PageData> {

    public MyPage(@Nonnull PlayerRef playerRef) {
        super(playerRef, CustomPageLifetime.CanDismiss, PageData.CODEC);
    }

    @Override
    public void build(@Nonnull Ref<EntityStore> ref,
                      @Nonnull UICommandBuilder cmd,
                      @Nonnull UIEventBuilder events,
                      @Nonnull Store<EntityStore> store) {
        // Load the .ui file
        cmd.append("Pages/MyPage.ui");

        // Set some text
        cmd.set("#Title.Text", "Hello World!");

        // Bind a button click
        events.addEventBinding(
            CustomUIEventBindingType.Activating,
            "#CloseButton",
            EventData.of("Action", "close")
        );
    }

    @Override
    public void handleDataEvent(@Nonnull Ref<EntityStore> ref,
                                @Nonnull Store<EntityStore> store,
                                @Nonnull PageData data) {
        if ("close".equals(data.action)) {
            this.close();
            return;
        }
        this.sendUpdate();
    }

    public static class PageData {
        public static final BuilderCodec<PageData> CODEC = BuilderCodec
            .<PageData>builder(PageData.class, PageData::new)
            .addField(new KeyedCodec<>("Action", Codec.STRING),
                (d, s) -> d.action = s, d -> d.action)
            .build();

        private String action;
    }
}
```

## Page Lifetime Options

The `CustomPageLifetime` enum controls how the page can be closed:

| Lifetime | Description |
|----------|-------------|
| `CanDismiss` | Player can close with ESC |
| `CanDismissOrCloseThroughInteraction` | Can close via ESC or interaction |
| `MustCloseThroughInteraction` | Can only close via UI buttons |

## Opening from a Command

```java
public class MyCommand implements Command {

    @Override
    public void execute(CommandContext context) {
        PlayerRef playerRef = context.getPlayerRef();
        Ref<EntityStore> ref = playerRef.getReference();
        Store<EntityStore> store = ref.getStore();

        Player player = store.getComponent(ref, Player.getComponentType());
        player.getPageManager().openCustomPage(ref, store, new MyPage(playerRef));
    }
}
```

## Showing HUD (Always Visible)

For UI that should always be visible (like a HUD), use `BasicCustomUIPage` and open it when the player joins:

```java
package com.example.myplugin;

import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.protocol.packets.interface_.CustomPageLifetime;
import com.hypixel.hytale.server.core.entity.entities.player.pages.BasicCustomUIPage;
import com.hypixel.hytale.server.core.ui.builder.UICommandBuilder;
import com.hypixel.hytale.server.core.ui.builder.UIEventBuilder;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class MyHUD extends BasicCustomUIPage {

    public MyHUD(@Nonnull PlayerRef playerRef) {
        // MustCloseThroughInteraction prevents ESC from closing
        super(playerRef, CustomPageLifetime.MustCloseThroughInteraction);
    }

    @Override
    public void build(@Nonnull Ref<EntityStore> ref,
                      @Nonnull UICommandBuilder cmd,
                      @Nonnull UIEventBuilder events,
                      @Nonnull Store<EntityStore> store) {
        cmd.append("Pages/MyHUD.ui");

        // Update HUD content
        cmd.set("#ScoreLabel.Text", "Score: 0");
        cmd.set("#HealthBar.Value", 100);
    }

    public void updateScore(int score) {
        UICommandBuilder cmd = new UICommandBuilder();
        cmd.set("#ScoreLabel.Text", "Score: " + score);
        this.sendUpdate(cmd);
    }
}
```

### Opening HUD on Player Join

Use a `RefSystem` to open the HUD when players join:

```java
public class HUDSystem extends RefSystem {

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Override
    public void onEntityAdded(@Nonnull Ref<EntityStore> ref, @Nonnull AddReason reason,
                               @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        PlayerRef playerRef = store.getComponent(ref, PlayerRef.getComponentType());
        Player player = store.getComponent(ref, Player.getComponentType());

        // Open HUD for this player
        MyHUD hud = new MyHUD(playerRef);
        player.getPageManager().openCustomPage(ref, store, hud);
    }

    @Override
    public void onEntityRemove(@Nonnull Ref<EntityStore> ref, @Nonnull RemoveReason reason,
                                @Nonnull Store store, @Nonnull CommandBuffer commandBuffer) {
        // Cleanup if needed
    }
}
```

## Updating UI

To update an already-open page, create a new `UICommandBuilder` and call `sendUpdate()`:

```java
public void updateUI() {
    UICommandBuilder cmd = new UICommandBuilder();
    cmd.set("#Counter.Text", String.valueOf(count));
    this.sendUpdate(cmd);
}
```

For interactive pages, you can also update event bindings:

```java
public void updateUI() {
    UICommandBuilder cmd = new UICommandBuilder();
    UIEventBuilder events = new UIEventBuilder();

    cmd.set("#Status.Text", "Updated!");
    events.addEventBinding(CustomUIEventBindingType.Activating, "#NewButton",
        EventData.of("Action", "new"));

    this.sendUpdate(cmd, events, false);
}
```

## See Also

- [UI File Reference](/reference/ui/ui-files) - .ui file syntax
- [CustomUIPage API](/api/CustomUIPage) - Base class methods
- [UICommandBuilder API](/api/UICommandBuilder) - UI manipulation
