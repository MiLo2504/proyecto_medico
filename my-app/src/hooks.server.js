export async function handle({ event, resolve }) {
  const token = event.cookies.get('token');
  if (token) {
    const userRole = await getUserRole(token); // Simulación, reemplazar con API
    if (userRole === "Administrador (Secretaria)") {
      return new Response(null, { status: 302, headers: { Location: '/secretary' } });
    } else if (userRole === "Admin") {
      return new Response(null, { status: 302, headers: { Location: '/admin' } });
    } else if (userRole === "Doctor") {
      return new Response(null, { status: 302, headers: { Location: '/doctor' } });
    } else if (userRole === "Paciente") {
      return new Response(null, { status: 302, headers: { Location: '/patient' } });
    }
  }
  return resolve(event);
}

async function getUserRole(token) {
  // Simulación de roles (reemplazar con fetch real)
  const mockRoles = {
    "token1": "Admin",
    "token2": "Doctor",
    "token3": "Paciente",
    "token4": "Administrador (Secretaria)",
  };
  return mockRoles[token] || null;
}
