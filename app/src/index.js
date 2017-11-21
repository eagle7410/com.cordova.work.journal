import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { createHashHistory as createHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ListeningRouter} from './componets/tools/ListeningRouter';
import {reducer} from './reducers';
const browserHistory = createHistory();
const middleware = routerMiddleware(browserHistory);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(middleware)));
const history = syncHistoryWithStore(browserHistory, store);

const appReact = () => {
	ReactDOM.render(
		<Router history={history}>
			<Provider store={store}>
				<ListeningRouter>
					<MuiThemeProvider>
						<App/>
					</MuiThemeProvider>
				</ListeningRouter>
			</Provider>
		</Router>,
		document.getElementById('root')
	);
};
if (!window.cordova) {
	window.appReact = appReact;
} else {
	window.cordova.appReact = appReact;
}
