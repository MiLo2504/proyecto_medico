<script lang="ts">
  export let users = [];
  export let onEdit;
  export let onDelete;
  export let searchQuery = "";
  export let selectedRoleFilter = "Todos";
  export let selectedStatusFilter = "Activo";

  // 🔧 Adaptar los datos a lo que devuelve la base de datos
  $: filteredUsers = users.filter((u) => {
    const name = (u.full_name || u.name || "").toLowerCase();
    const role =
      u.role?.toLowerCase() || u.rol?.toLowerCase() || String(u.id_rol || "");
    const status = u.status || (u.state === 1 ? "Activo" : "Inactivo");

    const matchName = name.includes((searchQuery || "").toLowerCase());
    const matchRole =
      selectedRoleFilter === "Todos" ||
      role === selectedRoleFilter.toLowerCase();
    const matchStatus =
      selectedStatusFilter === "Todos" ||
      status.toLowerCase() === selectedStatusFilter.toLowerCase();

    return matchName && matchRole && matchStatus;
  });
</script>

<div class="table-responsive">
  <table class="table table-striped align-middle">
    <thead class="table-light">
      <tr>
        <th>Nombre</th>
        <th>Rol</th>
        <th>Email</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredUsers as user}
        <tr>
          <td>{user.full_name || user.name}</td>
          <td>{user.role || user.id_rol}</td>
          <td>{user.email}</td>
          <td>
            <span
              class="badge {user.state === 1 || user.status === 'Activo'
                ? 'bg-success'
                : 'bg-danger'}"
            >
              {user.state === 1 || user.status === "Activo"
                ? "Activo"
                : "Inactivo"}
            </span>
          </td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary me-2"
              on:click={() => onEdit(user.id)}
            >
              Editar
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              on:click={() => onDelete(user.id)}
            >
              Eliminar
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
