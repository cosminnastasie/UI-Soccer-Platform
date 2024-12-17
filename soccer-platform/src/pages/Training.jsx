import React from 'react'
import { getData, postData } from './../requests/requests';
import { URLS } from './../requests/constants'
import { Checkbox, Button } from "@blueprintjs/core";
// import DatePickerButton from '../components/DatePicker'
import { formatDate, setToday, stringToDate, isEmptyObject } from './../requests/helpers'
import { handleSaveTraining } from './../requests/actions'
import UIDateSelect from './../components/UIDateSelect'
import UISelect from '../components/UISelect';
import { CSSTransition } from "react-transition-group"; // For the show effect
import {Icon} from "@blueprintjs/core";

import { MenuItem } from "@blueprintjs/core";
import { Select, PopoverPosition } from "@blueprintjs/select";


const PLAYERS_POSITIONS = [
	{ key: '2', value: '2' },
	{ key: '3', value: 3 },
	{ key: '4', value: 4 },
	{ key: '5', value: 5 },
	{ key: '6', value: 6 },
	{ key: '7', value: 7 },
	{ key: '8', value: 8 },
	{ key: '9', value: 9 },
	{ key: '10', value: 10 },
	{ key: '11', value: 11 },
]
const namesArray = [
];

const getStyle = (p) => {
    if (p.Status === 'sick') return { color: 'red' };
    if (p.Status === '!') return { color: 'pink' };
    if (p.YearOfBirth === 2005) return { color: 'lightgrey' };
    if (p.YearOfBirth === 2006) return { color: '#dcff25' };
    if (p.YearOfBirth === 2007) return { color: 'rgb(73 250 17)' };
    if (p.YearOfBirth === 2008) return { color: '#7bdb0b' };
    if (p.YearOfBirth === 2009) return { color: '#4caf50' };
    return {};
};

function getMaxId(objects) {
	const threshold = 1000000;
	let maxId = threshold;
  
	for (const obj of objects) {
	  if (obj.IdPlayers >= threshold && obj.IdPlayers > maxId) {
		maxId = obj.IdPlayers;
	  }
	}
  
	return maxId + 1;
  }

