<script lang="ts">
  export let file = null;
  export let onAnalyze;

  function handleAnalyze() {
    if (onAnalyze && file) onAnalyze(file);
  }
</script>

<div class="card shadow-sm mb-4">
  <div class="card-body">
    <h4 class="mb-3 fw-bold">Subir Imagen para Análisis</h4>
    <div class="input-group">
      <input
        type="file"
        class="form-control"
        on:change={(e) => (file = (e.target as HTMLInputElement).files?.[0] ?? null)}
      />
      <button class="btn btn-primary" on:click={handleAnalyze}
        >Analizar Imagen</button
      >
    </div>
  </div>
</div>
