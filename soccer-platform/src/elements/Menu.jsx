import React from 'react';
import { Link } from "react-router-dom";
import {getData} from './../requests/requests';
import {URLS} from './../requests/constants';
import UISelect from '../components/UISelect';
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      selectedTeam: ''
    };
  }


  componentDidMount(){
    getData(URLS.teams).then(result=>{
      
      this.setState({teams: result, selectedTeam: result?.[0]?.Prefix}); 
    });
  }

  handleInputChange(item){}

  render() {
    return (
        <nav className="menu-sidebar">
            <ul>
                {/* <li><Link to="/">Home</Link></li> */}
                <li><Link to="/">Calendar</Link></li>
                <li><Link to="/players">Players</Link></li>
                <li><Link to="/training">Training</Link></li>
                <li><Link to="/playground">Playground</Link></li>
                <li><Link to="/games">Games</Link></li>
                {/* <li><Link to="/calendar">Calendar</Link></li> */}
            </ul>
            {/* <ul>
              <li key="teams">
                <UISelect
                    items={this.state.teams.map((i=>{
                      if(i.IdTeams)
                        return {key: i.Prefix, value: i.Prefix}
                      else{
                        return i;
                      }
                    }))} 
                    onChange={this.handleInputChange} 
                    itemKey='team'
                    selectedItem={this.state.selectedTeam}
                />
              </li>
            </ul> */}
        </nav>
    );
  }
}


export default Menu;
