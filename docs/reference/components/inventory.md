# Inventory

The `Inventory` class manages a player's items including hotbar, armor, and storage.

::: info API Reference
See full API: [Inventory](/api/Inventory) | [ItemContainer](/api/ItemContainer) | [ItemStack](/api/ItemStack)
:::

::: tip Concepts
Before reading this, familiarize yourself with [Components](/concepts/components).
:::

## Overview

Access inventory through the [Player component](/reference/components/player):

```java
Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());
Inventory inventory = player.getInventory();
```

## Adding Items[^1]

Items are added through `ItemContainer` objects, not directly on `Inventory`:

```java
// Get a container (adds to hotbar first, then storage)
ItemContainer container = inventory.getCombinedHotbarFirst();

// Add items
container.addItemStack(new ItemStack("Tool_Sword_Wood", 1));
container.addItemStack(new ItemStack("Consumable_Apple", 10));

// Or add directly to specific containers
inventory.getHotbar().addItemStack(new ItemStack("Tool_Pickaxe_Wood", 1));
inventory.getStorage().addItemStack(new ItemStack("Block_Torch", 16));

// Add multiple items
ItemStack[] items = {
    new ItemStack("Tool_Pickaxe_Wood", 1),
    new ItemStack("Block_Torch", 16),
    new ItemStack("Consumable_Bread", 5)
};
for (ItemStack item : items) {
    container.addItemStack(item);
}
```

## Getting Items

```java
// Get item in hand
ItemStack inHand = inventory.getItemInHand();

// Get active slot indices
byte hotbarSlot = inventory.getActiveHotbarSlot();
byte utilitySlot = inventory.getActiveUtilitySlot();
byte toolsSlot = inventory.getActiveToolsSlot();

// Check if contains broken items
boolean hasBroken = inventory.containsBrokenItem();
```

## Item Containers

The inventory has multiple containers:

```java
// Get armor container
ItemContainer armor = inventory.getArmor();

// Get combined container (everything)
CombinedItemContainer everything = inventory.getCombinedEverything();

// Iterate over armor slots
for (short i = 0; i < armor.getCapacity(); i++) {
    ItemStack itemStack = armor.getItemStack(i);
    if (!ItemStack.isEmpty(itemStack)) {
        System.out.println("Armor slot " + i + ": " + itemStack.getItem().getId());
    }
}
```

## Modifying Items

```java
// Clear entire inventory
inventory.clear();

// Drop all items (returns list of dropped items)
List<ItemStack> dropped = inventory.dropAllItemStacks();
```

## ItemStack[^2]

`ItemStack` represents a stack of items:

```java
// Create an item stack
ItemStack sword = new ItemStack("Tool_Sword_Wood", 1);
ItemStack apples = new ItemStack("Consumable_Apple", 10);

// ItemStack properties
Item item = itemStack.getItem();           // The item type
int quantity = itemStack.getQuantity();    // Stack count
boolean broken = itemStack.isBroken();     // Is durability depleted
int durability = itemStack.getDurability();
int maxDurability = itemStack.getMaxDurability();

// Check if empty
if (ItemStack.isEmpty(itemStack)) {
    // Slot is empty or null
}

// Create modified copies
ItemStack moreApples = itemStack.withQuantity(20);
ItemStack damagedSword = itemStack.withIncreasedDurability(-10);
```

## Example: Give Starter Kit

```java
public void giveStarterKit(Player player) {
    // Get container that adds to hotbar first, then storage
    ItemContainer container = player.getInventory().getCombinedHotbarFirst();

    // Weapons
    container.addItemStack(new ItemStack("Tool_Sword_Wood", 1));
    container.addItemStack(new ItemStack("Tool_Bow", 1));
    container.addItemStack(new ItemStack("Ammo_Arrow", 32));

    // Tools
    container.addItemStack(new ItemStack("Tool_Pickaxe_Wood", 1));
    container.addItemStack(new ItemStack("Tool_Axe_Wood", 1));

    // Resources
    container.addItemStack(new ItemStack("Block_Torch", 16));
    container.addItemStack(new ItemStack("Consumable_Apple", 10));
    container.addItemStack(new ItemStack("Consumable_Bread", 10));
}
```

## Example: Check Armor

```java
public void checkArmor(Player player) {
    ItemContainer armor = player.getInventory().getArmor();

    for (short i = 0; i < armor.getCapacity(); i++) {
        ItemStack itemStack = armor.getItemStack(i);

        if (!ItemStack.isEmpty(itemStack)) {
            Item item = itemStack.getItem();
            ItemArmor armorData = item.getArmor();

            if (armorData != null) {
                System.out.println("Slot " + i + ": " + item.getId());

                if (itemStack.isBroken()) {
                    System.out.println("  WARNING: This armor is broken!");
                }
            }
        }
    }
}
```

## Example: Drop Percentage of Items

```java
public List<ItemStack> dropPercentageOfItems(Player player, double percentage) {
    List<ItemStack> toDrop = new ArrayList<>();
    CombinedItemContainer container = player.getInventory().getCombinedEverything();

    for (short i = 0; i < container.getCapacity(); i++) {
        ItemStack itemStack = container.getItemStack(i);

        if (!ItemStack.isEmpty(itemStack) && itemStack.getItem().dropsOnDeath()) {
            int quantityToLose = Math.max(1, (int)(itemStack.getQuantity() * percentage));
            toDrop.add(itemStack.withQuantity(quantityToLose));

            int remaining = itemStack.getQuantity() - quantityToLose;
            if (remaining > 0) {
                container.replaceItemStackInSlot(i, itemStack, itemStack.withQuantity(remaining));
            } else {
                container.removeItemStackFromSlot(i);
            }
        }
    }

    return toDrop;
}
```

## See Also

- [Player Component](/reference/components/player) - Access inventory from player
- [Death Event](/reference/events/death) - Item loss on death
- [Respawn Event](/reference/events/respawn) - Give items on respawn

[^1]: See [ItemContainer API](/api/ItemContainer) for `addItemStack()`, `getItemStack()`, `removeItemStackFromSlot()`, and other item manipulation methods
[^2]: See [ItemStack API](/api/ItemStack) for constructors and methods like `getQuantity()`, `withQuantity()`, `isBroken()`
