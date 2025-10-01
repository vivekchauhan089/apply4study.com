// importData.js
const { MongoClient } = require("mongodb");

const sourceUri = "mongodb://127.0.0.1:27017/InvestmentDB";
const targetUri = "mongodb+srv://lmsuser:Phph73g9d5sjWiTf@ev.hfsqrfg.mongodb.net/lms?retryWrites=true&w=majority"; // or another Atlas connection

const sourceClient = new MongoClient(sourceUri);
const targetClient = new MongoClient(targetUri);

async function copyCollection() {
  try {
    // connect both
    await sourceClient.connect();
    await targetClient.connect();

    const sourceDb = sourceClient.db("lms");   // replace with source DB
    const targetDb = targetClient.db("lms");   // replace with target DB

    const collections = await sourceDb.listCollections().toArray();
    if(collections.length){
      for (var cnt=0; cnt < collections.length; cnt++) {
        var collection_name = collections[cnt].name;
        const sourceCollection = sourceDb.collection(collection_name); // source collection
        const targetCollection = targetDb.collection(collection_name); // target collection

        const docs = await sourceCollection.find({}).toArray();
        if (docs.length > 0) {
          await targetCollection.deleteMany({});
          await targetCollection.insertMany(docs);
          console.log(`Copied ${docs.length} docs from source → target collection ${collection_name}`);
        } else {
          console.log("No documents found in source collection.");
          await targetDb.createCollection(collection_name);
          console.log("Empty collection created!");
        }
      }
    } else {
      console.log("No collections found in source database.");
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
}

copyCollection();
