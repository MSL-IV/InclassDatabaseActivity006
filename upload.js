const { MongoClient } = require("mongodb");
const fs = require("fs");

async function loadPaintings() {
  const uri = "mongodb+srv://nathanielfrait:8UMenCzPs5Aw2faP@nfmlactivity6.uy4d5.mongodb.net/Paintings"; // Update with your connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("Paintings");
    const collection = database.collection("paintings");

    const paintings = JSON.parse(fs.readFileSync("art.json", "utf8"));
    console.log("Inserting paintings:", paintings.length); // Log the number of paintings

    const result = await collection.insertMany(paintings);
    console.log(`${result.insertedCount} paintings were inserted into the database.`);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
}

loadPaintings().catch(console.error);