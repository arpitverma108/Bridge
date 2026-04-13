const { Client } = require('pg');

const client = new Client({
  host: 'db', // This connects to the 'db' container name in your docker-compose
  user: 'admin',
  password: 'password123',
  database: 'svn_management',
});

async function init() {
  try {
    await client.connect();
    console.log("Connected to Database. Creating tables...");

    // Create table for Users (Admin Panel requirement)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL -- 'Admin', 'Developer', or 'Client'
      );
    `);

    // Create table for Permissions (The Permission Matrix)
    await client.query(`
      CREATE TABLE IF NOT EXISTS permissions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        repo_path TEXT NOT NULL,
        access_level TEXT NOT NULL -- 'read', 'write', or 'deny'
      );
    `);

    console.log("✅ Tables created successfully!");
  } catch (err) {
    console.error("❌ Error setting up DB:", err);
  } finally {
    await client.end();
  }
}

init();