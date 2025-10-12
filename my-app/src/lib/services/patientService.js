export async function fetchPatient(id) {
  try {
    const res = await fetch(`/api/patient/${id}`);
    if (!res.ok) throw new Error("Error al obtener datos del paciente");
    return await res.json();
  } catch (err) {
    console.error("Error fetching patient:", err);
    return null; // Valor por defecto en caso de error
  }
}

export async function fetchAnalyses(id) {
  try {
    const res = await fetch(`/api/patient/${id}/analysis`);
    if (!res.ok) throw new Error("Error al obtener análisis");
    return await res.json();
  } catch (err) {
    console.error("Error fetching analyses:", err);
    return [];
  }
}

export async function fetchAnalysisById(id) {
  try {
    const res = await fetch(`/api/analysis/${id}`);
    if (!res.ok) throw new Error("Error al obtener análisis");
    return await res.json();
  } catch (err) {
    console.error("Error fetching analysis:", err);
    return null;
  }
}

export async function uploadAnalysis(id, file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`/api/patient/${id}/analysis`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Error al subir análisis");
    return await res.json();
  } catch (err) {
    console.error("Error uploading analysis:", err);
    throw err;
  }
}

export async function updatePatient(id, data) {
  try {
    const res = await fetch(`/api/patient/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar paciente");
    return await res.json();
  } catch (err) {
    console.error("Error updating patient:", err);
    throw err;
  }
}