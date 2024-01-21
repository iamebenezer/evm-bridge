import React, { useState } from "react";
import "../css/Faucet.css";
const { ethers } = require("ethers");

export default function FaucetInput() {
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const addressChangeHandler = (event) => {
    setEthAddress(event.target.value);
    setIsAddressValid(true); // Reset validation state when user edits the address
  };

  const isValidAddress = (address) => {
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch {
      return false;
    }
  };

  const truncateHash = (hash) =>
    `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!isValidAddress(ethAddress)) {
      setIsAddressValid(false);
      return;
    }

    setIsSending(true);
    setIsAddressValid(true);

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_NODE_RPC_URL
      );
      const walletAddress = new ethers.Wallet(
        process.env.REACT_APP_FAUCET_ADDRESS_PRIVATE_KEY,
        provider
      );

      const tx = {
        to: ethAddress,
        value: ethers.utils.parseEther(process.env.REACT_APP_PER_REQUEST_ETHER),
      };

      const transaction = await walletAddress.sendTransaction(tx);
      await transaction.wait();
      setTransactionHash(transaction.hash);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const closeModal = () => setModalOpen(false);

  const buttonClass = isSending
    ? "faucet-button sending"
    : isAddressValid
    ? "faucet-button"
    : "faucet-button invalid";

  const buttonContent = isSending
    ? "Sending..."
    : isAddressValid
    ? "Claim Mii"
    : "Invalid Address";

  return (
    <div className="faucet-container">
      <h4 className="faucet-heading">Mii Chain Testnet Faucet</h4>

      <form onSubmit={submitHandler} className="faucet-form">
        <input
          type="text"
          className="faucet-textfield"
          onChange={addressChangeHandler}
          value={ethAddress}
          placeholder="Enter your Mii wallet address"
          required
        />
        <button
          id="submitButton"
          type="submit"
          className={buttonClass}
          disabled={isSending}
        >
          {buttonContent}
          {isSending && <span className="loader"></span>}
        </button>
      </form>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <p>
              Deposit has been sent. Transaction Hash:
              <a
                href={`https://miiexplorer.org/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {truncateHash(transactionHash)}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
