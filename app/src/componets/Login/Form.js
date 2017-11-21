import React from 'react';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PasswordField from 'material-ui-password-field'
import IconUnLock from 'material-ui/svg-icons/action/lock-open';

const Form = (state) => (
	<div>
		<SelectField
			floatingLabelText="Login?"
			onChange={(event, index, value) => state.handelChangeLogin(value)}
		    value={state.store.login}
			errorText={state.store.errorLogin}
		>
			{state.store.list.map((login, inx)=> (<MenuItem key={`mi_${inx}`} value={login} primaryText={login} />))}
		</SelectField><br/>

		<PasswordField
			floatingLabelText="Password?"
			onChange={ev => {let val = (ev.target|| {}).value; if (val){state.handelChangePass(val);} }}
			errorText={state.store.errorPass}
		/><br/>

		<RaisedButton
			label="Login"
			icon={<IconUnLock />}
			onClick={state.handelSubmit}
			primary={true}
		/>
	</div>
);


export default connect(
	state => ({
		store: state.login
	})
)(Form);

injectTapEventPlugin();
