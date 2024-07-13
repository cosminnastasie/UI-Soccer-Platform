import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { getData, postData } from './../requests/requests';
import { URLS } from './../requests/constants'
import { Checkbox } from '@blueprintjs/core';

class Players extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
		this.playerInfoChange = this.playerInfoChange.bind(this);

	}
	componentDidMount() {

		getData(URLS.players).then(result => {
			this.setState({
				players: result
			})
		});
	}

	playerInfoChange = (params) => {
		console.log(params);
		let selectedPlayer = this.state.players.filter(p => p.IdPlayers === params.data.IdPlayers);
		let selectedPlayerId = selectedPlayer[0].IdPlayers;
		let field = params.colDef.field;
		let newValue = params.data[field];
		if(field === 'IsEnable'){
			newValue = selectedPlayer[0].IsEnable === 1? 0: 1;
		}

		postData('/update-player', { playerId: selectedPlayerId, field, newValue }).then((result) => {
			console.log('Result...', result);

			
		})


		let players = this.state.players.map(p=>{
			if(p.IdPlayers === params.data.IdPlayers){
				p.IsEnable  = p.IsEnable === 1? 0: 1
			}
			return p;
		});
		this.setState({players})
		// let selectedPlayer = this.state.players.filter(p => p.IdPlayers === params.data.IdPlayers);
	
		// selectedPlayer.
		// console.log({selectedPlayerId, selectedPlayer, isEnabled})
		console.log(this.state)
	}



	gridOptions = {
		getRowStyle: (params) => {
			if (parseInt(params.data.YearOfBirth) === 2005) {
				return { color: 'darkcyan' };
			} else if (parseInt(params.data.YearOfBirth) === 2006) {
				return { color: 'deepskyblue' };
			} else if (parseInt(params.data.YearOfBirth) > 2006) {
				return { color: 'mediumaquamarine' };

			} else {
				return { color: 'floralwhite' };
			}
		}
	};

	render() {
		var _that = this;
		var colDefs = [
			{ headerName: "Nr. ", valueGetter: "node.rowIndex + 1", width: 50 },
			{ field: 'Name' },
			{ field: 'Position1' },
			{ field: 'YearOfBirth' },
			{ field: 'Number' },
			{ 
				field: 'IsEnable',  
				cellRenderer: function (params) {
					var val = params.value;
					console.log({val, params})
					return <Checkbox
						checked={val}
						onChange={()=>_that.playerInfoChange(params)}
						style={{ margin: 0 }}
					/>
				}
			},
		]
		return (
			<div className="overview-layout">
				<h1>Players</h1>
				{
					this.state?.players &&
					<div className="grid-height">
						<AgGridReact rowData={this.state?.players} columnDefs={colDefs} gridOptions={this.gridOptions} />
					</div>
				}
			</div>
		);
	}
}


export default Players;
