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
  const piratePromises = [];
  const account = web3.currentProvider.selectedAddress;
  for (let i = 0; i < numberOfPirates; i++) {
    let pirateId = parseInt(await game.methods.tokenOfOwnerByIndex(account, i).call());
    piratePromises.push(this.getInformationOfPirateWithId(pirateId));
  }
  const pirates = await Promise.all(piratePromises);
  const selectedPirate = this.state.selectedPirate || pirates[0];
  this.setState({ pirates, selectedPirate });
}

  async getInformationOfPirateWithId(pirateId) {
    let level = parseInt(await game.methods.level(pirateId).call());
    let xp = parseInt(await game.methods.xp(pirateId).call());
    let nextLevelXp = parseInt(await game.methods.requiredXpForLevel(level + 1).call());
    let gold = parseInt(await game.methods.gold(pirateId).call());
    let questTimeout = parseFloat(await game.methods.quests_log(pirateId).call());
    return Pirate(pirateId, level, xp, nextLevelXp, gold, questTimeout * 1000);
  }

	async handleMintPiratePressed() {
		try {
    	await game.methods.mintPirate().send({from: this.state.account});
    	this.loadNumberOfPirates();
		} catch(error) {
      const errorMessage = error.message;
      if (errorMessage.includes("User denied transaction")) return;
			this.setState({ errorMessage });
		}
  }

  async handleDoQuestPressed(pirateId) {
    try {
      await game.methods.doQuest(pirateId).send({ from: this.state.account });
      this.loadNumberOfPirates();
      const pirateInfo = await this.getInformationOfPirateWithId(pirateId);
      this.setState({ selectedPirate: pirateInfo });
    } catch (error) {
      const errorMessage = error.message;
      if (errorMessage.includes("User denied transaction")) return;
      this.setState({ errorMessage });
    }
  }

  async handleLevelUpPressed(pirateId) {
  	try {
  		await game.methods.levelUp(pirateId).send({from: this.state.account});
  		const pirateInfo = await this.getInformationOfPirateWithId(pirateId);
      this.setState({ selectedPirate: pirateInfo });
  	} catch(error) {
  		const errorMessage = error.message;
      if (errorMessage.includes("User denied transaction")) return;
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