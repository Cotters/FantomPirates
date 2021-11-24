import React from 'react';

const PirateQuestButton = ({ pirateId, questTimeout, onQuestPressed }) => {

	function canQuest() {
		let nextQuestTimestamp = questTimeout
		let nowTimestamp = new Date().getTime();
		return nextQuestTimestamp === 0 || nextQuestTimestamp <= nowTimestamp
	}

	function formattedQuestTimeout() {
		if (canQuest())
			return "Now!";
		return new Date(questTimeout).toLocaleString();;
	}

	function handleQuestPressed(e, pirateId) {
		e.preventDefault();
		onQuestPressed(pirateId);
	}

	let isDisabled = (canQuest() === false);

  return (
    <div>
    	<button className="btn" disabled={isDisabled} onClick={e => handleQuestPressed(e, pirateId)}>Send on a quest</button>
			{isDisabled && <small>Next quest available: {formattedQuestTimeout()}</small>}
    </div>
  )
}

export default PirateQuestButton;