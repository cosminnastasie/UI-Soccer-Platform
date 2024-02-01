import React from 'react'
import { Button, Tab, Tabs } from "@blueprintjs/core";
import GameInfo from './../components/GameInfo'

class Games extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameInfo: false,
      isEditGameOpen: false,
      
    }
  } 

  componentDidMount() {
      var date = new Date()
      this.setState({gameDate: date})



      
  }

  getGame = () => {
    console.log('Get game', this.state);
  }

  saveGame = () => {
    console.log('Save game', this.state)
  }



  render() {
    console.log(this.state);
    // console.log(this.getPlayersPosition());
    let playersPositions = {}//this.state?.allPlayers? this.getPlayersPosition(): {};
    return (
      <div className="overview-layout">
        <div className="header-row">
          <h1>Games</h1>
          <div className="right-box">
               <Button onClick={() => {
                this.saveGame()
              }} >Add Game</Button>
          </div>
        </div>
       <div class="content">
        {this.state.gameInfo === false && !this.state.isEditGameOpen
          ? <div class="no-data" onClick={()=>{this.setState({isEditGameOpen: true})}}>
              <div className='no-data-text'>No game set at this date</div>
              <div className='plus-icon'> + </div>
          </div>
          : ''
        }

        {
          this.state.isEditGameOpen
            ? <GameInfo />
            
            : ''
        }
       </div>
      </div>
    );
  }
}


export default Games;
