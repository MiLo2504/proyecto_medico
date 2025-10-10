<script lang="ts">
  export let filter = "";
  export let patients = [];
  export let onToggleStatus;
  export let onViewAnalysis;

  // Filtrar pacientes según el input
  $: filteredPatients = patients.filter((p) =>
    p.nombre.toLowerCase().includes(filter.toLowerCase())
  );
</script>

<input
  type="text"
  class="form-control mb-3"
  placeholder="Filtrar por nombre..."
  bind:value={filter}
/>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Edad</th>
      <th>Género</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#each filteredPatients as patient}
      <tr>
        <td>{patient.nombre}</td>
        <td>{patient.edad}</td>
        <td>{patient.genero}</td>
        <td>{patient.estado}</td>
        <td>
          <button
            class="btn btn-sm btn-primary me-2"
            on:click={() => onViewAnalysis(patient.id)}
          >
            Ver Análisis
          </button>
          <button
            class="btn btn-sm btn-secondary"
            on:click={() => onToggleStatus(patient)}
          >
            {patient.estado === "Activo" ? "Desactivar" : "Activar"}
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  /* Estilos opcionales */
  .table {
    background-color: #fff;
  }
</style>
