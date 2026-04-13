const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MOCK DATA (backend data)
let groups = ["Admin", "Developer", "QA"];

let permissions = {
  "/trunk": {
    "Admin": "Write",
    "Developer": "Write",
    "QA": "Read"
  },
  "/trunk/src": {
    "Admin": "Write",
    "Developer": "Write",
    "QA": "Read"
  }
};

// ✅ ROOT
app.get('/', (req, res) => {
  res.send('Bridge Backend is running!');
});

// ✅ GET GROUPS
app.get('/api/groups', (req, res) => {
  res.json(groups);
});

// ✅ GET PERMISSIONS
app.get('/api/permissions', (req, res) => {
  res.json(permissions);
});

// ✅ SAVE PERMISSIONS
app.post('/api/permissions/batch', (req, res) => {
  const { permissions: newPermissions } = req.body;

  newPermissions.forEach(item => {
    if (!permissions[item.path]) {
      permissions[item.path] = {};
    }

    permissions[item.path][item.group] =
      item.permission === 'rw' ? 'Write' :
      item.permission === 'r' ? 'Read' : 'Deny';
  });

  res.json({ message: "Permissions saved successfully" });
});

// ✅ START SERVER
app.listen(5000, () => {
  console.log('🚀 Bridge Backend is running on http://localhost:5000');
});