import React from 'react';

const OverthrowKingSection = ({thronePrice, currentKingName, walletName, handleNameInput, handlePriceInput, handleOverthrow}) => {

	return (
    <div>
    	<p>Current price to become a Pirate King: <span className="king-price">{parseFloat(thronePrice).toPrecision(3)}</span> FTM.</p>
			{currentKingName !== '' && <p>Current Pirate King: {currentKingName}</p>}
			<input disabled={walletName !== ''} type="text" onChange={handleNameInput} placeholder="Name..." value={walletName} />
			<input type="number" onChange={handlePriceInput} min={parseFloat(thronePrice)} placeholder="Price in FTM..." />
			<button className="btn-buy-throne" onClick={handleOverthrow}>Overthrow!</button>

			<p hidden="false" className="transaction-pending-banner">You're request for the throne has been received!</p>
			<p hidden="true" className="success-banner">You are now the new Pirate King!</p>
    </div>
  )
}

export default OverthrowKingSection;