import './css/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import CarList from './reducers';
import App from './containers/App';

let store = createStore(CarList);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'))


