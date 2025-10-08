<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import { onMount } from "svelte";

  // 🧩 Importa el JS de Bootstrap solo en el cliente
  onMount(async () => {
    await import("bootstrap/dist/js/bootstrap.bundle.min.js");
  });

  let nombre = "Juan Pérez";
  let fechaNacimiento = "1985-05-23";
  let correo = "juan.perez@email.com";
  let imagenesAnalisis = [
    {
      titulo: "Análisis de Radiografía",
      fecha: "15 de julio de 2024",
      imagen:
        "https://images.unsplash.com/photo-1580281657521-389cd1f3cb26?auto=format&fit=crop&w=800&q=60",
    },
    {
      titulo: "Análisis de Resonancia Magnética",
      fecha: "20 de julio de 2024",
      imagen:
        "https://images.unsplash.com/photo-1588776814546-ec1e076d0212?auto=format&fit=crop&w=800&q=60",
    },
  ];

  function analizarImagen() {
    alert("Análisis enviado correctamente (simulado)");
  }

  function guardarCambios() {
    alert("Cambios guardados (simulado)");
  }
</script>

<div class="container my-5">
  <div class="row g-4">
    <!-- 📤 Subir Imagen -->
    <div class="col-lg-8">
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h4 class="mb-3 fw-bold">Subir Imagen para Análisis</h4>
          <div class="input-group">
            <input type="file" class="form-control" id="archivo" />
            <button class="btn btn-primary" on:click={analizarImagen}>
              Analizar Imagen
            </button>
          </div>
        </div>
      </div>

      <!-- 🧠 Resultados de Análisis -->
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="mb-3 fw-bold">Resultados de Análisis</h4>
          <div class="row g-3">
            {#each imagenesAnalisis as item}
              <div class="col-md-6">
                <div class="card border-0 shadow-sm overflow-hidden">
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    class="card-img-top"
                    style="height: 160px; object-fit: cover;"
                  />
                  <div class="card-body">
                    <h6 class="fw-bold">{item.titulo}</h6>
                    <p class="text-muted mb-0">Fecha: {item.fecha}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- 👤 Información Personal -->
    <div class="col-lg-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="fw-bold mb-3">Información Personal</h4>
          <form on:submit|preventDefault={guardarCambios}>
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                id="nombre"
                type="text"
                class="form-control"
                bind:value={nombre}
              />
            </div>
            <div class="mb-3">
              <label for="fecha" class="form-label">Fecha de Nacimiento</label>
              <input
                id="fecha"
                type="date"
                class="form-control"
                bind:value={fechaNacimiento}
              />
            </div>
            <div class="mb-3">
              <label for="correo" class="form-label">Correo Electrónico</label>
              <input
                id="correo"
                type="email"
                class="form-control"
                bind:value={correo}
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  body {
    background-color: #f8f9fa;
  }

  h4 {
    color: #0d6efd;
  }

  .card {
    border-radius: 12px;
  }

  .btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }

  .btn-primary:hover {
    background-color: #0b5ed7;
  }
</style>
