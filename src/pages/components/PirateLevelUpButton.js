import React from 'react';

const PirateLevelUpButton = ({pirate, onLevelUpPressed}) => {

	function handleLevelUpPressed(e, pirateId) {
		e.preventDefault();
		onLevelUpPressed(pirateId);
	}

	let canLevelUp = (pirate.xp >= pirate.nextLevelXp)

	return (
		<span>
		{canLevelUp && <button id="btn-level-up" type="submit" onClick={e => handleLevelUpPressed(e, pirate.id)}>🔺</button>}
		</span>)
}

export default PirateLevelUpButton;