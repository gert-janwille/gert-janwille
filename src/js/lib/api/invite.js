import fetch from 'isomorphic-fetch';
import {buildBody} from '../util';
const url = '/api/invite';

export default {

  redeem: invite => {
    const method = 'POST';
    const body = buildBody(invite, [`invite`]);
    const headers = new Headers({'Content-Type': 'application/json'});

    return fetch(`${url}`, {body, method, headers, mode: 'cors', cache: 'default'})
      .then(r => r.json());
  }

};
