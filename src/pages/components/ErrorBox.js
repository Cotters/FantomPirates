import React from 'react';

const ErrorBox = ({errorMessage, onCloseTapped}) => {
  return (
    <div>
    	{ errorMessage != null && 
				<p className="error-message">
					Error: { errorMessage } 
					<button className="btn-close" onClick={onCloseTapped}>[Close]</button>
				</p> }
    </div>
  )
}

export default ErrorBox;