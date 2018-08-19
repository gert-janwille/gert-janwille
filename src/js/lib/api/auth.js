import fetch from 'isomorphic-fetch';
const url = '/api/auth';

export default {

  auth: data => {
    const method = 'GET';
    const headers = new Headers({'Content-Type': 'application/json'});

    return fetch(`${url}`, {method, headers, mode: 'cors', cache: 'default'})
      .then(r => r.json());
  }

};
