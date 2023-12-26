import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Piano from "./components/Pages/Sequencer/Piano";
import "./App.css";

function App() {
  document.title = "ReSound";
  return (
    <div className="App">
      <header>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/piano" element={<Piano />} />
            <Route path="/home" />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
