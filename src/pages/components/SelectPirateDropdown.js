import React, { useState } from 'react';

import './css/SelectPirateDropdown.css'

const SelectPirateDropdown = ({pirateIds, onPirateSelected}) => {
  
  const [isOpened, setIsOpened] = useState(false);

  function toggleDropdown() {
    setIsOpened(wasOpened => !wasOpened);
  }

  function handleSelection(e, pirateId) {
    toggleDropdown();
    onPirateSelected(pirateId);
  }

  return (
    <div  className="dropdown">
      <div className="btn-dropdown" onClick={toggleDropdown}>Select a Pirate...</div>
        { isOpened &&
          <div className="dropdown-list">
            <hr />
            {
              pirateIds.map((id) => {
                return <button onClick={(e) => handleSelection(e, id)}>Pirate #{id}</button>
              })
            }
          </div>
        }
     </div>
  );
}

export default SelectPirateDropdown;