class Training extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			allPlayers: [],
			formation: '4-3-3',
			activePlayerId: null, // Tracks the currently selected player
			popupPosition: { top: 0, left: 0 },
		}

		this.handleRightClick = this.handleRightClick.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}

	componentDidMount() {
		var date = new Date()

		this.setState({ trainingDate: date })
		// getData(URLS.players).then(result => {
		getData(URLS.players).then(result => {
			result = result.filter(r => {
				return (r.TeamToPlay !== 'transferat' && r.TeamToPlay !== 'false')
			})
			result?.map(p => {
				p.isChecked = namesArray.includes(p.Name) ? true : false;
				return p;
			});
			result = result.filter(p => p.IsEnable === 1)
			let allPlayers = result.sort(function (a, b) {
				return parseInt(a.YearOfBirth) - parseInt(b.YearOfBirth);
			})
			this.setState({
				// defaultPlayers is used when no training data is available
				defaultPlayers: allPlayers,
				// allPlayers is used for training data
				allPlayers: allPlayers
			}, () => { this.getTraining() })
		});
	}

	getTraining = () => {
		postData(URLS.trainings, { date: formatDate(this.state.trainingDate) }).then((result) => {
			let trainingData = result?.results[0] || {};
			console.log(trainingData, isEmptyObject(trainingData))
			let allPlayers = !isEmptyObject(trainingData)? (trainingData?.Players? JSON.parse(trainingData?.Players): this.state.defaultPlayers) : this.state.defaultPlayers


			// if(result?.results.length){
			// allPlayers.map(p => {
			// 	p.isChecked = false;
			// 	// console.log(p)
			// 	// console.log(p.status, (p.status in [0, 1]))
			// 	p.status = p.status ? p.status : 1;
			// 	return p;
			// });
			// console.log(trainingData)
			// if (trainingData?.Players) {
			// 	allPlayers = JSON.parse(trainingData?.Players)
			
				// let trainingPlayers = JSON.parse(trainingData?.Players);
				// // console.log('trainingPlayers', trainingPlayers)
				// // console.log('allPlayers', allPlayers)
				// trainingPlayers.filter(td => td.id > 999999).forEach(td=>{
				// 	allPlayers.push({IdPlayers: td.id, Name: td.name, Position1: td.Position1, status: td.status})
				// })
				// allPlayers.map(ap => {
				// 	trainingPlayers.forEach(tp => {
				// 		if (tp.id === ap.IdPlayers ) {
				// 			ap.Position1 = tp.Position1;
				// 			ap.isChecked = tp.isChecked;
				// 			ap.status = tp.status;
				// 		}

				// 	});
				// 	return ap;
				// });
			// }else{
			// 	allPlayers = this.state.allPlayers
			// }
			this.setState({ allPlayers, trainingData, formation: trainingData?.Formation || "4-3-3" })
		});
	}

	// This is using checkbox DEPRECATED
	handleEnabledChange_v1 = (event, id) => {
		let players = [...this.state.allPlayers];
		players = players.map(p => {
			if (p.IdPlayers === id) {
				p.isChecked = event.target.checked;
			}
			return p;
		});
		this.setState({ allPlayers: players })
	}

	handleEnabledChange = (id) => {
		let players = [...this.state.allPlayers];
		players = players.map(p => {
			if (p.IdPlayers === id) {
				console.log(id, p)
				p.isChecked = !p.isChecked;
			}
			return p;
		});
		this.setState({ allPlayers: players })
	}

	saveTraining = () => {
		// let players = JSON.stringify(this.state.allPlayers.filter(p => p.isChecked).map(p => {
		// 	let newPlayer = { id: p.IdPlayers, isChecked: p.isChecked, Position1: p.Position1, name: p.Name }
		// 	return newPlayer;
		// }));
		console.log('Save training')
		// let players = JSON.stringify(this.state.allPlayers.map(p => {
		// 	let newPlayer = { id: p.IdPlayers, isChecked: p.isChecked, Position1: p.Position1, name: p.Name, status: p.status }
		// 	return newPlayer;
		// }));
		let id = this.state?.trainingData?.Id;
		let payloads = { id, date: this.state.trainingDate, location: '', hour: '', players: JSON.stringify(this.state.allPlayers), formation: this.state.formation }
		handleSaveTraining(payloads, () => {});
	}

	getPlayersPosition = () => {
		let playersPositions = {
			'1': [],
			'2': [],
			'4': [],
			'5': [],
			'3': [],
			'6': [],
			'8': [],
			'10': [],
			'7': [],
			'9': [],
			'11': []
		}
		this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'transferat' && p.isChecked }).forEach(p => {
			if (p.Position1 === '1') { playersPositions['1'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '2') { playersPositions['2'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '4') { playersPositions['4'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '5') { playersPositions['5'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '3') { playersPositions['3'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '6') { playersPositions['6'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '8') { playersPositions['8'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '10') { playersPositions['10'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '7') { playersPositions['7'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '9') { playersPositions['9'].push({ id: p.IdPlayers, name: p.Name }); }
			if (p.Position1 === '11') { playersPositions['11'].push({ id: p.IdPlayers, name: p.Name }); }
		});
		return playersPositions;
	}

	copyText = () => {
		let players = this.state.allPlayers.filter(p => p.isChecked === true)
		const sortedPlayers = players.sort((a, b) => (a.Position1 === "1" ? -1 : 1));
		const namesList = sortedPlayers
			.map((player, index) => `${index + 1}. ${player.Name}`)
			.join('\n');

		// Create a temporary textarea element to copy the text
		const textArea = document.createElement('textarea');
		textArea.value = namesList;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
	}

	handleFormationChange = (item) => {
		this.setState({ formation: item.item })
		// console.log({'State': this.state, item});
	}

	setPlayerPosition = (position, player) => {
		// console.log(player, position);


		let playerId = player.id;
		let positionId = position.key;
		// console.log(playerId, positionId);
		let allPlayers = this.state.allPlayers.map(p => {
			if (p.IdPlayers === playerId) {
				p.Position1 = positionId;
			}
			return p;
		})
		this.setState({ allPlayers })
	}

	handleAddPlayerClick = () => {
		this.setState(prevState => ({
			showForm: !prevState.showForm
		}));
	};

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleSaveClick = () => {
		const { playerName, playerPosition } = this.state;
		// Execute some code with playerName and playerPosition
		// console.log(this.state);
		let allPlayers = this.state.allPlayers;
		allPlayers.push({
			"IdPlayers": getMaxId(this.state.allPlayers) ,
			"Name": playerName,
			"Position1": playerPosition,
			// "Position2": null,
			// "TeamToPlay": null,
			// "IsEnable": 1,
			// "Team": "Seniori",
			"isChecked": true
		})
		// Slide up the box
		this.setState({
			showForm: false,
			allPlayers
			// playerName: '',
			// playerPosition: ''
		});
	};



	handleRightClick(e, playerId) {
		e.preventDefault(); // Prevent the default context menu
	
		const { clientX, clientY } = e;
	
		// Update state with the clicked position and player
		this.setState({
		  activePlayerId: playerId,
		  popupPosition: { top: clientY-180, left: clientX -  100 }, 
		});
	  }
	
	  closePopup() {
		this.setState({ activePlayerId: null }); // Close the popup
	  }

	  setPlayerStatus = (Status)=>{
		let {allPlayers, activePlayerId} = this.state
		allPlayers.map(p=>{
			if (p.IdPlayers === activePlayerId){
				p.Status = Status;
			}
			return p;
		})
		this.setState({allPlayers})
		console.log(activePlayerId, Status, allPlayers);
		postData('/update-player', { playerId: activePlayerId, field: 'Status', newValue: Status }).then((result) => {
			console.log('Result...', result);			
		})
		this.closePopup()
	  }
	

	render() {
		console.log('STATE', this.state);
		var formattedDate = this.state.trainingDate && this.state.trainingDate.toISOString().substring(0, 10);
		const { showForm, playerName, playerPosition } = this.state;
		const formStyle = {
			display: showForm ? 'block' : 'none',
			transition: 'display 0.5s ease-in-out'
		};
		// console.log(formattedDate);
		let playersPositions = this.getPlayersPosition();

		const { activePlayerId, popupPosition } = this.state;

		return (
			<div className="overview-layout">
				<div className="header-row">
					<h1>Training</h1>
					<div className="right-box">

						<UIDateSelect
							value={this.state?.trainingDate?.toISOString().substring(0, 10)}
							id="trainingDate"
							name="trainingDate"
							onChange={(event) => {
								this.setState({ trainingDate: new Date(event.target.value) }, () => { this.getTraining() })
							}}
						/>
						<Button className='save-btn' onClick={() => { this.saveTraining() }} >Save</Button>
						<Button className='save-btn' onClick={() => { this.copyText() }} >Copy</Button>
					</div>
				</div>
				<div className="cols-3">
					<div className='players-lists'>
						<div className="all-players-list" >
							<div className="m-l-10">All</div>
							{
								this.state?.allPlayers &&
								<div className='hide-checkbox'>
									<ol>
										{/* ################################################################### */}
										{this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'transferat' && !p.isChecked }).map(p => {
											return <li key={`li1-${p.IdPlayers}`}>
												<span 
													style={getStyle(p)}
													className="label-player" 
													key={`checkbox1-${p.IdPlayers}`} 
													onClick={() => this.handleEnabledChange(p.IdPlayers)}
													onContextMenu={(e) => this.handleRightClick(e, p.IdPlayers)} // Handle right click
												>
													{p.Name} 
												</span>

													{/* Popup */}
													{activePlayerId !== null && (
													<CSSTransition
														in={true}
														appear={true}
														timeout={200}
														classNames="popup"
														unmountOnExit
													>
														<div	
															className='status-popup'
															style={{
																top: popupPosition.top,
																left: popupPosition.left,
															}}
														>
																<Icon icon="cross" onClick={() => this.setState({activePlayerId:  null})} />
																<h3>{this.state.allPlayers.find((p) => p.IdPlayers === activePlayerId)?.Name} state</h3>
																<div className='icons-row'>
																	<Icon icon="tick" onClick={() => this.setPlayerStatus('1')} />
																	<Icon icon="plus"  onClick={() => this.setPlayerStatus('sick')} />
																	<Icon icon="issue"  onClick={() => this.setPlayerStatus('!')} />
																</div>
														</div>
													</CSSTransition>
													)}
											</li>
										})}
									</ol>
								</div>
							}
						</div>
						<div className="selected-players-list" >
							<div className="m-l-10">Training</div>

							{
								this.state.allPlayers &&
								<div className="fjkhkhkg">
									<div style={{ marginBottom: '10px' }}>GK</div>
									<div className='hide-checkbox'>
										{this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'transferat' && p.isChecked && p.Position1 === '1' }).map((p, k) => {
											return <div key={`li2-${p.IdPlayers}`}>
												<div className='asdf'>
													<span className="label-player" key={`checkbox1-${p.IdPlayers}`} onClick={() => this.handleEnabledChange(p.IdPlayers)}>
														{k + 1 + '. ' + p.Name}
													</span>
													{/* <Checkbox key={`checkbox2-${p.IdPlayers}`} label={k + 1 + '. ' + p.Name}
														onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)}
														checked={p.isChecked}
													/> */}
												</div>
											</div>
										})}
									</div>
									<div style={{ marginBottom: '10px' }}>Players</div>
									<div className='hide-checkbox'>
										{this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'transferat' && p.isChecked && p.Position1 !== '1' }).map((p, k) => {
											return <div key={`l3-${p.IdPlayers}`}>
												<div className='asdf'>
													<span className="label-player" key={`checkbox1-${p.IdPlayers}`} onClick={() => this.handleEnabledChange(p.IdPlayers)}>
														{k + 1 + '. ' + p.Name}
													</span>
													{/* <Checkbox key={`checkbox3-${p.IdPlayers}`} label={k + 1 + '. ' + p.Name}
														onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)}
														checked={p.isChecked}
													/> */}
												</div>
											</div>
										})}
									</div>

									<button onClick={this.handleAddPlayerClick}>
										Add Player
									</button>
									<div style={formStyle} className="form-box">
										<div>
											<label>Name:</label>
											<input
												type="text"
												name="playerName"
												value={playerName}
												onChange={this.handleInputChange}
											/>
										</div>
										<div>
											<label>Position:</label>
											<input
												type="number"
												name="playerPosition"
												value={playerPosition}
												onChange={this.handleInputChange}
												min="0"
												max="11"
											/>
										</div>
										<button onClick={this.handleSaveClick}>
											Save
										</button>
									</div>	
								</div>
							}
						</div>
					</div>
					<div id="fields">
						<div className="formation-row">
							<div>Formation: </div>
							<UISelect items={[{ key: '4-3-3', value: '4-3-3' }, { key: '4-4-2', value: '4-4-2' }, { key: '4-2-3-1', value: '4-2-3-1' }, { key: '4-4-2', value: '4-4-2' }]} onChange={this.handleFormationChange} itemKey='formation' selectedItem={this.state.formation} />
						</div>
						<div className="field-1 " data={`all-players-${this.state.formation}`}>
							<div className='GK player'>{playersPositions['1']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
							{
								this.state.formation === '4-3-3' &&
								<React.Fragment>
									<div className='defense row'>
										<div className='RB player'>{playersPositions['2']?.map(p => {
											return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} />
										})}
										</div>
										<div className='CRB player'>{playersPositions['4']?.map(p => {
											return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} />
										})}</div>
										<div className='CLB player'>{playersPositions['5']?.map(p => { return <Player key={'player-' + p.id} data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='LB player'>{playersPositions['3']?.map(p => { return <Player key={'player-' + p.id}   data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
									</div>
									<div className='nr6 player'>{playersPositions['6']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
									<div className="row INTER players-2">
										<div className='inter-right player'>{playersPositions['10']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='inter-left player'>{playersPositions['8']?.map(p => { return <Player key='17' data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
									</div>
									<div className='row players-3'>
										<div className='AR player'>{playersPositions['7']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='AC player'>{playersPositions['9']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='AL player'>{playersPositions['11']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
									</div>
								</React.Fragment>
							}

{
								this.state.formation === '4-2-3-1' &&
								<React.Fragment>
									<div className='defense row'>
										<div className='RB player' >{playersPositions['2']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='CRB player'>{playersPositions['4']?.map(p => { return <Player key={'player-' + p.id}   data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='CLB player'>{playersPositions['5']?.map(p => { return <Player key={'player-' + p.id}   data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='LB player'>{playersPositions['3']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
									</div>

									<div className="row INTER players-2">
										<div className='nr6 player'>{playersPositions['6']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='inter-left player'>{playersPositions['8']?.map(p => { return <Player key={'player-' + p.id}   data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
									</div>
									<div className="row players-3">
										<div className='AR player'>{playersPositions['7']?.map(p => { return <Player data={p} key={'player-' + p.id}  setPlayerPosition={this.setPlayerPosition} /> })}</div>

										<div className='inter-right player'>{playersPositions['10']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='AL player'>{playersPositions['11']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>

									</div>
									<div className='AC player'>{playersPositions['9']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>


								</React.Fragment>
							}
							{
								this.state.formation === '4-4-2' &&
								<React.Fragment>
									<div className='defense row'>
										<div className='RB player'>{playersPositions['2']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='CRB player'>{playersPositions['4']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='CLB player'>{playersPositions['5']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='LB player'>{playersPositions['3']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
									</div>

									<div className="row  players-4">
										<div className='AR player'>{playersPositions['7']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='nr6 player'>{playersPositions['6']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='inter-left player'>{playersPositions['8']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='inter-right player'>{playersPositions['10']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
									</div>
									<div className="row players-2">

										<div className='AL player'>{playersPositions['11']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>
										<div className='AC player'>{playersPositions['9']?.map(p => { return <Player key={'player-' + p.id}  data={p} setPlayerPosition={this.setPlayerPosition} /> })}</div>

									</div>


								</React.Fragment>
							}



						</div>
					</div>
				</div>
			</div>
		);
	}
}

const Player = ({ data, setPlayerPosition }) => {
	return (
		<div key={'player-'+data.id}>
			<Select
				className='field-select'
				items={PLAYERS_POSITIONS}
				itemRenderer={(item, { handleClick }) => {
					return (
						<MenuItem
							key={'menu-'+item.key}
							text={item.value}
							onClick={handleClick}
						/>
					);
				}}
				onItemSelect={(item) => setPlayerPosition(item, data)}
				filterable={false}
				popoverProps={{ position: 'right' }}
			>
				<Button className="field-btn" text={data.name} rightIcon="double-caret-vertical" />
			</Select>
		</div>
	);
};

export default Training;
