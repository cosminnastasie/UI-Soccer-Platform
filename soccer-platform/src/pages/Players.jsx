import React from 'react'

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

  render() {
    console.log('state', this.state);
    return (
      <div className="overview-layout">
        <h1>Players</h1>
        {
          this.state?.players &&
          <>
            {this.state?.players.map(p => {
              return <div>{p.Name}</div>
            })}
          </>
        }
      </div>
    );
  }
}


export default Players;
