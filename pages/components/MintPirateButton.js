import React from 'react';

const MintPirateButton = (props) => {

	function handleMintPirate(e) {
		e.preventDefault();
		props.onButtonPress();
	}

  return <button type="submit" onClick={handleMintPirate}>Mint a pirate</button>
}

export default MintPirateButton;