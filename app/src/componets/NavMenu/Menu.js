import React from 'react';
import {connect} from 'react-redux'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconAccoundBox from 'material-ui/svg-icons/action/account-box'
import IconSettings from 'material-ui/svg-icons/action/settings'
import IconLogout from 'material-ui/svg-icons/action/lock'
import IconStore from 'material-ui/svg-icons/device/storage'

const Menu = (state) => (
	<Paper zDepth={2}>
		<BottomNavigation selectedIndex={state.store.select}>
			<BottomNavigationItem
				label="Storage"
				icon={<IconStore />}
				onTouchTap={() => state.onSelect(0)}
			/>
			<BottomNavigationItem
				label="Users"
				icon={<IconAccoundBox />}
				onTouchTap={() => state.onSelect(1)}
			/>
			<BottomNavigationItem
				label="Setting"
				icon={<IconSettings />}
				onTouchTap={() => state.onSelect(2)}
			/>
			<BottomNavigationItem
				label="Logout"
				icon={<IconLogout />}
				onTouchTap={() => state.onSelect(3)}
			/>
		</BottomNavigation>
	</Paper>
);

export default connect(
	state => ({
		store: state.navMenu
	})
)(Menu);
