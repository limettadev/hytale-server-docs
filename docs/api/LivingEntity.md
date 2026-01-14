# LivingEntity

**Package:** `com.hypixel.hytale.server.core.entity`

**Type:** abstract class

**Extends:** `Entity`

## Constructors

```java
public LivingEntity()
```

```java
public LivingEntity(@Nonnull World world)
```

## Static Fields

| Name | Type |
|------|------|
| `CODEC` | `BuilderCodec` |
| `DEFAULT_ITEM_THROW_SPEED` | `int` |

## Fields

| Name | Type |
|------|------|
| `statModifiersManager` | `StatModifiersManager` |
| `inventory` | `Inventory` |
| `currentFallDistance` | `double` |
| `armorInventoryChangeEventRegistration` | `EventRegistration` |
| `isEquipmentNetworkOutdated` | `boolean` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getPackedMaterialAndFluidAtBreathingHeight(@Nonnull Ref ref, @Nonnull ComponentAccessor componentAccessor)` | `long` |

## Methods

| Method | Returns |
|--------|--------|
| `createDefaultInventory()` | `abstract Inventory` |
| `canBreathe(@Nonnull Ref ref, @Nonnull BlockMaterial breathingMaterial, int fluidId, @Nonnull ComponentAccessor componentAccessor)` | `boolean` |
| `getInventory()` | `Inventory` |
| `setInventory(Inventory inventory)` | `Inventory` |
| `setInventory(Inventory inventory, boolean ensureCapacity)` | `Inventory` |
| `setInventory(Inventory inventory, boolean ensureCapacity, List remainder)` | `Inventory` |
| `moveTo(@Nonnull Ref ref, double locX, double locY, double locZ, @Nonnull ComponentAccessor componentAccessor)` | `void` |
| `canDecreaseItemStackDurability(@Nonnull Ref ref, @Nonnull ComponentAccessor componentAccessor)` | `boolean` |
| `canApplyItemStackPenalties(Ref ref, ComponentAccessor componentAccessor)` | `boolean` |
| `decreaseItemStackDurability(@Nonnull Ref ref, @Nullable ItemStack itemStack, int inventoryId, int slotId, @Nonnull ComponentAccessor componentAccessor)` | `ItemStackSlotTransaction` |
| `updateItemStackDurability(@Nonnull Ref ref, @Nonnull ItemStack itemStack, ItemContainer container, int slotId, double durabilityChange, @Nonnull ComponentAccessor componentAccessor)` | `ItemStackSlotTransaction` |
| `invalidateEquipmentNetwork()` | `void` |
| `consumeEquipmentNetworkOutdated()` | `boolean` |
| `getStatModifiersManager()` | `StatModifiersManager` |
| `getCurrentFallDistance()` | `double` |
| `setCurrentFallDistance(double currentFallDistance)` | `void` |
| `toString()` | `String` |

