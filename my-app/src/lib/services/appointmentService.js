export async function fetchRequests() {
  // Reemplaza con API real (ej. GET /api/appointments/requests)
  return [
    {
      doctor: "Dr. Alan García",
      patient: "Juan Pérez",
      reason: "Revisión de resultados de laboratorio.",
      time: "Hace 15 min",
    },
    {
      doctor: "Dra. Sofia Vergara",
      patient: "Maria Rodriguez",
      reason: "Consulta de seguimiento por migraña.",
      time: "Hace 1 hora",
    },
    {
      doctor: "Dr. Luis Martinez",
      patient: "Carlos Gomez",
      reason: "Chequeo anual.",
      time: "Hace 3 horas",
    },
  ];
}

export async function createAppointment(data) {
  // Reemplaza con API real (ej. POST /api/appointments)
  console.log("Cita creada:", data);
  return { success: true }; // Simulación
}

export async function processRequest(request) {
  // Reemplaza con API real (ej. POST /api/appointments/process)
  console.log("Solicitud procesada:", request);
  return { success: true }; // Simulación
}