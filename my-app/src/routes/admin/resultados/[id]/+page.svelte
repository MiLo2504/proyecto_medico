<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import ResultDetail from "$lib/components/ResultDetail.svelte";
  import { fetchResultById } from "$lib/services/resultService.js";

  let result = null;
  let id = $page.params.id;

  onMount(async () => {
    result = await fetchResultById(id);
  });

  function handleBack() {
    goto("/admin");
  }
</script>

<svelte:head>
  <title>Detalle Resultado #{id}</title>
</svelte:head>

<ResultDetail {result} onBack={handleBack} />
