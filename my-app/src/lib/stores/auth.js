// filepath: c:\Users\MiLo\Desktop\proyecto\my-app\src\lib\stores\auth.js
import { writable } from 'svelte/store';

let token = null;
if (typeof localStorage !== "undefined") {
  token = localStorage.getItem('token');
}

export const auth = writable({
  token: token || null,
  isAuthenticated: !!token
});

export function setAuthToken(token) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem('token', token);
  }
  auth.update(() => ({ token, isAuthenticated: true }));
}

export function clearAuth() {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem('token');
  }
  auth.update(() => ({ token: null, isAuthenticated: false }));
}import { writable } from 'svelte/store';

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