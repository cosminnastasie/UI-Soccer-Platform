import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

class Players extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  } 
  componentDidMount() {
    console.log('Get players    ');

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://api-soccer-platform.cosminnastasie.workers.dev/players", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({ players: result })
      })
      .catch(error => console.log('error', error));
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
           <div class="grid-height">
                  <AgGridReact rowData={this.state?.players} columnDefs={this.colDefs} />
          </div>
        }
      </div>
    );
  }
}


export default Players;
