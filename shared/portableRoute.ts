export function encodePortableRoute(route: unknown) {
  const json = JSON.stringify(route);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodePortableRoute<T>(encoded: string | null): T | null {
  if (!encoded) return null;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded)))) as T;
  } catch {
    return null;
  }
}
