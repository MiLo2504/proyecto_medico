export async function fetchUsers() {
  // Reemplaza con API real
  return [
    { id: 1, name: "Dr. Carlos Sánchez", role: "Doctor", email: "carlos@medivision.com", status: "Activo" },
    { id: 2, name: "Ana Gómez", role: "Paciente", email: "ana@email.com", status: "Activo" },
    { id: 3, name: "Juan Pérez", role: "Paciente", email: "juan@email.com", status: "Inactivo" },
  ];
}

export function createUser(userData) {
  // Reemplaza con API real
  return { ...userData, id: Date.now(), status: "Activo" };
}

export async function fetchUserById(id) {
  const users = await fetchUsers();
  return users.find((u) => u.id === Number(id)) || null;
}

export async function updateUser(user) {
  // Reemplaza con API real
  console.log('Usuario actualizado:', user);
  return true;
}