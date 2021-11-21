import React, { Component } from 'react';

import web3 from '../blockchain/web3';
import kingsContract from '../blockchain/kings';

import HallOfKingsTable from './components/HallOfKingsTable';
import OverthrowKingSection from './components/OverthrowKingSection';

import './css/HallOfKings.css';

const King = (name, walletAddress, pricePaid, coronationDate) => {
	return { name, walletAddress, pricePaid, coronationDate };
};

export default class HallOfKings extends Component {
	
	state = {
		account: web3.currentProvider.selectedAddress,
		kings: [],
		initialThronePrice: 0,
		thronePrice: 0,
		currentKingName: '',
		walletName: '',
		inputtedName: '',
		inputtedPrice: 0,
		inputtedStartPrice: 0,
		successMessage: null,
		errorMessage: null,
	}

	constructor(props) {
		super(props);
		this.getThronePrice = this.getThronePrice.bind(this);
		this.populateKings = this.populateKings.bind(this);
		this.handleOverthrow = this.handleOverthrow.bind(this);
		this.getCurrentKingName = this.getCurrentKingName.bind(this);
		this.getWalletName = this.getWalletName.bind(this);
		this.convertFromWei = this.convertFromWei.bind(this);
		this.convertToWei = this.convertToWei.bind(this);
		this.isOwner = this.isOwner.bind(this);
	}

	async componentDidMount() {
		// this.subscribeToEvents();
		await this.getCurrentKingName();
		await this.getWalletName();
		await this.getThronePrice();
		await this.populateKings();
	}

	// async subscribeToEvents() {}

	async getThronePrice() {
		try {
			let initialThronePrice = await this.convertFromWei(await kingsContract.methods.startPriceToBeKing().call());
			let thronePrice = await this.convertFromWei(await kingsContract.methods.currentPriceToBeKing().call());
			this.setState({initialThronePrice, thronePrice, inputtedPrice: thronePrice})
		} catch(error) {
			console.error(error);
		}
	}

	async getCurrentKingName() {
		try {
			let currentKingName = await kingsContract.methods.getCurrentKingName().call();
			this.setState({currentKingName});
		} catch(error) {
			console.error(error);
		}
	}

	async getWalletName() {
		try {
			let walletName = await kingsContract.methods.getNameForAddress().call({from: this.state.account});
			this.setState({walletName, inputtedName: walletName});
		} catch(error) {
			console.error(error);
		}
	}

	async populateKings() {
		try {
			let allKings = await kingsContract.methods.getAllKings().call();
      let kings = [];
      for(var i = 1; i < allKings.length; i++) {
        let kingObject = allKings[i];
        var walletAddress = kingObject[0];
        let name = kingObject[1];
        let coronationDate = new Date(kingObject[2] * 1000);
        let pricePaid = parseFloat(await this.convertFromWei(kingObject[3])).toPrecision(4);
        kings.push(King(name, walletAddress, pricePaid, coronationDate.toLocaleString()));
      }
      this.setState({kings})
		} catch(error) {
			console.error(error);
		}
	}

	async convertFromWei(amount) {
		if (amount === 0 || amount === '')
			return 0;
    return web3.utils.fromWei(amount.toString());
  }

  async convertToWei(amount) {
  	if (amount === 0 || amount === '') 
			return 0;
    return web3.utils.toWei(amount.toString());
  }

  handleNameInput = event => {
    this.setState({ inputtedName: event.target.value });
  };

  handlePriceInput = async (event) => {
  	let inputtedPrice = await this.convertToWei(event.target.value);
    this.setState({ inputtedPrice });
  };

	async handleOverthrow(e) {
		e.preventDefault();
		try {
			await kingsContract.methods.becomeKing(this.state.inputtedName).send({ from: this.state.account, value: this.state.inputtedPrice });
		} catch(error) {
			console.error(error);
		}
	}

	handleChangeStartPriceInput = async (event) => {
  	let inputtedStartPrice = await this.convertToWei(event.target.value);
    this.setState({ inputtedStartPrice });
  };

	async changeInitialPrice(e) {
		e.preventDefault();
		try {
			let newStartPrice = await this.convertToWei(this.state.inputtedStartPrice);
			await kingsContract.methods.changeStartPrice(newStartPrice).send({ from: this.state.account });
		} catch(error) {
			console.error(error);
		}
	}

	isOwner = async () => await kingsContract.methods.isSenderOwner().call();

	render() {
		return (
			<div className="page-content" id="hall-of-pirates">
				<h1>Hall of Pirate Kings! <small>Enjoy your stay 🍺</small></h1>

				<p>Do you have what it takes to be a Fantom Pirate King? Pay the current price of the throne to become the new King! The previous - now overthrown - King will be compensated by the price you paid.</p>
				<p>Beware of the curse: After 14 days of being King, you will be struck down and the throne will be empty - ready to be claimed at the inital price of {this.state.initialThronePrice} FTM.</p>

				<p>Do you have what it takes to be a Fantom Pirate King? Pay the current price of the throne to become the new King! The previous - now overthrown - King will be compensated by the price you paid.</p>
				<p>Beware of the curse: After 14 days of being King, you will be struck down and the throne will be empty - ready to be claimed at the inital price of {this.state.initialThronePrice} FTM.</p>
				<p>Any King will be added to the...</p>

				<HallOfKingsTable kings={this.state.kings} />

				<OverthrowKingSection
					thronePrice={this.state.thronePrice}
					currentKingName={this.state.currentKingName}
					walletName={this.state.walletName}
					handleNameInput={this.handleNameInput}
					handlePriceInput={this.handlePriceInput}
					handleOverthrow={this.handleOverthrow} />

				<div hidden={true}>
					<input type="number" placeholder="Price..." onChange={this.handleChangeStartPriceInput} />
					<button className="btn" onClick={this.changeInitialPrice}>Change initial King Price (in FTM)</button>
				</div>
				<hr />
				<div className="disclaimer-section">
					<h1>Disclaimer</h1>
					<p>This project was built to develop my skills and intended for fun - not as a means to make money.</p>
					<p>Please do not gamble more than you have. If you are in a jurisdiction that does not allow this type of gameplay, please do not participate.</p>
					<p>There is no guarantee that this website will always remain open, or that the contract will work as indended - so please do not spend more than you are willing to lose.</p>
					<p>The price "for the throne" should remain cheap, but in the event there is ever a sharp increase in the price of Fantom, then the owner is allowed to change the price.</p>
					<p>I have no intention of making money off of this project, but, as the owner, I am permitted to withdraw all funds from the contract - this is a procaution to avoid funds being stuck.</p>
					<p>In the event that this project wants to continue beyond my interest, the owner of the project can change.</p>
				</div>
			</div>
			)
	}
}