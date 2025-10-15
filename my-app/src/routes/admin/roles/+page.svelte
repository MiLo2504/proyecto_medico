<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { roles, modules, loading } from "$lib/stores/roles.js";
  import RoleForm from "$lib/components/RoleForm.svelte";
  import RolePermissionsTable from "$lib/components/RolePermissionsTable.svelte";
  import {
    fetchRoles,
    fetchModules,
    deleteRole,
  } from "$lib/services/roleService.js";

  let editingRole = null;

  onMount(async () => {
    $loading = true;
    try {
      const [rolesData, modulesData] = await Promise.all([
        fetchRoles(),
        fetchModules(),
      ]);
      $roles = rolesData;
      $modules = modulesData;
      console.log("Roles cargados:", $roles); // Depuración
      console.log("Módulos cargados:", $modules); // Depuración
    } catch (err) {
      console.error("Error al cargar datos:", err);
      alert("No se pudieron cargar los datos de roles");
    } finally {
      $loading = false;
    }
  });

  async function handleEdit(role) {
    editingRole = role;
    // Simulación de edición (puedes abrir un modal o navegar)
    alert(`Editando rol: ${role.role_name}`);
  }

  async function handleDelete(roleId) {
    $loading = true;
    try {
      await deleteRole(roleId); // Simula cambio de estado a 0
      $roles = $roles
        .map((role) => (role.id === roleId ? { ...role, estado: 0 } : role))
        .filter((role) => role.estado === 1); // Actualiza estado y filtra
      alert("Rol eliminado correctamente");
    } catch (err) {
      alert("Error al eliminar el rol");
    } finally {
      $loading = false;
    }
  }
</script>

<div class="container my-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold text-primary">Administración de Roles</h2>
    <button class="btn btn-primary" on:click={() => goto("/admin")}>
      <i class="bi bi-arrow-left me-2"></i>Volver
    </button>
  </div>

  <div class="row g-4">
    <div class="col-lg-4">
      <RoleForm />
    </div>
    <div class="col-lg-8">
      {#if $loading}
        <div class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
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
  </div>
</div>
