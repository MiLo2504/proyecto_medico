<script lang="ts">
  export let newUser;
  export let roles = [
    "Admin",
    "Doctor",
    "Paciente",
    "Administrador (Secretaria)",
  ];
  export let onSubmit;

  function handleSubmit() {
    if (!newUser.email || !newUser.name || !newUser.password) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    onSubmit(newUser); // Pasa el objeto completo al padre
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="row g-2">
    <div class="col-md-6">
      <input
        class="form-control"
        placeholder="Nombre de usuario"
        bind:value={newUser.username}
      />
    </div>
    <div class="col-md-6">
      <input
        class="form-control"
        placeholder="Correo"
        bind:value={newUser.email}
      />
    </div>
    <div class="col-md-6">
      <input
        class="form-control"
        placeholder="Nombre"
        bind:value={newUser.name}
      />
    </div>
    <div class="col-md-6">
      <input
        class="form-control"
        placeholder="Apellido"
        bind:value={newUser.lastname}
      />
    </div>
    <div class="col-md-6">
      <select class="form-select" bind:value={newUser.documentType}>
        <option value="">Tipo</option>
        <option value="CC">Cédula</option>
        <option value="TI">TI</option>
      </select>
    </div>
    <div class="col-md-6">
      <input
        class="form-control"
        placeholder="Documento"
        bind:value={newUser.documentNumber}
      />
    </div>
    <div class="col-md-6">
      <input type="date" class="form-control" bind:value={newUser.birthDate} />
    </div>
    <div class="col-md-6">
      <input
        class="form-control"
        placeholder="Teléfono"
        bind:value={newUser.phone}
      />
    </div>
    <div class="col-md-12">
      <input
        class="form-control"
        placeholder="Dirección"
        bind:value={newUser.address}
      />
    </div>
    <div class="col-md-12">
      <input
        type="password"
        class="form-control"
        placeholder="Contraseña"
        bind:value={newUser.password}
      />
    </div>
    <div class="col-md-12">
      <select class="form-select" bind:value={newUser.role}>
        {#each roles as role}
          <option value={role}>{role}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="d-grid mt-3">
    <button type="submit" class="btn btn-primary">Crear Usuario</button>
  </div>
</form>