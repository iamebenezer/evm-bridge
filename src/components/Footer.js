// components/Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import "../css/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          <a
            href="https://www.twitter.com/MiiChainTeam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} /> Twitter
          </a>
        </div>
        <div className="footer-right">
          <a
            href="https://t.me/miichain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTelegramPlane} /> Telegram
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Mii Chain Bridge. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
