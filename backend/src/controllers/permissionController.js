const permissionService = require("../services/permissionService");

// GET
const getPermissions = async (req, res) => {
  try {
    const data = await permissionService.getAllPermissions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST
const updatePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;

    const updated = await permissionService.updatePermissionsBatch(permissions);

    res.json({
      message: "Saved in PostgreSQL",
      data: updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPermissions,
  updatePermissions
};