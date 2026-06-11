const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const { EJSON } = require("bson");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function getTimestamp() {
  const iso = new Date().toISOString();
  return iso.replace(/[:.]/g, "-");
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing in backend/.env");
  }

  const outputDirArg = process.argv[2];
  const backupDir = outputDirArg
    ? path.resolve(outputDirArg)
    : path.resolve(__dirname, "..", "backups", `backup-${getTimestamp()}`);

  await fs.mkdir(backupDir, { recursive: true });

  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const collections = await db.listCollections({}, { nameOnly: true }).toArray();
  const summary = {
    database: db.databaseName,
    createdAt: new Date().toISOString(),
    collections: []
  };

  for (const { name } of collections) {
    const docs = await db.collection(name).find({}).toArray();
    const filePath = path.join(backupDir, `${name}.json`);
    await fs.writeFile(filePath, EJSON.stringify(docs, null, 2), "utf8");

    summary.collections.push({
      name,
      count: docs.length,
      file: `${name}.json`
    });
  }

  const summaryPath = path.join(backupDir, "metadata.json");
  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2), "utf8");

  console.log(`Backup complete: ${backupDir}`);
  console.log(`Collections exported: ${summary.collections.length}`);
  for (const item of summary.collections) {
    console.log(`- ${item.name}: ${item.count} records`);
  }

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("Backup failed:", error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore disconnect errors
  }
  process.exit(1);
});
