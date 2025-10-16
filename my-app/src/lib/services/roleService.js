// src/lib/services/roleService.js
export async function fetchRoles() {
  try {
    const response = await fetch('http://127.0.0.1:8000/roles');
    if (!response.ok) throw new Error(`Error ${response.status}: ${await response.text()}`);
    const roles = await response.json();
    console.log('Roles cargados:', roles);
    return roles;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
}

export async function fetchModules() {
  try {
    const res = await fetch("http://127.0.0.1:8000/roles/modules", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching modules:", err);
    throw err;
  }
}

export async function createRole(roleData) {
  try {
    const res = await fetch("http://127.0.0.1:8000/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: roleData.role_name,
        description: roleData.description,
        permisos: roleData.permissions,
      }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
    return await res.json();
  } catch (err) {
    console.error("Error creating role:", err);
    throw err;
  }
}

export async function updateRole(roleId, roleData) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/roles/${roleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: roleData.role_name,
        description: roleData.description,
        permisos: roleData.permissions,
      }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
    return await res.json();
  } catch (err) {
    console.error("Error updating role:", err);
    throw err;
  }
}

export async function deleteRole(roleId) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/roles/${roleId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
    return true;
  } catch (err) {
    console.error("Error deleting role:", err);
    throw err;
  }
}