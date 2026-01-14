# UI File Reference

Hytale uses a declarative `.ui` file format for defining user interfaces. This guide covers the syntax, elements, and properties available.

::: info API Reference
See full API: [CustomUIPage](/api/CustomUIPage) | [UICommandBuilder](/api/UICommandBuilder) | [UIEventBuilder](/api/UIEventBuilder)
:::

::: tip Concepts
Before reading this, familiarize yourself with [Creating a Plugin](/getting-started/plugin).
:::

## File Syntax

### Basic Structure

```
ElementType #ElementId {
  Property: value;
  Property: (SubProperty: value, SubProperty: value);

  ChildElement #ChildId {
    Property: value;
  }
}
```

### Variables and Imports

```
// Import another .ui file as a variable
$C = "../Common.ui";
$Nav = "Nav/TopNavigationBar.ui";

// Reference a template from an imported file
$C.@PageOverlay {
  // Content using the PageOverlay template from Common.ui
}

// Reference a named value from another file
$C.@DefaultScrollbarStyle
```

### Template Syntax

- `$Variable = "path/to/file.ui"` - Import a file
- `$Variable.@TemplateName` - Use a template from imported file
- `#ElementId` - Assign an ID to an element (for selector access)
- `@Text = "value"` - Set a named property inline

## UI Elements

### Group

Container element for organizing child elements.

```
Group #MyContainer {
  Anchor: (Width: 600, Height: 400);
  LayoutMode: Top;
  Padding: (Left: 10, Right: 10);

  // Child elements...
}
```

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Anchor` | Anchor | Positioning and sizing |
| `LayoutMode` | String | Layout direction: `Left`, `Top`, `TopScrolling` |
| `Padding` | Padding | Inner spacing |
| `FlexWeight` | Number | Flex layout weight |
| `ScrollbarStyle` | Value | Scrollbar styling reference |
| `Visible` | Boolean | Show/hide the element |

### Label

Text display element.

```
Label #MyLabel {
  Text: "Hello World";
  Style: (Alignment: Center);
}

// With localization
Label #LocalizedLabel {
  Text: %server.customUI.myPage.greeting;
  Style: (Alignment: Left, TextColor: "#ffffff");
}
```

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Text` | String/Message | Text content (use `%key` for localization) |
| `TextSpans` | Message | Rich text content |
| `Style` | Style | Text styling |
| `Visible` | Boolean | Show/hide |

### Text

Basic text element, similar to Label.

```
Text #SimpleText {
  Text: "Simple text content";
}
```

### Button

Interactive button element.

```
Button #MyButton {
  Text: "Click Me";
  Disabled: false;
  Style: (Background: "#3a3a3a");
}
```

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Text` | String | Button label |
| `Disabled` | Boolean | Disable interaction |
| `Style` | Style | Button styling |
| `Visible` | Boolean | Show/hide |

### Input

Text input field, also used for dropdowns.

```java
// Text input
commandBuilder.set("#SearchInput.Value", "search term");

// Dropdown with entries
List<DropdownEntryInfo> options = new ArrayList<>();
options.add(new DropdownEntryInfo(LocalizableString.fromString("Option 1"), "opt1"));
commandBuilder.set("#Dropdown.Entries", options);
commandBuilder.set("#Dropdown.Value", "opt1");

// Color picker input
commandBuilder.set("#GrassTint #Input.Color", "#5B9E28");
```

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Value` | String | Current input value |
| `Entries` | List&lt;DropdownEntryInfo&gt; | Dropdown options |
| `Color` | String | Color value (for color inputs) |
| `Visible` | Boolean | Show/hide |

### CheckBox

Boolean toggle element.

```java
// Set checkbox value
commandBuilder.set("#EnableOption #CheckBox.Value", true);

// Read value in event binding
eventBuilder.addEventBinding(
    CustomUIEventBindingType.ValueChanged,
    "#EnableOption #CheckBox",
    EventData.of("@Enabled", "#EnableOption #CheckBox.Value")
);
```

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Value` | Boolean | Checked state |
| `Visible` | Boolean | Show/hide |

### Slider

Numeric value slider.

```java
// Bind to slider value changes
eventBuilder.addEventBinding(
    CustomUIEventBindingType.ValueChanged,
    "#VolumeSlider",
    EventData.of("@Volume", "#VolumeSlider.Value"),
    false
);
```

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Value` | Number | Current slider value |
| `Visible` | Boolean | Show/hide |

### ColorPicker

Color selection element.

