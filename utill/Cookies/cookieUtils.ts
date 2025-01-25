// src/utils/cookieUtils.ts
import Cookies from 'js-cookie';

/**
 * Sets a cookie with the given name, value, and expiration in days.
 * @param name - The name of the cookie.
 * @param value - The value to store in the cookie.
 * @param expiresInDays - The number of days before the cookie expires (default is 1 day).
 */
export const setCookie = (name: string, value: any, expiresInDays: number = 1): void => {
  Cookies.set(name, value, { expires: 24 });
};

/**
 * Gets the value of a cookie by its name.
 * @param name - The name of the cookie to retrieve.
 * @returns The value of the cookie, or null if it does not exist.
 */
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

/**
 * Deletes a cookie by its name.
 * @param name - The name of the cookie to delete.
 */
export const deleteCookie = (name: string): void => {
  Cookies.remove(name);
};



// const handleSetCookie = () => {
//   setCookie('yourCookieName', 'exampleValue', 1); // 1 day expiration
//   console.log('Cookie set!');
// };

// const handleCheckCookie = () => {
//   const cookieValue = getCookie('yourCookieName');
//   if (cookieValue) {
//     console.log('Cookie value:', cookieValue);
//   } else {
//     console.log('Cookie does not exist or has expired.');
//   }
// };

// const handleDeleteCookie = () => {
//   deleteCookie('yourCookieName');
//   console.log('Cookie deleted!');
// };