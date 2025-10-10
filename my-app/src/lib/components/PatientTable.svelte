<script lang="ts">
  export let patients = [];
  export let filter = "";
  export let onToggleStatus;
  export let onViewAnalysis;

  $: filteredPatients = patients.filter((p) =>
    p.nombre.toLowerCase().includes(filter.toLowerCase())
  );
</script>

<input
  type="text"
  placeholder="Buscar pacientes..."
  bind:value={filter}
  class="form-control mb-3"
/>

<table class="table table-hover align-middle">
  <thead class="table-light">
    <tr>
      <th>Nombre</th>
      <th>Edad</th>
      <th>Género</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#each filteredPatients as p}
      <tr>
        <td>{p.nombre}</td>
        <td>{p.edad}</td>
        <td>{p.genero}</td>
        <td>
          <button
            class="btn btn-sm {p.estado === 'Activo'
              ? 'btn-success'
              : 'btn-danger'}"
            on:click={() => onToggleStatus(p)}
          >
            {p.estado}
          </button>
        </td>
        <td>
          <button class="btn btn-link" on:click={() => onViewAnalysis(p.id)}>
            Ver Análisis
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
