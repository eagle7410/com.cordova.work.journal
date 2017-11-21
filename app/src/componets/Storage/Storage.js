import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconAdd from 'material-ui/svg-icons/av/playlist-add'
import IconStore from 'material-ui/svg-icons/image/grid-on'

import Add from './Add/Add'
import Projects from './Projects/Projects'
import Storages from './Storage/Storages'

const Storage = () => (
	<div>
		<NavMenu />
		<h1>Storage</h1>
		<Tabs>
			<Tab label='Data' icon={<IconStore />} >
				<Storages />
			</Tab>

			<Tab label='Add record' icon={<IconAdd/>} >
				<Add/>
			</Tab>

			<Tab label='Projects' icon={<IconAdd/>} >
				<Projects/>
			</Tab>
		</Tabs>
	</div>
);

export default Storage;
