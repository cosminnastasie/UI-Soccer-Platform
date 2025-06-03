import React, { Component } from 'react';
import './SlideRow.css'; // Ensure to create and import the CSS file

class SlideRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidUpdate(prevProps) {
    // Check if a specific prop has changed
    if (this.props.isSaveRowVisible !== prevProps.isSaveRowVisible) {
      console.log('isSaveRowVisible has changed');
        this.setState({isVisible: this.props.isSaveRowVisible})
    }
  }

  render() {
    return (
      <div>
        <div className={`slide-row ${this.state.isVisible ? 'show' : ''}`}>
          <button onClick={this.props.onSave}>Save</button>
          <button onClick={this.props.hideSaveRow}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default SlideRow;
