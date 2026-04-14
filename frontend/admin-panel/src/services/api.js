const BASE_URL = "http://localhost:5000/api";

// ✅ PERMISSIONS
export const getPermissions = async () => {
  const res = await fetch(`${BASE_URL}/permissions`);
  return res.json();
};

export const savePermissions = async (permissions) => {
  const res = await fetch(`${BASE_URL}/permissions/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ permissions }),
  });

  return res.json();
};

// ✅ USERS
export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return res.json();
};