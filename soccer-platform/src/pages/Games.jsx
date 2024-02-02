import React from 'react'
import { Button, Tab, Tabs, Card, Elevation } from "@blueprintjs/core";
import GameInfo from './../components/GameInfo'
import { URLS } from './../requests/constants';
import { formatDate, setToday, stringToDate } from './../requests/helpers'
import { getData, postData } from './../requests/requests';
import './Games.css'
class Games extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			gameInfo: false,
			isEditGameOpen: false,

		}
	}

	componentDidMount() {
		
		var date = new Date()
		this.setState({ gameDate: date });
		getData(URLS.games).then(games => {
			console.log('Games', games);
			this.setState({ games }, function(){
				console.log('#############', this.state.games);
				this.findNextGame();
			})
		})

	}

	findNextGame() {
		const now = new Date();
		let closest = null;
		let nextGameId = null;

		this.state?.games.forEach((game) => {
			const gameDateTime = new Date(`${game.Date}T${game.Hour}`);
			if (gameDateTime > now && (!closest || gameDateTime < closest)) {
				closest = gameDateTime;
				nextGameId = game.Id;
			}
		});

		this.setState({ nextGameId });
	}

	renderGameCard(game) {
		const isNextGame = game.Id === this.state.nextGameId;
		const cardClass = isNextGame ? "game-card highlight-card": "game-card";
			console.log('Game', game);
		return (
			<div style={{ padding: ' 0 20px' }}>
				<Card key={game.Id} elevation={Elevation.TWO} className={cardClass}>
					<h5>{game.Competitor}</h5>
					<p>Date: {game.Date}</p>
					{/* <p>Hour: {game.Hour}</p>
					<p>Home/Away: {game.HomeAway}</p>
					<p>Type: {game.Type}</p>
					<p>Location: {game.Location}</p> */}
				</Card>
			</div>
		);
	}

	getGame = () => {
		console.log('Get game', this.state);
		postData(URLS.trainings, { date: formatDate(this.state.trainingDate) }).then((result) => {
			console.log('Result games today...', result);
		})

	}

	saveGame = () => {
		console.log('Save game', this.state)
	}



	render() {
		console.log(this.state);
		// console.log(this.getPlayersPosition());
		let playersPositions = {}//this.state?.allPlayers? this.getPlayersPosition(): {};
		return (
			<div className="overview-layout">
				<div className="header-row">
					<h1>Games</h1>
					<div className="right-box">
						<input type="date" className="sp-btn" value={this.state?.gameDate?.toISOString().substring(0, 10)} id="gameDate" name="trainingDate" onChange={(event) => { this.setState({ gameDate: new Date(event.target.value) }, () => { this.getGame() }) }} />
						<Button onClick={() => {
							this.saveGame()
						}} >Add Game</Button>
					</div>
				</div>
				<div className="content">
					{this.state.gameInfo === false && !this.state.isEditGameOpen
						? <>
							<div style={{width: '50%'}}>
							<div>
								{this.state.games ? this.state.games.map(game => this.renderGameCard(game)): ''}
							</div>
							{/* <div className="no-data" onClick={() => { this.setState({ isEditGameOpen: true }) }}>
								<div className='no-data-text'>No game set at this date</div>
								<div className='plus-icon'> + </div>
							</div> */}
						</div>
						<div className='right-content'></div>
						</>
						: ''
					}

					{
						this.state.isEditGameOpen
							? <GameInfo />

							: ''
					}
				</div>
			</div>
		);
	}
}




export default Games;
