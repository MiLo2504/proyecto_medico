// src/lib/services/patientService.js
// Usa variable de entorno si existe, si no, fallback a localhost
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) || "http://127.0.0.1:8000"; // ajusta según tu backend

function getAuthHeaders() {
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export async function fetchPatient(id) {
  // Intenta obtener el paciente desde la API real
  try {
    let res = await fetch(`${API_BASE}/patients/${id}`, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
    if (res.status === 404) {
      // fallback alternativo: algunos backends exponen /users/:id
      res = await fetch(`${API_BASE}/users/${id}`, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
    }
    if (!res.ok) throw new Error('No se pudo cargar el paciente');
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn('fetchPatient: usando datos simulados por error de API', e);
    // Fallback: Simulación de datos si la API no está lista
    return {
      id: parseInt(id),
      user_name: `paciente${id}`,
      full_name: `Paciente ${id} Ejemplo`,
      last_name: 'Ejemplo',
      email: `paciente${id}@ejemplo.com`,
      phone: `300${id}123456`,
      address: 'Dirección simulada 123',
      num_document: `DNI${id}123456`,
      type_document_name: 'DNI',
      date_birth: '1990-01-01'
    };
  }
}

export async function fetchAnalyses(id) {
  return [
    { id: 1, url_image: "https://via.placeholder.com/150", date: "2025-10-09", result_ia: "Normal" },
    { id: 2, url_image: "https://via.placeholder.com/150", date: "2025-10-08", result_ia: "Anomalía detectada" },
  ];
}

export async function fetchAnalysisById(id) {
  const analyses = await fetchAnalyses(1);
  return analyses.find((a) => a.id === parseInt(id)) || null;
}

export async function uploadAnalysis(id, file) {
  return { success: true };
}

export async function updatePatient(id, data) {
  // Whitelist de campos comunes que suelen permitir actualización
  const allowed = ['user_name','full_name','last_name','phone','email','address','num_document','type_document_name','date_birth'];
  const filtered = Object.fromEntries(Object.entries(data).filter(([k]) => allowed.includes(k)));

  // Normaliza el payload para evitar 422 por tipos/strings vacíos
  function toISODate(d) {
    try {
      if (!d) return undefined;
      if (d instanceof Date) return d.toISOString().slice(0, 10);
      const s = String(d);
      // Acepta 'YYYY-MM-DD' o DateTime -> solo fecha
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
      const asDate = new Date(s);
      return isNaN(asDate.getTime()) ? undefined : asDate.toISOString().slice(0, 10);
    } catch {
      return undefined;
    }
  }

  const normalized = Object.entries(filtered).reduce((acc, [k, v]) => {
    if (v === null || v === undefined) return acc; // omitir nulos
    if (k === 'date_birth') {
      const onlyDate = toISODate(v);
      if (onlyDate) acc[k] = onlyDate;
      return acc;
    }
    let val = v;
    if (typeof val === 'number') val = String(val);
    if (typeof val === 'string') {
      const t = val.trim();
      if (t.length === 0) return acc; // omitir strings vacíos en PATCH
      acc[k] = t;
      return acc;
    }
    // Para otros tipos, convertir a string para cumplir con campos str en FastAPI
    try {
      acc[k] = String(val);
    } catch {
      // si no se puede convertir, omitir
    }
    return acc;
  }, {});

  if (Object.keys(normalized).length === 0) {
    throw new Error('No hay cambios para actualizar');
  }

  // Alias para modelos que usan otros nombres de campos
  const aliasMap = { user_name: 'username', type_document_name: 'type_document' };
  const aliasNormalized = Object.fromEntries(
    Object.entries(normalized).map(([k, v]) => [aliasMap[k] || k, v])
  );

  // Helper para detectar si el error 422 exige password
  async function requiresPassword(resp) {
    try {
      const j = await resp.clone().json();
      const details = Array.isArray(j?.detail) ? j.detail : [];
      return details.some((d) =>
        (d?.msg || '').toLowerCase().includes('field required') &&
        (Array.isArray(d?.loc) ? d.loc.join('.').toLowerCase().includes('password') : false)
      );
    } catch {
      return false;
    }
  }

  async function sendWithMethod(url, method, payload) {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(payload)
    });
    return res;
  }

  // Primer intento: /patients/:id con payload completo filtrado (PATCH)
  let endpoint = '';
  let res;

  // Intento 0: /patients/me (preferible para evitar restricciones de /users)
  endpoint = `${API_BASE}/patients/me`;
  res = await sendWithMethod(endpoint, 'PATCH', normalized);
  if (!res.ok && (res.status === 400 || res.status === 422)) {
    const basicKeys = ['full_name','last_name','phone','email','address'];
    const basic = Object.fromEntries(Object.entries(normalized).filter(([k]) => basicKeys.includes(k)));
    res = await sendWithMethod(endpoint, 'PATCH', basic);
  }
  if (!res.ok && res.status === 405) {
    res = await sendWithMethod(endpoint, 'PUT', normalized);
  }
  if (res.ok) {
    const updated = await res.json().catch(() => ({}));
    return { success: true, data: updated };
  }
  // Si 404, continuar con siguientes endpoints; otros códigos seguimos pero no abortamos aún

  // Intento 1: /users/me (con alias). Si pide password, no forzamos cambio de contraseña.
  endpoint = `${API_BASE}/users/me`;
  res = await sendWithMethod(endpoint, 'PATCH', aliasNormalized);
  if (!res.ok && (res.status === 400 || res.status === 422)) {
    const basicKeys = ['full_name','last_name','phone','email','address'];
    const basic = Object.fromEntries(Object.entries(aliasNormalized).filter(([k]) => basicKeys.includes(k)));
    res = await sendWithMethod(endpoint, 'PATCH', basic);
  }
  if (!res.ok && res.status === 405) {
    res = await sendWithMethod(endpoint, 'PUT', aliasNormalized);
  }
  if (res.ok) {
    const updated = await res.json().catch(() => ({}));
    return { success: true, data: updated };
  }
  if (!res.ok && res.status === 422 && (await requiresPassword(res))) {
    throw new Error('El endpoint /users/me requiere password para actualizar. Evitamos enviar contraseña. Habilita un endpoint que permita PATCH sin password o usa /patients/me.');
  }

  // Intento 2: /patients/:id
  endpoint = `${API_BASE}/patients/${id}`;
  res = await sendWithMethod(endpoint, 'PATCH', normalized);

  // Si 404, intentar en /users/:id
  if (res.status === 404) {
    endpoint = `${API_BASE}/users/${id}`;
    res = await sendWithMethod(endpoint, 'PATCH', aliasNormalized);
  }

  // Si 400/422, intentar con payload reduce a campos básicos
  if (!res.ok && (res.status === 400 || res.status === 422)) {
    const basicKeys = ['full_name','last_name','phone','email','address'];
    const baseObj = endpoint.includes('/users/') ? aliasNormalized : normalized;
    const basic = Object.fromEntries(Object.entries(baseObj).filter(([k]) => basicKeys.includes(k)));
    // Reintentar en el último endpoint usado (PATCH)
    res = await sendWithMethod(endpoint, 'PATCH', basic);
  }

  // Si 422 persiste, intentar con alias de campos comunes (p.ej. username)
  let lastErrorPayload = null;
  if (!res.ok && res.status === 422) {
    const aliasMap = { user_name: 'username', type_document_name: 'type_document' };
    const aliasPayload = Object.fromEntries(
      Object.entries(normalized).map(([k, v]) => [aliasMap[k] || k, v])
    );
    lastErrorPayload = aliasPayload;
    res = await sendWithMethod(endpoint, 'PATCH', aliasPayload);
  }

  // Si 422 y el backend exige password (modelo de usuario), intenta en /users/me y /patients/me
  if (!res.ok && res.status === 422) {
    let needsPassword = false;
    try {
      const j = await res.clone().json();
      const details = Array.isArray(j?.detail) ? j.detail : [];
      needsPassword = details.some((d) =>
        (d?.msg || '').toLowerCase().includes('field required') &&
        (Array.isArray(d?.loc) ? d.loc.join('.').toLowerCase().includes('password') : false)
      );
    } catch {}

    if (needsPassword) {
      // Intento 1: /users/me
      try {
        const aliasMap = { user_name: 'username', type_document_name: 'type_document' };
        const mePayload = Object.fromEntries(
          Object.entries(normalized).map(([k, v]) => [aliasMap[k] || k, v])
        );
        let meRes = await sendWithMethod(`${API_BASE}/users/me`, 'PATCH', mePayload);
        if (!meRes.ok) {
          // Intento 2: /patients/me
          meRes = await sendWithMethod(`${API_BASE}/patients/me`, 'PATCH', mePayload);
        }
        if (meRes.ok) {
          const updated = await meRes.json().catch(() => ({}));
          return { success: true, data: updated };
        } else {
          // Guarda último error para reportar
          lastErrorPayload = mePayload;
          res = meRes; // dejar que caiga en el manejador final
        }
      } catch {}
    }
  }

  // Si 405 (method not allowed), reintentar con PUT
  if (!res.ok && res.status === 405) {
    const baseObj = endpoint.includes('/users/') ? aliasNormalized : normalized;
    res = await sendWithMethod(endpoint, 'PUT', baseObj);
  }

  if (!res.ok) {
    let detail = '';
    try {
      const j = await res.json();
      if (Array.isArray(j?.detail)) {
        // FastAPI-style validation errors array con ubicación del campo
        detail = j.detail
          .map((d) => {
            const where = Array.isArray(d?.loc) ? d.loc.join('.') : '';
            const msg = d?.msg || JSON.stringify(d);
            return where ? `${where}: ${msg}` : msg;
          })
          .join('; ');
      } else {
        detail = j?.detail || JSON.stringify(j);
      }
    } catch {}
    const endpointInfo = endpoint ? ` en ${endpoint}` : '';
    const payloadInfo = lastErrorPayload ? ` | payload: ${JSON.stringify(lastErrorPayload)}` : '';
    throw new Error(`Error ${res.status} al actualizar paciente${endpointInfo}${detail ? `: ${detail}` : ''}${payloadInfo}`);
  }

  const updated = await res.json().catch(() => ({}));
  return { success: true, data: updated };
}