<script>
  export let roles = [];
  export let modules = [];
  export let onEdit;
  export let onDelete;

  function handleEdit(role) {
    if (onEdit) onEdit(role);
  }

  function handleDelete(roleId) {
    if (confirm("¿Estás seguro de que deseas eliminar este rol?")) {
      if (onDelete) onDelete(roleId);
    }
  }
</script>

<div class="card shadow-sm">
  <div class="card-body">
    <h4 class="fw-bold mb-3">Roles Existentes</h4>
    
    {#if roles.length === 0}
      <p class="text-muted">No hay roles registrados.</p>
    {:else}
      <div class="table-responsive">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th>Rol</th>
              {#each modules as modulo}
                <th class="text-center">{modulo.module_name}</th>
              {/each}
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {#each roles.filter(role => role.estado === 1) as role}
              <tr>
                <td>
                  <strong>{role.role_name}</strong>
                </td>
                {#each modules as modulo}
                  <td class="text-center">
                    {#if role.permissions[modulo.id]}
                      <span class="badge bg-success">
                        {role.permissions[modulo.id].can_create ? '✓' : ''}
                        {role.permissions[modulo.id].can_read ? '✓' : ''}
                        {role.permissions[modulo.id].can_update ? '✓' : ''}
                        {role.permissions[modulo.id].can_delete ? '✓' : ''}
                      </span>
                    {:else}
                      <span class="badge bg-secondary">Sin permisos</span>
                    {/if}
                  </td>
                {/each}
                <td class="text-center">
                  <button class="btn btn-sm btn-primary me-2" on:click={() => handleEdit(role)}>
                    Editar
                  </button>
                  <button class="btn btn-sm btn-danger" on:click={() => handleDelete(role.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>