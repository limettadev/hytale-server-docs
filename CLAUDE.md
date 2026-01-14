---
description: Use Bun instead of Node.js, npm, pnpm, or vite.
globs: "*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json"
alwaysApply: false
---

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // optional websocket support
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // handle close
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will transpile & bundle automatically. `<link>` tags can point to stylesheets and Bun's CSS bundler will bundle.

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";
import { createRoot } from "react-dom/client";

// import .css files directly and it works
import './index.css';

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.

## Documentation Guidelines

When writing reference documentation pages (in `docs/reference/`), always include these boxes near the top:

1. **API Reference box** - Links to relevant API docs:
```md
::: info API Reference
See full API: [ClassName](/api/ClassName) | [OtherClass](/api/OtherClass)
:::
```

2. **Concepts box** - Links to prerequisite concept pages:
```md
::: tip Concepts
Before reading this, familiarize yourself with the [Event System](/concepts/events) and [System Groups](/concepts/system-groups).
:::
```

See `docs/reference/events/damage.md` for a good example of this format.

## Fact-Checking Documentation

When writing or updating documentation, **always fact-check code examples against the auto-generated API reference** in `docs/api/`:

1. **Verify method signatures** - Check that method names, parameters, and return types match the actual API
2. **Verify class locations** - Ensure imports and package paths are correct
3. **Add footnotes** - Link to relevant API docs using footnotes:
   ```md
   ## Section Title[^1]

   Content here...

   [^1]: See [ClassName API](/api/ClassName) for method details
   ```

### Common Issues to Watch For

- **Inventory methods**: `Inventory` doesn't have `addItemStack()` directly - use `inventory.getCombinedHotbarFirst().addItemStack()` or similar `ItemContainer` methods
- **Item IDs**: Use proper item ID format like `"Tool_Sword_Wood"`, `"Consumable_Apple"`, `"Block_Torch"` - not friendly names like `"Wood Sword"`
- **EntityEventSystem signature**: The correct signature is `handle(int index, ArchetypeChunk chunk, Store store, CommandBuffer commandBuffer, EventType event)` - NOT `handle(Ref<EntityStore> ref, EventType event, ...)`
- **WorldConfig setters**: Some config values are read-only (loaded from config files) - check if setters actually exist before documenting them

### Adding Missing APIs

If an API class is needed but not generated, add it to `scripts/generate-api-docs.ts` in the `KEY_CLASSES` array:

```ts
const KEY_CLASSES = [
  // ...existing classes
  "path/to/NewClass.java",
];
```

Then run `bun scripts/generate-api-docs.ts` to regenerate.
