const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = () => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient("mongodb://localhost:27017");
    client.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      const database = client.db("admin");
      db.inventories = database.collection("inventories");
      db.orders = database.collection("orders");
      db.users = database.collection("users");
      resolve();
    });
  });
};

module.exports = { connectToDb, db };
