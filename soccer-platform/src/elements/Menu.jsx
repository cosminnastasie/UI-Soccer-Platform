import React from 'react'
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (
        <nav className="menu-sidebar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/players">Players</Link>
                </li>
            </ul>
        </nav>
    );
  }
}


export default Menu;
