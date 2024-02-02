import React, { Component } from 'react';
import './TabGameInfo.css'; // Make sure the CSS file is in the same directory
import SlideRow from './SlideRow';

class EventForm extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      location: '',
      date: '',
      hour: '',
    };
  }



  // Handlers for changing state based on input
  handleLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  handleDateChange = (e) => {
    this.setState({ date: e.target.value });
  };

  handleHourChange = (e) => {
    this.setState({ hour: e.target.value });
  };

  render() {
    return (
      <div className="event-form">
        <div className="input-group">
          <label>Location</label>
          <input
            type="text"
            value={this.state.location}
            onChange={this.handleLocationChange}
            placeholder="Enter location"
          />
        </div>
        <div className="input-group">
          <label>Date</label>
          <input
            type="date"
            value={this.state.date}
            onChange={this.handleDateChange}
          />
        </div>
        <div className="input-group">
          <label>Hour</label>
          <input
            type="time"
            value={this.state.hour}
            onChange={this.handleHourChange}
            step="1800" // 30 minutes range
          />
        </div>
        <SlideRow />
      </div>
    );
  }
}

export default EventForm;