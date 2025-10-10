<script>
  import PatientNavbar from "$lib/components/PatientNavbar.svelte";
  export let data;
</script>

<PatientNavbar nombre={data?.user?.full_name || "Paciente"} />

<main class="flex-grow-1">
  <slot />
</main>
