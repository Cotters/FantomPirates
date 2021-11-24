import React, { Component } from 'react';
import MintPirateButton from './components/MintPirateButton';
import Dropdown from './components/Dropdown';
import PirateCard from './components/PirateCard';
import SuccessBox from './components/SuccessBox';
import ErrorBox from './components/ErrorBox';

import web3 from '../blockchain/web3';
import game from '../blockchain/game';

const Pirate = (id, level, xp, nextLevelXp, gold, questTimeout) => {
	return { id, level, xp, nextLevelXp, gold, questTimeout };
};

export default class Profile extends Component {

	state = {
		account: web3.currentProvider.selectedAddress,
		numberOfPiratesOwned: 0,
		pirates: [Pirate],
		selectedPirate: null,
		successMessage: null,
		errorMessage: null,
		didUpdatePirate: null,
	}

	constructor(props) {
		super(props);
		this.refreshPage = this.refreshPage.bind(this);
		this.handleMintPiratePressed = this.handleMintPiratePressed.bind(this);
		this.handleDoQuestPressed = this.handleDoQuestPressed.bind(this);
		this.handleLevelUpPressed = this.handleLevelUpPressed.bind(this);
		this.subscribeToEvents = this.subscribeToEvents.bind(this);
		this.loadNumberOfPirates = this.loadNumberOfPirates.bind(this);
		this.onItemSelected = this.onItemSelected.bind(this);
		this.hideError = this.hideError.bind(this);
	}

	async componentDidMount() {
		this.subscribeToEvents();
		await this.loadNumberOfPirates();
	}

	async refreshPage() {
		window.location.reload();
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
			const numberOfPiratesOwned = parseInt(await game.methods.balanceOf(account).call());
			this.setState({ numberOfPiratesOwned })
			await this.getPirateInformation(numberOfPiratesOwned)
		} catch (error) {
			console.error(error);
		}
	}
	
	async getPirateInformation(numberOfPirates) {
		let pirates = [];
		const account = web3.currentProvider.selectedAddress;
		for (let i = 0; i<numberOfPirates; i++) {
			let pirateId = parseInt(await game.methods.tokenOfOwnerByIndex(account, i).call());
			let level = parseInt(await game.methods.level(pirateId).call());
			let xp = await parseInt(await game.methods.xp(pirateId).call());
			let nextLevelXp = parseInt(await game.methods.requiredXpForLevel(level+1).call());
			let gold = parseInt(await game.methods.gold(pirateId).call());
			let questTimeout = parseFloat(await game.methods.quests_log(pirateId).call());
			pirates.push(Pirate(pirateId, level, xp, nextLevelXp, gold, questTimeout*1000));
		}
		let selectedPirate = pirates[0]
		if (this.state.selectedPirate !== null) {
			selectedPirate = this.state.selectedPirate;
		}
		this.setState({ pirates, selectedPirate });
	}

	async handleMintPiratePressed() {
		try {
    	await game.methods.mintPirate().send({from: this.state.account});
    	this.loadNumberOfPirates();
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

  async handleDoQuestPressed(pirateId) {
  	try {
  		await game.methods.doQuest(pirateId).send({from: this.state.account});
  		// TODO: Refresh
  	} catch(error) {
  		// TODO: Fix this... :S
  		const errorObject = JSON.parse(error.message.substring(49, error.message.length-1).trim());
  		const errorDataObject = errorObject.value.data.data;
  		const key = Object.keys(errorDataObject)[0];
			const errorMessage = errorDataObject[key].reason;
			this.setState({ errorMessage });
  	}
  }

  async handleLevelUpPressed(pirateId) {
  	try {
  		await game.methods.levelUp(pirateId).send({from: this.state.account});
  		this.getPirateInformation()
  	} catch(error) {
  		// TODO: And fix this...
  		// console.log(error.message.substring(49, error.message.length-1).trim());
  		const errorObject = JSON.parse(error.message.substring(49, error.message.length-1).trim());
  		console.log(errorObject);
  		const errorDataObject = errorObject.value.data.data;
  		console.log(errorDataObject);
  		const key = Object.keys(errorDataObject)[0];
			const errorMessage = errorDataObject[key].reason;
			this.setState({ errorMessage });
  	}
  }

  async onItemSelected(index) {
  	if (index == null) return;
  	this.setState({selectedPirate: this.state.pirates[index]})
  }

  async hideError() {
  	this.setState({ errorMessage: null })
  }

	render() {
		return (
			<div className="page-content">
				<h1>
					Pirates ({this.state.numberOfPiratesOwned || 0}) 
					<MintPirateButton
						 onButtonPress={this.handleMintPiratePressed} />
				</h1>

				<SuccessBox
					successMessage={this.state.successMessage}
					onCloseTapped={this.hideError} />
				
				<ErrorBox
					errorMessage={this.state.errorMessage}
					onCloseTapped={this.hideError} />

				{this.state.numberOfPiratesOwned > 0 && <Dropdown
					numberOfItems={this.state.numberOfPiratesOwned}
					onItemSelected={this.onItemSelected} />}

				{this.state.selectedPirate && <PirateCard
					didUpdatePirate={this.state.didUpdatePirate}
					pirate={this.state.selectedPirate} 
					onQuestPressed={this.handleDoQuestPressed} 
					onLevelUpPressed={this.handleLevelUpPressed} />}
				
			</div>
		);
	}
}