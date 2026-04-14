const pool = require("../config/db");

// GET all permissions (from DB)
const getAllPermissions = async () => {
  const result = await pool.query("SELECT * FROM group_permissions");

  let formatted = {};

  result.rows.forEach(row => {
    if (!formatted[row.path]) {
      formatted[row.path] = {};
    }

    formatted[row.path][row.group_name] = row.permission;
  });

  return formatted;
};

// INSERT / UPDATE permissions
const updatePermissionsBatch = async (newPermissions) => {
  for (const item of newPermissions) {
    let perm = "Deny";

    if (item.permission === "rw") perm = "Write";
    else if (item.permission === "r") perm = "Read";

    const check = await pool.query(
      "SELECT * FROM group_permissions WHERE path=$1 AND group_name=$2",
      [item.path, item.group]
    );

    if (check.rows.length > 0) {
      // UPDATE
      await pool.query(
        "UPDATE group_permissions SET permission=$1 WHERE path=$2 AND group_name=$3",
        [perm, item.path, item.group]
      );
    } else {
      // INSERT
      await pool.query(
        "INSERT INTO group_permissions (path, group_name, permission) VALUES ($1, $2, $3)",
        [item.path, item.group, perm]
      );
    }
  }

  return getAllPermissions();
};

module.exports = {
  getAllPermissions,
  updatePermissionsBatch
};