```java
// Bind to color picker
eventBuilder.addEventBinding(
    CustomUIEventBindingType.ValueChanged,
    "#ColorPicker",
    EventData.of("@Color", "#ColorPicker.Value")
);
```

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Value` | String | Selected color (hex format) |
| `Visible` | Boolean | Show/hide |

### ItemSlot

Displays an item with icon and quantity.

```java
// Set item by ID
commandBuilder.set("#OutputSlot.ItemId", "Tool_Sword_Wood");

// Set item grid slots
commandBuilder.set("#ItemMaterialSlot.Slots", new ItemGridSlot[] {
    new ItemGridSlot(new ItemStack("Tool_Pickaxe_Wood", 1))
});
```

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `ItemId` | String | Item type ID to display |
| `Slots` | ItemGridSlot[] | Grid slot data |
| `Background` | PatchStyle | Slot background |
| `Overlay` | PatchStyle | Slot overlay |

## Properties Reference

### Anchor

Controls element positioning and sizing.

```
Anchor: (Width: 600, Height: 400);
Anchor: (Left: 10, Right: 10, Top: 0, Bottom: 0);
Anchor: (Full: 1);  // Fill parent
Anchor: (Horizontal: 1);  // Fill horizontally
Anchor: (Vertical: 1);  // Fill vertically
```

**Sub-properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Left` | Number | Left offset |
| `Right` | Number | Right offset |
| `Top` | Number | Top offset |
| `Bottom` | Number | Bottom offset |
| `Width` | Number | Fixed width |
| `Height` | Number | Fixed height |
| `MinWidth` | Number | Minimum width |
| `MaxWidth` | Number | Maximum width |
| `Full` | Number | Fill both axes |
| `Horizontal` | Number | Fill horizontal |
| `Vertical` | Number | Fill vertical |

### Style

Controls visual appearance.

```
Style: (Alignment: Center);
Style: (TextColor: "#ffffff");
Style: (Background: "#2a5a3a");
Style: (Alignment: Center, TextColor: "#cccccc", Background: "#333333");
```

**Sub-properties:**
| Property | Type | Description |
|----------|------|-------------|
| `Alignment` | String | `Left`, `Center`, `Right`, `Top`, `Bottom` |
| `TextColor` | String | Hex color like `"#ffffff"` |
| `Background` | String/PatchStyle | Background color or texture |
| `Disabled` | Style | Style when disabled |

### PatchStyle

For textured backgrounds with 9-patch scaling.

**Sub-properties:**
| Property | Type | Description |
|----------|------|-------------|
| `TexturePath` | String | Path to texture file |
| `Border` | Number | 9-patch border size |
| `HorizontalBorder` | Number | Horizontal border |
| `VerticalBorder` | Number | Vertical border |
| `Color` | String | Tint color |
| `Area` | Area | Source rectangle |

### Area

Defines a rectangular region.

```
Area: (X: 0, Y: 0, Width: 100, Height: 50);
```

**Sub-properties:**
| Property | Type | Description |
|----------|------|-------------|
| `X` | Number | X position |
| `Y` | Number | Y position |
| `Width` | Number | Width |
| `Height` | Number | Height |

## Element Properties

### Common Properties

Available on most elements:

| Property | Type | Description |
|----------|------|-------------|
| `.Visible` | Boolean | Show/hide element |
| `.Style` | Value | Element styling |
| `.Text` | String | Text content |
| `.TextSpans` | Message | Rich text content |

### Input Elements

| Property | Type | Description |
|----------|------|-------------|
| `.Value` | String | Current input value |
| `.Entries` | List&lt;DropdownEntryInfo&gt; | Dropdown options |
| `.Disabled` | Boolean | Disable input |

### Item Slots

| Property | Type | Description |
|----------|------|-------------|
| `.ItemId` | String | Item type ID |
| `.Slots` | ItemGridSlot[] | Grid slot data |
| `.Background` | PatchStyle | Slot background |
| `.Overlay` | PatchStyle | Slot overlay |

## Selectors

Selectors are used to target elements for manipulation.

```java
// Direct element by ID
"#ElementId"

// Array index access
"#List[0]"
"#List[2]"

// Child element access
"#Parent #Child"
"#Container[0] #Button"

// Property access
"#Element.Property"
"#Element.Style.TextColor"
"#Element[0].Visible"
```

## UICommandBuilder Usage[^1]

Manipulate UI from Java code:

