const TreeSitter = require("tree-sitter");
const { readFile } = require("fs").promises;
const Prisma = require("tree-sitter-prisma");

const getPrismaNode = async (path) => {
  const contents = await readFile(path, { encoding: "utf-8" });

  const parser = new TreeSitter();
  parser.setLanguage(Prisma);

  const tree = parser.parse(contents);
  return tree;
};

module.exports = { getPrismaNode };
