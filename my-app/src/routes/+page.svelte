<script>
  import { onMount } from "svelte";

  let name = "";
  let email = "";
  let message = "";
  let navbarCollapse = null;

  function handleSubmit(event) {
    event.preventDefault();
    alert("Mensaje enviado. Nos pondremos en contacto contigo pronto.");
    name = "";
    email = "";
    message = "";
  }

  // Inicializar Bootstrap collapse para navbar
  onMount(() => {
    // Smooth scrolling para todos los enlaces
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Cierra el navbar en móvil
        if (navbarCollapse) {
          navbarCollapse.hide();
        }
      });
    });

    // Inicializar Bootstrap collapse
    const collapseElement = document.getElementById("navbarNav");
    if (collapseElement) {
      navbarCollapse = new window.bootstrap.Collapse(collapseElement, {
        toggle: false,
      });
    }
  });

  function toggleNavbar() {
    if (navbarCollapse) {
      navbarCollapse.toggle();
    }
  }
</script>

<svelte:head>
  <title>MedAI Analytics - Diagnóstico con Inteligencia Artificial</title>
  <meta
    name="description"
    content="Análisis de imágenes médicas con IA para diagnósticos precisos."
  />
</svelte:head>

<!-- Header con Bootstrap Navbar -->
<nav
  class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm"
  style="z-index: 1000;"
>
  <div class="container">
    <a class="navbar-brand d-flex align-items-center gap-2" href="#home">
      <div
        class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-5"
      >
        M+
      </div>
      <span class="fw-bold text-primary">MedAI Analytics</span>
    </a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      on:click={toggleNavbar}
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#servicios">Servicios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#proceso">Cómo Funciona</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#casos">Casos de Estudio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#testimonios">Testimonios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contacto">Contacto</a>
        </li>
      </ul>
      <a class="btn btn-primary ms-lg-3" href="#contacto">Agendar Cita</a>
    </div>
  </div>
</nav>

<!-- Hero Section -->
<section
  id="home"
  class="py-5 text-center"
  style="padding-top: 100px; background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);"
>
  <div class="container">
    <h1 class="display-4 fw-bold text-dark mb-4">
      Diagnóstico Preciso con Inteligencia Artificial
    </h1>
    <p class="lead text-muted mb-4" style="max-width: 600px; margin: 0 auto;">
      Revolucionamos el análisis de imágenes médicas con tecnología IA de última
      generación para diagnósticos más rápidos y precisos.
    </p>
    <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
      <a href="#contacto" class="btn btn-primary btn-lg">Solicitar Análisis</a>
      <a href="#servicios" class="btn btn-outline-primary btn-lg">Conocer Más</a
      >
    </div>
  </div>
</section>

<!-- Servicios Section -->
<section id="servicios" class="py-5">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold text-dark mb-3">
        Nuestros Servicios Especializados
      </h2>
      <p class="lead text-muted" style="max-width: 600px; margin: 0 auto;">
        Ofrecemos análisis avanzado de imágenes médicas utilizando inteligencia
        artificial para mejorar la precisión diagnóstica.
      </p>
    </div>

    <div class="row g-4">
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm hover-shadow">
          <img
            src="https://via.placeholder.com/400x300?text=Rayos+X"
            class="card-img-top"
            alt="Radiografía médica"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Análisis de Radiografías</h5>
            <p class="card-text text-muted mb-2">
              Detección automatizada de anomalías en radiografías torácicas y
              óseas
            </p>
            <p class="card-text flex-grow-1">
              Nuestra IA analiza radiografías en segundos, identificando
              fracturas, neumonía y otras condiciones.
            </p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm hover-shadow">
          <img
            src="https://via.placeholder.com/400x300?text=CT+Scan"
            class="card-img-top"
            alt="Tomografía CT"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Tomografías Computarizadas</h5>
            <p class="card-text text-muted mb-2">
              Análisis detallado de imágenes CT con reconstrucción 3D
            </p>
            <p class="card-text flex-grow-1">
              Procesamiento avanzado de imágenes CT para detección temprana de
              tumores y anomalías.
            </p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm hover-shadow">
          <img
            src="https://via.placeholder.com/400x300?text=MRI+Scan"
            class="card-img-top"
            alt="Resonancia MRI"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Resonancias Magnéticas</h5>
            <p class="card-text text-muted mb-2">
              Interpretación precisa de imágenes MRI con machine learning
            </p>
            <p class="card-text flex-grow-1">
              Análisis neural de resonancias magnéticas para diagnóstico
              neurológico y musculoesquelético.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Proceso Section -->