```java
@Override
public void build(@Nonnull Ref<EntityStore> ref,
                  @Nonnull UICommandBuilder commandBuilder,
                  @Nonnull UIEventBuilder eventBuilder,
                  @Nonnull Store<EntityStore> store) {

    // Load a .ui file
    commandBuilder.append("Pages/MyPage.ui");

    // Set text
    commandBuilder.set("#Title.Text", "Welcome!");
    commandBuilder.set("#Description.TextSpans", Message.translation("my.description"));

    // Set visibility
    commandBuilder.set("#ErrorMessage.Visible", false);

    // Set style from another file
    commandBuilder.set("#Button.Style", Value.ref("Pages/Common.ui", "ButtonStyle"));

    // Set colors
    commandBuilder.set("#StatusBorder.Background", "#2a5a3a");
    commandBuilder.set("#Label.Style.TextColor", "#ff0000");

    // Clear and rebuild lists
    commandBuilder.clear("#ItemList");
    for (int i = 0; i < items.size(); i++) {
        commandBuilder.append("#ItemList", "Pages/ListItem.ui");
        commandBuilder.set("#ItemList[" + i + "].Text", items.get(i).getName());
    }

    // Inline element creation
    commandBuilder.appendInline("#Container",
        "Group { LayoutMode: Left; Anchor: (Bottom: 0); }");
    commandBuilder.appendInline("#Messages",
        "Label { Text: %error.noItems; Style: (Alignment: Center); }");

    // Set dropdown entries
    List<DropdownEntryInfo> options = new ArrayList<>();
    options.add(new DropdownEntryInfo(
        LocalizableString.fromString("Option 1"), "opt1"));
    options.add(new DropdownEntryInfo(
        LocalizableString.fromString("Option 2"), "opt2"));
    commandBuilder.set("#Dropdown.Entries", options);
    commandBuilder.set("#Dropdown.Value", "opt1");

    // Set item slots
    commandBuilder.set("#ItemSlot.Slots", new ItemGridSlot[] {
        new ItemGridSlot(new ItemStack("Tool_Sword_Wood", 1))
    });
}
```

## UIEventBuilder Usage[^2]

Bind events to elements:

```java
// Button click
eventBuilder.addEventBinding(
    CustomUIEventBindingType.Activating,
    "#MyButton",
    EventData.of("Action", "submit")
);

// Right-click
eventBuilder.addEventBinding(
    CustomUIEventBindingType.RightClicking,
    "#Item",
    EventData.of("ItemAction", "inspect")
);

// Input value change (with @ prefix to read value)
eventBuilder.addEventBinding(
    CustomUIEventBindingType.ValueChanged,
    "#SearchInput",
    EventData.of("@SearchQuery", "#SearchInput.Value"),
    false  // Don't trigger rebuild
);

// Dropdown selection
eventBuilder.addEventBinding(
    CustomUIEventBindingType.ValueChanged,
    "#CategoryDropdown",
    EventData.of("@Category", "#CategoryDropdown.Value")
);
```

## Event Types[^3]

| Event | Description |
|-------|-------------|
| `Activating` | Element clicked/activated |
| `RightClicking` | Right-click on element |
| `DoubleClicking` | Double-click |
| `MouseEntered` | Mouse enters element |
| `MouseExited` | Mouse exits element |
| `ValueChanged` | Input value changed |
| `ElementReordered` | Element order changed |
| `Validating` | Input validation |
| `Dismissing` | Page being dismissed |
| `FocusGained` | Element gained focus |
| `FocusLost` | Element lost focus |
| `KeyDown` | Key pressed |
| `MouseButtonReleased` | Mouse button released |
| `SlotClicking` | Item slot clicked |
| `SlotDoubleClicking` | Item slot double-clicked |
| `SlotMouseEntered` | Mouse entered slot |
| `SlotMouseExited` | Mouse exited slot |
| `DragCancelled` | Drag operation cancelled |
| `Dropped` | Item dropped |
| `SlotMouseDragCompleted` | Slot drag completed |
| `SlotMouseDragExited` | Mouse exited during slot drag |
| `SlotClickReleaseWhileDragging` | Click released while dragging slot |
| `SlotClickPressWhileDragging` | Click pressed while dragging slot |
| `SelectedTabChanged` | Tab selection changed |

## Handling Events[^4]

```java
public static class MyPageData {
    public static final BuilderCodec<MyPageData> CODEC = BuilderCodec
        .<MyPageData>builder(MyPageData.class, MyPageData::new)
        .addField(new KeyedCodec<>("Action", Codec.STRING),
            (d, s) -> d.action = s, d -> d.action)
        .addField(new KeyedCodec<>("@SearchQuery", Codec.STRING),
            (d, s) -> d.searchQuery = s, d -> d.searchQuery)
        .build();

    private String action;
    private String searchQuery;
}

@Override
public void handleDataEvent(@Nonnull Ref<EntityStore> ref,
                           @Nonnull Store<EntityStore> store,
                           @Nonnull MyPageData data) {
    if ("submit".equals(data.action)) {
        // Handle submit button
    }

    if (data.searchQuery != null) {
        // Handle search input change
        UICommandBuilder cmd = new UICommandBuilder();
        // Update UI...
        this.sendUpdate(cmd);
    }
}
```

