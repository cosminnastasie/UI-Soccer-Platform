import React from 'react'

class Games extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  } 
  componentDidMount() {
    console.log('Get games    ');

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://api-soccer-platform.cosminnastasie.workers.dev/games", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({ games: result })
      })
      .catch(error => console.log('error', error));
  }



  render() {
    console.log('state', this.state);
    return (
      <div className="overview-layout">
        <h1>Games</h1>
        {
          this.state?.games &&
           <div class="">

            </div>
        }
      </div>
    );
  }
}


export default Games;
