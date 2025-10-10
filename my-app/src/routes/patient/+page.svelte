<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import AnalysisDetail from "$lib/components/AnalysisDetail.svelte";
  import { fetchAnalyses } from "$lib/services/patientService.js";

  let analysis = null;
  let id = $page.params.id;

  onMount(async () => {
    try {
      const analyses = await fetchAnalyses(1); // Ajusta el ID dinámicamente
      analysis = analyses.find((a) => a.id === Number(id));
      if (!analysis) throw new Error("Análisis no encontrado");
    } catch (err) {
      console.error(err);
      alert("Error al cargar el análisis");
      goto("/patient");
    }
  });

  function handleBack() {
    goto("/patient");
  }
</script>

<AnalysisDetail {analysis} onBack={handleBack} />