import React, { useState } from 'react';
import { parseUnits } from 'ethers';
import { useAccount, useConnect, useDisconnect, useContractRead } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { TextField } from '@mui/material';

import CustomAlert from './component/CustomAlert';

const App = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [approved, setApproved] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const connectWallet = () => {
    if (window.ethereum) isConnected ? disconnect() : connect();
    else setShowAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  const handleApproveTokens = async () => {
    if (tokens === 0) setTokenError(true);
    else {
      setTokenError(false);

      try {
        const tokenAddress = '0xB2d507DFBb527925F038E85B4b2e4E72cEbE17b6';
        const approvalAmount = parseUnits(tokens.toString(), 18);

        setApproved(true);
      } catch (error) {
        console.error('Error approving tokens:', error.message);
      }
    }
  };

  const handleBuy = () => {};

  const renderMessage = (message) => (
    <h1 className='text-xl mt-4'> {message}</h1>
  );

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-red-50'>
      <button
        className='text-lg text-white px-8 py-4 rounded-md bg-purple-800'
        onClick={connectWallet}
      >
        {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
      {renderMessage(
        isConnected ? `Connected to: ${address}` : 'Metamask not connected'
      )}

      <div className='mt-24 flex justify-center items-start gap-8'>
        <TextField
          type='number'
          error={tokenError}
          id='outlined-error-helper-text'
          label='Error'
          helperText={tokenError ? 'Tokens must be more than 0' : ''}
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
        />
        <button
          className='text-lg text-purple-800 px-8 py-4 rounded-md bg-white'
          onClick={handleApproveTokens}
        >
          Approve Tokens
        </button>
      </div>

      {approved ? (
        <button
          className='mt-12 text-lg text-purple-800 px-8 py-4 rounded-md bg-white'
          onClick={handleBuy}
        >
          Buy
        </button>
      ) : null}

      <CustomAlert
        showAlert={showAlert}
        handleCloseAlert={handleCloseAlert}
        message='Browser doest not have Metamask extension'
      />
    </div>
  );
};

export default App;
