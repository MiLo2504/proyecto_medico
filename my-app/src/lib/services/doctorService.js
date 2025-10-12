export async function fetchPatients() {
  try {
    const res = await fetch('/api/patients');
    if (!res.ok) throw new Error("Error al obtener pacientes");
    return await res.json();
  } catch (err) {
    console.error("Error fetching patients:", err);
    return [];
  }
}

export async function fetchPatientById(id) {
  try {
    const res = await fetch(`/api/patient/${id}`);
    if (!res.ok) throw new Error("Error al obtener paciente");
    return await res.json();
  } catch (err) {
    console.error("Error fetching patient by id:", err);
    return null;
  }
}

export async function fetchAnalysesByPatientId(id) {
  try {
    const res = await fetch(`/api/patient/${id}/analysis`);
    if (!res.ok) throw new Error("Error al obtener análisis");
    return await res.json();
  } catch (err) {
    console.error("Error fetching analyses:", err);
    return [];
  }
}