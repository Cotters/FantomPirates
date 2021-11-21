import React, { Component } from 'react';

import { Link } from "react-router-dom";

import './css/About.css';

export default class About extends Component {
	render() {
		return (
			<div className="page-content" id="about-content">
				<h1>Welcome to Fantom Pirates</h1>
				<p>Play as a Pirate: buy a ship, plunder the vastness of the Fantom world, earn gold and trade <Link to="/bay">at the pirate bay</Link>, write your name on the Fantom Pirates <Link to="/hall-of-kings">Hall of Kings</Link>!</p>
				<p><Link className="btn" to="/profile">Mint a pirate</Link> to play!</p>
			</div>
		);
	}
}
