import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Dropdown from './components/Dropdown';
import ErrorBox from './components/ErrorBox';



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
		this.hideError = this.hideError.bind(this);
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
			this.setState({ pirateIds });
		} catch (error) {
			console.error(error);
		}
	}

	async onPirateSelected(index) {
		if (index == null) return
		this.setState({selectedPirateId: this.state.pirateIds[index]});
	}

	async buyShip() {
		try {
			await game.methods.mintShip(this.state.selectedPirateId).call();
		} catch(error) {
			let errorObject = JSON.parse(error.message.substring(error.message.indexOf("\n") + 1));
			const key = Object.keys(errorObject.data)[0];
			this.setState({errorMessage: errorObject.data[key].reason});

		}
	}

	async hideError() {
		this.setState({errorMessage: null});
	}

	render() {
		return (
			<div className="page-content" id="pirate-bay-content">
				<h1>The Pirate Bay<br /><small>Enjoy your stay 🍺</small></h1>

				<ErrorBox
					errorMessage={this.state.errorMessage}
					onCloseTapped={this.hideError} />

				{this.state.pirateIds.length > 0 ? 
					<Dropdown
						numberOfItems={this.state.pirateIds.length}
						onItemSelected={this.onPirateSelected} />
						:
					<p>You must <Link className="btn" to="/profile">Mint a pirate</Link> before you can use the Pirate Bay!</p>
				}

				{this.state.selectedPirateId != null && 
					<div>
						<p>Welcome Pirate #{this.state.selectedPirateId}</p>
						{/* TODO: Disable if Pirate.level < 2 */}
						<button className="btn" onClick={this.buyShip}>Buy a ship!</button>
						<p>More coming soon...</p>
					</div>
				}
			</div>
		);
	}
}
