import jwt from 'jsonwebtoken';

export const get = () => localStorage.getItem('token');
export const set = t => localStorage.setItem('token', t);

export const content = t => {
  if (!t) t = get();
  if (!t) return 0;

  return JSON.parse(atob(t.split('.')[1]));
};

export const read = token => jwt.decode(token);
export const timestamp = () => Math.floor(Date.now() / 1000);

export const isValid = t => {
  let valid = true;
  t = content(t);
  if (t) {
    if (t.exp && (t.exp - timestamp()) < 0) {
      valid = false;
    }
  } else {
    valid = false;
  }

  if (!valid) clear();

  return valid;
};

export const clear = () => {
  localStorage.removeItem('token');
  return !localStorage.getItem('token');
};

export default {
  get,
  set,
  content,
  isValid,
  clear,
  read
};
