import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Piano from "./components/Pages/Piano";
import "./App.css";

function App() {
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
