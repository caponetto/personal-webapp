export function getCookie(name: string): string | undefined {
  if (!navigator.cookieEnabled) {
    return;
  }

  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length !== 2) {
    return;
  }

  return parts.pop()?.split(";").shift();
}

export function setCookie(name: string, value: string): void {
  if (!navigator.cookieEnabled) {
    return;
  }

  const date = new Date();
  date.setMonth(date.getMonth() + 5);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export const cookieNames: Record<string, string> = {
  colorMode: "color_mode",
  showSnackbar: "show_snackbar",
};
