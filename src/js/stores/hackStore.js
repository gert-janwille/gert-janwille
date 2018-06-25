import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';
import InviteAPI from '../lib/api/invite';
import {set} from '../lib/localStorage';

class Store {

  @observable data = {};

  @action redeem = (invite) => {
    const errors = this.validate(invite, ['invite']);
    if (!isEmpty(errors)) return this.errors = errors;

    return InviteAPI.redeem(invite)
      .then(({token}) => {
        if (!token) return false;
        set('token', token);
        return true;
      })
      .catch(() => false);

  }

  validate = (data, fields) => {
    const errors = {};
    fields.map(f => !data[f] ? errors[f] = `Please fill in a ${f}` : null);
    return errors;
  }

}

const store = new Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
