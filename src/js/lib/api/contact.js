import fetch from 'isomorphic-fetch';
import {buildBody} from '../util';
const url = '/api/mail';

export default {

  mail: data => {
    const method = 'POST';
    const body = buildBody(data, [`name`, `company`, `email`, `message`]);
    const headers = new Headers({'Content-Type': 'application/json'});

    return fetch(`${url}`, {body, method, headers, mode: 'cors', cache: 'default'})
      .then(r => r.json());
  }

};
