export async function fetchResults() {
  // Reemplaza con API real
  const res = await fetch("/api/analysis");
  if (res.ok) return await res.json();
  return [
    { id: 101, paciente: "Juan Pérez", edad: 34, analisis: "Radiografía de tórax", estado: "Validado", patient_id: 2 },
    { id: 102, paciente: "María Gómez", edad: 28, analisis: "Resonancia cerebral", estado: "Pendiente", patient_id: 5 },
    { id: 103, paciente: "Carlos Rivas", edad: 45, analisis: "Tomografía abdominal", estado: "Observación", patient_id: 7 },
    { id: 104, paciente: "Laura Torres", edad: 50, analisis: "Ecografía mamaria", estado: "Validado", patient_id: 9 },
  ];
}

export async function fetchResultById(id) {
  // Simulación; reemplaza con API real
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        paciente: "Juan Pérez",
        edad: 34,
        documento: "CC 1023456789",
        analisis: "Resonancia magnética cerebral",
        fecha: "2025-10-09",
        estado: "Validado",
        doctor: "Dr. Carlos Sánchez",
        observaciones: "El estudio muestra una morfología cerebral normal sin lesiones aparentes.",
        archivo: "resonancia_cerebro.pdf",
      });
    }, 1000);
  });
}