import React from 'react';

import './css/PiratesList.css';

import PirateCard from './PirateCard';

const PiratesList = (props) => {
	return (
		<div id="pirates-list">
			<ul>
				{
					props.pirates.map(pirate => {
						return <li key={pirate.id}>
							<PirateCard 
								pirate={pirate} 
								onQuestPressed={props.onQuestPressed} 
								onLevelUpPressed={props.onLevelUpPressed} />
						</li>
					})
				}
			</ul>
		</div>
	);
}

export default PiratesList;