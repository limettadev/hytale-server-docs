import { mkdir, writeFile } from "fs/promises";

const SOURCE_ROOT = "../com/hypixel/hytale";
const OUTPUT_DIR = "./docs/api";

interface ParsedClass {
  package: string;
  name: string;
  type: "class" | "interface" | "enum" | "abstract class";
  extends?: string;
  implements?: string[];
  methods: ParsedMethod[];
  fields: ParsedField[];
  constructors: ParsedConstructor[];
}

interface ParsedMethod {
  name: string;
  returnType: string;
  parameters: string;
  isStatic: boolean;
  annotations: string[];
}

interface ParsedField {
  name: string;
  type: string;
  isStatic: boolean;
  isFinal: boolean;
}

interface ParsedConstructor {
  parameters: string;
  visibility: string;
}

// Reserved words that can't be method names
const RESERVED = new Set([
  "if", "else", "for", "while", "do", "switch", "case", "default",
  "try", "catch", "finally", "throw", "throws", "new", "return",
  "break", "continue", "this", "super", "class", "interface", "enum",
  "extends", "implements", "import", "package", "public", "private",
  "protected", "static", "final", "abstract", "native", "synchronized",
  "volatile", "transient", "strictfp", "instanceof", "assert", "void",
  "boolean", "byte", "char", "short", "int", "long", "float", "double",
  "null", "true", "false"
]);

function parseJavaFile(content: string, filePath: string): ParsedClass | null {
  // Extract package
  const packageMatch = content.match(/^package\s+([\w.]+);/m);
  const packageName = packageMatch ? packageMatch[1] : "";

  // Find class/interface declaration
  const classMatch = content.match(
    /(?:public\s+)?(abstract\s+)?(class|interface|enum)\s+(\w+)(?:<[^>]+>)?(?:\s+extends\s+([\w<>,\s]+))?(?:\s+implements\s+([\w<>,\s]+))?\s*\{/
  );

  if (!classMatch) return null;

  const isAbstract = !!classMatch[1];
  const classType = classMatch[2] as "class" | "interface" | "enum";
  const className = classMatch[3];
  const extendsClass = classMatch[4]?.trim();
  const implementsRaw = classMatch[5];
  const implementsList = implementsRaw
    ? implementsRaw.split(",").map((s) => s.trim())
    : [];

  const parsed: ParsedClass = {
    package: packageName,
    name: className,
    type: isAbstract ? "abstract class" : classType,
    extends: extendsClass,
    implements: implementsList.length > 0 ? implementsList : undefined,
    methods: [],
    fields: [],
    constructors: [],
  };

  // Split into lines and parse line by line for better accuracy
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines, comments, annotations only
    if (!line || line.startsWith("//") || line.startsWith("/*") || line.startsWith("*")) {
      continue;
    }

    // Parse constructors: public/protected/private ClassName(
    const ctorMatch = line.match(
      /^(public|protected|private)\s+(\w+)\s*\(([^)]*)\)/
    );
    if (ctorMatch && ctorMatch[2] === className) {
      parsed.constructors.push({
        visibility: ctorMatch[1],
        parameters: ctorMatch[3].trim(),
      });
      continue;
    }

    // Parse fields: visibility [static] [final] Type name [= ...];
    const fieldMatch = line.match(
      /^(public|protected|private)\s+(static\s+)?(final\s+)?([\w<>\[\],\s?]+)\s+(\w+)\s*[;=]/
    );
    if (fieldMatch) {
      const fieldName = fieldMatch[5];
      const fieldType = fieldMatch[4].trim();

      // Skip synthetic/noise
      if (fieldName.startsWith("this$") || fieldName.startsWith("val$") || fieldName.startsWith("$")) {
        continue;
      }

      parsed.fields.push({
        name: fieldName,
        type: fieldType,
        isStatic: !!fieldMatch[2],
        isFinal: !!fieldMatch[3],
      });
      continue;
    }

    // Parse methods: [annotations] visibility [static] [final] ReturnType methodName(params)
    const methodMatch = line.match(
      /^(?:@\w+\s+)*(public|protected|private)?\s*(static\s+)?(?:final\s+)?(?:synchronized\s+)?(?:native\s+)?([\w<>\[\],\s?@]+)\s+(\w+)\s*\(([^)]*)\)/
    );
    if (methodMatch) {
      const returnType = methodMatch[3].trim();
      const methodName = methodMatch[4];
      const params = methodMatch[5].trim();

      // Skip if method name is reserved word or looks like noise
      if (RESERVED.has(methodName)) continue;
      if (methodName.startsWith("lambda$") || methodName.startsWith("access$")) continue;
      if (methodName === className) continue; // Constructor
      if (returnType.includes("$") || methodName.includes("$")) continue;
      // Skip throw statements that look like method calls
      if (returnType === "throw new" || returnType.startsWith("throw ")) continue;
      // Skip common exception constructors
      if (methodName.endsWith("Exception") || methodName.endsWith("Error")) continue;

      // Collect annotations from previous lines
      const annotations: string[] = [];
      for (let j = i - 1; j >= 0 && j >= i - 3; j--) {
        const prevLine = lines[j].trim();
        if (prevLine.startsWith("@")) {
          annotations.unshift(prevLine);
        } else if (prevLine && !prevLine.startsWith("//") && !prevLine.startsWith("/*")) {
          break;
        }
      }

      parsed.methods.push({
        name: methodName,
        returnType,
        parameters: params,
        isStatic: !!methodMatch[2],
        annotations,
      });
    }
  }

  // Deduplicate methods by name+params
  const seenMethods = new Set<string>();
  parsed.methods = parsed.methods.filter((m) => {
    const key = `${m.name}(${m.parameters})`;
    if (seenMethods.has(key)) return false;
    seenMethods.add(key);
    return true;
  });

  return parsed;
}

