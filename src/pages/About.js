import React, { Component } from 'react';

import { Link } from "react-router-dom";

export default class About extends Component {
	render() {
		return (
			<div>
				<h1>Welcome to Fantom's Pirates</h1>
				<p><Link className="button" to="/profile">Mint a pirate</Link> to play!</p>
				<p>Play as a Pirate: buy a ship, plunder the vastness of the Fantom world, earn gold and trade at the bay!</p>
			</div>
		);
	}
}
