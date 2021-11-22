import React, { useState } from 'react';

import './css/SelectPirateDropdown.css';

const Dropdown = ({numberOfItems, onItemSelected}) => {
  
  const [isOpened, setIsOpened] = useState(false);

  function toggleDropdown() {
    setIsOpened(wasOpened => !wasOpened);
  }

  function handleSelection(e, index) {
    toggleDropdown();
    onItemSelected(index);
  }

  return (
    <div  className="dropdown">
      <div className="btn-dropdown" onClick={toggleDropdown}>Select a Pirate...</div>
        { isOpened &&
          <div className="dropdown-list">
            <hr />
            {
              [...Array(numberOfItems)].map((x, y) => y).map((index) => {
                return <button key={index} onClick={(e) => handleSelection(e, index)}>Pirate #{index+1}</button>
              })
            }
          </div>
        }
     </div>
  );
}

export default Dropdown;
