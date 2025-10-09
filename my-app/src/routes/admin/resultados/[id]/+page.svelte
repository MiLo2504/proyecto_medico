<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let id: string;
  let cargando = true;
  let resultado: any = null;

  $: id = $page.params.id;

  onMount(() => {
    // Simulación sin backend
    setTimeout(() => {
      resultado = {
        id,
        paciente: "Juan Pérez",
        edad: 34,
        documento: "CC 1023456789",
        analisis: "Resonancia magnética cerebral",
        fecha: "2025-10-09",
        estado: "Validado",
        doctor: "Dr. Carlos Sánchez",
        observaciones:
          "El estudio muestra una morfología cerebral normal sin lesiones aparentes.",
        archivo: "resonancia_cerebro.pdf",
      };
      cargando = false;
    }, 1000);
  });

  function volver() {
    goto("/admin");
  }
</script>

<div class="container py-4">
  <h2 class="text-primary fw-bold mb-4">Detalle del Resultado del Paciente</h2>

  {#if cargando}
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3 text-muted">Cargando resultados...</p>
    </div>
  {:else if resultado}
    <div class="mb-3">
      <button class="btn btn-outline-primary" on:click={volver}
        >⬅ Volver al panel</button
      >
    </div>

    <div class="bg-white border rounded p-4">
      <h5 class="text-primary fw-bold mb-3">Información del Paciente</h5>
      <div class="row mb-4">
        <div class="col-md-6">
          <p><strong>Nombre:</strong> {resultado.paciente}</p>
          <p><strong>Documento:</strong> {resultado.documento}</p>
          <p><strong>Edad:</strong> {resultado.edad} años</p>
        </div>
        <div class="col-md-6">
          <p><strong>Doctor responsable:</strong> {resultado.doctor}</p>
          <p><strong>Fecha del análisis:</strong> {resultado.fecha}</p>
          <p>
            <strong>Estado:</strong>
            {#if resultado.estado === "Validado"}
              <span class="badge bg-success">{resultado.estado}</span>
            {:else if resultado.estado === "Pendiente"}
              <span class="badge bg-warning text-dark">{resultado.estado}</span>
            {:else}
              <span class="badge bg-danger">{resultado.estado}</span>
            {/if}
          </p>
        </div>
      </div>

      <h5 class="text-primary fw-bold mb-3">Detalles del Análisis</h5>
      <p><strong>Tipo de análisis:</strong> {resultado.analisis}</p>

      <div class="mt-3">
        <p><strong>Observaciones:</strong></p>
        <div class="border rounded p-3 bg-light">
          {resultado.observaciones}
        </div>
      </div>

      <div class="mt-4">
        <a href="#" class="btn btn-outline-primary"> 📄 Ver archivo adjunto </a>
      </div>
    </div>
  {:else}
    <div class="alert alert-danger mt-4 text-center">
      <strong>Error:</strong> No se encontró el resultado solicitado.
    </div>
  {/if}
</div>
