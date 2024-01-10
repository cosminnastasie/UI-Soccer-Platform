import './App.css';
import './scss/style.scss';
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Layout from './elements/Layout'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<div>404</div>} />
            <Route path="/players" element={<Players />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}


export default App;
