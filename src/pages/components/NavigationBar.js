import React from 'react';
import { Link } from "react-router-dom";

import './css/Navigation.css';

const NavigationBar = (props) => {
	
	return (
		<div className="navigation-bar">
			<ul id="nav-float-left">
				<li><Link to="/">About</Link></li>
				<li><Link to="/bay">The Pirate Bay</Link></li>
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to="/hall-of-kings">Hall of Kings</Link></li>
			</ul>
			<ul id="nav-float-right">
				<li id="contract-link"><a href={`https://ftmscan.com/address/${props.contractAddress}`}>Contract Address</a></li>
			</ul>
		</div>
	);
}

export default NavigationBar;