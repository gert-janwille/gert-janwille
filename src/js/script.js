/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';

import App from './containers/App';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Provider} from 'mobx-react';

import stores from './stores';

const init = () => {
  console.log(`%cCreated by Gert-Jan Wille`, `color: #D52C38; padding: 5px 0px; font-weight: bold; font-family: 'Poppins';`);
  console.log(`%chttps://gertjanwille.com`, `color:#ccc; font-weight: italic; font-family: 'Poppins';`);

  render(
    <Provider {...stores}>
      <Router>
        <Route component={App} />
      </Router>
    </Provider>,
    document.querySelector(`.react-mount`)
  );

};

init();
