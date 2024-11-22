const FILES = [
  "chrome/content/zotero/xpcom/pluginAPI",
  "chrome/content/zotero/xpcom/preferencePanes.js",
  "chrome/content/zotero/xpcom/reader.js",
];
const FILES_EXCLUDE = [
  "chrome/content/zotero/xpcom/pluginAPI/pluginAPIBase.mjs",
];
const FILE_EXT_FILTERS = [".js", ".jsx", ".jsm", ".mjs"];
const REPO_OWNER = "windingwind";
const REPO_NAME = "zotero";
const BRANCH = "Update-JSDoc";
const DEST_FETCH_DIR = "./dist/source";
const DEST_COMPILE_DIR = "./dist/markdown";
const DEST_CONVERT_DIR = "./dist/dokuwiki";

export {
  FILES,
  FILES_EXCLUDE,
  FILE_EXT_FILTERS,
  REPO_OWNER,
  REPO_NAME,
  BRANCH,
  DEST_FETCH_DIR,
  DEST_COMPILE_DIR,
  DEST_CONVERT_DIR,
};
