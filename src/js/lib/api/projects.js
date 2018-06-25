import fetch from 'isomorphic-fetch';

const url = '/api/projects';

export default {

  get: (type = null) => {
    const method = 'GET';
    const headers = new Headers({'Content-Type': 'application/json'});

    return fetch(`${url}${type ? `/${type}` : ''}`, {method, headers, mode: 'cors', cache: 'default'})
      .then(r => r.json());
  },

  getTags: () => {
    const method = 'GET';
    const headers = new Headers({'Content-Type': 'application/json'});

    return fetch(`/api/tags`, {method, headers, mode: 'cors', cache: 'default'})
      .then(r => r.json());
  }
};
