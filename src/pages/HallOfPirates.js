import React, { Component } from 'react';

import web3 from '../blockchain/web3';
import kings from '../blockchain/kings';

import './css/HallOfPirates.css';

export default class HallOfPirates extends Component {
	
	state = {
		account: web3.currentProvider.selectedAddress,
		initialThronePrice: 0,
		thronePrice: 0,
		inputtedName: '',
		inputtedPrice: 0,
		successMessage: null,
		errorMessage: null,
	}

	constructor(props) {
		super(props);
		this.getThronePrice = this.getThronePrice.bind(this);
		this.populateKings = this.populateKings.bind(this);
		this.handleOverthrow = this.handleOverthrow.bind(this);
		this.convertFromWei = this.convertFromWei.bind(this);
		this.convertToWei = this.convertToWei.bind(this);
	}

	async componentDidMount() {
		// this.subscribeToEvents();
		await this.getThronePrice();
		await this.populateKings();
	}

	// async subscribeToEvents() {}

	async getThronePrice() {
		try {
			let initialThronePrice = await this.convertFromWei(await kings.methods.startPriceToBeKing().call());
			let thronePrice = await this.convertFromWei(await kings.methods.currentPriceToBeKing().call());
			this.setState({initialThronePrice, thronePrice})
		} catch(error) {
			console.error(error);
		}
	}

	async populateKings() {
		try {
			let allKings = await kings.methods.getAllKings().call();
      // $('#thetable tr').not(':first').remove();
      for(var i = 1; i < allKings.length; i++) {
        let king = allKings[i];
        var wallet = '';
        if (window.matchMedia("(min-width: 760px)").matches) {
          wallet = '<br/>(' + king[0].small() + ')';
        };
        let name = king[1];
        let coronationDate = new Date(king[2] * 1000);
        let pricePaid = parseFloat(this.convertFromWei(king[3])).toPrecision(4);
        let html = '<tr><td>' + name + wallet + '</td><td>' + pricePaid + ' FTM</td><td>' + coronationDate.toLocaleString() + '</td></tr>';
        console.log(html);
        // $('#thetable tr').first().after(html);
      }
		} catch(error) {
			console.error(error);
		}
	}

	async convertFromWei(amount) {
    return web3.utils.fromWei(amount.toString());
  }

  async convertToWei(amount) {
    return web3.utils.toWei(amount.toString());
  }

  handleNameInput = event => {
    this.setState({ inputtedName: event.target.value });
  };

  handlePriceInput = event => {
    this.setState({ inputtedPrice: event.target.value });
  };
  

	async handleOverthrow(e) {
		e.preventDefault();
		try {
			alert("{ from: " + this.state.account + ", value: " + this.state.inputtedPrice + " }");
			await kings.methods.becomeKing(this.state.inputtedName).send({ from: this.state.account, value: (this.state.inputtedPrice) });
		} catch(error) {
			console.error(error);
		}
	}

	render() {
		return (
			<div className="page-content" id="hall-of-pirates">
				<h1>Fantom Hall of Pirates! <small>Enjoy your stay 🍺</small></h1>

				<p>Do you have what it takes to be a Fantom Pirate King? Pay the current price of the throne to become the new King! The previous - now overthrown - King will be compensated by the price you paid.</p>
				<p>Beware of the curse: After 14 days of being King, you will be struck down and the throne will be empty - ready to be claimed at the inital price of {this.state.initialThronePrice} FTM.</p>
				<p>Any King will be added to the...</p>
				<h1>Wall of Reign!</h1>
				<table id="thetable">
					<tr>
						<th>Name</th>
						<th>Price Paid</th>
						<th>Date</th>
					</tr>
				</table>

				<h1>⚔️ Overthrow t'e King! ⚔️</h1>

				<p>Current price to become a Fantom King: <span className="king-price">{this.state.thronePrice}</span> FTM.</p>
				<p>Current Fantom King: <span className="king-name">...</span></p>
				<input type="text" onChange={this.handleNameInput} placeholder="Your Fantom King name..." />
				<input type="number" onChange={this.handlePriceInput} placeholder="Price in FTM..." />
				<button className="btn-buy-throne" onClick={this.handleOverthrow}>Overthrow!</button>
				<p hidden="true" className="wallet-name-container">(as <span className="wallet-name">...</span>)</p>

				<p hidden="false" className="transaction-pending-banner">You're request for the throne has been received!</p>
				<p hidden="true" className="success-banner">You are now the new Fantom King!</p>

				<div className="only-owner" hidden="true">
					<input className="new-initial-king-price-input" type="number" placeholder="e.g. 12 will set it to 12 FTM" />
					<button className="btn-change-initial-king-price">Change initial King Price (in FTM)</button>
				</div>

				<div className="disclaimer-section">
					<h1>Disclaimer</h1>
					<p>This project was built to develop my skills and intended for fun - not as a means to make money.</p>
					<p>Please do not gamble more than you have. If you are in a jurisdiction that does not allow this type of gameplay, please do not participate.</p>
					<p>There is no guarantee that this website will always remain open, or that the contract will work as indended - so please do not spend more than you are willing to lose.</p>
					<p>The price "for the throne" should remain cheap, but in the event there is ever a sharp increase in the price of Fantom,  the owner is allowed to change the price.</p>
					<p>I have no intention of making money off of this project, but, as the owner, I am permitted to withdraw all funds from the contract - this is a procaution to avoid funds being stuck.</p>
					<p>In the event that this project wants to continue beyond my interest, the owner of the project can change.</p>
				</div>
			</div>
		);
	}
}
