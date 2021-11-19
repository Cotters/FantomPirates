import React from 'react';
import { Link } from "react-router-dom";

import flag from '../assets/pirate_flag.jpeg'

const PirateCard = (props) => {

	function handleQuestPressed(e, pirateId) {
		e.preventDefault();
		props.onQuestPressed(pirateId);
	}

	return <div id="pirate-card">
				<img src={flag} alt="pirate-flag" />
				<p>Pirate #{props.pirate}</p>
				<button type="submit" onClick={e => handleQuestPressed(e, props.pirate)}>Send on a quest</button>
	</div>
}

export default PirateCard;