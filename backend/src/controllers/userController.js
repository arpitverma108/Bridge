const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  user: "admin",
  password: "password123",
  database: "svn_management",
  port: 5432,
});

// GET USERS
const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};