## Complete Example

**MyPage.ui:**
```
$C = "../Common.ui";

$C.@PageOverlay {
  $C.@Container {
    Anchor: (Width: 500, Height: 400);

    #Header {
      Group {
        $C.@Title {
          @Text = "My Custom Page";
        }
      }
    }

    #Content {
      LayoutMode: Top;
      Padding: (Left: 10, Right: 10);

      Group #SearchSection {
        Anchor: (Height: 40);
        LayoutMode: Left;

        $C.@TextInput #SearchInput {
          Anchor: (Width: 300);
        }
      }

      Group #ResultsList {
        LayoutMode: TopScrolling;
        FlexWeight: 1;
        ScrollbarStyle: $C.@DefaultScrollbarStyle;
      }
    }
  }
}

$C.@BackButton {}
```

**MyPage.java:**
```java
public class MyPage extends InteractiveCustomUIPage<MyPage.PageData> {

    public MyPage(@Nonnull PlayerRef playerRef) {
        super(playerRef, CustomPageLifetime.CanDismiss, PageData.CODEC);
    }

    @Override
    public void build(@Nonnull Ref<EntityStore> ref,
                      @Nonnull UICommandBuilder commandBuilder,
                      @Nonnull UIEventBuilder eventBuilder,
                      @Nonnull Store<EntityStore> store) {
        commandBuilder.append("Pages/MyPage.ui");

        eventBuilder.addEventBinding(
            CustomUIEventBindingType.ValueChanged,
            "#SearchInput",
            EventData.of("@Query", "#SearchInput.Value"),
            false
        );

        buildResults(commandBuilder, eventBuilder, "");
    }

    private void buildResults(UICommandBuilder cmd,
                              UIEventBuilder events,
                              String query) {
        cmd.clear("#ResultsList");

        List<String> results = getResults(query);
        for (int i = 0; i < results.size(); i++) {
            cmd.append("#ResultsList", "Pages/ResultItem.ui");
            cmd.set("#ResultsList[" + i + "] #Name.Text", results.get(i));
            events.addEventBinding(
                CustomUIEventBindingType.Activating,
                "#ResultsList[" + i + "]",
                EventData.of("Select", results.get(i))
            );
        }
    }

    @Override
    public void handleDataEvent(@Nonnull Ref<EntityStore> ref,
                                @Nonnull Store<EntityStore> store,
                                @Nonnull PageData data) {
        if (data.query != null) {
            UICommandBuilder cmd = new UICommandBuilder();
            UIEventBuilder events = new UIEventBuilder();
            buildResults(cmd, events, data.query);
            this.sendUpdate(cmd, events, false);
        }

        if (data.select != null) {
            // Handle selection
        }
    }

    public static class PageData {
        public static final BuilderCodec<PageData> CODEC = BuilderCodec
            .<PageData>builder(PageData.class, PageData::new)
            .addField(new KeyedCodec<>("@Query", Codec.STRING),
                (d, s) -> d.query = s, d -> d.query)
            .addField(new KeyedCodec<>("Select", Codec.STRING),
                (d, s) -> d.select = s, d -> d.select)
            .build();

        private String query;
        private String select;
    }
}
```

## See Also

- [CustomUIPage API](/api/CustomUIPage) - Base class for custom pages
- [UICommandBuilder API](/api/UICommandBuilder) - UI manipulation methods
- [UIEventBuilder API](/api/UIEventBuilder) - Event binding methods
- [Creating a Plugin](/getting-started/plugin) - Plugin setup guide

[^1]: See [UICommandBuilder API](/api/UICommandBuilder) for all methods including `append()`, `appendInline()`, `set()`, `clear()`, `remove()`, `insertBefore()`

[^2]: See [UIEventBuilder API](/api/UIEventBuilder) for `addEventBinding()` overloads with optional `EventData` and `locksInterface` parameters

[^3]: Event types are from `CustomUIEventBindingType` enum in `com.hypixel.hytale.protocol.packets.interface_`

[^4]: `InteractiveCustomUIPage<T>` requires a `BuilderCodec<T>` for event data - see [InteractiveCustomUIPage API](/api/InteractiveCustomUIPage) for the constructor signature and `handleDataEvent()` method
