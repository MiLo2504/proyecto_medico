<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import UserEditForm from "$lib/components/UserEditForm.svelte";
  import { fetchUserById, updateUser } from "$lib/services/userService.js";

  let user = null;
  let id = $page.params.id;

  onMount(async () => {
    user = await fetchUserById(id);
  });

  function handleSave() {
    if (user) {
      updateUser(user);
      alert(`Cambios guardados para ${user.nombre} ${user.apellido} ✅`);
      goto("/admin");
    }
  }

  function handleCancel() {
    goto("/admin");
  }
</script>

<svelte:head>
  <title>Editar Usuario #{id}</title>
</svelte:head>

<UserEditForm {user} onSave={handleSave} onCancel={handleCancel} />
