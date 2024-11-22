import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";

import { DEST_COMPILE_DIR, DEST_CONVERT_DIR } from "./config.mjs";

async function ensureDestinationDirExists() {
  try {
    await fs.mkdir(DEST_CONVERT_DIR, { recursive: true });
  } catch (error) {
    console.error("Error ensuring destination directory exists:", error);
  }
}

function convertMarkdownToDokuWiki(inputFilePath, outputFilePath) {
  const command = `pandoc "${inputFilePath}" -f markdown -t dokuwiki -o "${outputFilePath}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error converting file ${inputFilePath}:`, stderr);
    } else {
      console.log(
        `Successfully converted: ${inputFilePath} to ${outputFilePath}`
      );
    }
  });
}

async function convertAllMarkdownFiles() {
  try {
    const files = await fs.readdir(DEST_COMPILE_DIR);
    files
      .filter((file) => path.extname(file).toLowerCase() === ".md")
      .forEach((file) => {
        const inputFilePath = path.join(DEST_COMPILE_DIR, file);
        const outputFilePath = path.join(
          DEST_CONVERT_DIR,
          file.replace(/\.md$/, ".dokuwiki")
        );
        convertMarkdownToDokuWiki(inputFilePath, outputFilePath);
      });
  } catch (error) {
    console.error("Error reading compile directory:", error);
  }
}

async function main() {
  await ensureDestinationDirExists();
  await convertAllMarkdownFiles();
}

main();
