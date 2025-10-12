export async function createUser(user) {
  try {
    const res = await fetch('/api/users', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return await res.json();
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
}