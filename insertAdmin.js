const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'RTO';

// Function to hash passwords
async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  return await bcrypt.hash(password, saltRounds);
}

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection('admin');

    // Passwords to be hashed
    const admin1Password = await hashPassword('password123');
    const admin2Password = await hashPassword('securepass456');
    const admin3Password = await hashPassword('mypassword789');

    // Insert multiple documents with hashed passwords
    const result = await collection.insertMany([
      { name: "Admin 1", email: "admin1@example.com", role: "superadmin", password: admin1Password },
      { name: "Admin 2", email: "admin2@example.com", role: "editor", password: admin2Password },
      { name: "Admin 3", email: "admin3@example.com", role: "viewer", password: admin3Password }
    ]);

    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
