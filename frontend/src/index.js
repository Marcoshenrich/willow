import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';
import { fetchBenches, createBench } from './store/benches';

const store = configureStore();

window.store = store;
window.sessionActions = sessionActions;
window.csrfFetch = csrfFetch;
window.fetchBenches = fetchBenches;
window.createBench = createBench;

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}


const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
//await store.dispatch(window.fetchBenches())
//await store.dispatch(window.createBench({bench:{title: "Bench6",description: "green bench",price: 100,seating: 10,lat: 58.37861,lng: 16.38857}}))