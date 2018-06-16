/**
 * localStorage.js
 * This helper function helps to set, get and clear data in
 * the localStorage.
 *
 *
 * @version 1.0
 * @author  Gert-Jan Wille, <gert-jan@dejongensvanboven.nl>
 * @updated 2018-05-02
 *
 *
 */

// Set data in the localStorage
export const set = (route, data) => {
  // Set an item with a path and string data.
  localStorage.setItem(route, JSON.stringify(data));
  // Return the data.
  return data;
};

// Get and parse the data whois stored in the route.
export const get = route => JSON.parse(localStorage.getItem(route));

// Remove data whois stored in a route.
export const clear = route => localStorage.removeItem(route);

// Export the functions so we can import them in other files.
export default {
  get,
  set,
  clear
};
