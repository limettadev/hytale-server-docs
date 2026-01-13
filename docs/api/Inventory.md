# Inventory

**Package:** `com.hypixel.hytale.server.core.inventory`

**Type:** class

**Implements:** `NetworkSerializable`

## Constructors

```java
private Inventory(Void dummy)
```

```java
public Inventory()
```

```java
public Inventory(short storageCapacity, short armorCapacity, short hotbarCapacity, short utilityCapacity, short toolCapacity)
```

```java
public Inventory(ItemContainer storage, ItemContainer armor, ItemContainer hotbar, ItemContainer utility, ItemContainer tools, ItemContainer backpack)
```

## Static Fields

| Name | Type |
|------|------|
| `DEFAULT_HOTBAR_CAPACITY` | `short` |
| `DEFAULT_UTILITY_CAPACITY` | `short` |
| `DEFAULT_TOOLS_CAPACITY` | `short` |
| `DEFAULT_ARMOR_CAPACITY` | `short` |
| `DEFAULT_STORAGE_ROWS` | `short` |
| `DEFAULT_STORAGE_COLUMNS` | `short` |
| `DEFAULT_STORAGE_CAPACITY` | `short` |
| `HOTBAR_SECTION_ID` | `int` |
| `STORAGE_SECTION_ID` | `int` |
| `ARMOR_SECTION_ID` | `int` |
| `UTILITY_SECTION_ID` | `int` |
| `TOOLS_SECTION_ID` | `int` |
| `BACKPACK_SECTION_ID` | `int` |
| `INACTIVE_SLOT_INDEX` | `byte` |
| `VERSION` | `int` |
| `CODEC` | `BuilderCodec` |

## Fields

| Name | Type |
|------|------|
| `isDirty` | `AtomicBoolean` |
| `needsSaving` | `AtomicBoolean` |
| `storage` | `ItemContainer` |
| `armor` | `ItemContainer` |
| `hotbar` | `ItemContainer` |
| `utility` | `ItemContainer` |
| `tools` | `ItemContainer` |
| `backpack` | `ItemContainer` |
| `combinedHotbarFirst` | `CombinedItemContainer` |
| `combinedStorageFirst` | `CombinedItemContainer` |
| `combinedBackpackStorageHotbar` | `CombinedItemContainer` |
| `combinedStorageHotbarBackpack` | `CombinedItemContainer` |
| `combinedArmorHotbarStorage` | `CombinedItemContainer` |
| `combinedArmorHotbarUtilityStorage` | `CombinedItemContainer` |
| `combinedHotbarUtilityConsumableStorage` | `CombinedItemContainer` |
| `combinedEverything` | `CombinedItemContainer` |
| `activeHotbarSlot` | `byte` |
| `activeUtilitySlot` | `byte` |
| `activeToolsSlot` | `byte` |
| `entity` | `LivingEntity` |
| `sortType` | `SortType` |
| `armorChange` | `EventRegistration` |
| `storageChange` | `EventRegistration` |
| `hotbarChange` | `EventRegistration` |
| `utilityChange` | `EventRegistration` |
| `toolChange` | `EventRegistration` |
| `backpackChange` | `EventRegistration` |
| `_usingToolsItem` | `boolean` |

## Static Methods

| Method | Returns |
|--------|--------|
| `ensureCapacity(@Nonnull Inventory inventory, List remainder)` | `Inventory` |

## Methods

| Method | Returns |
|--------|--------|
| `registerChangeEvents()` | `void` |
| `registerBackpackListener()` | `void` |
| `unregister()` | `void` |
| `unregisterBackpackChange()` | `void` |
| `markChanged()` | `void` |
| `moveItem(int fromSectionId, int fromSlotId, int quantity, int toSectionId, int toSlotId)` | `void` |
| `smartMoveItem(int fromSectionId, int fromSlotId, int quantity, @Nonnull SmartMoveType moveType)` | `void` |
| `takeAll(int inventorySectionId)` | `ListTransaction` |
| `putAll(int inventorySectionId)` | `ListTransaction` |
| `quickStack(int inventorySectionId)` | `ListTransaction` |
| `dropAllItemStacks()` | `List` |
| `clear()` | `void` |
| `getStorage()` | `ItemContainer` |
| `getArmor()` | `ItemContainer` |
| `getHotbar()` | `ItemContainer` |
| `getUtility()` | `ItemContainer` |
| `getTools()` | `ItemContainer` |
| `getBackpack()` | `ItemContainer` |
| `resizeBackpack(short capacity, List remainder)` | `void` |
| `getCombinedHotbarFirst()` | `CombinedItemContainer` |
| `getCombinedStorageFirst()` | `CombinedItemContainer` |
| `getCombinedBackpackStorageHotbar()` | `CombinedItemContainer` |
| `getCombinedArmorHotbarStorage()` | `CombinedItemContainer` |
| `getCombinedArmorHotbarUtilityStorage()` | `CombinedItemContainer` |
| `getCombinedHotbarUtilityConsumableStorage()` | `CombinedItemContainer` |
| `getCombinedEverything()` | `CombinedItemContainer` |
| `getContainerForItemPickup(@Nonnull Item item, PlayerSettings playerSettings)` | `ItemContainer` |
| `setActiveSlot(int inventorySectionId, byte slot)` | `void` |
| `getActiveSlot(int inventorySectionId)` | `byte` |
| `getActiveHotbarSlot()` | `byte` |
| `setActiveHotbarSlot(byte slot)` | `void` |
| `getActiveHotbarItem()` | `ItemStack` |
| `getActiveToolItem()` | `ItemStack` |
| `getItemInHand()` | `ItemStack` |
| `getActiveUtilitySlot()` | `byte` |
| `setActiveUtilitySlot(byte slot)` | `void` |
| `getUtilityItem()` | `ItemStack` |
| `getActiveToolsSlot()` | `byte` |
| `setActiveToolsSlot(byte slot)` | `void` |
| `getToolsItem()` | `ItemStack` |
| `getSectionById(int id)` | `ItemContainer` |
| `consumeIsDirty()` | `boolean` |
| `consumeNeedsSaving()` | `boolean` |
| `setEntity(LivingEntity entity)` | `void` |
| `sortStorage(@Nonnull SortType type)` | `void` |
| `setSortType(SortType type)` | `void` |
| `containsBrokenItem()` | `boolean` |
| `toPacket()` | `UpdatePlayerInventory` |
| `doMigration(Function blockMigration)` | `void` |
| `postDecode()` | `void` |
| `buildCombinedContains()` | `void` |
| `equals(@Nullable Object o)` | `boolean` |
| `hashCode()` | `int` |
| `toString()` | `String` |
| `setUsingToolsItem(boolean value)` | `void` |
| `usingToolsItem()` | `boolean` |

