import React from 'react';

const MintPirateButton = (props) => {

	function handleMintPirate(e) {
		e.preventDefault();
		props.onButtonPress();
	}

  return <button className="btn" type="submit" onClick={handleMintPirate}>Mint a pirate</button>
}

export default MintPirateButton;