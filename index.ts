import TreeSitter from "tree-sitter";
import { getPrismaNode } from "./prisma.cjs";
import { groupBy } from "remeda";
import { readFile, writeFile, mkdir } from "fs/promises";
import { diffLines } from "diff";

const prismaNode = await getPrismaNode("from/schema.prisma");
const oldFile = await readFile("from/schema.prisma", "utf-8");

const models = prismaNode.rootNode.children.filter(
  (n) => n.type === "model_declaration"
);

type ModelGroups = Record<
  "model" | "identifier" | "statement_block",
  TreeSitter.SyntaxNode[]
>;

const modelGroups = models.map(
  (model) =>
    groupBy(model.children ?? [], (child) => child.type) as any as ModelGroups
);

const sqlStrings = modelGroups.map((modelGroup) => {
  const modelName = modelGroup.identifier[0].text;
  const modelBlock = modelGroup.statement_block[0];

  type BlockGroups = Record<
    | "{"
    | "}"
    | "column_declaration"
    | "developer_comment"
    | "block_attribute_declaration",
    TreeSitter.SyntaxNode[]
  >;

  const blockGroups = groupBy(
    modelBlock.children,
    (child) => child.type
  ) as any as BlockGroups;

  const columnData = blockGroups.column_declaration.map((column) => {
    type ColumnGroups = Record<
      "identifier" | "column_type" | "attribute",
      TreeSitter.SyntaxNode[]
    >;
    const columnGroups = groupBy(
      column.children,
      (child) => child.type
    ) as any as ColumnGroups;

    const currentName = columnGroups.identifier[0].text;

    const oldName = columnGroups.attribute
      ?.map((attr) => {
        const attrText = attr.text;
        if (!attrText.startsWith("@map")) return undefined;
        const text = attrText.split('"');
        const oldName = text[1];
        if (oldName === currentName) {
          return undefined;
        }
        return oldName;
      })
      .find((n) => n);
    return {
      currentName,
      oldName,
      modelName,
    };
  });

  let sqlString = ``;

  for (const column of columnData) {
    if (!column.oldName) continue;
    sqlString += `ALTER TABLE "${column.modelName}" RENAME COLUMN "${column.oldName}" TO "${column.currentName}";\n`;
  }

  return sqlString;
});

const newPrismaFile = oldFile.replace(/\ @map\(.*\)/g, "");

await mkdir("./build", { recursive: true }).then(() => {
  console.log("created build folder");
});

await writeFile("./build/schema.prisma", newPrismaFile, {
  encoding: "utf-8",
}).then(() => {
  console.log("wrote new schema.prisma in build/schema.prisma");
});
await writeFile("./build/migration.sql", sqlStrings.join("\n"), {
  encoding: "utf-8",
}).then(() => {
  console.log("wrote new migration.sql in build/migration.sql");
});