function generateMarkdown(parsed: ParsedClass): string {
  let md = `# ${parsed.name}\n\n`;

  md += `**Package:** \`${parsed.package}\`\n\n`;
  md += `**Type:** ${parsed.type}\n\n`;

  if (parsed.extends) {
    md += `**Extends:** \`${parsed.extends}\`\n\n`;
  }

  if (parsed.implements && parsed.implements.length > 0) {
    md += `**Implements:** ${parsed.implements.map((i) => `\`${i}\``).join(", ")}\n\n`;
  }

  // Constructors
  if (parsed.constructors.length > 0) {
    md += `## Constructors\n\n`;
    for (const ctor of parsed.constructors) {
      md += `\`\`\`java\n${ctor.visibility} ${parsed.name}(${ctor.parameters})\n\`\`\`\n\n`;
    }
  }

  // Static Fields
  const staticFields = parsed.fields.filter((f) => f.isStatic);
  if (staticFields.length > 0) {
    md += `## Static Fields\n\n`;
    md += `| Name | Type |\n|------|------|\n`;
    for (const field of staticFields) {
      md += `| \`${field.name}\` | \`${field.type}\` |\n`;
    }
    md += `\n`;
  }

  // Instance Fields
  const instanceFields = parsed.fields.filter((f) => !f.isStatic);
  if (instanceFields.length > 0) {
    md += `## Fields\n\n`;
    md += `| Name | Type |\n|------|------|\n`;
    for (const field of instanceFields) {
      md += `| \`${field.name}\` | \`${field.type}\` |\n`;
    }
    md += `\n`;
  }

  // Static Methods
  const staticMethods = parsed.methods.filter((m) => m.isStatic);
  if (staticMethods.length > 0) {
    md += `## Static Methods\n\n`;
    md += `| Method | Returns |\n|--------|--------|\n`;
    for (const method of staticMethods) {
      md += `| \`${method.name}(${method.parameters})\` | \`${method.returnType}\` |\n`;
    }
    md += `\n`;
  }

  // Instance Methods
  const instanceMethods = parsed.methods.filter((m) => !m.isStatic);
  if (instanceMethods.length > 0) {
    md += `## Methods\n\n`;
    md += `| Method | Returns |\n|--------|--------|\n`;
    for (const method of instanceMethods) {
      md += `| \`${method.name}(${method.parameters})\` | \`${method.returnType}\` |\n`;
    }
    md += `\n`;
  }

  return md;
}

