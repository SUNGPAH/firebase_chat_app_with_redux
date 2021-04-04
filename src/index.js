import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';
import configureStore from './config/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const {store, persistor} = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate laoding={null} persistor={persistor}>
      <Routes/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
