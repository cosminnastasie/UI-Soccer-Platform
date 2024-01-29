import './App.css';
import './scss/style.scss';
import "@blueprintjs/core/lib/css/blueprint.css";
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './elements/Layout'
import Home from "./pages/Home";
import Players from "./pages/Players";
import Games from "./pages/Games";
import Calendar from "./pages/Calendar";
import Training from "./pages/Training";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Home />} /> */}
            <Route index element={<Calendar />} />
            <Route path="*" element={<div>404</div>} />
            <Route path="/players" element={<Players />} />
            <Route path="/games" element={<Games />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/training" element={<Training />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}


export default App;
