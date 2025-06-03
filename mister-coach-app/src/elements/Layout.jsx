import { Outlet } from "react-router-dom";
import React from 'react';
import Menu from './Menu'

class Layout extends React.Component {
    render() {
        return (
            <>
                <Menu />
                <Outlet />
            </>
        );
    }
}



export default Layout;