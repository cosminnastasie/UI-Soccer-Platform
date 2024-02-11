import React from 'react'
import { Button, Card, Elevation, Icon } from "@blueprintjs/core";
import { URLS, TEAM } from './../requests/constants';
import { getData } from './../requests/requests';
import './Games.css';
import withParams from'./withParams'


class Games extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {
		var date = new Date()
		this.setState({ gameDate: date });
		getData(URLS.games).then(games => {
			games.sort((a, b) => a.Date.localeCompare(b.Date));
			this.setState({ games }, function(){
				this.findNextGame();
			})
		})
	}

	findNextGame() {
		const now = new Date();
		const sortedGames = this.state.games
		  .map(game => {
			const dateTimeString = game.Hour ? `${game.Date}T${game.Hour}` : `${game.Date}`;
			return { ...game, dateTime: new Date(dateTimeString) };
		  })
		  .filter(game => game.dateTime >= now) 
		  .sort((a, b) => a.dateTime - b.dateTime); 
	
		if (sortedGames.length > 0) {
		  this.setState({ nextGameId: sortedGames[0].Id });
		}
	  }

	renderGameCard(game) {
		
		const isNextGame = game.Id === this.state.nextGameId;
		const cardClass = isNextGame ? "game-card highlight-card": "game-card";
		const gameTitle = game.HomeAway === 'Away' ? game.Competitor + ' - ' + TEAM: TEAM + ' - ' + game.Competitor;
		return (
			<div key={'game' + game.Id} style={{ padding: ' 0 20px' }}>
				<Card key={game.Id} elevation={Elevation.TWO} className={cardClass}>
					<div className="flex-justify">
						<h5>{gameTitle}</h5>
						<Icon
							icon="edit"
							iconSize={Icon.SIZE_LARGE}
							onClick={() => this.props.navigate(`/games-detail/${game.Id}`)}
							style={{ cursor: 'pointer' }}
						/>
					</div>
					<div class="sub-description"><div>{game.Result || ''}</div> <div>{game.Location} Date: {game.Date}{game.Hour? ` Hour: ${game.Hour}`: ''} </div></div>
					
					{/* <p>Hour: {game.Hour}</p>
					<p>Home/Away: {game.HomeAway}</p>
					<p>Type: {game.Type}</p>
					<p>Location: {game.Location}</p> */}
				</Card>
			</div>
		);
	}

	render() {
		console.log('State', this.state);

		return (
			<div className="overview-layout">
				<div className="header-row">
					<h1>Games</h1>
					<div className="right-box">
						<Button className="sp-btn" onClick={() => this.props.navigate(`/games-detail/new-game`)}>Add Game</Button>
					</div>
				</div>
				<div className="content">
 					<>
						<div style={{width: '50%'}}>
							<div>
								{this.state.games ? this.state.games.map(game => this.renderGameCard(game)): ''}
							</div>
						</div>
						<div className='right-content'></div>
					</>
				</div>
			</div>
		);
	}
}

export default withParams(Games);

