import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import todoApp from './reducers'
import App from './components/App'
let store = createStore(todoApp)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

