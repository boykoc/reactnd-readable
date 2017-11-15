import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, composeEnhancers(
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  ))
);

ReactDOM.render(
  <Provider store={store}>
  <Router>
	<App />
  </Router>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
