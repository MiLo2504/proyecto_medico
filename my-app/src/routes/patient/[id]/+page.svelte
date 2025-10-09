<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  const id = $page.params.id_analysis;

  // Ejemplo (esto normalmente vendrá del backend)
  let analisis = {
    titulo: "Análisis de Radiografía de Tórax",
    fecha: "15 de julio de 2024",
    imagen:
      "https://images.unsplash.com/photo-1580281657521-389cd1f3cb26?auto=format&fit=crop&w=800&q=60",
    resultado_ia:
      "El modelo de IA ha detectado una posible opacidad en el lóbulo inferior izquierdo...",
    comentario_doctor:
      "Coincido con la evaluación de la IA. He revisado la imagen y confirmo los hallazgos...",
    doctor: "Dr. Carlos Rodríguez",
  };

  function regresar() {
    goto("/patient");
  }
</script>

<div class="container my-5">
  <button class="btn btn-outline-primary mb-3" on:click={regresar}>
    ← Regresar
  </button>

  <div class="card shadow-sm border-0">
    <div class="card-body">
      <h3 class="fw-bold">{analisis.titulo}</h3>
      <p class="text-muted mb-3">Fecha del análisis: {analisis.fecha}</p>

      <div class="row g-4">
        <div class="col-lg-6">
          <img
            src={analisis.imagen}
            alt={analisis.titulo}
            class="img-fluid rounded shadow-sm"
          />
        </div>

        <div class="col-lg-6">
          <div class="mb-3 p-3 bg-light rounded">
            <h6 class="fw-bold text-primary">
              <i class="bi bi-robot me-2"></i>Resultados de la IA
            </h6>
            <p>{analisis.resultado_ia}</p>
          </div>

          <div class="p-3 bg-light rounded">
            <h6 class="fw-bold text-primary">
              <i class="bi bi-chat-left-text me-2"></i>Comentarios del Doctor
            </h6>
            <p>{analisis.comentario_doctor}</p>
            <small class="text-muted">- {analisis.doctor}</small>
          </div>

          <div class="text-end mt-3">
            <button class="btn btn-primary">
              <i class="bi bi-download me-1"></i> Descargar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .card {
    border-radius: 16px;
  }
</style>
