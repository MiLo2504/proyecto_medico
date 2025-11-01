<script lang="ts">
  import { onMount } from "svelte";
  export let appointments = [];
  export let onRefresh = () => {};

  let table: any;

  onMount(async () => {
    await loadDataTables();
    table = new (window as any).DataTable("#patient-appointments-table", {
      data: appointments,
      responsive: true,
      language: {
        url: "https://cdn.datatables.net/plug-ins/2.1.8/i18n/es-ES.json",
      },
      columns: [
        { data: "title", title: "Cita" },
        {
          data: "start",
          title: "Fecha",
          render: (data) => new Date(data).toLocaleString("es-PE"),
        },
        {
          data: "state",
          title: "Estado",
          render: (
            data
          ) => `<span class="badge bg-${data === 1 ? "success" : "danger"}">
            ${data === 1 ? "Confirmada" : "Cancelada"}
          </span>`,
        },
      ],
    });
  });

  async function loadDataTables() {
    if (typeof window === "undefined") return;
    if (!(window as any).DataTable) {
      await loadScript("https://cdn.datatables.net/2.1.8/js/dataTables.min.js");
      await loadScript(
        "https://cdn.datatables.net/2.1.8/js/dataTables.bootstrap5.min.js"
      );
    }
    loadCSS(
      "https://cdn.datatables.net/2.1.8/css/dataTables.bootstrap5.min.css"
    );
  }

  function loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve();
      document.head.appendChild(s);
    });
  }

  function loadCSS(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  $: if (table && appointments) {
    table.clear().rows.add(appointments).draw();
  }
</script>

<div class="card shadow-sm">
  <div class="card-body">
    <div class="d-flex justify-content-between mb-3">
      <h5 class="card-title mb-0">Mis Citas</h5>
      <button class="btn btn-sm btn-outline-primary" on:click={onRefresh}
        >Actualizar</button
      >
    </div>
    <table
      id="patient-appointments-table"
      class="table table-hover"
      style="width:100%"
    >
      <thead class="table-light"></thead>
    </table>
  </div>
</div>
