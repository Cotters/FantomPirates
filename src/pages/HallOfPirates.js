import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './css/HallOfPirates.css';

export default class HallOfPirates extends Component {
	render() {
		return (
			<div className="page-content" id="hall-of-pirates">
				<h1>Fantom Hall of Pirates! <small>Enjoy your stay 🍺</small></h1>
				
				<p>Do you have what it takes to be a Fantom Pirate King? Pay the current price of the throne to become the new King! The previous - now overthrown - King will be compensated by the price you paid.</p>
				<p>Beware of the curse: After 14 days of being King, you will be struck down and the throne will be empty - ready to be claimed at the inital price of <span className="initial-king-price">0.01</span> FTM.</p>
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

				<p>Current price to become a Fantom King: <span className="king-price">...</span> FTM.</p>
				<p>Current Fantom King: <span className="king-name">...</span></p>
				<input type="text" className="input-fantom-king-name" placeholder="Your Fantom King name..." />

				<button className="btn-buy-throne">Overthrow!</button>
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
					<p>The price "for the throne" should remain cheap, but in the event there is ever a sharp increase in the price of Fantom, then the owner is allowed to change the price.</p>
					<p>I have no intention of making money off of this project, but, as the owner, I am permitted to withdraw all funds from the contract - this is a procaution to avoid funds being stuck.</p>
					<p>In the event that this project wants to continue beyond my interest, the owner of the project can change.</p>
				</div>
			</div>
		);
	}
}
