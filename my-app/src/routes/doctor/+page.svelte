<script>
  import { goto } from '$app/navigation';

  let pacientes = [
    { id: 1, nombre: "Sofía Rodríguez", edad: 32, genero: "Femenino", estado: "Activo" },
    { id: 2, nombre: "Carlos Pérez", edad: 45, genero: "Masculino", estado: "Activo" },
    { id: 3, nombre: "Ana García", edad: 28, genero: "Femenino", estado: "Inactivo" },
    { id: 4, nombre: "Luis Martínez", edad: 50, genero: "Masculino", estado: "Activo" },
    { id: 5, nombre: "Elena Sánchez", edad: 35, genero: "Femenino", estado: "Activo" }
  ];

  let filtro = "";

  // Filtrar pacientes
  $: filtrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  // Cambiar estado
  function cambiarEstado(paciente) {
    paciente.estado = paciente.estado === "Activo" ? "Inactivo" : "Activo";
  }

  // Ir a la página del análisis
  function verAnalisis(id) {
    goto(`/doctor/${id}`);
  }

  function cerrarSesion() {
    alert("Sesión cerrada correctamente 🩺");
  }
</script>

<div class="container-fluid">
  <div class="row">
    <!-- Sidebar -->
    <div class="col-2 bg-light border-end min-vh-100 p-3">
      <h5 class="mb-4 fw-bold text-primary">🩺 MediVision</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link">Dashboard</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link active fw-semibold">Pacientes</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link">Citas</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Configuración</a></li>
      </ul>
    </div>

    <!-- Contenido principal -->
    <div class="col p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold">Pacientes Asignados</h4>
        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-outline-danger btn-sm" on:click={cerrarSesion}>
            Cerrar sesión
          </button>
          <div class="d-flex align-items-center">
            <span class="me-2 text-secondary">Dr. Alan Grant</span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              alt="doctor"
              width="40"
              class="rounded-circle border"
            />
          </div>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <input
            type="text"
            placeholder="Buscar pacientes..."
            bind:value={filtro}
            class="form-control mb-3"
          />

          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#each filtrados as p}
                <tr>
                  <td>{p.nombre}</td>
                  <td>{p.edad}</td>
                  <td>{p.genero}</td>
                  <td>
                    <button
                      class="btn btn-sm {p.estado === 'Activo' ? 'btn-success' : 'btn-danger'}"
                      on:click={() => cambiarEstado(p)}
                    >
                      {p.estado}
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-link" on:click={() => verAnalisis(p.id)}>
                      Ver Análisis
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
</div>
