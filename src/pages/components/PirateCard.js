import React from 'react';
import QuestButton from './PirateQuestButton'
import LevelUpButton from './PirateLevelUpButton'

import flag from '../assets/pirate_flag.jpeg'

import './css/PirateCard.css';

import PiratesContext from './contexts/PiratesContext';

const PirateCard = ({ pirate, onQuestPressed, onLevelUpPressed }) => {
	return (
		<PiratesContext.Consumer>
		{value => 
			<div id="pirate-card">
				<img src={flag} alt="pirate-flag" />
				<p>PirateID: {pirate.id}</p>
				<p>Name: {value}</p>
				<p>Level {pirate.level} 
					<small>({pirate.xp}xp / {pirate.nextLevelXp}xp)</small>
					<LevelUpButton pirate={pirate} onLevelUpPressed={onLevelUpPressed}/>
				</p>
				<p>💰{pirate.gold} gold</p>
				<QuestButton 
					pirateId = {pirate.id}
					questTimeout = {pirate.questTimeout}
					onQuestPressed = {onQuestPressed} />
			</div>
		}
		</PiratesContext.Consumer>
	)
}

export default PirateCard;