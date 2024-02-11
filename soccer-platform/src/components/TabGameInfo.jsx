import React, { Component } from 'react';
import './TabGameInfo.css'; // Make sure the CSS file is in the same directory
import SlideRow from './SlideRow';
import UISelect from './UISelect';
import { Button, Dialog, FormGroup, InputGroup, Icon } from "@blueprintjs/core";
import { HOURS } from './../requests/constants'
import withParams from './../pages/withParams'

class TabGameInfo extends Component {
    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
            isSaveRowVisible: false,
            gameInfo: {
                "Id": '',
                "Competitor": "",
                "Date": "",
                "Hour": "",
                "HomeAway": "",
                "Type": "",
                "Location": "",
                "Result": ''
            }
        };
    }

    componentDidMount() {
        this.setState({ gameInfo: this.props.gameInfo })
        // console.log('TabGameInfo PROPS',  this.props);
    }

    componentDidUpdate() { }


    handleInputChange = (event) => {
        let gameInfo = this.state.gameInfo;
        console.log('##############', event?.target?.value, event?.target?.value)
        if (event?.target) {
            const { name, value } = event.target;
            gameInfo[name] = value;
        } else if (event?.isSelect) {
            gameInfo [event.key] = event.item;
        }
        console.log(222, gameInfo);
        this.setState({ gameInfo, isSaveRowVisible: true })
    }
    saveGameInfo = () => {
        console.log('SAVE THIS', this.state);
    }
    render() {
        console.log('Game TAB INFO State', this.state);

        return (
            <div className="event-form">

                <FormGroup label="Competitor" labelFor="competitor-input">
                    <InputGroup id="competitor-input" name="Competitor" value={this.state.gameInfo.Competitor} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup label="Date" labelFor="date-input">
                    <InputGroup type="date" id="date-input" name="Date" onChange={this.handleInputChange} value={this.state.gameInfo.Date} />
                </FormGroup>
                <FormGroup label="Hour" labelFor="hour-input">
                    <UISelect items={HOURS.map(h => {
                        return { key: h, value: h }
                    })} onChange={this.handleInputChange} itemKey='hour' />
                </FormGroup>
                <FormGroup label="Home/Away" labelFor="homeaway-input">
                    <UISelect items={[{ key: 'Home', value: 'Home' }, { 'key': 'Away', value: 'Away' }]} activeItem={this.state.gameInfo.Type} onChange={this.handleInputChange} itemKey='homeaway' />
                </FormGroup>
                <FormGroup label="TypeOfGame" labelFor="typeofgame-input">
                    <UISelect items={[{ key: 'Friendly', value: 'Friendly' }, { key: 'Game', value: 'Game' }, { key: 'Cup', value: 'Cup' }]} activeItem={this.state.gameInfo.TypeOfGame} onChange={this.handleInputChange} itemKey='typeofgame' />
                </FormGroup>
                <FormGroup label="Location" labelFor="location-input">
                    <InputGroup id="location-input" name="Location" value={this.state.gameInfo.Location} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup label="Result" labelFor="result-input">
                    <InputGroup id="result-input" name="Result" value={this.state?.gameInfo?.Result || ''} onChange={this.handleInputChange} />
                </FormGroup>
                <SlideRow onSave={this.saveGameInfo} isSaveRowVisible={this.state.isSaveRowVisible} hideSaveRow={()=>{this.setState({isSaveRowVisible: false})}} />
            </div>
        );
    }
}
export default withParams(TabGameInfo);

