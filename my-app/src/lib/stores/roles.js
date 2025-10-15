import { writable } from 'svelte/store';

export const roles = writable([]);
export const modules = writable([]);
export const loading = writable(false);