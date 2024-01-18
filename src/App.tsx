import React from "react";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Piano from "./components/Pages/Sequencer/Piano";
import Home from "./components/Pages/Home/Home";
import "./App.css";

function App() {
  document.title = "ReSound";
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <div id="App">
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/piano" element={<Piano />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
