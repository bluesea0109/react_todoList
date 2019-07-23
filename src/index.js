import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route } from 'react-router'
import { createBrowserHistory } from "history";

//imort all components
import App from './App';
import Login from './login'
import Signup from './signup'
import Widgets from './widgets'
import * as serviceWorker from './serviceWorker';
import './index.css';


//import the index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

const sagaMiddleware = createSagaMiddleware()
const history = createBrowserHistory()

// Redux DevTools - completely optional, but this is necessary for it
// to work properly with redux saga. Otherwise you'd just do.

// const store = createStore(
// 	IndexReducer,
// 	applyMiddleware(sagaMiddleware)
// )

/*eslint-disable*/
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

/*eslint-enable*/

const store = createStore(
	IndexReducer,
	composeSetup(applyMiddleware(sagaMiddleware)),
)

//Begin our Index Saga
sagaMiddleware.run(IndexSagas)

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/widgets" component={Widgets} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
