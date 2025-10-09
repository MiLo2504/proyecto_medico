<script>
  import Footer from "$lib/components/Footer.svelte";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { onMount } from "svelte";
  onMount(async () => {
    await import("bootstrap/dist/js/bootstrap.bundle.min.js");
  });
</script>

<main class="flex-grow-1">
  <slot />
</main>

<Footer />
