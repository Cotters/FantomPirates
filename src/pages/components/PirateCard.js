import React from 'react';
import QuestButton from './PirateQuestButton'
import LevelUpButton from './PirateLevelUpButton'

import flag from '../assets/pirate_flag.jpeg'

const PirateCard = ({pirate, onQuestPressed, onLevelUpPressed}) => {
	return (
		<div id="pirate-card">
			<img src={flag} alt="pirate-flag" />
			<p>Pirate #{pirate.id}</p>
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
	)
}

export default PirateCard;