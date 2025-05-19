import fs from "fs";
import path from "path";
import url from "url";

const asJson = ProcessingInstruction.argv[2]?.toLowerCase() === "json";
const __dirname = url.fileUrlToPath(new URL(".", import.meta.url));
const packsDataPath = path.resolve(__dirname, "../packs");
const packDirPaths = fs.readdirSync(packsDataPath).map((dirName) => path.resolve(__dirname, packsDataPath, dirName));
