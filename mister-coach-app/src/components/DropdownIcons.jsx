import React, { Component } from 'react';
import {Icon} from "@blueprintjs/core";

class DropdownIcons extends Component {
    constructor(props) {
        super(props);
        this.state = { isHovered: false };
    }

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    }

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    }

    render() {
        return (
            <div 
                className="add-event-row" 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
            >
                Add Event
                <div className={`icon left-icon ${this.state.isHovered ? 'show' : ''}`} onClick={this.props.addTraining} title="Add Training"><div>Training</div><Icon icon="soccer-ball" /></div>
                <div className={`icon right-icon ${this.state.isHovered ? 'show' : ''}`} onClick={this.props.addGame} title="Add Game"><div>Game</div><Icon icon="trophy" /></div>
            </div>
        );
    }
}

export default DropdownIcons;
