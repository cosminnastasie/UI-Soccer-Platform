import React, { Component } from 'react';
import './SlideRow.css'; // Ensure to create and import the CSS file

class SlideRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false, // Initially hide the row
    };
  }

  toggleRow = () => {
    this.setState((prevState) => ({ isVisible: !prevState.isVisible }));
  };

  render() {
    return (
      <div>
        <div className={`slide-row ${this.state.isVisible ? 'show' : ''}`}>
          <button onClick={this.toggleRow}>Save</button>
          <button onClick={this.toggleRow}>Cancel</button>
        </div>
        <button onClick={this.toggleRow} className="toggle-btn">
          Toggle Row
        </button>
      </div>
    );
  }
}

export default SlideRow;
