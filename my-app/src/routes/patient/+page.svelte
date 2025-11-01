<script lang="ts">
  import { onMount } from "svelte";
  import PatientInfoForm from "$lib/components/PatientInfoForm.svelte";
  import PatientInfoCard from "$lib/components/PatientInfoCard.svelte";
  import AnalysisUpload from "$lib/components/AnalysisUpload.svelte";
  import AnalysisList from "$lib/components/AnalysisList.svelte";
  import PatientCalendar from "$lib/components/PatientCalendar.svelte";
  import { goto } from "$app/navigation";
  import { fetchPatient, updatePatient } from "$lib/services/patientService.js";

  let patient: any = null;
  let analyses: any[] = [];
  let loading = false;
  let activeTab = "upload";

  onMount(async () => {
    loading = true;
    try {
      const id = getCurrentUserId();
      patient = await fetchPatient(id);
    } catch (e) {
      console.error("Error cargando paciente", e);
    } finally {
      loading = false;
    }
  });

  function getCurrentUserId() {
    // Implementa tu propia lógica: desde token, store o localStorage
    try {
      const stored =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("userId")
          : null;
      return stored ? parseInt(stored) : 1;
    } catch {
      return 1;
    }
  }

  async function handleSave(data: any) {
    if (!patient?.id) {
      alert("No hay paciente cargado");
      return;
    }
    try {
      const res = await updatePatient(patient.id, data);
      if (!res?.success) throw new Error("No se pudo actualizar");
      // Re-fetch para asegurar datos tal cual quedaron en BD
      patient = await fetchPatient(patient.id);
      alert("Perfil actualizado");
      activeTab = "profile";
    } catch (e) {
      console.error(e);
      const msg =
        e && typeof e === "object" && "message" in e
          ? (e as any).message
          : "Error desconocido";
      alert(`Error al actualizar el perfil: ${msg}`);
    }
  }

  function handleUpload(file: File) {
    if (!file) return;
    loading = true;
    setTimeout(() => {
      analyses = [
        ...analyses,
        {
          id: Date.now(),
          url_image: URL.createObjectURL(file),
          date: new Date().toISOString(),
          result_ia: "Procesando...",
        },
      ];
      loading = false;
      alert("Imagen subida");
    }, 1000);
  }

  function viewDetail(id: number) {
    goto(`/patient/${id}`);
  }
</script>

<div class="container my-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold text-primary">
      {#if patient}
        Bienvenido, {patient.full_name}
      {:else}
        Portal del Paciente
      {/if}
    </h2>
  </div>

  <ul class="nav nav-tabs mb-4">
    <li class="nav-item">
      <button
        class="nav-link {activeTab === 'upload' ? 'active' : ''}"
        on:click={() => (activeTab = "upload")}
      >
        Subir Imagen
      </button>
    </li>
    <li class="nav-item">
      <button
        class="nav-link {activeTab === 'results' ? 'active' : ''}"
        on:click={() => (activeTab = "results")}
      >
        Mis Resultados
      </button>
    </li>
    <li class="nav-item">
      <button
        class="nav-link {activeTab === 'schedule' ? 'active' : ''}"
        on:click={() => (activeTab = "schedule")}
      >
        Agendar Cita
      </button>
    </li>
    <li class="nav-item">
      <button
        class="nav-link {activeTab === 'profile' ? 'active' : ''}"
        on:click={() => (activeTab = "profile")}
      >
        Mi Perfil
      </button>
    </li>
    <li class="nav-item">
      <button
        class="nav-link {activeTab === 'actualizar' ? 'active' : ''}"
        on:click={() => (activeTab = "actualizar")}
      >
        Actualizar
      </button>
    </li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane fade {activeTab === 'upload' ? 'show active' : ''}">
      <div class="col-lg-8 mx-auto">
        <AnalysisUpload onAnalyze={handleUpload} />
      </div>
    </div>

    <div class="tab-pane fade {activeTab === 'results' ? 'show active' : ''}">
      {#if loading}
        <div class="text-center py-5">
          <div class="spinner-border text-primary"></div>
        </div>
      {:else}
        <AnalysisList {analyses} onViewDetail={viewDetail} />
      {/if}
    </div>

    <div class="tab-pane fade {activeTab === 'schedule' ? 'show active' : ''}">
      <div class="col-lg-7 mx-auto">
        <PatientCalendar />
      </div>
    </div>

    <div class="tab-pane fade {activeTab === 'profile' ? 'show active' : ''}">
      <div class="col-lg-8 mx-auto">
        {#if patient}
          <PatientInfoCard {patient} />
        {:else}
          <p class="text-center text-muted">Cargando perfil...</p>
        {/if}
      </div>
    </div>

    <div
      class="tab-pane fade {activeTab === 'actualizar' ? 'show active' : ''}"
    >
      <div class="col-lg-8 mx-auto">
        {#if patient}
          <PatientInfoForm {patient} onSave={handleSave} />
        {:else}
          <p class="text-center text-muted">Cargando perfil...</p>
        {/if}
      </div>
    </div>
  </div>
</div>
