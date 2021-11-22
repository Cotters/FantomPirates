import React from 'react';

const SuccessBox = ({successMessage, onCloseTapped}) => {
  return (
    <div>
    	{ successMessage != null && 
				<p className="success-message">
					Success: { successMessage } 
					<button className="btn-close" onClick={onCloseTapped}>[Close]</button>
				</p> }
    </div>
  )
}

export default SuccessBox;