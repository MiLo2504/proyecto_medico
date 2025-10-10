<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { users } from "$lib/stores/users.js";
  import { resultados, loading } from "$lib/stores/results.js";
  import UserTable from "$lib/components/UserTable.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import ResultsTable from "$lib/components/ResultsTable.svelte";
  import {
    fetchUsers,
    createUser as createUserService,
  } from "$lib/services/userService.js";
  import { fetchResults } from "$lib/services/resultService.js";

  let newUser = {
    username: "",
    name: "",
    lastname: "",
    documentType: "",
    documentNumber: "",
    birthDate: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    role: "Paciente",
  };
  let searchQuery = "";
  let selectedRoleFilter = "Todos";
  let selectedStatusFilter = "Activo";
  let resultadosSearch = "";

  onMount(async () => {
    $users = await fetchUsers();
    await cargarResultados();
  });

  function handleCreateUser() {
    const user = createUserService(newUser);
    $users = [...$users, user];
    newUser = {
      username: "",
      name: "",
      lastname: "",
      documentType: "",
      documentNumber: "",
      birthDate: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      role: "Paciente",
    };
    alert("Usuario creado correctamente ✅");
  }

  function deleteUser(id) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      $users = $users.filter((u) => u.id !== id);
    }
  }

  function editUser(id) {
    goto(`/admin/edit/${id}`);
  }

  async function cargarResultados() {
    $loading = true;
    $resultados = await fetchResults();
    $loading = false;
  }

  function verResultado(id) {
    goto(`/admin/resultados/${id}`);
  }

  function editarResultado(id) {
    goto(`/admin/resultados/edit/${id}`);
  }
</script>

<div class="container py-4">
  <h2 class="text-center text-primary fw-bold mb-4">Panel de Administración</h2>

  <div class="row">
    <div class="col-lg-7 mb-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title mb-3">Lista de Usuarios</h4>
          <div class="row g-2 mb-3">
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar por nombre"
                bind:value={searchQuery}
              />
            </div>
            <div class="col-md-4">
              <select class="form-select" bind:value={selectedRoleFilter}
                ><option>Todos</option><option>Admin</option><option
                  >Doctor</option
                ><option>Paciente</option><option
                  >Administrador (Secretaria)</option
                ></select
              >
            </div>
            <div class="col-md-4">
              <select class="form-select" bind:value={selectedStatusFilter}
                ><option>Todos</option><option>Activo</option><option
                  >Inactivo</option
                ></select
              >
            </div>
          </div>
          <UserTable
            {searchQuery}
            {selectedRoleFilter}
            {selectedStatusFilter}
            users={$users}
            onEdit={editUser}
            onDelete={deleteUser}
          />
        </div>
      </div>
    </div>
    <div class="col-lg-5">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title mb-3">Crear Nuevo Usuario</h4>
          <UserForm
            {newUser}
            roles={[
              "Admin",
              "Doctor",
              "Paciente",
              "Administrador (Secretaria)",
            ]}
            onSubmit={handleCreateUser}
          />
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4" id="resultados">
    <div class="col-12">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="card-title mb-0">Resultados de todos los pacientes</h4>
            <div class="d-flex gap-2">
              <input
                class="form-control"
                placeholder="Buscar paciente o análisis..."
                bind:value={resultadosSearch}
              />
              <button
                class="btn btn-outline-secondary"
                on:click={cargarResultados}>Actualizar</button
              >
            </div>
          </div>
          <ResultsTable
            results={$resultados}
            loading={$loading}
            searchQuery={resultadosSearch}
            onView={verResultado}
            onEdit={editarResultado}
          />
        </div>
      </div>
    </div>
  </div>
</div>
