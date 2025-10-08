<script>
  import NavbarPaciente from "$lib/components/NavbarPaciente.svelte";
</script>

<NavbarPaciente nombre="Juan Pérez" />

<main class="flex-grow-1">
  <slot />
</main>
