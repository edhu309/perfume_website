const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const { EJSON } = require("bson");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function printUsage() {
  console.log("Usage: npm run restore:db -- <backup-folder> [--drop]");
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing in backend/.env");
  }

  const args = process.argv.slice(2);
  const dropBeforeInsert = args.includes("--drop");
  const backupDirArg = args.find((arg) => !arg.startsWith("--"));

  if (!backupDirArg) {
    printUsage();
    throw new Error("Backup folder argument is required");
  }

  const backupDir = path.resolve(backupDirArg);
  const exists = await fs
    .access(backupDir)
    .then(() => true)
    .catch(() => false);

  if (!exists) {
    throw new Error(`Backup folder not found: ${backupDir}`);
  }

  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const files = (await fs.readdir(backupDir))
    .filter((name) => name.endsWith(".json") && name !== "metadata.json")
    .sort();

  if (files.length === 0) {
    throw new Error("No collection JSON files found in backup folder");
  }

  for (const fileName of files) {
    const collectionName = fileName.replace(/\.json$/, "");
    const fullPath = path.join(backupDir, fileName);
    const raw = await fs.readFile(fullPath, "utf8");
    const docs = EJSON.parse(raw);

    if (!Array.isArray(docs)) {
      console.log(`Skipping ${fileName}: expected an array of documents`);
      continue;
    }

    const collection = db.collection(collectionName);

    if (dropBeforeInsert) {
      await collection.deleteMany({});
    }

    if (docs.length === 0) {
      console.log(`- ${collectionName}: 0 records (nothing inserted)`);
      continue;
    }

    try {
      const result = await collection.insertMany(docs, { ordered: false });
      console.log(`- ${collectionName}: inserted ${result.insertedCount} records`);
    } catch (error) {
      if (error.code === 11000) {
        console.log(
          `- ${collectionName}: duplicate key conflicts found (use --drop to replace existing data)`
        );
      } else {
        throw error;
      }
    }
  }

  console.log("Restore completed.");
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("Restore failed:", error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore disconnect errors
  }
  process.exit(1);
});
