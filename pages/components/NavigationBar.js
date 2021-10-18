import React from 'react';
import Head from 'next/head';

export default class NavigationBar extends React.Component {
	
	render() {
		return (
			<div class="navigation-bar">
				<ul>
					<li><a href="/">About</a></li>
					<li><a href="/bay">The Pirate Bay</a></li>
					<li><a href="/profile">Profile</a></li>
				</ul>
			</div>
		);
	}
}
