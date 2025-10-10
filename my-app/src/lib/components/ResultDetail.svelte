<script lang="ts">
  export let result = null;
  export let onBack;

  function handleBack() {
    if (onBack) onBack();
  }
</script>

<div class="container py-4">
  <h2 class="text-primary fw-bold mb-4">Detalle del Resultado del Paciente</h2>

  {#if !result}
    <div class="alert alert-danger mt-4 text-center">
      <strong>Error:</strong> No se encontró el resultado solicitado.
    </div>
  {:else}
    <div class="mb-3">
      <button class="btn btn-outline-primary" on:click={handleBack}
        >⬅ Volver al panel</button
      >
    </div>

    <div class="bg-white border rounded p-4">
      <h5 class="text-primary fw-bold mb-3">Información del Paciente</h5>
      <div class="row mb-4">
        <div class="col-md-6">
          <p><strong>Nombre:</strong> {result.paciente}</p>
          <p><strong>Documento:</strong> {result.documento}</p>
          <p><strong>Edad:</strong> {result.edad} años</p>
        </div>
        <div class="col-md-6">
          <p><strong>Doctor responsable:</strong> {result.doctor}</p>
          <p><strong>Fecha del análisis:</strong> {result.fecha}</p>
          <p>
            <strong>Estado:</strong>
            {#if result.estado === "Validado"}<span class="badge bg-success"
                >{result.estado}</span
              >{:else if result.estado === "Pendiente"}<span
                class="badge bg-warning text-dark">{result.estado}</span
              >{:else}<span class="badge bg-danger">{result.estado}</span>{/if}
          </p>
        </div>
      </div>

      <h5 class="text-primary fw-bold mb-3">Detalles del Análisis</h5>
      <p><strong>Tipo de análisis:</strong> {result.analisis}</p>
      <div class="mt-3">
        <p><strong>Observaciones:</strong></p>
        <div class="border rounded p-3 bg-light">{result.observaciones}</div>
      </div>
      <div class="mt-4">
        <a href="#" class="btn btn-outline-primary">📄 Ver archivo adjunto</a>
      </div>
    </div>
  {/if}
</div>
