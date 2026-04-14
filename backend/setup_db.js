const { Client } = require('pg');

const client = new Client({
  host: 'db',
  user: 'admin',
  password: 'password123',
  database: 'svn_management',
  port: 5432
});

async function init() {
  try {
    await client.connect();
    console.log("Connected to Database...");

    // USERS
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    // GROUPS
    await client.query(`
      CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
    `);

    // USER-GROUP MAPPING
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_groups (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        group_id INTEGER REFERENCES groups(id)
      );
    `);

    // GROUP PERMISSIONS
    await client.query(`
      CREATE TABLE IF NOT EXISTS group_permissions (
        id SERIAL PRIMARY KEY,
        path TEXT NOT NULL,
        group_name TEXT NOT NULL,
        permission TEXT NOT NULL
      );
    `);

    // USER PERMISSIONS (OVERRIDE)
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_permissions (
        id SERIAL PRIMARY KEY,
        path TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id),
        permission TEXT NOT NULL
      );
    `);

    console.log("✅ All tables created successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.end();
  }
}

init();