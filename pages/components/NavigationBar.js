import React from 'react';

const NavigationBar = (props) => {
	
	return (
		<div className="navigation-bar">
			<ul>
				<li><a href="/">About</a></li>
				<li><a href="/bay">The Pirate Bay</a></li>
				<li><a href="/profile">Profile</a></li>
			</ul>
		</div>
	);
}

export default NavigationBar;