// Bridge.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useWallet } from "../contexts/WalletContext"; // Ensure the path is correct
import "../css/Bridge.css";

function Bridge() {
  const { walletAddress } = useWallet(); // Using useWallet hook
  const [bridgeAmount, setBridgeAmount] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Predefined token address
  const tokenAddress = "0xCAEfdeEE4e3895bc9b7FeD9a155F69389659a21f";

  useEffect(() => {
    if (walletAddress) {
      fetchTokenBalance(walletAddress);
    }
  }, [walletAddress]);

  const fetchTokenBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        tokenAddress,
        [
          // Replace with your contract's ABI
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        provider
      );
      const balance = await contract.balanceOf(address);
      const bal = ethers.utils.formatUnits(balance, 18); // Adjust the decimal as per your token's configuration
      setTokenBalance(parseFloat(bal).toFixed(2));
    } catch (error) {
      console.error("Error fetching token balance: ", error);
    }
  };

  const bridgeTokenHandler = () => {
    console.log("Bridging", bridgeAmount, "tokens");
    setShowErrorPopup(true);
  };

  const handleMaxClick = () => {
    setBridgeAmount(tokenBalance);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <section className="hero-section">
      <img src="images/logowithtext.png" alt="Hero" className="hero-image" />
      <div className="bridge-box">
        <h1 className="bridge-heading">BRIDGE TO</h1>
        <div>
          <span className="switch">
            <input type="checkbox" id="switcher" />
            <label htmlFor="switcher"></label>
          </span>
        </div>
        {walletAddress && (
          <div>
            <label className="token-balance">
              Token Balance: {tokenBalance}
            </label>
            <button onClick={handleMaxClick}>Max</button>
          </div>
        )}
        {showErrorPopup && (
          <div className="error-popup">
            <div className="error-content">
              <p>Bridge under maintenance</p>
              <button className="close-button" onClick={closeErrorPopup}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}
        <input
          type="text"
          placeholder="Enter amount of MII to bridge"
          value={bridgeAmount}
          onChange={(e) => setBridgeAmount(e.target.value)}
        />
        <button onClick={bridgeTokenHandler}>Bridge</button>
      </div>
    </section>
  );
}

export default Bridge;
