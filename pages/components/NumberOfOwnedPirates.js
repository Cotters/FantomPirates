import React from 'react';

const NumberOfOwnedPirates = (props) => {
  return (
    <div>
    	{ props.numberOfPirates != null && <p>Pirates owned: { props.numberOfPirates }</p> }
    </div>
  )
}

export default NumberOfOwnedPirates;