import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { getData } from './../requests/requests';
import {URLS} from './../requests/constants'

class Players extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  } 
  componentDidMount() {
    console.log('Get players    ');

    getData(URLS.players).then(result => {
      console.log('RESULT NEW');
      this.setState({ players: result })
    });
  }

  colDefs = [
    {field: 'Name'},
    {field: 'Position1'},
    {field: 'YearOfBirth'},
    {field: 'Number'},
  ]

  render() {
    console.log('state', this.state);
    return (
      <div className="overview-layout">
        <h1>Players</h1>
        {
          this.state?.players &&
           <div className="grid-height">
                  <AgGridReact rowData={this.state?.players} columnDefs={this.colDefs} />
          </div>
        }
      </div>
    );
  }
}


export default Players;
