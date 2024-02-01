import React from 'react';
import './GameInfo.css'; // Make sure to link to the correct path of your CSS file
import { Button, Tab, Tabs } from "@blueprintjs/core";

class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    handleInputChange = (field, event) => {
    };

    renderEditableDiv(field) {
        return (
            <div
                contentEditable
                className="editableField"
                onInput={(e) => this.handleInputChange(field, e)}
                onBlur={(e) => this.handleInputChange(field, e)}
                suppressContentEditableWarning={true}
            >
                {this.state[field]}
            </div>
        );
    }

    render() {
        return (
            <div className="editableColumn">
                <Tabs id="TabsExample" onChange={this.handleTabChange} defaultSelectedTabId="gi" vertical={true}>
                <Tab id="gi" title="Game Info" panel={<div>Game info</div>} />
                <Tab id="t" title="Team" onChange={this.handleTabChange}  panel={<div>Team</div>} panelClassName="ember-panel" />
                <Tab id="pi" title="Players Info" onChange={this.handleTabChange}  panel={<div>Players Info</div>} panelClassName="ember-panel" />
            </Tabs>
            </div>
        );
    }
}

export default GameInfo;
