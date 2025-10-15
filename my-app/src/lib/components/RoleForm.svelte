<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { roles, modules, loading } from "$lib/stores/roles.js";
  import { createRole, fetchModules } from "$lib/services/roleService.js";

  let roleName = "";
  let selectedPermissions = {};

  onMount(async () => {
    $loading = true;
    try {
      const modulos = await fetchModules();
      $modules = modulos;
      modulos.forEach((modulo) => {
        if (!selectedPermissions[modulo.id]) {
          selectedPermissions[modulo.id] = {
            can_create: false,
            can_read: false,
            can_update: false,
            can_delete: false,
          };
        }
      });
    } catch (err) {
      console.error("Error al cargar módulos:", err);
    } finally {
      $loading = false;
    }
  });

  $: if ($modules.length > 0) {
    $modules.forEach((modulo) => {
      if (!selectedPermissions[modulo.id]) {
        selectedPermissions[modulo.id] = {
          can_create: false,
          can_read: false,
          can_update: false,
          can_delete: false,
        };
      }
    });
  }

  async function handleSubmit() {
    if (!roleName.trim()) {
      alert("Por favor, ingresa el nombre del rol");
      return;
    }
    $loading = true;
    try {
      const roleData = {
        role_name: roleName,
        permissions: selectedPermissions,
      };
      const newRole = await createRole(roleData);
      $roles = [...$roles, newRole];
      alert("Rol creado correctamente ✅");
      roleName = "";
      selectedPermissions = {};
      $modules.forEach((modulo) => {
        selectedPermissions[modulo.id] = {
          can_create: false,
          can_read: false,
          can_update: false,
          can_delete: false,
        };
      });
    } catch (err) {
      alert("Error al crear el rol: " + err.message);
    } finally {
      $loading = false;
    }
  }

  function cancel() {
    goto("/admin/roles");
  }
</script>

<div class="card shadow-sm">
  <div class="card-body">
    <h4 class="fw-bold mb-3">Crear Nuevo Rol</h4>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-3">
        <label for="role-name" class="form-label">Nombre del Rol</label>
        <input
          id="role-name"
          type="text"
          class="form-control"
          bind:value={roleName}
          required
        />
      </div>

      {#if $modules.length > 0}
        <h5 class="mb-3">Permisos por Módulo</h5>
        {#each $modules as modulo}
          <div class="border p-3 mb-3 rounded">
            <h6 class="fw-bold text-primary mb-2">{modulo.module_name}</h6>
            <div class="row">
              <div class="col-md-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="create-{modulo.id}"
                    bind:checked={selectedPermissions[modulo.id].can_create}
                  />
                  <label class="form-check-label" for="create-{modulo.id}"
                    >Crear</label
                  >
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="read-{modulo.id}"
                    bind:checked={selectedPermissions[modulo.id].can_read}
                  />
                  <label class="form-check-label" for="read-{modulo.id}"
                    >Leer</label
                  >
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="update-{modulo.id}"
                    bind:checked={selectedPermissions[modulo.id].can_update}
                  />
                  <label class="form-check-label" for="update-{modulo.id}"
                    >Actualizar</label
                  >
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="delete-{modulo.id}"
                    bind:checked={selectedPermissions[modulo.id].can_delete}
                  />
                  <label class="form-check-label" for="delete-{modulo.id}"
                    >Eliminar</label
                  >
                </div>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <p class="text-muted">Cargando módulos...</p>
      {/if}

      <div class="d-flex justify-content-end gap-2 mt-4">
        <button type="button" class="btn btn-secondary" on:click={cancel}
          >Cancelar</button
        >
        <button type="submit" class="btn btn-primary" disabled={$loading}>
          {#if $loading}
            <span class="spinner-border spinner-border-sm me-2"></span>
            Creando...
          {:else}
            Crear Rol
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
