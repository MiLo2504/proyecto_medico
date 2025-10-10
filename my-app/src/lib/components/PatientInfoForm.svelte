<script lang="ts">
  export let patient = {
    id: 1,
    user_name: "",
    full_name: "",
    last_name: "",
    email: "",
    date_birth: "",
    phone: "",
    address: "",
    num_document: "",
    type_document_name: "",
  };
  export let onSave;

  function handleSave() {
    if (onSave)
      onSave({
        full_name: patient.full_name,
        last_name: patient.last_name,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
      });
  }
</script>

<div class="card shadow-sm">
  <div class="card-body">
    <h4 class="fw-bold mb-3">Información Personal</h4>
    <form on:submit|preventDefault={handleSave}>
      <div class="mb-3">
        <label class="form-label">Nombre de Usuario</label>
        <input
          type="text"
          class="form-control"
          value={patient.user_name}
          readonly
        />
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre</label>
          <input
            type="text"
            class="form-control"
            bind:value={patient.full_name}
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Apellido</label>
          <input
            type="text"
            class="form-control"
            bind:value={patient.last_name}
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Tipo de Documento</label>
          <input
            type="text"
            class="form-control"
            value={patient.type_document_name}
            readonly
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Número de Documento</label>
          <input
            type="text"
            class="form-control"
            value={patient.num_document}
            readonly
          />
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Fecha de Nacimiento</label>
        <input
          type="date"
          class="form-control"
          value={patient.date_birth}
          readonly
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input type="text" class="form-control" bind:value={patient.phone} />
      </div>

      <div class="mb-3">
        <label class="form-label">Correo Electrónico</label>
        <input type="email" class="form-control" bind:value={patient.email} />
      </div>

      <div class="mb-3">
        <label class="form-label">Dirección</label>
        <input type="text" class="form-control" bind:value={patient.address} />
      </div>

      <button type="submit" class="btn btn-primary w-100"
        >Guardar Cambios</button
      >
    </form>
  </div>
</div>
