# Inventory

The `Inventory` class manages a player's items including hotbar, armor, and storage.

::: info API Reference
See full API: [Inventory](/api/Inventory) | [ItemStack](/api/ItemStack)
:::

## Overview

Access inventory through the [Player component](/reference/components/player):

```java
Player player = (Player) commandBuffer.getComponent(ref, Player.getComponentType());
Inventory inventory = player.getInventory();
```

## Adding Items

```java
// Add items (finds first available slot)
inventory.addItemStack(new ItemStack("Wood Sword", 1));
inventory.addItemStack(new ItemStack("Apple", 10));

// Add multiple items
ItemStack[] items = {
    new ItemStack("Wood Pickaxe", 1),
    new ItemStack("Torch", 16),
    new ItemStack("Bread", 5)
};
for (ItemStack item : items) {
    inventory.addItemStack(item);
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

## ItemStack

`ItemStack` represents a stack of items:

```java
// Create an item stack
ItemStack sword = new ItemStack("Wood Sword", 1);
ItemStack apples = new ItemStack("Apple", 10);

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
    Inventory inventory = player.getInventory();

    // Weapons
    inventory.addItemStack(new ItemStack("Wood Sword", 1));
    inventory.addItemStack(new ItemStack("Bow", 1));
    inventory.addItemStack(new ItemStack("Arrow", 32));

    // Tools
    inventory.addItemStack(new ItemStack("Wood Pickaxe", 1));
    inventory.addItemStack(new ItemStack("Wood Axe", 1));

    // Resources
    inventory.addItemStack(new ItemStack("Torch", 16));
    inventory.addItemStack(new ItemStack("Apple", 10));
    inventory.addItemStack(new ItemStack("Bread", 10));
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
