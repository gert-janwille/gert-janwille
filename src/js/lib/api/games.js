import fetch from 'isomorphic-fetch';
import {buildBody} from '../util';

const url = '/api/games';

export default {

  get: type => {
    const method = 'GET';
    const headers = new Headers({'Content-Type': 'application/json'});

    return fetch(`${url}/${type}`, {method, headers, mode: 'cors', cache: 'default'})
      .then(r => r.json());
  },

  insert: (data, {token}) => {

    const body = buildBody(data, [`type`, `username`, `score`]);
    const method = `POST`;
    const headers = new Headers({
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`
    });

    return fetch(`${url}`, {body, method, headers})
      .then(r => r.json())
      .catch(er => console.error(er));
  }
};
