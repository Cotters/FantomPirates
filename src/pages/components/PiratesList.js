import React from 'react';
import { Link } from "react-router-dom";

import './css/PiratesList.css';
import flag from '../assets/pirate_flag.jpeg'

import PirateCard from './PirateCard';

const PiratesList = (props) => {
	return (
		<div id="pirates-list">
			<ul>
				{
					props.pirates.map(pirate => {
						return <li key={pirate}><PirateCard pirate={pirate} /></li>
					})
				}
			</ul>
		</div>
	);
}

export default PiratesList;