// Key classes to document
const KEY_CLASSES = [
  "server/core/inventory/ItemStack.java",
  "server/core/inventory/Inventory.java",
  "server/core/inventory/container/ItemContainer.java",
  "server/core/entity/LivingEntity.java",
  "server/core/entity/entities/Player.java",
  "server/core/modules/entity/component/TransformComponent.java",
  "server/core/modules/entity/damage/Damage.java",
  "server/core/modules/entity/damage/DamageModule.java",
  "server/core/modules/entity/damage/DamageSystems.java",
  "server/core/modules/entity/damage/DeathComponent.java",
  "server/core/modules/entity/damage/DeathSystems.java",
  "server/core/modules/entity/damage/RespawnSystems.java",
  "server/core/modules/entity/damage/DamageCause.java",
  "server/core/modules/entitystats/EntityStatMap.java",
  "server/core/plugin/JavaPlugin.java",
  "server/core/universe/PlayerRef.java",
  "server/core/Message.java",
  "component/system/RefSystem.java",
  "component/system/RefChangeSystem.java",
  "component/system/EntityEventSystem.java",
  "component/system/tick/EntityTickingSystem.java",
  "component/query/Query.java",
  "component/CommandBuffer.java",
  "component/Store.java",
  "component/Ref.java",
  "server/npc/entities/NPCEntity.java",
  "server/npc/NPCPlugin.java",
  "server/core/universe/world/WorldConfig.java",
  "server/core/event/events/player/PlayerChatEvent.java",
  // UI Components
  "server/core/entity/entities/player/pages/CustomUIPage.java",
  "server/core/entity/entities/player/pages/BasicCustomUIPage.java",
  "server/core/entity/entities/player/pages/InteractiveCustomUIPage.java",
  "server/core/modules/entityui/asset/EntityUIComponent.java",
  "server/core/modules/entityui/asset/EntityStatUIComponent.java",
  "server/core/modules/entityui/asset/CombatTextUIComponent.java",
  "server/core/ui/builder/UICommandBuilder.java",
  "server/core/ui/builder/UIEventBuilder.java",
];

async function main() {
  console.log("Generating API documentation...\n");

  await mkdir(OUTPUT_DIR, { recursive: true });

  const sidebar: { text: string; link: string }[] = [];
  const indexEntries: string[] = [];

  for (const classPath of KEY_CLASSES) {
    const fullPath = `${SOURCE_ROOT}/${classPath}`;
    const file = Bun.file(fullPath);

    if (!(await file.exists())) {
      console.log(`⚠ Not found: ${classPath}`);
      continue;
    }

    const content = await file.text();
    const parsed = parseJavaFile(content, fullPath);

    if (!parsed) {
      console.log(`⚠ Could not parse: ${classPath}`);
      continue;
    }

    const outputFileName = `${parsed.name}.md`;
    const outputPath = `${OUTPUT_DIR}/${outputFileName}`;
    const markdown = generateMarkdown(parsed);

    await writeFile(outputPath, markdown);
    console.log(`✓ Generated: ${parsed.name} (${parsed.methods.length} methods, ${parsed.fields.length} fields)`);

    sidebar.push({
      text: parsed.name,
      link: `/api/${parsed.name}`,
    });

    indexEntries.push(
      `- [${parsed.name}](/api/${parsed.name}) - \`${parsed.package}\``
    );
  }

  // Generate index
  const indexContent = `# API Reference

Auto-generated API documentation for key Hytale server classes.

::: tip
This is auto-generated from the source code. For usage examples, see the [Reference guides](/reference/events/damage).
:::

## Classes

${indexEntries.join("\n")}
`;

  await writeFile(`${OUTPUT_DIR}/index.md`, indexContent);
  console.log(`\n✓ Generated index`);
}

main().catch(console.error);
