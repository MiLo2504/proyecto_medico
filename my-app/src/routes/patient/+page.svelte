<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { patient, analyses, loading } from "$lib/stores/patients.js";
  import PatientInfoForm from "$lib/components/PatientInfoForm.svelte";
  import AnalysisUpload from "$lib/components/AnalysisUpload.svelte";
  import AnalysisList from "$lib/components/AnalysisList.svelte";
  import { fetchPatient, fetchAnalyses } from "$lib/services/patientService.js";

  let file = null;

  onMount(async () => {
    $loading = true;
    try {
      $patient = await fetchPatient(1); // Usa un ID fijo para simulación
      $analyses = await fetchAnalyses(1);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      $patient = null;
      $analyses = [];
    } finally {
      $loading = false;
    }
  });

  async function handleAnalyze(file) {
    $loading = true;
    try {
      $analyses = [...$analyses, { id: Date.now(), url_image: URL.createObjectURL(file), date: new Date().toISOString(), result_ia: "Procesando..." }];
      alert("Imagen subida correctamente");
    } catch (err) {
      alert("Error al subir imagen");
    } finally {
      $loading = false;
    }
  }

  async function handleSave(data) {
    $patient = { ...$patient, ...data };
    alert("Información guardada correctamente ✅");
  }

  function viewDetail(id) {
    goto(`/patient/${id}`);
  }
</script>

<div class="container my-5">
  <div class="row g-4">
    <div class="col-lg-8">
      <AnalysisUpload {file} onAnalyze={handleAnalyze} />
      <AnalysisList analyses={$analyses} loading={$loading} onViewDetail={viewDetail} />
    </div>
    <div class="col-lg-4">
      {#if $patient}
        <PatientInfoForm patient={$patient} onSave={handleSave} />
      {:else}
        <p>Cargando información del paciente...</p>
      {/if}
    </div>
  </div>
</div>