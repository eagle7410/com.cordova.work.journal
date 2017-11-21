import React, {Component} from 'react';
import {connect} from 'react-redux'
import Menu from './Menu';
import Navigate from './Navigate';
//Const
import {routes, afterAuth} from '../../const/Routes';
import {NavMenu as NavMenuEvent} from '../../const/Events';

class NavMenu extends Component {

	render() {
		let that = this;
		let route;

		const select = (index) => {
			switch (index) {
				case 0: route = routes.storage;break;
				case 1: route = routes.users;break;
				case 2: route = routes.settings;break;
				case 3: route = routes.logout;break;
				default : route = afterAuth;
			}

			that.props.goTo({
				routeTo : route,
				select : index
			});
		};

		return <div>
			<Navigate/>
			<Menu onSelect={select}/>
		</div>

	}

	componentDidMount() {
		this.props.noRedirect();
	}
}

export default connect(
	state => ({
		store: state.navMenu
	}),
	dispatch => ({
		goTo: route => dispatch({type: NavMenuEvent.goto, data: route}),
		noRedirect : () => dispatch({type: NavMenuEvent.clear}),
	})
)(NavMenu);
