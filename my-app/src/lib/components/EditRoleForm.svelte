<!-- EditRoleForm.svelte -->
<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { modules, loading } from "$lib/stores/roles.js";
  import { fetchModules, updateRole } from "$lib/services/roleService.js";

  const dispatch = createEventDispatcher();

  export let role = null; // Rol a editar, pasado como prop
  let roleName = "";
  let roleDescription = "";
  let selectedModules = {};

  onMount(async () => {
    $loading = true;
    try {
      const modulos = await fetchModules().catch((err) => {
        console.warn("Error al cargar módulos, usando array vacío:", err);
        return [];
      });
      $modules = modulos;

      if (role) {
        roleName = role.name || "";
        roleDescription = role.description || "";
        modulos.forEach((modulo) => {
          selectedModules[modulo.id] = role.modules?.includes(modulo.id) || false;
        });
      }
    } catch (err) {
      console.error("Error al cargar datos para edición:", err);
    } finally {
      $loading = false;
    }
  });

  async function handleSubmit() {
    if (!roleName.trim()) {
      alert("Por favor ingresa un nombre de rol");
      return;
    }

    const permisosSeleccionados = Object.entries(selectedModules)
      .filter(([_, value]) => value)
      .map(([id]) => parseInt(id));

    const roleData = {
      role_name: roleName,
      description: roleDescription || "",
      permissions: permisosSeleccionados.length > 0 ? permisosSeleccionados : undefined,
    };

    $loading = true;
    try {
      const response = await updateRole(role.id, roleData);
      if (response && response.message) {
        dispatch("roleUpdated", { id: role.id, ...roleData });
        dispatch("close"); // Cierra el modal tras éxito
        alert("Rol actualizado exitosamente ✅");
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (err) {
      console.error("Error al actualizar rol:", err);
      alert("Error al actualizar rol: " + (err.message || "Inténtalo de nuevo"));
    } finally {
      $loading = false;
    }
  }

  function handleCancel() {
    dispatch("close"); // Cierra el modal
  }
</script>

<div class="modal fade" id="editRoleModal" tabindex="-1" aria-labelledby="editRoleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editRoleModalLabel">Editar Rol: {role?.name || "Nuevo Rol"}</h5>
        <button type="button" class="btn-close" on:click={handleCancel} aria-label="Close"></button>
      </div>
      <div class="modal-body">
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

          <div class="mb-3">
            <label for="role-desc" class="form-label">Descripción</label>
            <textarea
              id="role-desc"
              class="form-control"
              rows="2"
              bind:value={roleDescription}
              placeholder="Ej: Rol con acceso a gestión de usuarios y citas..."
            ></textarea>
          </div>

          {#if $modules && $modules.length > 0}
            <h6 class="mb-3">Acceso a Módulos</h6>
            {#each $modules as modulo (modulo.id)}
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="mod-{modulo.id}"
                  bind:checked={selectedModules[modulo.id]}
                />
                <label class="form-check-label fw-semibold" for="mod-{modulo.id}">
                  {modulo.name || "Módulo sin nombre"}
                </label>
              </div>
            {/each}
          {:else}
            <p class="text-muted">No hay módulos disponibles o están cargando...</p>
          {/if}

          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-secondary" on:click={handleCancel}
              >Cancelar</button
            >
            <button type="submit" class="btn btn-primary" disabled={$loading}>
              {#if $loading}
                <span class="spinner-border spinner-border-sm me-2"></span>
                Guardando...
              {:else}
                Guardar Cambios
              {/if}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>