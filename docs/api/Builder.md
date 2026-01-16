# Builder

**Package:** `com.hypixel.hytale.server.core.ui.browser`

**Type:** class

## Fields

| Name | Type |
|------|------|
| `listElementId` | `String` |
| `rootSelectorId` | `String` |
| `searchInputId` | `String` |
| `currentPathId` | `String` |
| `roots` | `List` |
| `allowedExtensions` | `Set` |
| `enableRootSelector` | `boolean` |
| `enableSearch` | `boolean` |
| `enableDirectoryNav` | `boolean` |
| `enableMultiSelect` | `boolean` |
| `maxResults` | `int` |
| `customProvider` | `FileListProvider` |

## Static Methods

| Method | Returns |
|--------|--------|
| `builder()` | `Builder` |
| `RootEntry(@Nonnull LocalizableString displayName, @Nonnull Path path)` | `record` |

## Methods

| Method | Returns |
|--------|--------|
| `FileBrowserConfig(@Nonnull String listElementId, @Nullable String rootSelectorId, @Nullable String searchInputId, @Nullable String currentPathId, @Nonnull List roots, @Nonnull Set allowedExtensions, boolean enableRootSelector, boolean enableSearch, boolean enableDirectoryNav, boolean enableMultiSelect, int maxResults, @Nullable FileListProvider customProvider)` | `record` |
| `RootEntry(@Nonnull String displayName, @Nonnull Path path)` | `public` |
| `listElementId(@Nonnull String listElementId)` | `Builder` |
| `rootSelectorId(@Nullable String rootSelectorId)` | `Builder` |
| `searchInputId(@Nullable String searchInputId)` | `Builder` |
| `currentPathId(@Nullable String currentPathId)` | `Builder` |
| `roots(@Nonnull List roots)` | `Builder` |
| `allowedExtensions(@Nonnull String... extensions)` | `Builder` |
| `allowedExtensions(@Nonnull Set extensions)` | `Builder` |
| `enableRootSelector(boolean enable)` | `Builder` |
| `enableSearch(boolean enable)` | `Builder` |
| `enableDirectoryNav(boolean enable)` | `Builder` |
| `enableMultiSelect(boolean enable)` | `Builder` |
| `maxResults(int maxResults)` | `Builder` |
| `customProvider(@Nullable FileListProvider provider)` | `Builder` |
| `build()` | `FileBrowserConfig` |
| `FileBrowserConfig(this.listElementId, this.rootSelectorId, this.searchInputId, this.currentPathId, this.roots, this.allowedExtensions, this.enableRootSelector, this.enableSearch, this.enableDirectoryNav, this.enableMultiSelect, this.maxResults, this.customProvider)` | `return new` |

