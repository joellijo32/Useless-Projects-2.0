const base = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : ''

export async function apiFetch(path, options) {
  const url = base ? `${base}${path.startsWith('/') ? path : `/${path}`}` : path
  return fetch(url, options)
}

export const API_BASE = base
