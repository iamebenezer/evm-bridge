import React from "react";
import { WalletProvider } from "./contexts/WalletContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Bridge from "./pages/Bridge";
import FaucetInput from "./pages/Faucet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router, Routes, and Route

import "./App.css";

function App() {
  return (
    <WalletProvider>
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Bridge />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/faucet" element={<FaucetInput />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </WalletProvider>
  );
}

export default App;
