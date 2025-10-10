<script lang="ts">
  export let users = [];
  export let onEdit;
  export let onDelete;
  export let searchQuery = "";
  export let selectedRoleFilter = "Todos";
  export let selectedStatusFilter = "Activo";

  $: filteredUsers = users.filter((u) => {
    const matchName = u.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole =
      selectedRoleFilter === "Todos" || u.role === selectedRoleFilter;
    const matchStatus =
      selectedStatusFilter === "Todos" || u.status === selectedStatusFilter;
    return matchName && matchRole && matchStatus;
  });
</script>

<div class="table-responsive">
  <table class="table table-striped align-middle">
    <thead class="table-light">
      <tr
        ><th>Nombre</th><th>Rol</th><th>Email</th><th>Estado</th><th
          >Acciones</th
        ></tr
      >
    </thead>
    <tbody>
      {#each filteredUsers as user}
        <tr>
          <td>{user.name}</td><td>{user.role}</td><td>{user.email}</td>
          <td
            ><span
              class="badge {user.status === 'Activo'
                ? 'bg-success'
                : 'bg-danger'}">{user.status}</span
            ></td
          >
          <td>
            <button
              class="btn btn-sm btn-outline-primary me-2"
              on:click={() => onEdit(user.id)}>Editar</button
            >
            <button
              class="btn btn-sm btn-outline-danger"
              on:click={() => onDelete(user.id)}>Eliminar</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
