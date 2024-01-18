import React, { Component } from 'react';
import { Button, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import UISelect from './UI_Select';
import { putData } from './../requests/requests';
import {URLS, TEAM} from './../requests/constants'
import {convertDateToYYYYMMDD, getDayOfWeek} from './../requests/helpers'
import DropdownIcons from './DropdownIcons'

const hours = ['09:00', '09:30', '10:00', '11:00', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '15:00', '16:00', '17: 00', '18:00', '19:00'];


class SoccerGameDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // popupState: 'addEditGame',
            popupState: 'info',
            isOpen: false,
            competitor: '',
            date: '',
            location: '',
            hour: '',
            homeaway: '',
            typeofgame: ''
        };
    }

    componentDidMount(){
        this.setState({date: convertDateToYYYYMMDD(this.props.activeDate), popupState: this.props.popupState || 'info'})
    }

    handleOpen = () => this.setState({ isOpen: true });
    handleClose = () => this.props.handleClose();

    handleInputChange = (event) => {
        if(event?.target){
            const { name, value } = event.target;
            this.setState({ [name]: value });
        }else if(event?.isSelect){
            this.setState({ [event.key]: event.item });

            // console.log('Event select', event);
        }
    }

    handleSaveGame = () => {
        let {competitor, date, location, hour, homeaway, typeofgame} = this.state;
        let payloads = {competitor, date, location, hour, homeaway, typeofgame}
        putData(URLS.games, payloads).then(()=>{
            // console.log('Save...', {competitor, date, location, hour, homeaway, typeofgame} );
            this.handleClose();
        })
    }

    handleSaveTraining = () => {
        // console.log(this.state);
        let { date, location, hour} = this.state;
        let payloads = { date, location, hour }
        putData(URLS.trainings, payloads).then(()=>{
            // console.log('Save...', {competitor, date, location, hour, homeaway, typeofgame} );
            this.handleClose();

        })
    }
    
    render() {
        // console.log('State:', this.state);
        // console.log('PROPS:', this.props.events);
        return (
            <div>
                <Dialog
                    isOpen={this.props.isOpen}
                    onClose={this.handleClose}
                    title={this.state.popupState === 'addEditGame'? 'Edit Soccer Game Event': <div>{getDayOfWeek( this.state.date)} - {this.state.date}</div>}
                    className={`soccer-game-dialog ${this.state.popupState === "info" ? ' info-dialog ': ""}`}
                >
                    {
                         this.state.popupState === 'info' 
                           ? this.props.events.length
                                ? <div className='info-box-body'>
                                    {this.props.events.map(e=>{
                                        console.log(e)
                                        if(e.ActivityType  === 'Game'){
                                            var orderA = e.HomeAway === 'Home'? "1": "3";
                                            var orderB = e.HomeAway === 'Home'? "3": "1";
                                            return <div key={e.IdGames} >
                                                <div className='event-header'>{e.Type} game</div>
                                                <div className="game-teams-label">
                                                    <span style={{order: orderA}} >{TEAM} </span>
                                                    <span style={{order: 2, padding: '0 6px'}}> - </span> 
                                                    <span style={{order: orderB}} > {e.Competitor}</span>
                                                </div>
                                                {
                                                    e.Location
                                                        ? <div className="font-style-10">Location: Stadion {e.Location}</div>
                                                        :''
                                                }
                                                {
                                                    e.Hour
                                                        ? <div className="font-style-10">Hour: {e.Hour}</div>
                                                        :''
                                                }
                                            </div>
                                        }else if(e.ActivityType  === 'Training'){
                                            
                                            return <div key={e.IdGames} >
                                                <div className='event-header'>Training</div>
                                                {
                                                    e.Location
                                                        ? <div className="font-style-10" >Location: Stadion {e.Location}</div>
                                                        :''
                                                }
                                                {
                                                    e.Hour
                                                        ? <div className="font-style-10">Hour: {e.Hour}</div>
                                                        :''
                                                }
                                            </div>
                                        }
                                        return ''
                                    })}
                                </div>
                                : <div className='info-box-no-info'>
                                    No events on this date
                                    <DropdownIcons addGame={()=>{this.setState({popupState: 'addEditGame'})}} addTraining={()=>{this.setState({popupState: 'addTraining'})}} />
                                </div>
                            : ''
                            
                    }

                    {
                        this.state.popupState === 'addEditGame' &&
                            <div className="edit-dialog">

                                {/* <div className="bp3-dialog-header">
                                    <span className="bp3-icon-large bp3-icon-endorsed"></span>
                                    <h4 className="bp3-heading">Edit Soccer Game Event</h4>
                                    <button aria-label="Close" className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross" onClick={this.handleClose}></button>
                                </div> */}
                                <div className="bp3-dialog-body">
                                    <FormGroup label="Competitor" labelFor="competitor-input">
                                        <InputGroup id="competitor-input" name="competitor" value={this.state.competitor} onChange={this.handleInputChange} />
                                    </FormGroup>
                                    <FormGroup label="Date" labelFor="date-input">
                                        <InputGroup type="date" id="date-input" name="date" onChange={this.handleInputChange} value={this.state.date}/>
                                    </FormGroup>
                                    <FormGroup label="Hour" labelFor="hour-input">
                                        <UISelect items={hours} onChange={this.handleInputChange} itemKey='hour' />
                                    </FormGroup>
                                    <FormGroup label="Home/Away" labelFor="homeaway-input">
                                        <UISelect items={['Home', 'Away']} onChange={this.handleInputChange} itemKey='homeaway' />
                                    </FormGroup>
                                    <FormGroup label="TypeOfGame" labelFor="typeofgame-input">
                                        <UISelect items={['Friendly', 'Cup', 'Game']} onChange={this.handleInputChange} itemKey='typeofgame' />
                                    </FormGroup>
                                    <FormGroup label="Location" labelFor="location-input">
                                        <InputGroup id="location-input" name="location" value={this.state.location} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </div>
                                <div className="bp3-dialog-footer">
                                    <div className="bp3-dialog-footer-actions">
                                        <Button onClick={this.handleSaveGame}>Save</Button>
                                        <Button >Add Teams</Button>
                                        <Button intent="primary" onClick={this.handleClose}>Cancel</Button>
                                    </div>
                                </div>
                            </div>
                    }

                    
                    {
                        this.state.popupState === 'addTraining' &&
                            <div className="edit-dialog">

   
                                <div className="bp3-dialog-body">
                                    <FormGroup label="Date" labelFor="date-input">
                                        <InputGroup type="date" id="date-input" name="date" onChange={this.handleInputChange} value={this.state.date}/>
                                    </FormGroup>
                                    <FormGroup label="Hour" labelFor="hour-input">
                                        <UISelect items={hours} onChange={this.handleInputChange} itemKey='hour' />
                                    </FormGroup>
                                    <FormGroup label="Location" labelFor="location-input">
                                        <InputGroup id="location-input" name="location" value={this.state.location} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </div>
                                <div className="bp3-dialog-footer">
                                    <div className="bp3-dialog-footer-actions">
                                        <Button onClick={this.handleSaveTraining}>Save</Button>
                                        <Button intent="primary" onClick={this.handleClose}>Cancel</Button>
                                    </div>
                                </div>
                            </div>
                    }

                    
                </Dialog>
            </div>
        );
    }
}

export default SoccerGameDialog;


