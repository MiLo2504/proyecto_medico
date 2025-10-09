<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation"; // 👈 para ir al detalle del análisis

  onMount(async () => {
    await import("bootstrap/dist/js/bootstrap.bundle.min.js");
    cargarPaciente();
    cargarAnalisis();
  });

  // 🔹 Datos del paciente
  let paciente = {
    id: 1,
    user_name: "",
    full_name: "",
    last_name: "",
    email: "",
    date_birth: "",
    phone: "",
    address: "",
    num_document: "",
    type_document_name: "", // se obtiene del backend
  };

  // 🔹 Estado y datos
  let analisis = [];
  let archivo = null;
  let cargando = true;

  // --- FUNCIONES PRINCIPALES ---

  async function cargarPaciente() {
    try {
      const res = await fetch(`/api/patient/${paciente.id}`);
      if (!res.ok) throw new Error("Error al obtener datos del paciente");
      paciente = await res.json();
    } catch (err) {
      console.error(err);
      alert("No se pudo cargar la información del paciente");
    }
  }

  async function cargarAnalisis() {
    try {
      const res = await fetch(`/api/patient/${paciente.id}/analysis`);
      if (!res.ok) throw new Error("Error al obtener los análisis");
      analisis = await res.json();
    } catch (err) {
      console.error(err);
      analisis = [];
    } finally {
      cargando = false;
    }
  }

  async function analizarImagen() {
    if (!archivo) return alert("Selecciona una imagen primero");
    const formData = new FormData();
    formData.append("file", archivo);

    try {
      const res = await fetch(`/api/patient/${paciente.id}/analysis`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al enviar imagen");
      alert("Imagen subida correctamente");
      cargarAnalisis();
    } catch (err) {
      console.error(err);
      alert("Error al subir imagen");
    }
  }

  async function guardarCambios() {
    try {
      const body = {
        full_name: paciente.full_name,
        last_name: paciente.last_name,
        phone: paciente.phone,
        email: paciente.email,
        address: paciente.address,
      };

      const res = await fetch(`/api/patient/${paciente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al guardar cambios");
      alert("Cambios guardados correctamente");
    } catch (err) {
      console.error(err);
      alert("No se pudieron guardar los cambios");
    }
  }

  // 🔹 Ir al detalle del análisis
  function verDetalle(id) {
    goto(`/patient/${id}`); // 👈 navega a la página del análisis
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
            <input
              type="file"
              class="form-control"
              on:change={(e) => (archivo = e.target.files[0])}
            />
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

          {#if cargando}
            <p>Cargando análisis...</p>
          {:else if analisis.length === 0}
            <p class="text-muted">Aún no tienes análisis registrados.</p>
          {:else}
            <div class="row g-3">
              {#each analisis as item}
                <div class="col-md-6">
                  <button
                    type="button"
                    class="card border-0 shadow-sm overflow-hidden h-100 hoverable w-100 text-start"
                    on:click={() => verDetalle(item.id)}
                    aria-label="Ver detalle del análisis"
                    style="cursor: pointer; background: none; border: none; padding: 0;"
                  >
                    <img
                      src={item.url_image}
                      alt="imagen del análisis"
                      class="card-img-top"
                      style="height: 160px; object-fit: cover;"
                    />
                    <div class="card-body">
                      <h6 class="fw-bold">
                        {item.result_ia || "Análisis en revisión"}
                      </h6>
                      <p class="text-muted mb-0">
                        Fecha: {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                </div>
              {/each}
            </div>
          {/if}
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
              <label class="form-label">Nombre de Usuario</label>
              <input
                type="text"
                class="form-control"
                value={paciente.user_name}
                readonly
              />
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  bind:value={paciente.full_name}
                />
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Apellido</label>
                <input
                  type="text"
                  class="form-control"
                  bind:value={paciente.last_name}
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Tipo de Documento</label>
                <input
                  type="text"
                  class="form-control"
                  value={paciente.type_document_name}
                  readonly
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Número de Documento</label>
                <input
                  type="text"
                  class="form-control"
                  value={paciente.num_document}
                  readonly
                />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Fecha de Nacimiento</label>
              <input
                type="date"
                class="form-control"
                value={paciente.date_birth}
                readonly
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Teléfono</label>
              <input
                type="text"
                class="form-control"
                bind:value={paciente.phone}
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Correo Electrónico</label>
              <input
                type="email"
                class="form-control"
                bind:value={paciente.email}
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Dirección</label>
              <input
                type="text"
                class="form-control"
                bind:value={paciente.address}
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

  .hoverable:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }

  .btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }

  .btn-primary:hover {
    background-color: #0b5ed7;
  }
</style>
