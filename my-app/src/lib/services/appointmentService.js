export async function fetchRequests() {
  try {
    const res = await fetch('/api/appointments/requests');
    if (!res.ok) throw new Error("Error al obtener solicitudes");
    return await res.json();
  } catch (err) {
    console.error("Error fetching requests:", err);
    return [];
  }
}

export async function createAppointment(data) {
  try {
    const res = await fetch('/api/appointments', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear cita");
    return await res.json();
  } catch (err) {
    console.error("Error creating appointment:", err);
    throw err;
  }
}

export async function processRequest(request) {
  try {
    const res = await fetch(`/api/appointments/${request.id}/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error("Error al procesar solicitud");
    return await res.json();
  } catch (err) {
    console.error("Error processing request:", err);
    throw err;
  }
}