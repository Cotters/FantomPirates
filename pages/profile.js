import React, { Component } from 'react';
import MintPirateButton from './components/MintPirateButton';
import NumberOfOwnedPirates from './components/NumberOfOwnedPirates';

import web3 from '../blockchain/web3';
import game from '../blockchain/game';
import gameItems from '../blockchain/game_items';

export default class Profile extends Component {

	state = {
		gameContractAddress: game._address,
		account: web3.currentProvider.selectedAddress,
		owner: "",
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
		await this.loadContractOwner();
		await this.loadNumberOfPirates()
	}

	async loadContractOwner() {
		try {
			const owner = await game.methods.owner().call();
			this.setState({ owner });
		} catch (error) {
			console.error(error);
		}
	}

	async loadNumberOfPirates() {
		const account = web3.currentProvider.selectedAddress;
		if (account == null) return;
		try {
			const numberOfPiratesOwned = await gameItems.methods.balanceOf(this.state.account, 0).call();
			console.log(numberOfPiratesOwned);
			const successMessage = "Pirates owned returned!"
			this.setState({numberOfPiratesOwned, successMessage})
		} catch (error) {
			console.error(error);
		}
	}

	async handlePirateButtonPressed() {
		console.log("Minting from " + this.state.account);
		try {
    	await game.methods.mintPirate().send({from:this.state.account});
		} catch(error) {
			console.error(error);
			const errorDataObject = JSON.parse(error.message.substring(24).trim()).data;
			const key = Object.keys(errorDataObject)[0];
    	const errorMessage = errorDataObject[key].reason
			this.setState({ errorMessage });
		}
  }

	render() {
		return (
			<div>
				<h1>Profile</h1>
				<MintPirateButton
					 onButtonPress={this.handlePirateButtonPressed} />
				<p>Contract: {this.state.gameContractAddress}</p>
				<p>Account: {this.state.account}</p>
				<p>Owner: {this.state.owner}</p>
				{ this.state.successMessage != null && <p className="success-message">Success: { this.state.successMessage }</p> }
				{ this.state.errorMessage != null && <p className="error-message">Error: { this.state.errorMessage }</p> }
				<NumberOfOwnedPirates numberOfPirates = { this.state.numberOfPiratesOwned } />
			</div>
		);
	}
}