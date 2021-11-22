import React from 'react';

const HallOfKingsTable = ({kings}) => {
  return (
    <div>
    	<h1>Hall of Kings!</h1>
			<table>
				<tr>
					<th>Name</th>
					<th>Price Paid</th>
					<th>Date</th>
				</tr>
				{kings.map(king => {
					return <tr key={king.coronationDate}>
						<td>{king.name} <br /><small>{king.walletAddress}</small></td>
						<td>{king.pricePaid} FTM</td>
						<td>{king.coronationDate.toLocaleString()}</td>
					</tr>;
				})}
			</table>
    </div>
  )
}

export default HallOfKingsTable;
