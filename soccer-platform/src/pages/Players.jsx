import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { getData } from './../requests/requests';
import { URLS } from './../requests/constants'

class Players extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

    getData(URLS.players).then(result => {
      this.setState({
        players: result.sort(function (a, b) {
          return parseInt(a.YearOfBirth) - parseInt(b.YearOfBirth);
        })
      })
    });
  }

  colDefs = [
    { headerName: "Nr. ", valueGetter: "node.rowIndex + 1", width: 50 },
    { field: 'Name' },
    { field: 'Position1' },
    { field: 'YearOfBirth' },
    { field: 'Number' },
  ]

  gridOptions = {
    getRowStyle: (params) => {
      if (parseInt(params.data.YearOfBirth) === 2004) {
        return { color: 'darkcyan' };
      } else if (parseInt(params.data.YearOfBirth) === 2005) {
        return { color: 'deepskyblue' };
      } else if (parseInt(params.data.YearOfBirth) > 2005) {
        return { color: 'mediumaquamarine' };
        
      } else {
        return { color: 'floralwhite' };
      }
    }
  };

  render() {
    return (
      <div className="overview-layout">
        <h1>Players</h1>
        {
          this.state?.players &&
          <div className="grid-height">
            <AgGridReact rowData={this.state?.players} columnDefs={this.colDefs} gridOptions={this.gridOptions} />
          </div>
        }
      </div>
    );
  }
}


export default Players;
