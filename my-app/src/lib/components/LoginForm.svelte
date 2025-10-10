<script lang="ts">
  import { goto } from "$app/navigation";
  import { login } from "$lib/services/authService.js";
  import { setAuthToken } from "$lib/stores/auth.js";

  let email = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      errorMessage = "Por favor, completa todos los campos";
      return;
    }

    try {
      const token = await login(email, password);
      setAuthToken(token);
      alert("Inicio de sesión exitoso ✅");
      goto("/admin"); // Redirige a admin como panel principal
    } catch (err) {
      errorMessage = err.message;
    }
  }
</script>

<div class="d-flex justify-content-center align-items-center vh-100">
  <div class="card shadow-lg p-4 border-0 rounded-4" style="width: 25rem;">
    <h3 class="text-center mb-4 fw-bold text-primary">Iniciar Sesión</h3>

    {#if errorMessage}
      <div class="alert alert-danger text-center py-2">{errorMessage}</div>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="usuario@ejemplo.com"
          bind:value={email}
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="********"
          bind:value={password}
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
        Iniciar sesión
      </button>
    </form>

    <div class="text-center mt-3">
      <small
        >¿No tienes cuenta? <a href="/register" class="text-primary"
          >Regístrate</a
        ></small
      >
    </div>
  </div>
</div>
