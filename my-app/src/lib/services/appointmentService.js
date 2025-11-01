// src/lib/services/appointmentService.js

export async function fetchAppointments() {
  const res = await fetch('/api/appointments');
  if (!res.ok) throw new Error('Error al cargar citas');
  return await res.json();
}

export async function createAppointment(data) {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, state: 1 })
  });
  if (!res.ok) throw new Error('Error al crear cita');
  return await res.json();
}

export async function processRequest(request) {
  // Reemplaza con API real (ej. POST /api/appointments/process)
  console.log("Solicitud procesada:", request);
  return { success: true }; // Simulación
}


