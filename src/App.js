import React, { useState } from 'react';
// import { Contract, Provider } from 'ethers';
// import { useWagmi } from 'wagmi';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { TextField } from '@mui/material';

import CustomAlert from './component/CustomAlert';

const App = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [tokens, setTokens] = useState(0);
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

      // try {
      //   // Connect to Ethereum provider (Metamask, etc.)
      //   const provider = new ethers.providers.Web3Provider(window.ethereum);
      //   const signer = provider.getSigner();

      //   // Specify the ERC-20 token contract address
      //   const tokenAddress = '0xYourTokenAddress';

      //   // Specify the smart contract address that will use the tokens
      //   const smartContractAddress = '0xYourSmartContractAddress';

      //   // Create a new instance of the ERC-20 token contract
      //   const tokenContract = new ethers.Contract(
      //     tokenAddress,
      //     ['approve'],
      //     signer
      //   );

      //   // Convert the amount to approve to wei (if necessary)
      //   const amountInWei = ethers.utils.parseUnits(amountToApprove, 'ether');

      //   // Call the approve function to allow the smart contract to spend the tokens
      //   const tx = await tokenContract.approve(
      //     smartContractAddress,
      //     amountInWei
      //   );

      //   // Wait for the transaction to be mined
      //   await tx.wait();

      //   // Set success message
      //   // setMessage(`Tokens approved successfully: ${amountToApprove} tokens`);
      //   alert(`Tokens approved successfully: ${tokens} tokens`);
      // } catch (error) {
      //   // Handle errors and set an appropriate error message
      //   // setMessage(`Error: ${error.message}`);
      //   alert(`Error: ${error.message}`);
      // }

      // try {
      //   // Replace 'YourTokenAddress' and '100' with the actual token address and approval amount
      //   const tokenAddress = '0xB2d507DFBb527925F038E85B4b2e4E72cEbE17b6';
      //   const approvalAmount = parseUnits(tokens.toString(), 18);

      //   // Use wagmi to prompt the user for token approval
      //   const wagmi = new Wagmi();
      //   const approved = await wagmi.approveTokens(
      //     tokenAddress,
      //     approvalAmount
      //   );

      //   if (approved) {
      //     alert('Approved');
      //     // // Call your contract function that requires approved tokens
      //     // const transaction = await contract.yourContractFunction(
      //     //   approvalAmount
      //     // );

      //     // // Wait for the transaction to be mined
      //     // await transaction.wait();

      //     // // Display a success message to the user
      //     // console.log(
      //     //   'Tokens approved and contract function executed successfully!'
      //     // );
      //   } else {
      //     alert('Not Approved');

      //     // // Display a message if the user did not approve tokens
      //     // console.log('Token approval was not confirmed by the user.');
      //   }
      // } catch (error) {
      //   // Handle errors appropriately
      //   console.error('Error approving tokens:', error.message);
      // }
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

      <button
        className='mt-12 text-lg text-purple-800 px-8 py-4 rounded-md bg-white'
        onClick={handleBuy}
      >
        Buy
      </button>

      <CustomAlert
        showAlert={showAlert}
        handleCloseAlert={handleCloseAlert}
        message='Browser doest not have Metamask extension'
      />
    </div>
  );
};

export default App;
