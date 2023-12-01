import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
