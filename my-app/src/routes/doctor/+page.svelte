<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { patients } from "$lib/stores/patients.js";
  import PatientTable from "$lib/components/PatientTable.svelte";
  import { fetchPatients } from "$lib/services/doctorService.js";

  let filter = "";

  onMount(async () => {
    $patients = await fetchPatients();
  });

  function toggleStatus(patient) {
    patient.estado = patient.estado === "Activo" ? "Inactivo" : "Activo";
    $patients = $patients; // Fuerza actualización
  }

  function viewAnalysis(id) {
    goto(`/doctor/${id}`);
  }
</script>

<div class="p-4">
  <h4 class="fw-bold">Pacientes Asignados</h4>

  <div class="card shadow-sm">
    <div class="card-body">
      <PatientTable
        {filter}
        patients={$patients}
        onToggleStatus={toggleStatus}
        onViewAnalysis={viewAnalysis}
      />
    </div>
  </div>
</div>
