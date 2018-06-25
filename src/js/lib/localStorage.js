export const set = (route, data) => {
  localStorage.setItem(route, JSON.stringify(data));
  return data;
};

export const get = route => JSON.parse(localStorage.getItem(route));
export const clear = route => localStorage.removeItem(route);

export default {
  get,
  set,
  clear
};
