import React from 'react';
import LoadAnimation from '../../tools/LoadAnimation'
import {objBad, objOk} from '../../../const/Objects'
import {styleContent} from '../../../const/Styles'

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
			{state.loading ? <LoadAnimation key={'anima'} /> : <div/>}
		</div>
	);
};

export default StepsSimpleContent;
