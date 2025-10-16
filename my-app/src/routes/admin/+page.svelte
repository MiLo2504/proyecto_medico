<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { users } from "$lib/stores/users.js";
  import { roles } from "$lib/stores/roles.js"; // 🎯 Importar el store de roles
  import { resultados, loading } from "$lib/stores/results.js";
  import UserTable from "$lib/components/UserTable.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import ResultsTable from "$lib/components/ResultsTable.svelte";
  import {
    fetchUsers,
    createUser as createUserService,
  } from "$lib/services/userService.js";
  import { fetchResults } from "$lib/services/resultService.js";
  import { deleteUser as deleteUserService } from "$lib/services/userService.js";
  import { loadRoles } from "$lib/stores/roles.js"; // 🎯 Importar la función para cargar roles

  // --- Objeto base alineado con tu tabla "user" ---
  let newUser = {
    user_name: "",
    full_name: "",
    last_name: "",
    email: "",
    password: "",
    date_birth: "",
    address: "",
    phone: "",
    id_type_document: "",
    num_document: "",
    id_rol: "",
  };

  // --- Filtros y búsqueda ---
  let searchQuery = "";
  let selectedRoleFilter = "Todos";
  let selectedStatusFilter = "Activo";
  let resultadosSearch = "";

  // --- Tipos de documento (pueden venir del backend) ---
  const documentTypes = [
    { id: 1, name: "Cédula de Ciudadanía" },
    { id: 2, name: "Tarjeta de Identidad" },
  ];

  // --- Cargar datos al iniciar ---
  onMount(async () => {
    loading.set(true);
    try {
      // Cargar usuarios
      users.set(await fetchUsers());
      
      // 🎯 Cargar roles dinámicamente
      await loadRoles();
      
      // Cargar resultados
      await cargarResultados();
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Error al cargar datos");
    } finally {
      loading.set(false);
    }
  });

  // --- Crear usuario ---
  async function handleCreateUser() {
    try {
      const createdUser = await createUserService(newUser);
      users.update(($users) => [...$users, createdUser]);

      // Reiniciar formulario
      newUser = {
        user_name: "",
        full_name: "",
        last_name: "",
        email: "",
        password: "",
        date_birth: "",
        address: "",
        phone: "",
        id_type_document: "",
        num_document: "",
        id_rol: "",
      };

      alert("Usuario creado correctamente ✅");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Ocurrió un error al crear el usuario ❌");
    }
  }

  // --- Eliminar usuario ---
  async function deleteUser(id) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        const success = await deleteUserService(id);
        if (success) {
          users.update(($users) => $users.filter((u) => u.id !== id));
          alert("Usuario eliminado correctamente ✅");
        } else {
          alert("No se pudo eliminar el usuario ❌");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al eliminar el usuario ❌");
      }
    }
  }

  // --- Editar usuario ---
  function editUser(id) {
    goto(`/admin/edit/${id}`);
  }

  // --- Cargar resultados ---
  async function cargarResultados() {
    loading.set(true);
    resultados.set(await fetchResults());
    loading.set(false);
  }

  // --- Ver o editar resultados ---
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
    <!-- Lista de usuarios -->
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
              <select class="form-select" bind:value={selectedRoleFilter}>
                <option>Todos</option>
                <option>Admin</option>
                <option>Doctor</option>
                <option>Paciente</option>
                <option>Administrador (Secretaria)</option>
              </select>
            </div>
            <div class="col-md-4">
              <select class="form-select" bind:value={selectedStatusFilter}>
                <option>Todos</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
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

    <!-- Formulario de creación -->
    <div class="col-lg-5">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title mb-3">Crear Nuevo Usuario</h4>
          <UserForm
            bind:newUser
            roles={$roles}  🎯 Pasar el store $roles 
            documentTypes={documentTypes}
            onSubmit={handleCreateUser}
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Tabla de resultados -->
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
                on:click={cargarResultados}
              >
                Actualizar
              </button>
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