<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import PatientDetail from "$lib/components/PatientDetail.svelte";
  import { fetchPatientById, fetchAnalysesByPatientId } from "$lib/services/doctorService.js";
  import { page } from "$app/stores";

  let patient = null;
  let analyses = [];
  let observations = "";
  let id = $page.params.id;

  onMount(async () => {
    patient = await fetchPatientById(id);
    analyses = await fetchAnalysesByPatientId(id);
  });

  function validateIA() {
    alert("Resultados de IA validados correctamente ✅");
  }

  function saveObservations(obs) {
    observations = obs;
    alert("Observaciones guardadas ✅");
  }
</script>

<PatientDetail {patient} {analyses} {observations} onValidateIA={validateIA} onSaveObservations={saveObservations} />