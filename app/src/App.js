// Libs
import React from 'react';
import './App.css';
import {Route, Redirect} from 'react-router-dom';
//Const
import {routes, index, afterAuth} from './const/Routes'
// Componets
import Settings from './componets/Settings/Settings'
import Store from './componets/Storage/Storage'
import Users from './componets/Users/Users'
import Login from './componets/Login/Login'
import Logout from './componets/Logout'
import Confirm from './componets/tools/Confirm'
import Alert from './componets/tools/Alet'
import DataLoader from './componets/tools/DataLoader'

const App = () => (
	<div className='App'>
		<div className='App-body container'>
			<div className="row">
				<Route path="/" render={() => <Redirect to={index} />}/>
				<Route path={routes.storage}  component={Store}/>
				<Route path={routes.settings} component={Settings}/>
				<Route path={routes.users}    component={Users}/>
				<Route path={routes.login}    component={Login}/>
				<Route path={routes.logout}   component={Logout}/>
				<Route path={routes.dataLoader}   component={() => (<DataLoader pathAfter={afterAuth} />)}/>
			</div>
		</div>
		<Confirm />
		<Alert />
	</div>
);

export default App;
