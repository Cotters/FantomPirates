import React from 'react';

import './css/DonationButton.css';

const DonationButton = ({buttonText, message, onClick}) => {
  return (
    <div>
    	<p><button className="btn" onClick={onClick}>{buttonText}</button><br />{message}</p>
    </div>
  )
}

export default DonationButton;