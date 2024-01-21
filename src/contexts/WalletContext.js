import React, { createContext, useState, useContext, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    // Automatically connect to the wallet if accounts are already authorized
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();

        if (network.chainId !== 11155111) {
          alert("Please connect to the Sepolia network.");
          return;
        }

        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
