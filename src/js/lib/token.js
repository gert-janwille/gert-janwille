/**
 * token.js
 * This helper function will handle all token encoding.
 * You can set, get and remove a token, decode them and
 * check if they are valid.
 *
 *
 * @version 1.0
 * @author  Gert-Jan Wille, <gert-jan@dejongensvanboven.nl>
 * @updated 2018-05-02
 *
 *
 */

// Import the json web token library.
import jwt from 'jsonwebtoken';

// Get the token from the localStorage.
export const get = () => localStorage.getItem('token');
// Set the token in the localStorage.
export const set = t => localStorage.setItem('token', t);

// Get the content of the token payload.
export const content = t => {
  // get the token
  if (!t) t = get();
  // If there is no content return.
  if (!t) return;
  // Else return the payload.
  return JSON.parse(atob(t.split('.')[1]));
};

// Decode the whole token.
export const read = token => jwt.decode(token);

// Get the current timestamp.
export const timestamp = () => Math.floor(Date.now() / 1000);

// Check if the token is valid
export const isValid = t => {
  // The token is valid until said otherwise.
  let valid = true;
  // Get the token payload data.
  t = content(t);
  // if there is a token do the next steps.
  if (t) {
    // Check if there is a expiration date and if
    // it's still valid. else set false.
    if (t.exp && (t.exp - timestamp()) < 0) {
      valid = false;
    }
  } else {
    // If there is no token data set false.
    valid = false;
  }

  // If the token isn't valid remove the token from
  // the localStorage.
  if (!valid) clear();

  // If the token is valid return true.
  return valid;
};

// Function to remove the token from the localStorage.
export const clear = () => {
  // Remove the token item from the localStorage.
  localStorage.removeItem('token');
  // Return if the token can be found in the localStorage or not.
  return !localStorage.getItem('token');
};

// Exprot all our functions so we can use them in other files.
export default {
  get,
  set,
  content,
  isValid,
  clear,
  read
};
