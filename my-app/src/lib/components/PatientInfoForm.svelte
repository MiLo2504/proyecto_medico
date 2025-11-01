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
        user_name: patient.user_name,
        full_name: patient.full_name,
        last_name: patient.last_name,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        num_document: patient.num_document,
        type_document_name: patient.type_document_name,
        date_birth: patient.date_birth,
      });
  }
</script>

<div class="card shadow-sm">
  <div class="card-body">
    <h4 class="fw-bold mb-3">Información Personal</h4>
    <form on:submit|preventDefault={handleSave}>
      <div class="mb-3">
        <label class="form-label" for="user_name">Nombre de Usuario</label>
        <input
          id="user_name"
          type="text"
          class="form-control"
          bind:value={patient.user_name}
        />
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label" for="full_name">Nombre</label>
          <input
            id="full_name"
            type="text"
            class="form-control"
            bind:value={patient.full_name}
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label" for="last_name">Apellido</label>
          <input
            id="last_name"
            type="text"
            class="form-control"
            bind:value={patient.last_name}
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label" for="type_document_name"
            >Tipo de Documento</label
          >
          <input
            id="type_document_name"
            type="text"
            class="form-control"
            bind:value={patient.type_document_name}
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label" for="num_document"
            >Número de Documento</label
          >
          <input
            id="num_document"
            type="text"
            class="form-control"
            bind:value={patient.num_document}
          />
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="date_birth">Fecha de Nacimiento</label>
        <input
          id="date_birth"
          type="date"
          class="form-control"
          bind:value={patient.date_birth}
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="phone">Teléfono</label>
        <input
          id="phone"
          type="text"
          class="form-control"
          bind:value={patient.phone}
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="email">Correo Electrónico</label>
        <input
          id="email"
          type="email"
          class="form-control"
          bind:value={patient.email}
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="address">Dirección</label>
        <input
          id="address"
          type="text"
          class="form-control"
          bind:value={patient.address}
        />
      </div>

      <button type="submit" class="btn btn-primary w-100"
        >Guardar Cambios</button
      >
    </form>
  </div>
</div>
