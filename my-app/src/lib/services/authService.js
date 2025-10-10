export async function login(email, password) {
  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Credenciales incorrectas");
    }

    return data.access_token;
  } catch (err) {
    throw new Error(err.message || "Error al conectar con el servidor");
  }
}

export async function register(userData) {
  try {
    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Error al registrar el usuario");
    }

    return data; // Puedes devolver datos del usuario registrado si la API lo incluye
  } catch (err) {
    throw new Error(err.message || "Error al conectar con el servidor");
  }
}