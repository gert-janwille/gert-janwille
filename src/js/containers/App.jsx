import React from 'react';
import {func, bool} from 'prop-types';
import {Route} from 'react-router-dom';

import {inject, observer} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import {PrivateRoute, RefRoute} from '../components/routing/';
import {Projects, Detail, Contact, Invite, Hack, About, PrivacyPolicy, Play, Questionary} from './';
import {Navigation, Menu, Footer} from '../components/'

const App = ({toggleMenu, showMenu, scrollIfNeeded, history}) => {
  scrollIfNeeded(window.location);

  return (

    <section>

      {/*process.env.NODE_ENV === `production` ? <DevTools/> : null */}

      <Navigation toggle={toggleMenu}  />
      {showMenu ? <Menu toggle={toggleMenu} /> : null}

      <section className='content-container'>
        <Route exact path='/' component={Projects} />
        <Route path='/projects/:title' component={Detail} />
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} />
        <Route path='/play' component={Play} />
        <Route path='/privacy-policy' component={PrivacyPolicy} />

        <PrivateRoute exact path='/hack' component={Hack} redirect={Invite} />
        <RefRoute exact path='/questionary' component={Questionary} redirect={Projects} {...history }/>
      </section>

      <Footer />

    </section>

  );
}

App.propTypes = {
  toggleMenu: func.isRequired,
  showMenu: bool.isRequired,
  scrollIfNeeded: func.isRequired
};

export default inject(
  ({store}) => ({
    toggleMenu: store.toggleMenu,
    showMenu: store.showMenu,
    scrollIfNeeded: store.scrollIfNeeded
  })
)(
  observer(App)
);
