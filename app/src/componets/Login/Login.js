import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginList, auth} from '../../api/Login'
import Form from './Form'
import LoadAnimation from '../tools/LoadAnimation'
import DataLoader from '../tools/DataLoader'
//Const
import {afterAuth} from '../../const/Routes';
import AlertStatus from '../../const/AlertStatus';
import {Alert as Messages} from '../../const/Messages';
import {Alert as AlertAction, Login as LoginEvent} from '../../const/Events';

class Login extends Component {
	constructor (props) {
		super(props);

		let that = this;

		if (that.props.store.isLoaded !== true) {
			loginList()
				.then(that.props.onLoadedOk)
				.catch(() => that.props.showAlert(Messages.noUserList, AlertStatus.BAD));
		}
	}

	validateData () {
		let that = this;
		let login = that.props.store.login;
		let pass = that.props.store.pass;
		let err = {
			errorLogin: '',
			errorPass: ''
		};

		if (!login) {
			err.errorLogin = 'Select login';
		}

		if (!pass) {
			err.errorPass = 'Enter password';
		}

		return !err.errorLogin && !err.errorPass ? false : err;
	}

	handelSubmit () {
		let that = this;
		let errors = that.validateData();

		that.props.onSubmit();

		if (errors) {
			return that.props.validateErrors(errors);
		}

		auth(that.props.store.login, that.props.store.pass)
			.then(that.props.onAuthOk)
			.catch(that.props.onAuthBad);
	}

	render () {
		let that = this;

		if (that.props.store.isLoad === true) {
			return (<LoadAnimation/>);
		}

		if (that.props.store.token && that.props.store.isAuth) {
			return (<DataLoader pathAfter={afterAuth}/>);
		}

		return (
			<div>
				<h1>Login</h1>
				<Form
					handelSubmit = {that.handelSubmit.bind(that)}
					handelChangeLogin = {that.props.handelChangeLogin}
					handelChangePass = {that.props.handelChangePass}
					key="loginForm"/>
			</div>
		);
	}
}

export default connect(
	state => ({
		store: state.login,
		navMenu: state.navMenu
	}),
	dispatch => ({
		logout            : ()    => dispatch({type : LoginEvent.logout}),
		validateErrors    : errs  => dispatch({type : LoginEvent.validBad, data : errs}),
		onLoadedOk        : data  => dispatch({type : LoginEvent.initOk, data: data}),
		onSubmit          : ()    => dispatch({type : LoginEvent.authTry}),
		onAuthOk          : token => dispatch({type : LoginEvent.authOK, data: token}),
		onAuthBad         : err   => dispatch({type : LoginEvent.authBad, data: err}),
		handelChangeLogin : login => dispatch({
			type : LoginEvent.dataChange,
			data : {
				type : 'login',
				val  : login
			}
		}),
		handelChangePass  : pass  => dispatch({
			type : LoginEvent.dataChange,
			data : {
				type : 'pass',
				val  : pass
			}
		}),
		showAlert         : (mess, type) => dispatch({
			type : AlertAction.show,
			data : {
				message : mess,
				status  : type
			}
		})
	})
)(Login);


