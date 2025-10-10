import { writable } from 'svelte/store';

export const auth = writable({
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
});

export function setAuthToken(token) {
  localStorage.setItem('token', token);
  auth.update((a) => ({ token, isAuthenticated: true }));
}

export function clearAuth() {
  localStorage.removeItem('token');
  auth.update((a) => ({ token: null, isAuthenticated: false }));
}