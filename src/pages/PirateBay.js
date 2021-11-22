import React, { Component } from 'react';

import SelectPirateDropdown from './components/SelectPirateDropdown';

import web3 from '../blockchain/web3';
import game from '../blockchain/game';


import './css/PirateBay.css';

export default class PirateBay extends Component {

	state = {
		pirateIds: [],
		selectedPirateId: null,
		errorMessage: null,
	}

	constructor() {
		super();
		this.loadNumberOfPirates = this.loadNumberOfPirates.bind(this);
		this.onPirateSelected = this.onPirateSelected.bind(this);
		this.buyShip = this.buyShip.bind(this);
	}

	async componentDidMount() {
		await this.loadNumberOfPirates();
	}

	async loadNumberOfPirates() {
		const account = web3.currentProvider.selectedAddress;
		if (account === null) return;
		try {
			const numberOfPiratesOwned = await game.methods.balanceOf(account).call();
			let pirateIds = [];
			for (let i = 0; i<numberOfPiratesOwned; i++) {
				pirateIds.push(await game.methods.tokenOfOwnerByIndex(account, i).call());
			}
			this.setState({ pirateIds, selectedPirateId: pirateIds[0] });
		} catch (error) {
			console.error(error);
		}
	}

	async onPirateSelected(pirateId) {
		if (pirateId == null) return
		this.setState({selectedPirateId: pirateId});
	}

	async buyShip() {
		try {
			await game.methods.mintShip(this.state.selectedPirateId).call();
		} catch(error) {
			let errorObject = JSON.parse(error.message.substring(error.message.indexOf("\n") + 1));
			const key = Object.keys(errorObject.data)[0];
			console.error(errorObject.data[key].reason);
			this.setState({errorMessage: errorObject.data[key].reason});

		}
	}

	render() {
		return (
			<div className="page-content" id="pirate-bay-content">
				<h1>The Pirate Bay</h1>
				{ this.state.errorMessage != null && <p className="error-message">Error: { this.state.errorMessage }</p> }
				<SelectPirateDropdown
					pirateIds={this.state.pirateIds}
					onPirateSelected={this.onPirateSelected} />
				
				{this.state.selectedPirateId != null && 
					<div>
						<p>Welcome Pirate #{this.state.selectedPirateId}</p>
						<button className="btn" onClick={this.buyShip}>Buy a ship!</button>
						<p>Coming soon...</p>
					</div>
				}
			</div>
		);
	}
}