<section id="proceso" class="py-5 bg-light">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold text-dark mb-3">
        Cómo Funciona Nuestro Análisis IA
      </h2>
      <p class="lead text-muted" style="max-width: 600px; margin: 0 auto;">
        Un proceso simple y eficiente que combina tecnología de vanguardia con
        expertise médico.
      </p>
    </div>

    <div class="row g-4 justify-content-center">
      <div class="col-lg-3 col-md-6 text-center">
        <div class="card border-0 bg-transparent">
          <div
            class="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold fs-4"
            style="width: 60px; height: 60px;"
          >
            1
          </div>
          <h5 class="fw-semibold mb-2">Subir Imagen</h5>
          <p class="text-muted">
            Carga tu imagen médica en nuestra plataforma segura.
          </p>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 text-center">
        <div class="card border-0 bg-transparent">
          <div
            class="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold fs-4"
            style="width: 60px; height: 60px;"
          >
            2
          </div>
          <h5 class="fw-semibold mb-2">Análisis IA</h5>
          <p class="text-muted">
            Nuestra IA procesa la imagen en segundos con precisión experta.
          </p>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 text-center">
        <div class="card border-0 bg-transparent">
          <div
            class="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold fs-4"
            style="width: 60px; height: 60px;"
          >
            3
          </div>
          <h5 class="fw-semibold mb-2">Revisión Médica</h5>
          <p class="text-muted">
            Un médico especialista revisa y valida los resultados.
          </p>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 text-center">
        <div class="card border-0 bg-transparent">
          <div
            class="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold fs-4"
            style="width: 60px; height: 60px;"
          >
            4
          </div>
          <h5 class="fw-semibold mb-2">Informe Detallado</h5>
          <p class="text-muted">
            Recibe un informe completo con recomendaciones.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Casos de Estudio -->
<section id="casos" class="py-5">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold text-dark mb-3">Casos de Estudio</h2>
      <p class="lead text-muted" style="max-width: 600px; margin: 0 auto;">
        Éxitos reales que demuestran la efectividad de nuestra tecnología IA en
        diagnósticos médicos.
      </p>
    </div>

    <div class="row g-4">
      <div class="col-lg-6">
        <div class="card shadow-sm hover-shadow">
          <img
            src="https://via.placeholder.com/600x250?text=Neumonía+IA"
            class="card-img-top"
            alt="Detección de neumonía"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body">
            <h5 class="card-title">Detección Temprana de Neumonía</h5>
            <p class="card-text text-muted">
              Caso de paciente con síntomas respiratorios
            </p>
            <p class="card-text">
              Nuestra IA detectó neumonía en una radiografía con 98% de
              precisión, permitiendo tratamiento inmediato.
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card shadow-sm hover-shadow">
          <img
            src="https://via.placeholder.com/600x250?text=Tumor+Cerebral"
            class="card-img-top"
            alt="Tumor cerebral"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body">
            <h5 class="card-title">Diagnóstico de Tumor Cerebral</h5>
            <p class="card-text text-muted">
              Análisis de resonancia magnética cerebral
            </p>
            <p class="card-text">
              Identificación temprana de tumor benigno, mejorando el pronóstico
              del paciente significativamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Testimonios -->
<section id="testimonios" class="py-5 bg-light">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold text-dark mb-3">
        Lo Que Dicen Nuestros Pacientes
      </h2>
      <p class="lead text-muted" style="max-width: 600px; margin: 0 auto;">
        Testimonios reales de personas que han beneficiado de nuestro análisis
        IA.
      </p>
    </div>

    <div class="row g-4">
      <div class="col-lg-4 col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-body text-center">
            <p class="card-text fst-italic text-muted mb-4">
              "El análisis fue rápido y preciso. Me salvó tiempo y preocupación
              innecesaria."
            </p>
            <div class="d-flex align-items-center justify-content-center gap-3">
              <div
                class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                style="width: 40px; height: 40px;"
              >
                M
              </div>
              <div>
                <h6 class="fw-bold mb-1">María G.</h6>
                <p class="text-muted mb-0">Paciente, 45 años</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-body text-center">
            <p class="card-text fst-italic text-muted mb-4">
              "Tecnología impresionante. El informe fue claro y detallado."
            </p>
            <div class="d-flex align-items-center justify-content-center gap-3">
              <div
                class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                style="width: 40px; height: 40px;"
              >
                J
              </div>
              <div>
                <h6 class="fw-bold mb-1">Juan P.</h6>
                <p class="text-muted mb-0">Paciente, 52 años</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-body text-center">
            <p class="card-text fst-italic text-muted mb-4">
              "Recomiendo MedAI a todos. Cambió mi perspectiva sobre
              diagnósticos médicos."
            </p>
            <div class="d-flex align-items-center justify-content-center gap-3">
              <div
                class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                style="width: 40px; height: 40px;"
              >
                A
              </div>
              <div>
                <h6 class="fw-bold mb-1">Ana L.</h6>
                <p class="text-muted mb-0">Paciente, 38 años</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contacto Section -->
