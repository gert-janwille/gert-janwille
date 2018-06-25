import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';
import ContactAPI from '../lib/api/contact';

class Store {

  @observable data = {};
  @observable errors = {};
  @action setData = ({name, value}) => this.data[name] = value;

  @action sentMail = form => {
    const errors = this.validate(this.data, ['name', 'email', 'message']);
    if (!isEmpty(errors)) return this.errors = errors;

    ContactAPI.mail(this.data)
      .then(({status}) => status ? this.reset(form) : null);
  }

  validate = (data, fields) => {
    const errors = {};
    fields.map(f => !data[f] ? errors[f] = `Please fill in a ${f}` : null);
    return errors;
  }

  reset = form => {
    form.classList.add('send');
    setTimeout(() => form.classList.remove('send'), 2500);

    form.reset();
  }

}

const store = new Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
