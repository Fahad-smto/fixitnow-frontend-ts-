// A minimal cookie helper. We need real cookies (not just localStorage) because
// middleware.ts runs on the server and can't read localStorage — only cookies.

export function setCookie(name: string, value: string, days = 7) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}
