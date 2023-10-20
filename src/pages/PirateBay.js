import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Dropdown from './components/Dropdown';
import ErrorBox from './components/ErrorBox';
import DonationButton from './components/DonationButton';

import web3 from '../blockchain/web3';
import game from '../blockchain/game';

import './css/PirateBay.css';

export default class PirateBay extends Component {

	state = {
		pirateIds: [],
		piratesGold: 0,
		shipPrice: 0,
		selectedPirateId: null,
		errorMessage: null,
	}

	constructor() {
		super();
		this.loadNumberOfPirates = this.loadNumberOfPirates.bind(this);
		this.getShipPrice = this.getShipPrice.bind(this);
		this.onPirateSelected = this.onPirateSelected.bind(this);
		this.buyShip = this.buyShip.bind(this);
		this.hideError = this.hideError.bind(this);
	}

	async componentDidMount() {
		await this.loadNumberOfPirates();
		await this.getShipPrice();
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
      if (pirateIds.length > 0) {
        this.onPirateSelected(0);
      }
		} catch (error) {
			console.error(error);
		}
	}

	async onPirateSelected(index) {
		if (index == null) return
    const pirateId = this.state.pirateIds[index];
		this.setState({
      selectedPirateId: pirateId,
      piratesGold: parseInt(await game.methods.gold(pirateId).call()),
    });
	}

	async getShipPrice() {
		try {
			let shipPrice = (await game.methods.gold_for_ship().call());
			this.setState({ shipPrice });
		} catch(error) {
			console.log(error);
		}
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

	async buyBeer() {
		try {
			await game.methods.donate(1).call({value: 1**18});
		} catch(error) {
			console.error(error);
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
						<p>Welcome Pirate #{this.state.selectedPirateId}. You have 💰{this.state.piratesGold} gold.</p>
						{/* TODO: Disable if Pirate.level < 2 */}
						<p><button className="btn" onClick={this.buyShip}>Buy a ship!</button> (💰{this.state.shipPrice} gold)</p>
						<p>More coming soon...</p>

					</div>
				}

				<hr />
				<DonationButton
					buttonText={"Buy a beer!"}
					message={"(This is a donation (of 1 FTM) to the dev - but be warned, your pirate may get drunk!)"}
					onClick={this.buyBeer} />
			</div>
		);
	}
}
