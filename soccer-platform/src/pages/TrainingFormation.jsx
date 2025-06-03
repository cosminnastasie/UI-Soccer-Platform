import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import './TrainingFormation.css'
import { URLS } from './../requests/constants'
import { getData, postData } from './../requests/requests';


const PLAYERS = {
    '4-3-3': [
        { number: 1, top: '90%', left: '50%' },
        { number: 3, top: '70%', left: '20%' },
        { number: 5, top: '70%', left: '37%' },
        { number: 4, top: '70%', left: '62%' },
        { number: 2, top: '70%', left: '80%' },
        { number: 6, top: '50%', left: '50%' },
        { number: 10, top: '45%', left: '33%' },
        { number: 8, top: '45%', left: '67%' },
        { number: 9, top: '20%', left: '50%' },
        { number: 11, top: '22%', left: '33%' },
        { number: 7, top: '22%', left: '67%' },
    ]
}

class TrainingFormation extends Component {
    state = {
        sidebarOpen: true,
        system: '4-3-3',
        allPlayers: [],
        hoveredPosition: null,
    };

    toggleSidebar = () => {
        this.setState((prevState) => ({
            sidebarOpen: !prevState.sidebarOpen,
        }));
    };

    componentDidMount() {
        getData(URLS.players).then(result => {
            this.setState({ allPlayers: result })
        })
    }
    setIsHovered(p, hovering) {
        const position = p.Position1; // assuming Position1 is like '9'
        this.setState({ hoveredPosition: hovering ? parseInt(position) : null });
    }

    setTshirtIsHovered(p, hovering) {
        const position = p.number; // assuming Position1 is like '9'
        this.setState({ hoveredTshirtPosition: hovering ? parseInt(position) : null });
    }

    handlePlayerSelect(p) {
        let playerPosition, playerId;
        const updatedPlayers = this.state.allPlayers.map(player => {
            if(player.IdPlayers === p.IdPlayers){
                playerPosition = player.Position1
                playerId = player.IdPlayers
                this.setState({ hoveredPosition: null})
                return { ...player, isSelected: !player.isSelected }
            }else{
                return player;
            }
        });
        updatedPlayers.map(player=>{
            if(player.IdPlayers != playerId && parseInt(player.Position1) == parseInt(playerPosition) ){
                player.isSelected = null
            }
            return player;
        })
        console.log(playerPosition, playerId)
        // updatedPlayers.map(player => {
        //     if(player.)
        //     return player;
        // })

        this.setState({ allPlayers: updatedPlayers });
    }

    getPositionSelectedPlayer = (position) => {
        let player = this.state.allPlayers.filter(p => p.isSelected).filter(p => {
            return (parseInt(p.Position1) == position)
        })
        if (player.length)
            return player[0].Name
    }



    render() {
        console.log('state...', this.state)
        const { sidebarOpen } = this.state;
        let sistemPositions = PLAYERS[this.state.system];
        let players = this.state.allPlayers
        return (
            <div className={`field-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

                {/* ################## Sidebar  #################*/}

                <div className="all-players-col">
                    {sidebarOpen && (
                        <div className="sidebar-content">
                            <p className='f-2'>All Players</p>
                            <div className='shaddow-box'>
                                {
                                    players.map((p, k) => {
                                        return <div
                                            className={`l1-list-item`}
                                            onMouseEnter={() => this.setIsHovered(p, true)}
                                            onMouseLeave={() => this.setIsHovered(p, false)}
                                            onClick={() => this.handlePlayerSelect(p)}
                                        >
                                            <span className='f-3'>{k + 1}</span>
                                            <span className={`${this.state.hoveredTshirtPosition == parseInt(p.Position1) ? 'f-5' : 'f-4'}`}>{p.Name}</span>
                                        </div>
                                    })

                                }

                            </div>
                        </div>
                    )}

                    <Button
                        icon={sidebarOpen ? 'chevron-left' : 'chevron-right'}
                        minimal
                        onClick={this.toggleSidebar}
                        className="toggle-button"
                    />
                    {/* <div className='border-right'></div> */}
                </div>


                {/* ################## Field  #################*/}

                <div className="training-players-col">
                    <div className='team-content  field-width'>
                        <div className='header-row-l2 field-width'>
                            <div className='team-title field-width'>Unirea Bascov</div>
                            <div className='f-3'>System: {this.state.system}</div>

                        </div>
                        {sistemPositions.map((player, index) => {
                            const isHovered = this.state.hoveredPosition === player.number;
                            const isSelected = !!this.getPositionSelectedPlayer(player.number); // checks for player presence

                            const tshirtClass = isHovered
                                ? 'orange-shirt'
                                : isSelected
                                    ? 'blue-shirt'
                                    : '';

                            return (
                                <div
                                    key={index}
                                    className={`player-box ${tshirtClass}`}
                                    style={{ top: player.top, left: player.left }}
                                    onMouseEnter={() => this.setTshirtIsHovered(player, true)}
                                    onMouseLeave={() => this.setTshirtIsHovered(player, false)}
                                >
                                    {player.number}
                                    <span>{this.getPositionSelectedPlayer(player.number)}</span>
                                </div>
                            );
                        })}

                    </div>
                    <div class="blue-overlay-box">
                        <div className='field-wrapper field-width'>
                            <div className='goal-arrea'></div>
                            <div className='penalty-arrea'></div>
                            <div className='center-arrea'>
                                <div className='center-circle'></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default TrainingFormation;
