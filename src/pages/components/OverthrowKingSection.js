import React from 'react';

const OverthrowKingSection = ({thronePrice, currentKingName, walletName, handleNameInput, handlePriceInput, handleOverthrow}) => {

	let isThereAKing = currentKingName !== null && currentKingName !== '';
	let isKing = (currentKingName === walletName && isThereAKing);
	let hasWalletName = (walletName !== null && walletName !== '');

	return (
		<div>
    {isKing === false ? (<div>
    	<h2>⚔️ Overthrow t'e King! ⚔️</h2>
    	<p>Current price to become a Pirate King: <span className="king-price">{parseFloat(thronePrice).toPrecision(3)}</span> FTM.</p>
			{isThereAKing && <p>Current Pirate King: {currentKingName}</p>}
			{!hasWalletName && <input type="text" onChange={handleNameInput} placeholder="Name..." />}
			{hasWalletName && <input hidden={!hasWalletName} disabled={true} type="text" value={walletName} />}
			<input type="number" onChange={handlePriceInput} min={parseFloat(thronePrice)} placeholder="Price in FTM..." />
			<button className="btn-buy-throne" onClick={handleOverthrow}>Overthrow!</button>

			<p hidden="false" className="transaction-pending-banner">You're request for the throne has been received!</p>
			<p hidden="true" className="success-banner">You are now the new Pirate King!</p>
    </div>) : (<div>
    	<p>Current price to become a Pirate King: <span className="king-price">{parseFloat(thronePrice).toPrecision(3)}</span> FTM.</p>
    	<p>{walletName}, <i>you are the current Fantom King!</i></p>
    	</div>
    )
  }
  	
    </div>
  )
}

export default OverthrowKingSection;