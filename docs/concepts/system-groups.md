# System Groups

System groups control the **execution order** of event handlers. This is critical for events like damage where you need to filter/modify before the action is applied.

## Damage Event Groups

The damage system has three ordered groups:

```
Gather → Filter → Apply → Inspect
```

| Group | Purpose | Can Cancel? | Can Modify? |
|-------|---------|-------------|-------------|
| **Gather** | Create/calculate damage | - | - |
| **Filter** | Validate, reduce, or cancel damage | Yes | Yes |
| **Inspect** | React after damage is applied | No | No |

### Getting Groups

```java
// In your event handler:
@Override
public SystemGroup getGroup() {
    // Run BEFORE damage is applied (can cancel/modify)
    return DamageModule.get().getFilterDamageGroup();

    // OR run AFTER damage is applied (react only)
    // return DamageModule.get().getInspectDamageGroup();
}
```

## Example: Filter vs Inspect

### Filter Group (Before)
```java
public class ArmorReduction extends DamageEventSystem {
    @Override
    public SystemGroup getGroup() {
        return DamageModule.get().getFilterDamageGroup();  // Before damage applied
    }

    @Override
    public void handle(..., Damage damage) {
        // Reduce damage by 50% - this WILL affect final damage
        damage.setAmount(damage.getAmount() * 0.5f);

        // Or cancel entirely
        if (isInvulnerable) {
            damage.setCancelled(true);
        }
    }
}
```

### Inspect Group (After)
```java
public class DamageLogger extends DamageEventSystem {
    @Override
    public SystemGroup getGroup() {
        return DamageModule.get().getInspectDamageGroup();  // After damage applied
    }

    @Override
    public void handle(..., Damage damage) {
        // Log the damage that was dealt
        System.out.println("Dealt " + damage.getAmount() + " damage");

        // Modifying here has no effect - damage already applied!
    }
}
```

## System Dependencies

For fine-grained ordering within a group, use dependencies:

```java
@Override
public Set getDependencies() {
    return Set.of(
        // Run after this system
        new SystemDependency(Order.AFTER, SomeOtherSystem.class),

        // Run before this system
        new SystemDependency(Order.BEFORE, AnotherSystem.class),

        // Run after an entire group
        new SystemGroupDependency(Order.AFTER, DamageModule.get().getFilterDamageGroup())
    );
}
```

## Built-in Damage Handlers Order

The damage pipeline runs these handlers in order:

**Filter Group:**
1. `FilterUnkillable` - Blocks damage to invulnerable entities
2. `FilterPlayerWorldConfig` - Checks world PvP settings
3. `FilterNPCWorldConfig` - NPC damage settings
4. `PlayerDamageFilterSystem` - Spawn protection
5. `WieldingDamageReduction` - Shield/blocking
6. `ArmorDamageReduction` - Armor mitigation

**Apply Phase:**
- `ApplyDamage` - Subtracts health, triggers death if zero

**Inspect Group:**
1. `ApplyParticles` - Spawn hit particles
2. `ApplySoundEffects` - Play hit sounds
3. `HitAnimation` - Play hurt animation
4. `DamageArmor` - Degrade armor durability
5. `PlayerHitIndicators` - Send damage info to client

## See Also

- [Event System](/concepts/events) - How events work
- [Damage Event](/reference/events/damage) - Full damage reference
