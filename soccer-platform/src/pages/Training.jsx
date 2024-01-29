import React from 'react'
import { getData, postData } from './../requests/requests';
import { URLS } from './../requests/constants'
import { Checkbox, Button } from "@blueprintjs/core";
import DatePickerButton from '../components/DatePicker'
import {formatDate} from './../requests/helpers'
import {handleSaveTraining} from './../requests/actions'


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
    
    this.setState({trainingDate: date})
    getData(URLS.all_players).then(result => {
      result?.map(p=>{
        p.isChecked = namesArray.includes(p.Name)? true: false;
        return p;
      });
      this.setState({
        allPlayers: result.sort(function (a, b) {
          return parseInt(a.YearOfBirth) - parseInt(b.YearOfBirth);
        })
      }, ()=>{this.getTraining()})
    });
  }

  getTraining = () => {
    postData(URLS.trainings, {date: formatDate( this.state.trainingDate)}).then((result)=>{
      let trainingData = result?.results[0] || [];
      // if(result?.results.length){
        let allPlayers = this.state.allPlayers;
        allPlayers.map(p=>{
          p.isChecked = false;
          return p;
        });
        if(trainingData?.Players){
          let trainingPlayers = JSON.parse(trainingData?.Players);
          allPlayers.map(ap=>{
            trainingPlayers.forEach(tp=>{
              if(tp.id === ap.IdPlayers){
                ap.isChecked = tp.isChecked;
              }
            });
            return ap;
          });
        }
        this.setState({allPlayers, trainingData})
    });
  }

  handleEnabledChange = (event, id) => {
    let players = [...this.state.allPlayers];
    players = players.map(p=>{
      if(p.IdPlayers === id){
        p.isChecked = event.target.checked;
      }
      return p;
    });
    this.setState({allPlayers: players})
  }

  saveTraining = () => {
      let players = JSON.stringify(this.state.allPlayers.filter(p=>p.isChecked).map(p=>{
        let newPlayer = {id: p.IdPlayers, isChecked: p.isChecked}
        return newPlayer;
      }) );
      let id = this.state?.trainingData?.Id;
      let payloads = { id, date: this.state.trainingDate, location: '', hour: '', players}
      handleSaveTraining(payloads, ()=>{

      });
  }

  render() {
    return (
      <div className="overview-layout">
        <div className="header-row">
          <h1>Training</h1>
          <div className="right-box">
              <DatePickerButton onChange={  (date) => {this.setState({trainingDate: date}, ()=>{this.getTraining()})} }/>
              <Button onClick={() => {
                this.saveTraining()
              }} >Save Training</Button>
          </div>
        </div>
        <div className="cols-3">
            <div style={{width: '25%'}}>
                <div className="m-l-10">All</div>
                {
                  this.state?.allPlayers &&
                  <div className="">
                    <ol>
                    {this.state.allPlayers.filter(p=>{return p.TeamToPlay !== 'Transfer'  && ! p.isChecked}).map(p=>{
                      return <li key={`li1-${p.IdPlayers}`}>
                          <Checkbox key={`checkbox1-${p.IdPlayers}`} checked={p.isChecked} label={p.Name} onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)} />
                      </li>
                    })}
                    </ol>
                  </div>
                }
            </div>
            <div>
              <div className="m-l-10">Training</div>

              {
                this.state.allPlayers &&
                  <div style={{marginLeft: '40px', marginTop: '22px'}}>
                    <div>GK</div>
                    <ol>
                    {this.state.allPlayers.filter(p=>{return p.TeamToPlay !== 'Transfer' && p.isChecked && p.Position1 === 'GK'}).map(p=>{
                      return <li key={`li2-${p.IdPlayers}`}>
                          <Checkbox key={`checkbox2-${p.IdPlayers}`} label={p.Name}
                            //  onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)}
                          />
                        </li>
                    })}
                    </ol>
                    <div>Players</div>
                    <ol>
                    {this.state.allPlayers.filter(p=>{return p.TeamToPlay !== 'Transfer' && p.isChecked && p.Position1 !== 'GK'}).map(p=>{
                      return <li key={`l3-${p.IdPlayers}`}>
                          <Checkbox key={`checkbox3-${p.IdPlayers}`} label={p.Name + ' (' + p.Position1 + ') '}
                            //  onChange={(e) => this.handleEnabledChange(e, p.IdPlayers)}
                          />
                        </li>
                    })}
                    </ol>
                  </div>
              }
            </div>
        </div>
      </div>
    );
  }
}

export default Training;
