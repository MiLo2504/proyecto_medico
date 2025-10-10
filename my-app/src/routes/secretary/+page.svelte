<script lang="ts">
  import { onMount } from "svelte";
  import AppointmentForm from "$lib/components/AppointmentForm.svelte";
  import AppointmentRequestList from "$lib/components/AppointmentRequestList.svelte";
  import { requests, loading } from "$lib/stores/appointments.js";
  import {
    fetchRequests,
    processRequest,
  } from "$lib/services/appointmentService.js";

  onMount(async () => {
    $loading = true;
    $requests = await fetchRequests();
    $loading = false;
  });

  async function handleProcess(request) {
    try {
      await processRequest(request);
      alert("Solicitud procesada correctamente ✅");
      $requests = await fetchRequests(); // Actualiza la lista
    } catch (err) {
      alert("Error al procesar la solicitud");
    }
  }
</script>

<div class="row g-4">
  <div class="col-lg-6">
    <AppointmentForm />
  </div>
  <div class="col-lg-6">
    <AppointmentRequestList requests={$requests} onProcess={handleProcess} />
  </div>
</div>
