// Cookie Functions
export const setCookie = (key, value, expirationDays = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${key}=${value};${expires};path=/`;
};

export const getCookie = (key) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${key}=`)) {
      return cookie.substring(key.length + 1);
    }
  }

  return null; // Cookie not found
};

export const deleteCookie = (key) => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
};
