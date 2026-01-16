# ServerFileBrowser

**Package:** `com.hypixel.hytale.server.core.ui.browser`

**Type:** class

## Constructors

```java
public ServerFileBrowser(@Nonnull FileBrowserConfig config)
```

```java
public ServerFileBrowser(@Nonnull FileBrowserConfig config, @Nullable Path initialRoot, @Nullable Path initialDir)
```

## Static Fields

| Name | Type |
|------|------|
| `LOGGER` | `HytaleLogger` |
| `BUTTON_HIGHLIGHTED` | `Value` |

## Fields

| Name | Type |
|------|------|
| `config` | `FileBrowserConfig` |
| `root` | `Path` |
| `currentDir` | `Path` |
| `searchQuery` | `String` |
| `selectedItems` | `Set` |

## Methods

| Method | Returns |
|--------|--------|
| `buildRootSelector(@Nonnull UICommandBuilder commandBuilder, @Nonnull UIEventBuilder eventBuilder)` | `void` |
| `buildSearchInput(@Nonnull UICommandBuilder commandBuilder, @Nonnull UIEventBuilder eventBuilder)` | `void` |
| `buildCurrentPath(@Nonnull UICommandBuilder commandBuilder)` | `void` |
| `buildFileList(@Nonnull UICommandBuilder commandBuilder, @Nonnull UIEventBuilder eventBuilder)` | `void` |
| `buildUI(@Nonnull UICommandBuilder commandBuilder, @Nonnull UIEventBuilder eventBuilder)` | `void` |
| `handleEvent(@Nonnull FileBrowserEventData data)` | `boolean` |
| `buildDirectoryListing()` | `List` |
| `buildSearchResults()` | `List` |
| `visitFile(@Nonnull Path file, @Nonnull BasicFileAttributes attrs)` | `FileVisitResult` |
| `matchesExtension(@Nonnull String fileName)` | `boolean` |
| `removeExtensions(@Nonnull String fileName)` | `String` |
| `getRoot()` | `Path` |
| `setRoot(@Nonnull Path root)` | `void` |
| `getCurrentDir()` | `Path` |
| `setCurrentDir(@Nonnull Path currentDir)` | `void` |
| `getSearchQuery()` | `String` |
| `setSearchQuery(@Nonnull String searchQuery)` | `void` |
| `navigateUp()` | `void` |
| `navigateTo(@Nonnull Path relativePath)` | `void` |
| `getSelectedItems()` | `Set` |
| `addSelection(@Nonnull String item)` | `void` |
| `clearSelection()` | `void` |
| `getConfig()` | `FileBrowserConfig` |
| `resolveSecure(@Nonnull String relativePath)` | `Path` |
| `resolveFromCurrent(@Nonnull String fileName)` | `Path` |
| `findConfigRoot(@Nonnull String pathStr)` | `Path` |

