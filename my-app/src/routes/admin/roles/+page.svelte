<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { roles, modules, loading } from "$lib/stores/roles.js";
  import RoleForm from "$lib/components/RoleForm.svelte";
  import RolePermissionsTable from "$lib/components/RolePermissionsTable.svelte";
  import { fetchRoles, fetchModules, deleteRole } from "$lib/services/roleService.js";

  let editingRole = null;
  let showForm = false;
  let isEditing = false;

  onMount(async () => {
    $loading = true;
    try {
      const [rolesData, modulesData] = await Promise.all([
        fetchRoles(),
        fetchModules(),
      ]);
      $roles = rolesData;
      $modules = modulesData;
    } catch (err) {
      console.error("Error al cargar roles o módulos:", err);
      alert("No se pudieron obtener los roles o módulos. Revisa la consola para más detalles.");
    } finally {
      $loading = false;
    }
  });

  function handleNew() {
    editingRole = null;
    isEditing = false;
    showForm = true;
  }

  function handleEdit(role) {
    editingRole = role;
    isEditing = true;
    showForm = true;
  }

  function handleCancel() {
    showForm = false;
    editingRole = null;
  }

  function handleSaved() {
    showForm = false;
    editingRole = null;
    // Recargar roles para reflejar cambios
    fetchRoles().then((rolesData) => ($roles = rolesData)).catch((err) => console.error(err));
  }

  async function handleDelete(roleId) {
    $loading = true;
    try {
      await deleteRole(roleId);
      $roles = $roles.filter((r) => r.id !== roleId);
      alert("Rol eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar rol:", err);
      alert("Error al eliminar el rol");
    } finally {
      $loading = false;
    }
  }
</script>

<div class="container my-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold text-primary">Administración de Perfil</h2>
    <button class="btn btn-primary" on:click={() => goto("/admin")}>
      <i class="bi bi-arrow-left me-2"></i>Volver
    </button>
  </div>

  <button class="btn btn-primary mb-4" on:click={handleNew}>Nuevo</button>

  {#if showForm}
    <RoleForm {editingRole} {isEditing} on:cancel={handleCancel} on:saved={handleSaved} />
  {/if}

  {#if $loading}
    <div class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  {:else if !$roles || $roles.length === 0}
    <div class="alert alert-warning text-center">
      No se encontraron roles. Intenta crear uno nuevo.
    </div>
  {:else}
    <RolePermissionsTable
      roles={$roles}
      modules={$modules}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  {/if}
</div>