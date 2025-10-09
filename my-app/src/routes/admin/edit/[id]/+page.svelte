<script lang="ts">
  import { page } from "$app/stores";
  import EditarUsuario from "./EditarUsuario.svelte";

  $: id = $page.params.id;
</script>

<EditarUsuario {id} />

