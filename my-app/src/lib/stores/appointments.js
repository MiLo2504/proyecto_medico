import { writable } from 'svelte/store';
export const requests = writable([]);
export const loading = writable(false);