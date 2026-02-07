// authUtils.js
// Utilidad para renovar el access token usando el refresh token
import API_BASE_URL from './apiConfig';

export async function refreshAccessToken() {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.access) {
      localStorage.setItem('access', data.access);
      return data.access;
    }
    return null;
  } catch {
    return null;
  }
}

// Wrapper para fetch que renueva el token si es necesario
export async function fetchWithAuth(url, options = {}) {
  let access = localStorage.getItem('access');
  if (!options.headers) options.headers = {};
  if (access) {
    options.headers['Authorization'] = `Bearer ${access}`;
  }
  let res = await fetch(url, options);
  if (res.status === 401) {
    // Intentar renovar el token
    access = await refreshAccessToken();
    if (access) {
      options.headers['Authorization'] = `Bearer ${access}`;
      res = await fetch(url, options);
    }
  }
  return res;
}
