import React, { Component } from 'react';
import {Icon} from "@blueprintjs/core";

class UIDateSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.dateInputRef = React.createRef();

    }

	openCalendar = () => {
		console.log('OPEN CALENDAR');
		// Use the current property to access the DOM element and click it
		this.dateInputRef.current.click();
	  };
    render() {
        return (
            <div className='sp-btn-group'>
                <div className='btn-text'>Date: </div>
                <input type="date" className="sp-btn" ref={this.dateInputRef} 
                    value={this.props.value} id={this.props.id} name={this.props.name} 
                    onChange={(event) => { this.props.onChange(event)}} />
            </div>
        );
    }
}

export default UIDateSelect;
