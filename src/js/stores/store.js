import {observable, action} from 'mobx';

class Store {

  @observable showMenu = false;
  @observable path = null;

  @action toggleMenu = e => {
    if (!this.showMenu) return this.showMenu = !this.showMenu;

    setTimeout(() => document.querySelector('.menu-container').classList.add('close-menu'), 200);
    setTimeout(() => this.showMenu = !this.showMenu, 800);
  };

  @action scrollIfNeeded = path => {
    const {pathname} = path;
    if (this.path !== pathname) window.scrollTo(0, 0);
    this.path = pathname;
  }

}

const store = new Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
