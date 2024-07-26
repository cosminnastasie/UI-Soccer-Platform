import React from 'react'
import { Button, Tab, Tabs, Card, Elevation } from "@blueprintjs/core";
import { URLS } from '../requests/constants';
import { formatDate, setToday, stringToDate, stringToDate2 } from '../requests/helpers'
import { getData, postData } from '../requests/requests';
import './Games.css'
import UIDateSelect from '../components/UIDateSelect'
import withParams from'./withParams'
import TabGameInfo from './../components/TabGameInfo'
import TabGameTeam from './../components/TabGameTeam'
class GamesDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			gameInfo: false,
		}

	}

	componentDidMount() {	

		const { gameId } = this.props?.params;

		// console.log('Game ID:....................', gameId);
		postData(URLS.games, { id: gameId, action: 'get-game-by-id' }).then((result) => {
			// console.log('Result games today...', result);

			let gameInfo = {}
			if(result?.results){
				gameInfo = result?.results?.[0];
			}
			this.setState({gameInfo}, ()=>{
				console.log('#####################GAME INFOOOO', gameInfo);
			});
		})
		
	}

	saveGame = () => {
		console.log('Save game', this.state)
	}


	render() {
		// console.log('Game Detail State', this.state.gameInfo);
		// console.log('Game Detail PROPS', this.props);

		return (
			<div className="overview-layout">
				<div className="header-row">
					<h1>Game</h1>
					<div className="right-box"></div>
				</div>
				<div className="content">
					<Tabs id="TabsExample" onChange={this.handleTabChange} defaultSelectedTabId="gi" vertical={true}>
						<Tab id="gi" title="Game Info" panel={this.state.gameInfo? <TabGameInfo gameInfo={this.state.gameInfo} onChange={(gameInfo)=>{this.setState({gameInfo})}} />: <div>Loading ...</div>} />
						<Tab id="t" title="Team" onChange={this.handleTabChange}  panel={<TabGameTeam gameId={this.props?.params?.gameId} />} panelClassName="ember-panel" />
						<Tab id="pi" title="Players Info" onChange={this.handleTabChange}  panel={<div>Players Info</div>} panelClassName="ember-panel" />
					</Tabs>
				</div>
			</div>
		);
	}
}


export default withParams(GamesDetail);
