import React, { Component } from 'react';
import './TabGameInfo.css'; // Make sure the CSS file is in the same directory
import SlideRow from './SlideRow';
import UISelect from './UISelect';
import { Button, Dialog, FormGroup, InputGroup, Icon } from "@blueprintjs/core";
import { HOURS } from '../requests/constants'
import withParams from '../pages/withParams'

class TabGameTeam extends Component {
    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
            isSaveRowVisible: false,
            
        };
    }

    componentDidMount() {
        this.setState({ gameId: this.props.gameId })
        // console.log('TabGameInfo PROPS',  this.props);
    }

    componentDidUpdate() { }


    
    saveGameInfo = () => {
        console.log('SAVE THIS', this.state);
    }
    render() {
        // console.log('Team TAB INFO State', this.state);

        return (
            <div className="event-form">

                Teams
                <SlideRow onSave={this.saveGameInfo} isSaveRowVisible={this.state.isSaveRowVisible} hideSaveRow={()=>{this.setState({isSaveRowVisible: false})}} />
            </div>
        );
    }
}
export default withParams(TabGameTeam);

