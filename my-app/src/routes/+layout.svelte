<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar />

<main class="flex-grow-1">
  <slot />
</main>

<Footer />

