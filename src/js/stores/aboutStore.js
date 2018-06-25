import {observable} from 'mobx';
import SkillAPI from '../lib/api/skills';
import ExperienceAPI from '../lib/api/experiences';

class Store {

  @observable skills = [];
  @observable experiences = [];

  init = () => {
    SkillAPI.get()
      .then(({skills}) => this.skills = skills);

    ExperienceAPI.get()
      .then(({experiences}) => this.experiences = experiences);
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
