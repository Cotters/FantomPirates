import React, { Component } from 'react';
import MintPirateButton from './components/MintPirateButton';
import NumberOfOwnedPirates from './components/NumberOfOwnedPirates';

import web3 from '../blockchain/web3';
import game from '../blockchain/game';
import gameItems from '../blockchain/game_items';

export default class Profile extends Component {

	state = {
		account: web3.currentProvider.selectedAddress,
		numberOfPiratesOwned: 0,
		successMessage: null,
		errorMessage: null,
	}

	constructor(props) {
		super(props);
		this.handlePirateButtonPressed = this.handlePirateButtonPressed.bind(this);
		this.loadNumberOfPirates = this.loadNumberOfPirates.bind(this);
	}

	async componentDidMount() {
		await this.loadNumberOfPirates()
	}

	async loadNumberOfPirates() {
		const account = web3.currentProvider.selectedAddress;
		if (account == null) return;
		try {
			const numberOfPiratesOwned = await gameItems.methods.balanceOf(account, 0).call();
			this.setState({ numberOfPiratesOwned })
		} catch (error) {
			console.error(error);
		}
	}

	async handlePirateButtonPressed() {
		try {
    	await game.methods.mintPirate().send({from:this.state.account});
		} catch(error) {
			console.error(error);
			const errorDataObject = JSON.parse(error.message.substring(24).trim()).data;
			const key = Object.keys(errorDataObject)[0];
			const errorMessage = errorDataObject[key].reason;
    	// const errorMessage = (errorDataObject == null) ? error.message : errorDataObject[key].reason;
			this.setState({ errorMessage });
		}
  }

	render() {
		return (
			<div className="page-content">
				<h1>Pirates ({this.state.numberOfPiratesOwned})</h1>
				<MintPirateButton
					 onButtonPress={this.handlePirateButtonPressed} />
				{ this.state.successMessage != null && <p className="success-message">Success: { this.state.successMessage }</p> }
				{ this.state.errorMessage != null && <p className="error-message">Error: { this.state.errorMessage }</p> }
			</div>
		);
	}
}