import React from 'react';
// import { Link } from "react-router-dom";

import flag from '../assets/pirate_flag.jpeg'

const PirateCard = (props) => {

 	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 	let pirate = props.pirate;

	function handleQuestPressed(e, pirateId) {
		e.preventDefault();
		props.onQuestPressed(pirateId);
	}

	function formatUnixTimestamp(unixTime) {
		let nextQuestTimestamp = unixTime*1000
		let nowTimestamp = new Date().getTime();
		console.log( + ". Now is " + nowTimestamp);
		if (nextQuestTimestamp == 0 || nextQuestTimestamp <= nowTimestamp)
			return "Now!"
		let date = new Date(nextQuestTimestamp)
		let dayMonth = months[date.getMonth()] + " " + date.getDate();
		let hourMinutes = date.getHours() + ":" + date.getMinutes();
		return dayMonth + " " + hourMinutes;
	}

	return <div id="pirate-card">
				<img src={flag} alt="pirate-flag" />
				<p>Pirate #{pirate.id}</p>
				<p>XP: {pirate.xp}</p>
				<p>Level: {pirate.level}</p>
				<p>Next quest available: {formatUnixTimestamp(pirate.questTimeout)}</p>
				<button type="submit" onClick={e => handleQuestPressed(e, pirate.id)}>Send on a quest</button>
	</div>
}

export default PirateCard;