<section id="contacto" class="py-5">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold text-dark mb-3">Contáctanos</h2>
      <p class="lead text-muted" style="max-width: 600px; margin: 0 auto;">
        ¿Listo para comenzar? Envíanos un mensaje y te responderemos en menos de
        24 horas.
      </p>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <form on:submit={handleSubmit}>
              <div class="mb-3">
                <label for="name" class="form-label fw-semibold"
                  >Nombre Completo</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  bind:value={name}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label fw-semibold"
                  >Correo Electrónico</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  bind:value={email}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="message" class="form-label fw-semibold"
                  >Mensaje</label
                >
                <textarea
                  class="form-control"
                  id="message"
                  rows="4"
                  bind:value={message}
                  placeholder="Describe tu consulta o el tipo de análisis que necesitas..."
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100"
                >Enviar Mensaje</button
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="bg-dark text-white py-5 mt-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-3 col-md-6">
        <div class="d-flex align-items-center gap-2 mb-3">
          <div
            class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-5"
            style="width: 40px; height: 40px;"
          >
            M+
          </div>
          <span class="fw-bold">MedAI Analytics</span>
        </div>
        <p class="text-light opacity-75">
          Líderes en análisis de imágenes médicas con IA para un futuro más
          saludable.
        </p>
      </div>

      <div class="col-lg-3 col-md-6">
        <h5 class="fw-bold mb-3">Servicios</h5>
        <ul class="list-unstyled">
          <li>
            <a
              href="#servicios"
              class="text-light opacity-75 text-decoration-none">Análisis IA</a
            >
          </li>
          <li>
            <a
              href="#proceso"
              class="text-light opacity-75 text-decoration-none"
              >Consultas Médicas</a
            >
          </li>
          <li>
            <a href="#casos" class="text-light opacity-75 text-decoration-none"
              >Casos de Estudio</a
            >
          </li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-6">
        <h5 class="fw-bold mb-3">Contacto</h5>
        <ul class="list-unstyled">
          <li class="text-light opacity-75 mb-1">info@medai.com</li>
          <li class="text-light opacity-75 mb-1">+1 (555) 123-4567</li>
          <li class="text-light opacity-75">123 Medical St, Health City</li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-6">
        <h5 class="fw-bold mb-3">Síguenos</h5>
        <ul class="list-unstyled">
          <li>
            <a href="" class="text-light opacity-75 text-decoration-none"
              >Twitter</a
            >
          </li>
          <li>
            <a href="" class="text-light opacity-75 text-decoration-none"
              >LinkedIn</a
            >
          </li>
          <li>
            <a href="" class="text-light opacity-75 text-decoration-none"
              >Facebook</a
            >
          </li>
        </ul>
      </div>
    </div>

    <hr class="my-4 opacity-25" />

    <div class="text-center">
      <p class="text-light opacity-75 mb-0">
        &copy; 2024 MedAI Analytics. Todos los derechos reservados.
      </p>
    </div>
  </div>
</footer>

<style>
  /* Estilos custom para complementar Bootstrap */
  .hover-shadow {
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .hover-shadow:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15) !important;
  }

  .navbar-brand span {
    font-size: 1.25rem;
  }

  .nav-link {
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: #0d6efd !important;
  }

  /* Ajustes para hero gradient */
  .hero-section {
    min-height: 100vh;
  }

  /* Smooth scroll para toda la página */
  html {
    scroll-behavior: smooth;
  }

  /* Footer links hover */
  footer a:hover {
    opacity: 1 !important;
    color: #fff !important;
  }

  /* Card body flex para igualar alturas */
  .card-body {
    display: flex;
    flex-direction: column;
  }

  .card-text:last-child {
    flex-grow: 1;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2.5rem;
    }

    .btn-lg {
      width: 100%;
    }
  }
</style>
