export async function fetchPatient(id) {
  try {
    const res = await fetch(`/api/patient/${id}`);
    if (!res.ok) throw new Error("Error al obtener datos del paciente");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchAnalyses(id) {
  try {
    const res = await fetch(`/api/patient/${id}/analysis`);
    if (!res.ok) throw new Error("Error al obtener los análisis");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
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
    if (!res.ok) throw new Error("Error al enviar imagen");
    return await res.json();
  } catch (err) {
    console.error(err);
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
    if (!res.ok) throw new Error("Error al guardar cambios");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}