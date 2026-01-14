# ItemContainer

**Package:** `com.hypixel.hytale.server.core.inventory.container`

**Type:** abstract class

## Constructors

```java
public ItemContainer()
```

## Static Fields

| Name | Type |
|------|------|
| `CODEC` | `CodecMapCodec` |
| `DEFAULT_ADD_ALL_OR_NOTHING` | `boolean` |
| `DEFAULT_REMOVE_ALL_OR_NOTHING` | `boolean` |
| `DEFAULT_FULL_STACKS` | `boolean` |
| `DEFAULT_EXACT_AMOUNT` | `boolean` |
| `DEFAULT_FILTER` | `boolean` |
| `LOGGER` | `HytaleLogger` |

## Fields

| Name | Type |
|------|------|
| `externalChangeEventRegistry` | `SyncEventBusRegistry` |
| `internalChangeEventRegistry` | `SyncEventBusRegistry` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getMatchingResourceType(@Nonnull Item item, @Nonnull String resourceId)` | `ItemResourceType` |
| `validateQuantity(int quantity)` | `void` |
| `validateSlotIndex(short slot, int capacity)` | `void` |
| `copy(@Nonnull ItemContainer from, @Nonnull ItemContainer to, @Nullable List remainder)` | `ItemContainer` |
| `ensureContainerCapacity(@Nullable ItemContainer inputContainer, short capacity, @Nonnull Short2ObjectConcurrentHashMap.ShortFunction newContainerSupplier, List remainder)` | `ItemContainer` |
| `getNewContainer(short capacity, @Nonnull Short2ObjectConcurrentHashMap.ShortFunction supplier)` | `ItemContainer` |
| `TempItemData(ItemStack itemStack, Item item)` | `record` |
| `ItemContainerChangeEvent(ItemContainer container, Transaction transaction)` | `record` |

## Methods

| Method | Returns |
|--------|--------|
| `getCapacity()` | `abstract short` |
| `setGlobalFilter(FilterType var1)` | `abstract void` |
| `setSlotFilter(FilterActionType var1, short var2, SlotFilter var3)` | `abstract void` |
| `clone()` | `abstract ItemContainer` |
| `readAction(Supplier var1)` | `abstract Object` |
| `readAction(Function var1, Object var2)` | `abstract Object` |
| `writeAction(Supplier var1)` | `abstract Object` |
| `writeAction(Function var1, Object var2)` | `abstract Object` |
| `internal_clear()` | `abstract ClearTransaction` |
| `internal_getSlot(short var1)` | `abstract ItemStack` |
| `internal_setSlot(short var1, ItemStack var2)` | `abstract ItemStack` |
| `internal_removeSlot(short var1)` | `abstract ItemStack` |
| `cantAddToSlot(short var1, ItemStack var2, ItemStack var3)` | `abstract boolean` |
| `cantRemoveFromSlot(short var1)` | `abstract boolean` |
| `cantDropFromSlot(short var1)` | `abstract boolean` |
| `cantMoveToSlot(ItemContainer var1, short var2)` | `abstract boolean` |
| `toPacket()` | `InventorySection` |
| `toProtocolMap()` | `Map` |
| `registerChangeEvent(@Nonnull Consumer consumer)` | `EventRegistration` |
| `registerChangeEvent(@Nonnull EventPriority priority, @Nonnull Consumer consumer)` | `EventRegistration` |
| `registerChangeEvent(short priority, @Nonnull Consumer consumer)` | `EventRegistration` |
| `clear()` | `ClearTransaction` |
| `canAddItemStackToSlot(short slot, @Nonnull ItemStack itemStack, boolean allOrNothing, boolean filter)` | `boolean` |
| `addItemStackToSlot(short slot, @Nonnull ItemStack itemStack)` | `ItemStackSlotTransaction` |
| `addItemStackToSlot(short slot, @Nonnull ItemStack itemStack, boolean allOrNothing, boolean filter)` | `ItemStackSlotTransaction` |
| `setItemStackForSlot(short slot, ItemStack itemStack)` | `ItemStackSlotTransaction` |
| `setItemStackForSlot(short slot, ItemStack itemStack, boolean filter)` | `ItemStackSlotTransaction` |
| `getItemStack(short slot)` | `ItemStack` |
| `replaceItemStackInSlot(short slot, ItemStack itemStackToRemove, ItemStack itemStack)` | `ItemStackSlotTransaction` |
| `replaceAll(SlotReplacementFunction func)` | `ListTransaction` |
| `replaceAll(SlotReplacementFunction func, boolean ignoreEmpty)` | `ListTransaction` |
| `ListTransaction(true, transactionsList)` | `return new` |
| `internal_replaceItemStack(short slot, @Nullable ItemStack itemStackToRemove, ItemStack itemStack)` | `ItemStackSlotTransaction` |
| `ItemStackSlotTransaction(true, ActionType.REPLACE, slot, slotItemStack, itemStack, slotItemStack, true, false, false, false, itemStack, (ItemStack)` | `return new` |
| `ItemStackSlotTransaction(false, ActionType.REPLACE, slot, slotItemStack, slotItemStack, (ItemStack)` | `return new` |
| `removeItemStackFromSlot(short slot)` | `SlotTransaction` |
| `removeItemStackFromSlot(short slot, boolean filter)` | `SlotTransaction` |
| `removeItemStackFromSlot(short slot, int quantityToRemove)` | `ItemStackSlotTransaction` |
| `removeItemStackFromSlot(short slot, int quantityToRemove, boolean allOrNothing, boolean filter)` | `ItemStackSlotTransaction` |
| `internal_removeItemStack(short slot, int quantityToRemove)` | `ItemStackSlotTransaction` |
| `removeItemStackFromSlot(short slot, ItemStack itemStackToRemove, int quantityToRemove)` | `ItemStackSlotTransaction` |
| `removeItemStackFromSlot(short slot, ItemStack itemStackToRemove, int quantityToRemove, boolean allOrNothing, boolean filter)` | `ItemStackSlotTransaction` |
| `removeMaterialFromSlot(short slot, @Nonnull MaterialQuantity material)` | `MaterialSlotTransaction` |
| `removeMaterialFromSlot(short slot, @Nonnull MaterialQuantity material, boolean allOrNothing, boolean exactAmount, boolean filter)` | `MaterialSlotTransaction` |
| `removeResourceFromSlot(short slot, @Nonnull ResourceQuantity resource)` | `ResourceSlotTransaction` |
| `removeResourceFromSlot(short slot, @Nonnull ResourceQuantity resource, boolean allOrNothing, boolean exactAmount, boolean filter)` | `ResourceSlotTransaction` |
| `removeTagFromSlot(short slot, int tagIndex, int quantity)` | `TagSlotTransaction` |
| `removeTagFromSlot(short slot, int tagIndex, int quantity, boolean allOrNothing, boolean filter)` | `TagSlotTransaction` |
| `moveItemStackFromSlot(short slot, @Nonnull ItemContainer containerTo)` | `MoveTransaction` |
| `moveItemStackFromSlot(short slot, @Nonnull ItemContainer containerTo, boolean filter)` | `MoveTransaction` |
| `moveItemStackFromSlot(short slot, @Nonnull ItemContainer containerTo, boolean allOrNothing, boolean filter)` | `MoveTransaction` |
| `internal_moveItemStackFromSlot(short slot, @Nonnull ItemContainer containerTo, boolean allOrNothing, boolean filter)` | `MoveTransaction` |
| `MoveTransaction(false, slotTransaction, MoveType.MOVE_FROM_SELF, containerTo, ItemStackTransaction.FAILED_ADD)` | `return new` |
| `MoveTransaction(addTransaction.succeeded()` | `return new` |
| `moveItemStackFromSlot(short slot, int quantity, @Nonnull ItemContainer containerTo)` | `MoveTransaction` |
| `moveItemStackFromSlot(short slot, int quantity, @Nonnull ItemContainer containerTo, boolean allOrNothing, boolean filter)` | `MoveTransaction` |
| `internal_moveItemStackFromSlot(short slot, int quantity, @Nonnull ItemContainer containerTo, boolean allOrNothing, boolean filter)` | `MoveTransaction` |
| `moveItemStackFromSlot(short slot, ItemContainer... containerTo)` | `ListTransaction` |
| `moveItemStackFromSlot(short slot, boolean allOrNothing, boolean filter, @Nonnull ItemContainer... containerTo)` | `ListTransaction` |
| `internal_moveItemStackFromSlot(short slot, boolean allOrNothing, boolean filter, @Nonnull ItemContainer[] containerTo)` | `ListTransaction` |
| `ListTransaction(!transactions.isEmpty()` | `return new` |
| `moveItemStackFromSlot(short slot, int quantity, ItemContainer... containerTo)` | `ListTransaction` |
| `moveItemStackFromSlot(short slot, int quantity, boolean allOrNothing, boolean filter, @Nonnull ItemContainer... containerTo)` | `ListTransaction` |
| `internal_moveItemStackFromSlot(short slot, int quantity, boolean allOrNothing, boolean filter, @Nonnull ItemContainer[] containerTo)` | `ListTransaction` |
| `moveItemStackFromSlotToSlot(short slot, int quantity, @Nonnull ItemContainer containerTo, short slotTo)` | `MoveTransaction` |
| `moveItemStackFromSlotToSlot(short slot, int quantity, @Nonnull ItemContainer containerTo, short slotTo, boolean filter)` | `MoveTransaction` |
| `internal_moveItemStackFromSlot(short slot, int quantity, @Nonnull ItemContainer containerTo, short slotTo, boolean filter)` | `MoveTransaction` |
| `MoveTransaction(false, slotTransaction, MoveType.MOVE_FROM_SELF, containerTo, SlotTransaction.FAILED_ADD)` | `return new` |
| `MoveTransaction(false, fromTransaction, MoveType.MOVE_FROM_SELF, containerTo, SlotTransaction.FAILED_ADD)` | `return new` |
| `MoveTransaction(true, fromTransaction, MoveType.MOVE_FROM_SELF, containerTo, SlotTransaction.FAILED_ADD)` | `return new` |
| `MoveTransaction(false, slotTransaction, MoveType.MOVE_FROM_SELF, containerTo, addTransaction)` | `return new` |
| `MoveTransaction(true, fromTransaction, MoveType.MOVE_FROM_SELF, containerTo, addTransaction)` | `return new` |
| `MoveTransaction(true, from, MoveType.MOVE_FROM_SELF, containerTo, to)` | `return new` |
| `moveAllItemStacksTo(ItemContainer... containerTo)` | `ListTransaction` |
| `moveAllItemStacksTo(Predicate itemPredicate, ItemContainer... containerTo)` | `ListTransaction` |
| `internal_moveAllItemStacksTo(@Nullable Predicate itemPredicate, ItemContainer[] containerTo)` | `ListTransaction` |
| `ListTransaction(true, transactions)` | `return new` |
| `quickStackTo(@Nonnull ItemContainer... containerTo)` | `ListTransaction` |
| `combineItemStacksIntoSlot(@Nonnull ItemContainer containerTo, short slotTo)` | `ListTransaction` |
| `internal_combineItemStacksIntoSlot(@Nonnull ItemContainer containerTo, short slotTo)` | `ListTransaction` |
| `ListTransaction(true, list)` | `return new` |
| `ListTransaction(false, Collections.emptyList()` | `return new` |
| `swapItems(short srcPos, @Nonnull ItemContainer containerTo, short destPos, short length)` | `ListTransaction` |
| `internal_swapItems(short srcPos, @Nonnull ItemContainer containerTo, short destPos, short length)` | `ListTransaction` |
| `internal_swapItems(@Nonnull ItemContainer containerTo, short slotFrom, short slotTo)` | `MoveTransaction` |
| `canAddItemStack(@Nonnull ItemStack itemStack)` | `boolean` |
| `canAddItemStack(@Nonnull ItemStack itemStack, boolean fullStacks, boolean filter)` | `boolean` |
| `addItemStack(@Nonnull ItemStack itemStack)` | `ItemStackTransaction` |
| `addItemStack(@Nonnull ItemStack itemStack, boolean allOrNothing, boolean fullStacks, boolean filter)` | `ItemStackTransaction` |
| `canAddItemStacks(List itemStacks)` | `boolean` |
| `canAddItemStacks(@Nullable List itemStacks, boolean fullStacks, boolean filter)` | `boolean` |
| `addItemStacks(List itemStacks)` | `ListTransaction` |
| `addItemStacks(@Nullable List itemStacks, boolean allOrNothing, boolean fullStacks, boolean filter)` | `ListTransaction` |
| `addItemStacksOrdered(List itemStacks)` | `ListTransaction` |
| `addItemStacksOrdered(short offset, List itemStacks)` | `ListTransaction` |
| `addItemStacksOrdered(List itemStacks, boolean allOrNothing, boolean filter)` | `ListTransaction` |
| `addItemStacksOrdered(short offset, @Nullable List itemStacks, boolean allOrNothing, boolean filter)` | `ListTransaction` |
| `canRemoveItemStack(ItemStack itemStack)` | `boolean` |
| `canRemoveItemStack(@Nullable ItemStack itemStack, boolean exactAmount, boolean filter)` | `boolean` |
| `removeItemStack(@Nonnull ItemStack itemStack)` | `ItemStackTransaction` |
| `removeItemStack(@Nonnull ItemStack itemStack, boolean allOrNothing, boolean filter)` | `ItemStackTransaction` |
| `canRemoveItemStacks(List itemStacks)` | `boolean` |
| `canRemoveItemStacks(@Nullable List itemStacks, boolean exactAmount, boolean filter)` | `boolean` |
| `removeItemStacks(List itemStacks)` | `ListTransaction` |
| `removeItemStacks(@Nullable List itemStacks, boolean allOrNothing, boolean filter)` | `ListTransaction` |
| `canRemoveTag(int tagIndex, int quantity)` | `boolean` |
| `canRemoveTag(int tagIndex, int quantity, boolean exactAmount, boolean filter)` | `boolean` |
| `removeTag(int tagIndex, int quantity)` | `TagTransaction` |
| `removeTag(int tagIndex, int quantity, boolean allOrNothing, boolean exactAmount, boolean filter)` | `TagTransaction` |
| `canRemoveResource(ResourceQuantity resource)` | `boolean` |
| `canRemoveResource(@Nullable ResourceQuantity resource, boolean exactAmount, boolean filter)` | `boolean` |
| `removeResource(@Nonnull ResourceQuantity resource)` | `ResourceTransaction` |
| `removeResource(@Nonnull ResourceQuantity resource, boolean allOrNothing, boolean exactAmount, boolean filter)` | `ResourceTransaction` |
| `canRemoveResources(List resources)` | `boolean` |
| `canRemoveResources(@Nullable List resources, boolean exactAmount, boolean filter)` | `boolean` |
| `removeResources(List resources)` | `ListTransaction` |
| `removeResources(@Nullable List resources, boolean allOrNothing, boolean exactAmount, boolean filter)` | `ListTransaction` |
| `canRemoveMaterial(MaterialQuantity material)` | `boolean` |
| `canRemoveMaterial(@Nullable MaterialQuantity material, boolean exactAmount, boolean filter)` | `boolean` |
| `removeMaterial(@Nonnull MaterialQuantity material)` | `MaterialTransaction` |
| `removeMaterial(@Nonnull MaterialQuantity material, boolean allOrNothing, boolean exactAmount, boolean filter)` | `MaterialTransaction` |
| `canRemoveMaterials(List materials)` | `boolean` |
| `canRemoveMaterials(@Nullable List materials, boolean exactAmount, boolean filter)` | `boolean` |
| `getSlotMaterialsToRemove(@Nullable List materials, boolean exactAmount, boolean filter)` | `List` |
| `removeMaterials(List materials)` | `ListTransaction` |
| `removeMaterials(@Nullable List materials, boolean allOrNothing, boolean exactAmount, boolean filter)` | `ListTransaction` |
| `removeMaterialsOrdered(short offset, List materials)` | `ListTransaction` |
| `removeMaterialsOrdered(List materials, boolean allOrNothing, boolean exactAmount, boolean filter)` | `ListTransaction` |
| `removeMaterialsOrdered(short offset, @Nullable List materials, boolean allOrNothing, boolean exactAmount, boolean filter)` | `ListTransaction` |
| `isEmpty()` | `boolean` |
| `countItemStacks(@Nonnull Predicate itemPredicate)` | `int` |
| `containsItemStacksStackableWith(@Nonnull ItemStack itemStack)` | `boolean` |
| `forEach(@Nonnull ShortObjectConsumer action)` | `void` |
| `forEachWithMeta(@Nonnull Short2ObjectConcurrentHashMap.ShortBiObjConsumer consumer, Object meta)` | `void` |
| `removeAllItemStacks()` | `List` |
| `dropAllItemStacks()` | `List` |
| `dropAllItemStacks(boolean filter)` | `List` |
| `sortItems(@Nonnull SortType sort)` | `ListTransaction` |
| `internal_sortItems(@Nonnull SortType sort)` | `ListTransaction` |
| `sendUpdate(@Nonnull Transaction transaction)` | `void` |
| `containsContainer(ItemContainer itemContainer)` | `boolean` |
| `doMigration(Function blockMigration)` | `void` |
| `toString()` | `String` |

