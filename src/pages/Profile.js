import React, { Component } from 'react';
import PiratesList from './components/PiratesList';
import MintPirateButton from './components/MintPirateButton';

import web3 from '../blockchain/web3';
import game from '../blockchain/game';
// import gameItems from '../blockchain/game_items';

export default class Profile extends Component {

	state = {
		account: web3.currentProvider.selectedAddress,
		numberOfPiratesOwned: 0,
		userTokenIds: [],
		successMessage: null,
		errorMessage: null,
	}

	constructor(props) {
		super(props);
		this.handlePirateButtonPressed = this.handlePirateButtonPressed.bind(this);
		this.subscribeToEvents = this.subscribeToEvents.bind(this);
		this.loadNumberOfPirates = this.loadNumberOfPirates.bind(this);
	}

	async componentDidMount() {
		this.subscribeToEvents()
		await this.loadNumberOfPirates()
	}

	async subscribeToEvents() {
	// NOTE: For this to work you need to run a node/not use local wallet
		// web3.eth.subscribe('PirateCreated', function(error, result) {
		// 	if (error) 
		// 		console.error(error)
		// 	else
		// 		console.log(result)
		// })
	}

	async loadNumberOfPirates() {
		const account = web3.currentProvider.selectedAddress;
		if (account == null) return;
		try {
			const numberOfPiratesOwned = await game.methods.balanceOf(account).call();
			this.setState({ numberOfPiratesOwned })
			this.getTokenIds(numberOfPiratesOwned)
		} catch (error) {
			console.error(error);
		}
	}
	
	async getTokenIds(numberOfPirates) {
		let userTokenIds = [];
		const account = web3.currentProvider.selectedAddress;
		for (let i = 0; i<numberOfPirates; i++) {
			let tokenId = await game.methods.tokenOfOwnerByIndex(account, i).call();
			userTokenIds.push(tokenId);
		}
		this.setState({ userTokenIds })
	}

	async handlePirateButtonPressed() {
		try {
    	await game.methods.mintPirate().send({from:this.state.account});
		} catch(error) {
			console.error(error.message);
			// TODO: Fix this...
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
				<h1>
					Pirates ({this.state.numberOfPiratesOwned}) 
					<MintPirateButton
						 onButtonPress={this.handlePirateButtonPressed} />
				</h1>

				<PiratesList pirates={this.state.userTokenIds} />
				
				{ this.state.successMessage != null && <p className="success-message">Success: { this.state.successMessage }</p> }
				{ this.state.errorMessage != null && <p className="error-message">Error: { this.state.errorMessage }</p> }
			</div>
		);
	}
}