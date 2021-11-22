import React, { Component } from 'react';

import { Link } from "react-router-dom";

import './css/About.css';

export default class About extends Component {
	render() {
		return (
			<div className="page-content" id="about-content">
				<h1>Welcome to Fantom Pirates</h1>
				<ul>
					<li>Play as a pirate</li>
					<li>Go on quests and earn gold</li>
					<li>Level up your pirates</li>
					<li>Buy a ship!</li>
					<li>Trade at the <Link to="/bay">Pirate Bay</Link> (coming soon)</li>
					<li>Write your name on the Fantom Pirates <Link to="/hall-of-kings">Hall of Kings</Link></li>
				</ul>
				<p><Link className="btn" to="/profile">Mint a pirate</Link> to begin!</p>
			</div>
		);
	}
}
