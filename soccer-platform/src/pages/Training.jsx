import React from 'react'
import { getData, postData } from './../requests/requests';
import { URLS } from './../requests/constants'
import { Checkbox, Button } from "@blueprintjs/core";
// import DatePickerButton from '../components/DatePicker'
import { formatDate, setToday, stringToDate } from './../requests/helpers'
import { handleSaveTraining } from './../requests/actions'


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
		getData(URLS.all_players).then(result => {
			result?.map(p => {
				p.isChecked = namesArray.includes(p.Name) ? true : false;
				return p;
			});
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
		this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'Transfer' && p.isChecked }).forEach(p => {
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
						<input type="date" className="sp-btn" value={this.state?.trainingDate?.toISOString().substring(0, 10)} id="trainingDate" name="trainingDate" onChange={(event) => {
									this.setState({ trainingDate: new Date(event.target.value) }, () => { this.getTraining() })
								}
							}
						/>

						{/* <DatePickerButton onChange={  (date) => {console.log(date); this.setState({trainingDate: date}, ()=>{this.getTraining()})} }/> */}
						<Button onClick={() => {
							this.saveTraining()
						}} >Save Training</Button>
					</div>
				</div>
				<div className="cols-3">
					<div className='players-lists'>
						<div className="all-players-list" >
							<div className="m-l-10">All</div>
							{
								this.state?.allPlayers &&
								<div className="">
									<ol>
										{this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'Transfer' && !p.isChecked }).map(p => {
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
								<div style={{ marginLeft: '40px', marginTop: '22px' }}>
									<div>GK</div>
									<ol>
										{this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'Transfer' && p.isChecked && p.Position1 === '1' }).map(p => {
											return <li key={`li2-${p.IdPlayers}`}>
												<Checkbox key={`checkbox2-${p.IdPlayers}`} label={p.Name}
													onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)}
													checked={p.isChecked}
												/>
											</li>
										})}
									</ol>
									<div>Players</div>
									<ol>
										{this.state.allPlayers.filter(p => { return p.TeamToPlay !== 'Transfer' && p.isChecked && p.Position1 !== '1' }).map(p => {
											return <li key={`l3-${p.IdPlayers}`}>
												<Checkbox key={`checkbox3-${p.IdPlayers}`} label={p.Name + ' (' + p.Position1 + ') '}
													onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)}
													checked={p.isChecked}
												/>
											</li>
										})}
									</ol>
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
