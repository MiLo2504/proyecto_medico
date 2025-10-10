<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import PatientDetail from "$lib/components/PatientDetail.svelte";
  import {
    fetchPatientById,
    fetchAnalysesByPatientId,
  } from "$lib/services/doctorService.js";
  import { page } from "$app/stores";

  let patient = null;
  let analyses = [];
  let observations = "";
  let id = $page.params.id;
  let loading = false;

  onMount(async () => {
    loading = true;
    try {
      patient = await fetchPatientById(id); // Usará datos simulados
      analyses = await fetchAnalysesByPatientId(id);
      if (!patient) throw new Error("Paciente no encontrado");
    } catch (err) {
      console.error("Error al cargar datos:", err);
      alert("No se pudieron cargar los detalles del paciente");
      goto("/doctor");
    } finally {
      loading = false;
    }
  });

  function validateIA() {
    alert("Resultados de IA validados correctamente ✅");
  }

  function saveObservations(obs) {
    observations = obs;
    alert("Observaciones guardadas ✅");
  }
</script>

{#if loading}
  <div class="container my-5 text-center"><p>Cargando...</p></div>
{:else}
  <PatientDetail
    {patient}
    {analyses}
    {observations}
    onValidateIA={validateIA}
    onSaveObservations={saveObservations}
  />
{/if}
