<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let users = [];
  let filteredUsers = [];
  let roles = ["Admin", "Doctor", "Paciente", "Administrador (Secretaria)"];
  let selectedRoleFilter = "Todos";
  let selectedStatusFilter = "Activo";
  let searchQuery = "";

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

  // resultados (tabla global de todos los análisis)
  let resultadosPacientes = [];
  let resultadosCargando = true;
  let resultadosSearch = "";

  onMount(() => {
    // usuarios de ejemplo (puedes cargar desde tu API)
    users = [
      {
        id: 1,
        name: "Dr. Carlos Sánchez",
        role: "Doctor",
        email: "carlos@medivision.com",
        status: "Activo",
      },
      {
        id: 2,
        name: "Ana Gómez",
        role: "Paciente",
        email: "ana@email.com",
        status: "Activo",
      },
      {
        id: 3,
        name: "Juan Pérez",
        role: "Paciente",
        email: "juan@email.com",
        status: "Inactivo",
      },
    ];
    filteredUsers = users;

    // cargar resultados (intentamos desde API, si no, usamos datos de ejemplo)
    cargarResultados();
  });

  function filterUsers() {
    filteredUsers = users.filter((u) => {
      const matchName = u.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchRole =
        selectedRoleFilter === "Todos" || u.role === selectedRoleFilter;
      const matchStatus =
        selectedStatusFilter === "Todos" || u.status === selectedStatusFilter;
      return matchName && matchRole && matchStatus;
    });
  }

  function createUser() {
    if (!newUser.email || !newUser.name || !newUser.password) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const user = { ...newUser, id: users.length + 1, status: "Activo" };
    users = [...users, user];
    filteredUsers = users;
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

  function deleteUser(id: number) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      users = users.filter((u) => u.id !== id);
      filteredUsers = users;
    }
  }

  function editUser(id: number) {
    goto(`/admin/edit/${id}`);
  }

  // -------------------------------
  // Resultados: carga y acciones
  // -------------------------------
  async function cargarResultados() {
    resultadosCargando = true;
    try {
      // intenta cargar desde tu API (ajusta ruta si la tienes diferente)
      const res = await fetch("/api/analysis"); // ejemplo de endpoint
      if (res.ok) {
        resultadosPacientes = await res.json();
      } else {
        // fallback (ejemplo) si la API no responde
        resultadosPacientes = [
          {
            id: 101,
            paciente: "Juan Pérez",
            edad: 34,
            analisis: "Radiografía de tórax",
            estado: "Validado",
            patient_id: 2,
          },
          {
            id: 102,
            paciente: "María Gómez",
            edad: 28,
            analisis: "Resonancia cerebral",
            estado: "Pendiente",
            patient_id: 5,
          },
          {
            id: 103,
            paciente: "Carlos Rivas",
            edad: 45,
            analisis: "Tomografía abdominal",
            estado: "Observación",
            patient_id: 7,
          },
          {
            id: 104,
            paciente: "Laura Torres",
            edad: 50,
            analisis: "Ecografía mamaria",
            estado: "Validado",
            patient_id: 9,
          },
        ];
      }
    } catch (err) {
      console.error(err);
      resultadosPacientes = [
        {
          id: 101,
          paciente: "Juan Pérez",
          edad: 34,
          analisis: "Radiografía de tórax",
          estado: "Validado",
          patient_id: 2,
        },
        {
          id: 102,
          paciente: "María Gómez",
          edad: 28,
          analisis: "Resonancia cerebral",
          estado: "Pendiente",
          patient_id: 5,
        },
      ];
    } finally {
      resultadosCargando = false;
    }
  }

  // filtrar resultados por nombre / analisis
  $: resultadosFiltrados = resultadosPacientes.filter((r) =>
    (r.paciente + " " + r.analisis)
      .toLowerCase()
      .includes(resultadosSearch.toLowerCase())
  );

  function verResultado(id) {
    // redirigir a la ruta de detalle de análisis (usa la ruta que uses en backend/frontend)
    // si tu detalle usa solo el id del análisis:
    goto(`/admin/resultados/${id}`); // o cambia a la ruta que corresponda (ej: /admin/analysis/${id})
  }

  function editarResultado(id) {
    // redirigir a edición (si implementas)
    goto(`/admin/resultados/edit/${id}`);
  }
</script>

