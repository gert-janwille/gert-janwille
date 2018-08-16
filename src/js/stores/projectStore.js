import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import ProjectAPI from '../lib/api/projects';
import {getrandomInt, createValidString} from '../lib/util';

class Store {

  allProjects = [];
  @observable projects = [];
  @observable tags = [];

  @observable mainSlide = {};
  @observable detailProject = {};

  @observable dotindicators = 4;

  init = () => {
    ProjectAPI.get()
      .then(({projects}) => this.projects = this.allProjects = projects.sort((a,b) => new Date(b.created) - new Date(a.created)))
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

  @action filter = tag => {
    switch (tag) {
      case 'All':
        this.projects = this.allProjects;
        break;
      default:
      this.projects = this.allProjects.filter(({services}) => services.includes(tag));
    }
  }

  @action getOtherProject = key => {
    const lastIndex = this.allProjects.length - 1;
    let index = this.allProjects.map(p => p._id).indexOf(this.detailProject._id);

    key === 'next' ? index++ : index--;
    if (index > lastIndex) index = 0;
    if (index < 0) index = lastIndex;

    window.scrollTo(0, 0);
    return this.detailProject = this.allProjects[index];
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
