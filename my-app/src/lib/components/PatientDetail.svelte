<script lang="ts">
  export let patient = null;
  export let analyses = [];
  export let observations = "";
  export let onValidateIA;
  export let onSaveObservations;

  function handleValidateIA() {
    if (onValidateIA) onValidateIA();
  }

  function handleSaveObservations() {
    if (onSaveObservations) onSaveObservations(observations);
  }
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold">Detalles del Paciente</h4>
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
              {#each analyses as a}
                <tr>
                  <td>{a.metrica}</td>
                  <td>{a.resultado}</td>
                  <td>{a.rango}</td>
                  <td class={a.color}>{a.interpretacion}</td>
                </tr>
              {/each}
            </tbody>
          </table>
          <button class="btn btn-primary mt-2" on:click={handleValidateIA}
            >Validar Resultados de IA</button
          >
        </div>
      </div>

      <!-- Observaciones -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5 class="fw-bold mb-3">Observaciones del Doctor</h5>
          <textarea
            bind:value={observations}
            rows="4"
            class="form-control"
            placeholder="Añada sus observaciones aquí..."
          ></textarea>
          <button class="btn btn-success mt-3" on:click={handleSaveObservations}
            >Guardar Observaciones</button
          >
        </div>
      </div>
    </div>

    <!-- Panel lateral del paciente -->
    <div class="col-3 border-start p-4 bg-white">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="paciente"
            width="80"
            class="rounded-circle mb-3"
          />
          <h5 class="fw-bold">{patient?.nombre}</h5>
          <p class="text-secondary mb-1">ID Paciente: {patient?.id}</p>
          <hr />
          <p><strong>Edad:</strong> {patient?.edad} años</p>
          <p><strong>Género:</strong> {patient?.genero}</p>
          <p><strong>Contacto:</strong> {patient?.email}</p>
          <p><strong>Última Visita:</strong> {patient?.ultimaVisita}</p>
        </div>
      </div>

      <div class="card border-0 shadow-sm mt-4">
        <div class="card-body">
          <h6 class="fw-bold mb-3">Acciones</h6>
          <button class="btn btn-light border w-100 mb-2"
            >Solicitar Cita con Administrativo</button
          >
          <a href="/doctor" class="text-decoration-none"
            >&larr; Volver a la lista de pacientes</a
          >
        </div>
      </div>
    </div>
  </div>
</div>
