<script lang="ts">
  import { goto } from "$app/navigation";
  export let id: string;

  // Simulamos usuarios de prueba
  let usuarios = [
    {
      id: 1,
      nombre: "Carlos",
      apellido: "Sánchez",
      tipoDocumento: "CC",
      documento: "123456789",
      correo: "carlos@medivision.com",
      telefono: "+57 301 123 4567",
      direccion: "Calle 45 #12-30",
      rol: "Doctor",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Ana",
      apellido: "Gómez",
      tipoDocumento: "CC",
      documento: "987654321",
      correo: "ana@email.com",
      telefono: "+57 302 987 6543",
      direccion: "Carrera 7 #20-15",
      rol: "Paciente",
      estado: "Activo",
    },
    {
      id: 3,
      nombre: "Juan",
      apellido: "Pérez",
      tipoDocumento: "TI",
      documento: "654321987",
      correo: "juan@email.com",
      telefono: "+57 310 765 4321",
      direccion: "Av. Las Palmas 23",
      rol: "Paciente",
      estado: "Inactivo",
    },
  ];

  let usuario = usuarios.find((u) => u.id == Number(id));

  function guardarCambios() {
    alert(`Cambios guardados para ${usuario?.nombre} ${usuario?.apellido} ✅`);
    goto("/admin");
  }

  function cancelar() {
    goto("/admin");
  }
</script>

<div class="container py-4">
  <div class="card shadow-sm border-0">
    <div class="card-body">
      <h3 class="fw-bold text-primary mb-4">Editar Usuario #{id}</h3>

      {#if usuario}
        <form on:submit|preventDefault={guardarCambios}>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Nombre</label>
              <input class="form-control" bind:value={usuario.nombre} />
            </div>

            <div class="col-md-6">
              <label class="form-label">Apellido</label>
              <input class="form-control" bind:value={usuario.apellido} />
            </div>

            <div class="col-md-4">
              <label class="form-label">Tipo de Documento</label>
              <select class="form-select" bind:value={usuario.tipoDocumento}>
                <option>CC</option>
                <option>TI</option>
                <option>CE</option>
                <option>Pasaporte</option>
              </select>
            </div>

            <div class="col-md-8">
              <label class="form-label">Número de Documento</label>
              <input class="form-control" bind:value={usuario.documento} />
            </div>

            <div class="col-md-6">
              <label class="form-label">Correo Electrónico</label>
              <input
                type="email"
                class="form-control"
                bind:value={usuario.correo}
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">Teléfono</label>
              <input class="form-control" bind:value={usuario.telefono} />
            </div>

            <div class="col-md-12">
              <label class="form-label">Dirección</label>
              <input class="form-control" bind:value={usuario.direccion} />
            </div>

            <div class="col-md-6">
              <label class="form-label">Rol</label>
              <select class="form-select" bind:value={usuario.rol}>
                <option>Admin</option>
                <option>Doctor</option>
                <option>Paciente</option>
                <option>Administrador (Secretaria)</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Estado</label>
              <select class="form-select" bind:value={usuario.estado}>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
          </div>

          <div class="mt-4 d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" on:click={cancelar}>
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
        </form>
      {:else}
        <p class="text-danger">Usuario no encontrado ❌</p>
      {/if}
    </div>
  </div>
</div>
