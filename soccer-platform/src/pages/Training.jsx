import React from 'react'
import { getData, postData } from './../requests/requests';
import { URLS } from './../requests/constants'
import { Checkbox, Button } from "@blueprintjs/core";
// import DatePickerButton from '../components/DatePicker'
import { formatDate, setToday, stringToDate } from './../requests/helpers'
import { handleSaveTraining } from './../requests/actions'
import UIDateSelect from './../components/UIDateSelect'

const namesArray = [

];

class Training extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			allPlayers: []
		}
	}

	componentDidMount() {
		var date = new Date()

		this.setState({ trainingDate: date })
		// getData(URLS.players).then(result => {
		getData(URLS.all_players).then(result => {
			result = result.filter(r => {
				return (r.TeamToPlay !== 'transferat' && r.TeamToPlay !== 'false')
			})
			result?.map(p => {
				p.isChecked = namesArray.includes(p.Name) ? true : false;
				return p;
			});
			result = result.filter(p => p.IsEnable === 1)
			this.setState({
				allPlayers: result.sort(function (a, b) {
					return parseInt(a.YearOfBirth) - parseInt(b.YearOfBirth);
				})
			}, () => { this.getTraining() })
		});
	}

	getTraining = () => {
		// console.log('######################', formatDate(this.state.trainingDate));
		postData(URLS.trainings, { date: formatDate(this.state.trainingDate) }).then((result) => {
			let trainingData = result?.results[0] || [];
			// if(result?.results.length){
			let allPlayers = this.state.allPlayers;
			allPlayers.map(p => {
				p.isChecked = false;
				return p;
			});
			if (trainingData?.Players) {
				let trainingPlayers = JSON.parse(trainingData?.Players);
				allPlayers.map(ap => {
					trainingPlayers.forEach(tp => {
						if (tp.id === ap.IdPlayers) {
							ap.isChecked = tp.isChecked;
						}
					});
					return ap;
				});
			}
			this.setState({ allPlayers, trainingData })
		});
	}

	handleEnabledChange = (event, id) => {
		let players = [...this.state.allPlayers];
		players = players.map(p => {
			if (p.IdPlayers === id) {
				p.isChecked = event.target.checked;
			}
			return p;
		});
		this.setState({ allPlayers: players })
	}

	saveTraining = () => {
		let players = JSON.stringify(this.state.allPlayers.filter(p => p.isChecked).map(p => {
			let newPlayer = { id: p.IdPlayers, isChecked: p.isChecked }
			return newPlayer;
		}));
		let id = this.state?.trainingData?.Id;
		let payloads = { id, date: this.state.trainingDate, location: '', hour: '', players }
		handleSaveTraining(payloads, () => {

		});
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

	render() {
		console.log(this.state);
		var formattedDate = this.state.trainingDate && this.state.trainingDate.toISOString().substring(0, 10);

		console.log(formattedDate);
		let playersPositions = this.getPlayersPosition();
		return (
			<div className="overview-layout">
				<div className="header-row">
					<h1>Training</h1>
					<div className="right-box">
						{/* <div className='sp-btn-group'>
							<div className='btn-text'>Date: </div>
							<input type="date" className="sp-btn" ref={this.dateInputRef} value={this.state?.gameDate?.toISOString().substring(0, 10)} id="gameDate" name="trainingDate" onChange={(event) => { this.setState({ gameDate: new Date(event.target.value) }, () => { this.getGame() }) }} />
						</div> */}
						<UIDateSelect
							value={this.state?.trainingDate?.toISOString().substring(0, 10)}
							id="trainingDate"
							name="trainingDate"
							onChange={(event) => {
								this.setState({ trainingDate: new Date(event.target.value) }, () => { this.getTraining() })
							}}
						/>
						{/* // <input type="date" className="sp-btn" value={this.state?.trainingDate?.toISOString().substring(0, 10)} id="trainingDate" name="trainingDate" onChange={(event) => {
									this.setState({ trainingDate: new Date(event.target.value) }, () => { this.getTraining() })
								}
							}
						/> */}

						{/* <DatePickerButton onChange={  (date) => {console.log(date); this.setState({trainingDate: date}, ()=>{this.getTraining()})} }/> */}
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
										{this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'transferat' && !p.isChecked }).map(p => {
											return <li key={`li1-${p.IdPlayers}`}>
												<Checkbox key={`checkbox1-${p.IdPlayers}`} checked={p.isChecked} label={p.Name} onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)} />
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
												<div class='asdf'>
													<Checkbox key={`checkbox2-${p.IdPlayers}`} label={k + 1 + '. ' + p.Name}
														onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)}
														checked={p.isChecked}
													/>
												</div>
											</div>
										})}
									</div>
									<div style={{ marginBottom: '10px' }}>Players</div>
									<div className='hide-checkbox'>
										{this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'transferat' && p.isChecked && p.Position1 !== '1' }).map((p, k) => {
											return <div key={`l3-${p.IdPlayers}`}>
												<div class='asdf'>
													<Checkbox key={`checkbox3-${p.IdPlayers}`} label={k + 1 + '. ' + p.Name}
														onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)}
														checked={p.isChecked}
													/>
												</div>
											</div>
										})}
									</div>
								</div>
							}
						</div>
					</div>
					<div className="field-1 " data="all-players-4-3-3">
						<div className='GK player'>{playersPositions['1']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
						<div className='defense row'>
							<div className='RB player'>{playersPositions['2']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
							<div className='CRB player'>{playersPositions['4']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
							<div className='CLB player'>{playersPositions['5']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
							<div className='LB player'>{playersPositions['3']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
						</div>
						<div className='nr6 player'>{playersPositions['6']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
						<div class="row INTER">
							<div className='inter-right player'>{playersPositions['10']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
							<div className='inter-left player'>{playersPositions['8']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
						</div>
						<div className='AT row'>
							<div className='AR player'>{playersPositions['7']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
							<div className='AC player'>{playersPositions['9']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
							<div className='AL player'>{playersPositions['11']?.map(p => { return <div key={p.id}>{p.name}</div> })}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Training;
