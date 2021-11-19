import React from 'react';
// import { Link } from "react-router-dom";

import './css/PiratesList.css';

import PirateCard from './PirateCard';

const PiratesList = (props) => {
	return (
		<div id="pirates-list">
			<ul>
				{
					props.pirates.map(pirate => {
						return <li key={pirate.id}><PirateCard pirate={pirate} onQuestPressed={props.onQuestPressed} /></li>
					})
				}
			</ul>
		</div>
	);
}

export default PiratesList;