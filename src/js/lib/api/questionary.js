import fetch from 'isomorphic-fetch';
const url = '/api/questionary';

export default {

  mail: data => {
    const method = 'POST';
    console.log(data);
    const body = JSON.stringify(data);
    const headers = new Headers({'Content-Type': 'application/json'});

    return fetch(`${url}`, {body, method, headers, mode: 'cors', cache: 'default'})
      .then(r => r.json());
  }

};
