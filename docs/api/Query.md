# Query

**Package:** `com.hypixel.hytale.component.query`

**Type:** interface

## Static Methods

| Method | Returns |
|--------|--------|
| `any()` | `AnyQuery` |
| `not(Query query)` | `NotQuery` |
| `and(Query... queries)` | `AndQuery` |
| `or(Query... queries)` | `OrQuery` |

## Methods

| Method | Returns |
|--------|--------|
| `NotQuery(query)` | `return new` |
| `AndQuery(queries)` | `return new` |
| `OrQuery(queries)` | `return new` |
| `test(Archetype var1)` | `boolean` |
| `requiresComponentType(ComponentType var1)` | `boolean` |
| `validateRegistry(ComponentRegistry var1)` | `void` |
| `validate()` | `void` |

