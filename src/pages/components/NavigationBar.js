import React from 'react';
import './css/Navigation.css';

import { Link } from "react-router-dom";

const NavigationBar = (props) => {
	
	return (
		<div className="navigation-bar">
			<ul>
				<li><Link to="/">About</Link></li>
				<li><Link to="/bay">The Pirate Bay</Link></li>
				<li><Link to="/profile">Profile</Link></li>
			</ul>
		</div>
	);
}

export default NavigationBar;