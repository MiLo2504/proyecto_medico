<script>
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<Navbar />
<body class="bg-light">
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-lg p-4 border-0 rounded-4" style="width: 25rem;">
      <h3 class="text-center mb-4 fw-bold text-primary">Iniciar Sesión</h3>

      <!-- Mensaje de error -->
      <div
        id="errorBox"
        class="alert alert-danger d-none text-center py-2"
      ></div>

      <form id="loginForm">
        <!-- Correo -->
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input
            id="email"
            type="email"
            class="form-control"
            placeholder="usuario@ejemplo.com"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            id="password"
            type="password"
            class="form-control"
            placeholder="********"
            required
          />
        </div>

        <!-- Botón -->
        <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
          Iniciar sesión
        </button>
      </form>

      <!-- Enlace a registro -->
      <div class="text-center mt-3">
        <small
          >¿No tienes cuenta? <a href="/register" class="text-primary"
            >Regístrate</a
          >
        </small>
      </div>
    </div>
  </div>

  <script>
    const form = document.getElementById("loginForm");
    const errorBox = document.getElementById("errorBox");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        showError("Por favor, completa todos los campos");
        return;
      }

      try {
        // Aquí conectas con tu API FastAPI
        const response = await fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          showError(data.detail || "Credenciales incorrectas");
          return;
        }

        // Guardar token o datos de usuario si la API responde correctamente
        localStorage.setItem("token", data.access_token);
        alert("Inicio de sesión exitoso ✅");
        window.location.href = "dashboard"; // Redirige al panel principal
      } catch (err) {
        showError("Error al conectar con el servidor");
        console.error(err);
      }
    });

    function showError(message) {
      errorBox.textContent = message;
      errorBox.classList.remove("d-none");
    }
  </script>

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  ></script>
</body>
