// src/lib/services/patientService.js
export async function fetchPatient(id) {
  // Simulación de datos del paciente
  return {
    id: parseInt(id),
    user_name: `paciente${id}`,
    full_name: `Paciente ${id} Ejemplo`,
    document: `DOC-${id}123456`,
    phone: `300${id}123456`,
  };
}

export async function fetchAnalyses(id) {
  return [
    { id: 1, url_image: "https://via.placeholder.com/150", date: "2025-10-09", result_ia: "Normal" },
    { id: 2, url_image: "https://via.placeholder.com/150", date: "2025-10-08", result_ia: "Anomalía detectada" },
  ];
}

export async function fetchAnalysisById(id) {
  const analyses = await fetchAnalyses(1);
  return analyses.find((a) => a.id === parseInt(id)) || null;
}

export async function uploadAnalysis(id, file) {
  return { success: true };
}

export async function updatePatient(id, data) {
  return { success: true };
}