import React, { Component } from 'react';

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1>Welcome to Fantom's Pirates Bay</h1>
				<p><a className="button" href="/profile">Mint a pirate</a> to play!</p>
				<p>Play as a Pirate: buy a ship, plunder the vastness of the Fantom world, earn gold and trade at the bay!</p>
			</div>
		);
	}
}