import fs from "fs/promises";
import path from "path";
import { Octokit } from "@octokit/rest";

import {
  REPO_OWNER,
  REPO_NAME,
  BRANCH,
  FILES,
  FILES_EXCLUDE,
  FILE_EXT_FILTERS,
  DEST_FETCH_DIR,
} from "./config.mjs";

const githubToken = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: githubToken });

async function fetchFileContent(filePath, isRaw = false) {
  try {
    const response = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      ref: BRANCH,
      mediaType: isRaw ? { format: "raw" } : undefined,
    });
    if (isRaw) {
      return response.data;
    } else {
      const content = Buffer.from(response.data.content, "base64").toString(
        "utf8"
      );
      return content;
    }
  } catch (error) {
    console.error(
      `Failed to fetch file content for ${filePath}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function saveFileContent(filePath, content) {
  const destPath = path.join(DEST_FETCH_DIR, filePath);
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, content, "utf8");
  console.log(`Saved ${filePath} to ${destPath}`);
}

async function listRepoFiles(dirPath) {
  try {
    const response = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: dirPath,
      ref: BRANCH,
    });
    return response.data
      .filter(
        (item) =>
          item.type === "file" &&
          FILE_EXT_FILTERS.includes(path.extname(item.name)) &&
          !FILES_EXCLUDE.includes(`${dirPath}/${item.name}`)
      )
      .map((item) => item.path);
  } catch (error) {
    console.error(
      `Failed to list files in directory ${dirPath}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function processFiles() {
  // Clear destination directory
  await fs.rm(DEST_FETCH_DIR, { recursive: true, force: true });
  for (const filePattern of FILES) {
    try {
      const isDirectory = !path.extname(filePattern);
      if (isDirectory) {
        // Directory path, list and download all files (non-recursive)
        const files = await listRepoFiles(filePattern);
        for (const filePath of files) {
          try {
            const content = await fetchFileContent(filePath);
            await saveFileContent(filePath, content);
          } catch (error) {
            console.error(`Error processing ${filePath}:`, error.message);
          }
        }
      } else {
        // Direct file path, fetch content directly
        const content = await fetchFileContent(filePattern, true);
        await saveFileContent(filePattern, content);
      }
    } catch (error) {
      console.error(`Error processing ${filePattern}:`, error.message);
    }
  }
}

async function main() {
  await processFiles();
}

main().catch((error) => {
  console.error("An error occurred during fetching:", error);
});
