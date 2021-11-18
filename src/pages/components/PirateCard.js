import React from 'react';
import { Link } from "react-router-dom";

import flag from '../assets/pirate_flag.jpeg'

const PirateCard = (props) => {
	return <div id="pirate-card">
			<img src={flag} alt="pirate-flag" />
			<Link to={`pirates/${props.pirate}`}>
			Pirate #{props.pirate}
		</Link>
	</div>
}

export default PirateCard;