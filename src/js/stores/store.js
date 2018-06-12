import {observable, action} from 'mobx';

class Store {

  @observable showMenu = false;

  @action toggleMenu = e => {
    if (!this.showMenu) return this.showMenu = !this.showMenu;

    setTimeout(() => document.querySelector('.menu-container').classList.add('close-menu'), 200);
    setTimeout(() => this.showMenu = !this.showMenu, 800);
  };

}

const store = new Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
