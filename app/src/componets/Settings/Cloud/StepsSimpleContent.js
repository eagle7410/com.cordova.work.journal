import React from 'react';
import LoadAnimation from '../../tools/LoadAnimation'
import {objBad, objOk} from '../../../const/Objects'

const styleContent = {margin: '0 16px', overflow: 'hidden'};

const StepsSimpleContent = (state) => {
	if (state.finished) {
		const obj = state.stop ? objBad : objOk;

		return (
			<div style={styleContent}>
				<h1 style={{color : obj.color}}>{obj.mess}</h1>
			</div>
		);
	}

	return (
		<div style={styleContent}>
			<div>{state.loading ? <LoadAnimation key={'anima'} /> : <div/>}</div>
		</div>
	);
};

export default StepsSimpleContent;
