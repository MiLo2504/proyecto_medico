// src/lib/services/roleService.js
export async function fetchRoles() {
  // Datos simulados de roles
  return [
    {
      id: 1,
      role_name: "Administrador",
      permissions: {
        1: { can_create: true, can_read: true, can_update: true, can_delete: true }, // Usuarios
        2: { can_create: true, can_read: true, can_update: true, can_delete: true }, // Pacientes
        3: { can_create: true, can_read: true, can_update: true, can_delete: true }, // Doctores
        4: { can_create: true, can_read: true, can_update: true, can_delete: true }, // Citas
      },
      estado: 1
    },
    {
      id: 2,
      role_name: "Doctor",
      permissions: {
        1: { can_create: false, can_read: true, can_update: false, can_delete: false },
        2: { can_create: true, can_read: true, can_update: true, can_delete: false },
        3: { can_create: false, can_read: true, can_update: false, can_delete: false },
        4: { can_create: false, can_read: true, can_update: false, can_delete: false },
      },
      estado: 1
    },
    {
      id: 3,
      role_name: "Paciente",
      permissions: {
        1: { can_create: false, can_read: false, can_update: false, can_delete: false },
        2: { can_create: false, can_read: true, can_update: false, can_delete: false },
        3: { can_create: false, can_read: false, can_update: false, can_delete: false },
        4: { can_create: true, can_read: true, can_update: false, can_delete: false },
      },
      estado: 1
    },
    {
      id: 4,
      role_name: "Administrador (Secretaria)",
      permissions: {
        1: { can_create: true, can_read: true, can_update: true, can_delete: false },
        2: { can_create: true, can_read: true, can_update: false, can_delete: false },
        3: { can_create: false, can_read: true, can_update: false, can_delete: false },
        4: { can_create: true, can_read: true, can_update: true, can_delete: false },
      },
      estado: 1
    }
  ];
}

export async function fetchModules() {
  // Datos simulados de módulos
  return [
    { id: 1, module_name: "Usuarios" },
    { id: 2, module_name: "Pacientes" },
    { id: 3, module_name: "Doctores" },
    { id: 4, module_name: "Citas" }
  ];
}

export async function createRole(roleData) {
  // Simulación de creación de rol
  const newRole = {
    id: Date.now(),
    role_name: roleData.role_name,
    permissions: roleData.permissions,
    estado: 1
  };
  return newRole; // Simula éxito y devuelve el nuevo rol
}

export async function updateRole(roleId, roleData) {
  // Simulación de actualización
  return { message: "Rol actualizado exitosamente" };
}

export async function deleteRole(roleId) {
  // Simulación de eliminación lógica (cambia estado a 0)
  return { message: "Rol eliminado exitosamente" };
}