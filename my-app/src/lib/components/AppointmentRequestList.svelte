<script lang="ts">
  export let requests = [];
  export let onProcess;

  function handleProcess(request) {
    if (onProcess) onProcess(request);
  }
</script>

<div class="card shadow-sm">
  <div class="card-body">
    <h4 class="fw-bold mb-3 text-primary">
      <i class="bi bi-bell me-2"></i>Solicitudes de Cita
    </h4>

    {#if requests.length === 0}
      <p class="text-muted">No hay solicitudes pendientes.</p>
    {:else}
      <div class="list-group">
        {#each requests as r}
          <div
            class="list-group-item d-flex justify-content-between align-items-center mb-2 rounded bg-light"
          >
            <div>
              <h6 class="fw-bold">{r.doctor}</h6>
              <p class="text-muted mb-0">Paciente: {r.patient}</p>
              <p class="text-muted mb-0">Motivo: {r.reason}</p>
            </div>
            <div class="d-flex align-items-center gap-2">
              <small class="text-muted">{r.time}</small>
              <button
                class="btn btn-primary btn-sm"
                on:click={() => handleProcess(r)}>Procesar</button
              >
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
