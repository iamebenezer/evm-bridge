import React from "react";
import { useWallet } from "../contexts/WalletContext"; // Adjust the path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/Header.css";

function Header() {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  const truncateAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <header>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <FontAwesomeIcon icon={faBars} />
        </label>
        <img
          src="images/logowithtext.png"
          alt="Mii Chain Bridge"
          className="logo-image"
        />
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="/faucet">Faucet</a>
          </li>
          <li>
            <a href="/bridge">Bridge</a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/MiiChainTeam"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a href="https://t.me/miichain" target="_blank" rel="noreferrer">
              Telegram
            </a>
          </li>
          <li>
            {walletAddress ? (
              <button
                className="wallet-address-button"
                onClick={disconnectWallet}
              >
                {truncateAddress(walletAddress)}
              </button>
            ) : (
              <button className="connect" onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
