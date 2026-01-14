# Damage Event

The damage event fires when an entity takes damage. You can cancel, modify, or react to damage.

::: info API Reference
See full API: [Damage](/api/Damage) | [DamageSystems](/api/DamageSystems) | [DamageModule](/api/DamageModule)
:::

::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events) and [System Groups](/concepts/system-groups).
:::

## Overview

| Property | Value |
|----------|-------|
| Event Class | `Damage` |
| Base Handler | `DamageEventSystem` |
| Cancellable | Yes |
| System Groups | `getFilterDamageGroup()`, `getInspectDamageGroup()` |

## The Damage Class

**Location:** `com.hypixel.hytale.server.core.modules.entity.damage.Damage`

```java
public class Damage extends CancellableEcsEvent {
    Source source;      // Who/what caused damage
    DamageCause cause;  // Type (PHYSICAL, FALL, DROWNING, etc.)
    float amount;       // Damage value
}
```

### Key Methods

| Method | Description |
|--------|-------------|
| `getAmount()`[^1] | Get damage value |
| `setAmount(float)`[^1] | Modify damage value |
| `getSource()`[^1] | Get damage source |
| `getCause()`[^1] | Get damage cause type (**deprecated** - use `getDamageCauseIndex()`) |
| `setCancelled(boolean)` | Cancel the damage (inherited from `CancellableEcsEvent`) |
| `isCancelled()` | Check if cancelled (inherited from `CancellableEcsEvent`) |
| `getMetaStore()`[^1] | Access metadata (knockback, particles, etc.) |

[^1]: See [Damage API](/api/Damage) for full method list

### Damage Sources[^2]

```java
// Check source type
if (damage.getSource() instanceof Damage.EntitySource source) {
    Ref<EntityStore> attackerRef = source.getRef();
    // Damage came from another entity
}

if (damage.getSource() instanceof Damage.ProjectileSource source) {
    Ref<EntityStore> projectileRef = source.getProjectile();  // The projectile entity
    Ref<EntityStore> shooterRef = source.getRef();            // The shooter (inherited from EntitySource)
    // Damage came from a projectile
}

if (damage.getSource() instanceof Damage.EnvironmentSource source) {
    String type = source.getType();  // Environment type string
    // Damage from environment (lava, etc.)
}

if (damage.getSource() == Damage.NULL_SOURCE) {
    // Environmental damage with no specific source (fall, drowning, etc.)
}
```

[^2]: See [Damage API](/api/Damage) for Source inner classes: `EntitySource`, `ProjectileSource`, `EnvironmentSource`, `CommandSource`

### Damage Causes[^3]

`DamageCause` static fields:
- `DamageCause.PHYSICAL` - Melee attacks
- `DamageCause.PROJECTILE` - Arrow/projectile hits
- `DamageCause.COMMAND` - Damage from commands
- `DamageCause.FALL` - Fall damage
- `DamageCause.DROWNING` - Drowning
- `DamageCause.SUFFOCATION` - Stuck in blocks
- `DamageCause.OUT_OF_WORLD` - Fell into void
- `DamageCause.ENVIRONMENT` - Block damage (lava, etc.)

[^3]: See [DamageCause API](/api/DamageCause) for all static fields

## Creating a Handler

### Filter Group (Modify/Cancel)[^4]

Use the filter group to modify or cancel damage **before** it's applied:

[^4]: See [DamageModule API](/api/DamageModule) for `getFilterDamageGroup()`, `getInspectDamageGroup()`, `getGatherDamageGroup()`

```java
package com.example.myplugin;

import com.hypixel.hytale.component.*;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.modules.entity.damage.*;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class MyDamageFilter extends DamageEventSystem {

    private static final Query QUERY = Player.getComponentType();

    @Nonnull
    @Override
    public Query getQuery() {
        return QUERY;
    }

    @Nullable
    @Override
    public SystemGroup getGroup() {
        return DamageModule.get().getFilterDamageGroup();
    }

    @Override
    public void handle(int index, @Nonnull ArchetypeChunk chunk, @Nonnull Store store,
                       @Nonnull CommandBuffer buffer, @Nonnull Damage damage) {

        // Example: Cancel all damage under 5
        if (damage.getAmount() < 5.0f) {
            damage.setCancelled(true);
            return;
        }

        // Example: Reduce fire damage by 50%
        if (damage.getCause() == DamageCause.ENVIRONMENT) {
            damage.setAmount(damage.getAmount() * 0.5f);
        }

        // Example: No PvP damage
        if (damage.getSource() instanceof Damage.EntitySource source) {
            if (buffer.getComponent(source.getRef(), Player.getComponentType()) != null) {
                damage.setCancelled(true);  // Attacker is a player
            }
        }
    }
}
```

### Inspect Group (React)

Use the inspect group to react **after** damage is applied:

```java
public class DamageLogger extends DamageEventSystem {

    @Nullable
    @Override
    public SystemGroup getGroup() {
        return DamageModule.get().getInspectDamageGroup();
    }

    @Nonnull
    @Override
    public Query getQuery() {
        return Player.getComponentType();
    }

    @Override
    public void handle(int index, @Nonnull ArchetypeChunk chunk, @Nonnull Store store,
                       @Nonnull CommandBuffer buffer, @Nonnull Damage damage) {

        Player player = (Player) chunk.getComponent(index, Player.getComponentType());
        System.out.println(player + " took " + damage.getAmount() + " damage");

        // Note: Modifying damage here has no effect - it's already applied!
    }
}
```

## Dispatching Damage[^5]

To deal damage to an entity programmatically:

```java
// Create damage object
Damage damage = new Damage(
    new Damage.EntitySource(attackerRef),  // Source
    DamageCause.PHYSICAL,                   // Cause
    25.0f                                   // Amount
);

// Dispatch the damage event
DamageSystems.executeDamage(targetRef, commandBuffer, damage);
```

[^5]: See [DamageSystems API](/api/DamageSystems) for `executeDamage()` overloads

## Built-in Handlers

The damage system includes these handlers (in order):

**Filter Group:**
- `FilterUnkillable` - Blocks damage to invulnerable entities
- `FilterPlayerWorldConfig` - Checks world damage settings
- `PlayerDamageFilterSystem` - Spawn protection
- `WieldingDamageReduction` - Shield/blocking reduction
- `ArmorDamageReduction` - Armor mitigation

**Inspect Group:**
- `ApplyParticles` - Spawn impact particles
- `ApplySoundEffects` - Play hit sounds
- `HitAnimation` - Play hurt animation
- `DamageArmor` - Degrade armor durability
- `PlayerHitIndicators` - Send damage info to attacker

## Registration

```java
@Override
protected void setup() {
    ComponentRegistryProxy<EntityStore> registry = this.getEntityStoreRegistry();
    registry.registerSystem(new MyDamageFilter());
    registry.registerSystem(new DamageLogger());
}
```

## See Also

- [Event System](/concepts/events) - How events work
- [System Groups](/concepts/system-groups) - Execution order
- [Death Event](/reference/events/death) - Triggered when damage kills
