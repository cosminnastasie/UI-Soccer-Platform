import React, { Component } from 'react';
import { Button, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";
import UISelect from './UI_Select';
import { putData } from './../requests/requests';
import {URLS} from './../requests/constants'
import {convertDateToYYYYMMDD} from './../requests/helpers'
const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17: 00', '18:00', '19:00'];


class SoccerGameDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({date: convertDateToYYYYMMDD(this.props.activeDate)})
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
        let payloads = {competitor, date, loc: location, hour, homeaway, typeofgame}
        putData(URLS.games, payloads).then(()=>{
            console.log('Save...', {competitor, date, location, hour, homeaway, typeofgame} );
            this.handleClose();

        })
    }
    
    render() {
        console.log('State:', this.state);
        return (
            <div>
                <Dialog
                    isOpen={this.props.isOpen}
                    onClose={this.handleClose}
                    title="Edit Soccer Game Event"
                    className="soccer-game-dialog"
                >
                    {/* <div className="bp3-dialog-header">
                        <span className="bp3-icon-large bp3-icon-endorsed"></span>
                        <h4 className="bp3-heading">Edit Game Details</h4>
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
                </Dialog>
            </div>
        );
    }
}

export default SoccerGameDialog;


