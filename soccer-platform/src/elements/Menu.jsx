import React from 'react';
import { Link } from "react-router-dom";
import { getData } from './../requests/requests';
import { URLS } from './../requests/constants';
import UISelect from '../components/UISelect';



class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
			selectedTeam: ''
		};
	}


	componentDidMount() {
		getData(URLS.teams).then(result => {

			this.setState({ teams: result, selectedTeam: result?.[0]?.Prefix });
		});
	}

	handleInputChange(item) { }

	render() {
		const storedCode = localStorage.getItem('key-write');
		console.log(storedCode)
		return (
			<nav className="menu-sidebar">
				<ul>
					{storedCode === 'copadelmondo' && (
						<>
							<li><Link to="/players">Players</Link></li>
						</>
					)}
					<li><Link to="/">Calendar</Link></li>
					<li><Link to="/training">Training</Link></li>
					<li><Link to="/games">Games</Link></li>
					<li><Link to="/TrainingFormation">TrainingFormation</Link></li>
					
				</ul>
			</nav>
		);
	}

}



export default Menu;
