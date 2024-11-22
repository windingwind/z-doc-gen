import fs from "fs/promises";
import path from "path";
import jsdoc2md from "jsdoc-to-markdown";

import {
  DEST_FETCH_DIR,
  DEST_COMPILE_DIR,
  FILE_EXT_FILTERS,
} from "./config.mjs";

async function getJsFiles(dir) {
  let files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(await getJsFiles(fullPath));
    } else if (
      item.isFile() &&
      FILE_EXT_FILTERS.includes(path.extname(item.name))
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

async function generateMarkdownDocs(files) {
  await fs.mkdir(DEST_COMPILE_DIR, { recursive: true });
  for (const file of files) {
    try {
      const markdown = await jsdoc2md.render({ files: file });
      const outputFilePath = path.join(
        DEST_COMPILE_DIR,
        `${path.basename(file, ".js")}.md`
      );
      await fs.writeFile(outputFilePath, markdown, "utf8");
      console.log(`Generated documentation for ${file} at ${outputFilePath}`);
    } catch (error) {
      console.error(
        `Failed to generate documentation for ${file}:`,
        error.message
      );
    }
  }
}

async function main() {
  const jsFiles = await getJsFiles(DEST_FETCH_DIR);
  await generateMarkdownDocs(jsFiles);
}

main().catch((error) => {
  console.error("An error occurred during JSDoc compilation:", error);
});
