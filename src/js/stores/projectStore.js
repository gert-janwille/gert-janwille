// import {observable} from 'mobx';

class Store {


  init = () => {
    console.log("hello world");
  }

  constructor (){
    this.init();
  }

}

const store = new Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
