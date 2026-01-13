# DeathComponent

**Package:** `com.hypixel.hytale.server.core.modules.entity.damage`

**Type:** class

**Implements:** `Component`

## Constructors

```java
protected DeathComponent(@Nonnull Damage deathInfo)
```

```java
protected DeathComponent()
```

## Static Fields

| Name | Type |
|------|------|
| `CODEC` | `BuilderCodec` |

## Fields

| Name | Type |
|------|------|
| `deathCause` | `String` |
| `deathMessage` | `Message` |
| `showDeathMenu` | `boolean` |
| `itemsLostOnDeath` | `ItemStack[]` |
| `itemsAmountLossPercentage` | `double` |
| `itemsDurabilityLossPercentage` | `double` |
| `displayDataOnDeathScreen` | `boolean` |
| `deathInfo` | `Damage` |
| `interactionChain` | `InteractionChain` |

## Static Methods

| Method | Returns |
|--------|--------|
| `getComponentType()` | `ComponentType` |
| `tryAddComponent(@Nonnull CommandBuffer commandBuffer, @Nonnull Ref ref, @Nonnull Damage damage)` | `void` |
| `tryAddComponent(@Nonnull Store store, @Nonnull Ref ref, @Nonnull Damage damage)` | `void` |

## Methods

| Method | Returns |
|--------|--------|
| `getDeathCause()` | `DamageCause` |
| `getDeathMessage()` | `Message` |
| `setDeathMessage(@Nullable Message deathMessage)` | `void` |
| `isShowDeathMenu()` | `boolean` |
| `setShowDeathMenu(boolean showDeathMenu)` | `void` |
| `getItemsLostOnDeath()` | `ItemStack[]` |
| `setItemsLostOnDeath(List itemsLostOnDeath)` | `void` |
| `getItemsAmountLossPercentage()` | `double` |
| `setItemsAmountLossPercentage(double itemsAmountLossPercentage)` | `void` |
| `getItemsDurabilityLossPercentage()` | `double` |
| `setItemsDurabilityLossPercentage(double itemsDurabilityLossPercentage)` | `void` |
| `displayDataOnDeathScreen()` | `boolean` |
| `setDisplayDataOnDeathScreen(boolean displayDataOnDeathScreen)` | `void` |
| `getDeathInfo()` | `Damage` |
| `setItemsLossMode(DeathConfig.ItemsLossMode itemsLossMode)` | `void` |
| `getDeathItemLoss()` | `DeathItemLoss` |
| `DeathItemLoss(this.itemsLossMode, this.itemsLostOnDeath, this.itemsAmountLossPercentage, this.itemsDurabilityLossPercentage)` | `return new` |
| `getInteractionChain()` | `InteractionChain` |
| `setInteractionChain(@Nullable InteractionChain interactionChain)` | `void` |
| `clone()` | `Component` |