<!-- PANEL ADMIN -->
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
                on:input={filterUsers}
              />
            </div>
            <div class="col-md-4">
              <select
                class="form-select"
                bind:value={selectedRoleFilter}
                on:change={filterUsers}
              >
                <option>Todos</option>
                {#each roles as role}
                  <option>{role}</option>
                {/each}
              </select>
            </div>
            <div class="col-md-4">
              <select
                class="form-select"
                bind:value={selectedStatusFilter}
                on:change={filterUsers}
              >
                <option>Todos</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
          </div>

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
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        class={`badge ${user.status === "Activo" ? "bg-success" : "bg-danger"}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button
                        class="btn btn-sm btn-outline-primary me-2"
                        on:click={() => editUser(user.id)}
                      >
                        Editar
                      </button>

                      <button
                        class="btn btn-sm btn-outline-danger"
                        on:click={() => deleteUser(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Crear usuario -->
    <div class="col-lg-5">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title mb-3">Crear Nuevo Usuario</h4>

          <form on:submit|preventDefault={createUser}>
            <div class="row g-2">
              <div class="col-md-6">
                <input
                  class="form-control"
                  placeholder="Nombre de usuario"
                  bind:value={newUser.username}
                />
              </div>
              <div class="col-md-6">
                <input
                  class="form-control"
                  placeholder="Correo electrónico"
                  bind:value={newUser.email}
                />
              </div>
              <div class="col-md-6">
                <input
                  class="form-control"
                  placeholder="Nombre"
                  bind:value={newUser.name}
                />
              </div>
              <div class="col-md-6">
                <input
                  class="form-control"
                  placeholder="Apellido"
                  bind:value={newUser.lastname}
                />
              </div>
              <div class="col-md-6">
                <select class="form-select" bind:value={newUser.documentType}>
                  <option value="">Tipo de documento</option>
                  <option value="CC">Cédula</option>
                  <option value="TI">Tarjeta de identidad</option>
                </select>
              </div>
              <div class="col-md-6">
                <input
                  class="form-control"
                  placeholder="Número de documento"
                  bind:value={newUser.documentNumber}
                />
              </div>
              <div class="col-md-6">
                <input
                  type="date"
                  class="form-control"
                  bind:value={newUser.birthDate}
                />
              </div>
              <div class="col-md-6">
                <input
                  class="form-control"
                  placeholder="Teléfono"
                  bind:value={newUser.phone}
                />
              </div>
              <div class="col-md-12">
                <input
                  class="form-control"
                  placeholder="Dirección"
                  bind:value={newUser.address}
                />
              </div>
              <div class="col-md-12">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Contraseña"
                  bind:value={newUser.password}
                />
              </div>
              <div class="col-md-12">
                <select class="form-select" bind:value={newUser.role}>
                  {#each roles as role}
                    <option value={role}>{role}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div class="d-grid mt-3">
              <button type="submit" class="btn btn-primary"
                >Crear Usuario</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- ---------------------------------------------------
       NUEVA SECCION: Resultados de TODOS los pacientes
       --------------------------------------------------- -->
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
                on:click={() => cargarResultados()}
              >
                Actualizar
              </button>
            </div>
          </div>

          {#if resultadosCargando}
            <p>Cargando resultados...</p>
          {:else if resultadosFiltrados.length === 0}
            <p class="text-muted">No hay resultados para mostrar.</p>
          {:else}
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Paciente</th>
                    <th>Edad</th>
                    <th>Análisis</th>
                    <th>Responsable</th>
                    <th>Estado</th>
                    <th class="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {#each resultadosFiltrados as item}
                    <tr>
                      <td>{item.paciente}</td>
                      <td>{item.edad}</td>
                      <td>{item.analisis}</td>
                      <td>{item.doctor ?? "-"}</td>
                      <td>
                        {#if item.estado === "Validado"}
                          <span class="badge bg-success">{item.estado}</span>
                        {:else if item.estado === "Pendiente"}
                          <span class="badge bg-warning text-dark"
                            >{item.estado}</span
                          >
                        {:else}
                          <span class="badge bg-danger">{item.estado}</span>
                        {/if}
                      </td>
                      <td class="text-center">
                        <button
                          class="btn btn-primary"
                          on:click={() => goto(`/admin/resultados/${item.id}`)}
                        >
                          Ver
                        </button>

                        <button
                          class="btn btn-sm btn-outline-secondary"
                          on:click={() => editarResultado(item.id)}
                        >
                          Editar
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
    </div>
  </div>
</div>
