import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import ProjectAPI from '../lib/api/projects';
import {getrandomInt, createValidString} from '../lib/util';

class Store {

  @observable projects = [];
  @observable tags = [];

  @observable mainSlide = {};
  @observable detailProject = {};

  init = () => {
    ProjectAPI.get()
      .then(({projects}) => this.projects = projects)
      .then(() => this.mainSlide = getrandomInt(this.projects));

    ProjectAPI.getTags()
      .then(({tags}) => this.tags = tags);
  }

  constructor (){
    this.init();
  }


  @action getDetail = url => {
    return this.detailProject = isEmpty(this.projects)
      ? this.fetchAndFind(url)
      : this.projects.filter(({title}) => createValidString(title) === url)[0];
  }

  fetchAndFind = url => {
    ProjectAPI.get()
      .then(({projects}) => this.projects = projects)
      .then(projects => this.detailProject = projects.filter(({title}) => createValidString(title) === url)[0]);
  }

}

const store = new Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
