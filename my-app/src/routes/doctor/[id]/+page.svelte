<script>
  export let paciente = {
    nombre: "Luis Rodríguez",
    id: "P-73648",
    edad: 32,
    genero: "Masculino",
    email: "Luisr.@gmail.com",
    ultimaVisita: "2024-04-15",
  };

  let observaciones = "";

  let analisis = [
    { metrica: "Glucosa", resultado: "110 mg/dL", rango: "70-100 mg/dL", interpretacion: "Ligeramente alto", color: "text-warning" },
    { metrica: "Colesterol", resultado: "220 mg/dL", rango: "< 200 mg/dL", interpretacion: "Alto", color: "text-danger" },
    { metrica: "Presión Arterial", resultado: "130/85 mmHg", rango: "< 120/80 mmHg", interpretacion: "Presión alta Etapa 1", color: "text-warning" },
    { metrica: "Ritmo Cardíaco", resultado: "75 bpm", rango: "60-100 bpm", interpretacion: "Normal", color: "text-success" },
  ];

  function validarIA() {
    alert("Resultados de IA validados correctamente ✅");
  }
</script>

<div class="container-fluid">
  <div class="row">
    <!-- Sidebar -->
    <div class="col-2 bg-light border-end min-vh-100 p-3">
      <h5 class="mb-4 fw-bold text-primary">🩺 MediVision</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link"> Dashboard</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link active fw-semibold">Pacientes</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link">Citas</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Configuración</a></li>
      </ul>
      <button class="btn btn-outline-danger mt-4 w-100">Cerrar Sesión</button>
    </div>

    <!-- Contenido -->
    <div class="col p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold">Detalles del Paciente</h4>
        <div class="d-flex align-items-center">
          <span class="me-2 text-secondary">Dr. Alan Grant</span>
          <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="doctor" width="40" class="rounded-circle border" />
        </div>
      </div>

      <!-- Análisis generado por IA -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5 class="fw-bold mb-3">Análisis Generado por IA</h5>
          <table class="table align-middle">
            <thead class="table-light">
              <tr>
                <th>Métrica</th>
                <th>Resultado</th>
                <th>Rango Normal</th>
                <th>Interpretación IA</th>
              </tr>
            </thead>
            <tbody>
              {#each analisis as a}
                <tr>
                  <td>{a.metrica}</td>
                  <td>{a.resultado}</td>
                  <td>{a.rango}</td>
                  <td class={a.color}>{a.interpretacion}</td>
                </tr>
              {/each}
            </tbody>
          </table>
          <button class="btn btn-primary mt-2" on:click={validarIA}>Validar Resultados de IA</button>
        </div>
      </div>

      <!-- Observaciones -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5 class="fw-bold mb-3">Observaciones del Doctor</h5>
          <textarea bind:value={observaciones} rows="4" class="form-control" placeholder="Añada sus observaciones aquí..."></textarea>
          <button class="btn btn-success mt-3">Guardar Observaciones</button>
        </div>
      </div>
    </div>

    <!-- Panel lateral del paciente -->
    <div class="col-3 border-start p-4 bg-white">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="paciente" width="80" class="rounded-circle mb-3" />
          <h5 class="fw-bold">{paciente.nombre}</h5>
          <p class="text-secondary mb-1">ID Paciente: {paciente.id}</p>
          <hr />
          <p><strong>Edad:</strong> {paciente.edad} años</p>
          <p><strong>Género:</strong> {paciente.genero}</p>
          <p><strong>Contacto:</strong> {paciente.email}</p>
          <p><strong>Última Visita:</strong> {paciente.ultimaVisita}</p>
        </div>
      </div>

      <div class="card border-0 shadow-sm mt-4">
        <div class="card-body">
          <h6 class="fw-bold mb-3">Acciones</h6>
          <button class="btn btn-light border w-100 mb-2">Solicitar Cita con Administrativo</button>
          <a href="/pacientes" class="text-decoration-none">&larr; Volver a la lista de pacientes</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .text-warning {
    color: #e69c00 !important;
  }
</style>

