<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { patients } from "$lib/stores/patients.js";
  import PatientTable from "$lib/components/PatientTable.svelte";
  import { fetchPatients } from "$lib/services/doctorService.js";

  let filter = "";
  let loading = false;

  onMount(async () => {
    loading = true;
    try {
      $patients = await fetchPatients(); // Usará datos simulados
    } catch (err) {
      console.error("Error al cargar pacientes:", err);
      $patients = []; // Valor por defecto si falla
    } finally {
      loading = false;
    }
  });

  function toggleStatus(patient) {
    patient.estado = patient.estado === "Activo" ? "Inactivo" : "Activo";
    $patients = [...$patients]; // Forzar reactividad
  }

  function viewAnalysis(id) {
    goto(`/doctor/${id}`);
  }
</script>

<div class="p-4">
  <h4 class="fw-bold">Pacientes Asignados</h4>
  <div class="card shadow-sm">
    <div class="card-body">
      {#if loading}
        <p>Cargando pacientes...</p>
      {:else}
        <PatientTable
          {filter}
          patients={$patients}
          onToggleStatus={toggleStatus}
          onViewAnalysis={viewAnalysis}
        />
      {/if}
    </div>
  </div>
</div>
