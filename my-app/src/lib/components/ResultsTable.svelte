<script lang="ts">
  export let results = [];
  export let loading = false;
  export let searchQuery = "";
  export let onView;
  export let onEdit;

  $: filteredResults = results.filter((r) =>
    (r.paciente + " " + r.analisis)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
</script>

<div class="table-responsive">
  {#if loading}
    <p>Cargando resultados...</p>
  {:else if filteredResults.length === 0}
    <p class="text-muted">No hay resultados para mostrar.</p>
  {:else}
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr
          ><th>Paciente</th><th>Edad</th><th>Análisis</th><th>Responsable</th
          ><th>Estado</th><th class="text-center">Acciones</th></tr
        >
      </thead>
      <tbody>
        {#each filteredResults as item}
          <tr>
            <td>{item.paciente}</td><td>{item.edad}</td><td>{item.analisis}</td
            ><td>{item.doctor ?? "-"}</td>
            <td
              ><span
                class="badge {item.estado === 'Validado'
                  ? 'bg-success'
                  : item.estado === 'Pendiente'
                    ? 'bg-warning text-dark'
                    : 'bg-danger'}">{item.estado}</span
              ></td
            >
            <td class="text-center">
              <button class="btn btn-primary" on:click={() => onView(item.id)}
                >Ver</button
              >
              <button
                class="btn btn-sm btn-outline-secondary"
                on:click={() => onEdit(item.id)}>Editar</button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
