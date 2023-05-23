import React, { useCallback, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { WagmiConfig, configureChains, useAccount, Chain, createClient, useSigner } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'
import { polygonMumbai, optimismGoerli, goerli, gnosis, gnosisChiado  } from "@wagmi/chains";
import { CustomSignatureProvider } from "./CustomSignatureProvider";
import { constants, providers } from "ethers";
import { Banana } from '@rize-labs/banana-wallet-sdk/dist/BananaProvider'
import { Chains } from '@rize-labs/banana-wallet-sdk/dist/Constants';
import { Wallet, Banana4337Provider } from '@rize-labs/banana-wallet-sdk'
import Home from './pages/home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RequestView from './pages/view';
import Layout from './pages/layout';
import RequestContext from './context/RequestContext';
import { RequestNetwork } from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { ToastContainer } from 'react-toastify';


import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { BananaWallet } from '@rize-labs/banana-rainbowkit-plugin'


const getBananaInstance = async () => {
  const bananaInstance = new Banana(Chains.chiadoTestnet);
  const someWalletName: string = bananaInstance.getWalletName();
  const walletInstanceFromConnect: Wallet = await bananaInstance.connectWallet(someWalletName);
  const bananaProvider: Banana4337Provider = walletInstanceFromConnect.getProvider();
  return bananaProvider;
};


const { chains, provider } = configureChains(
  [polygonMumbai, optimismGoerli, goerli, gnosis, gnosisChiado],
  [publicProvider()]
)

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      BananaWallet({ chains, connect: { networkId: 10200 } }),
      metaMaskWallet({ chains, shimDisconnect: true }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      injectedWallet({ chains, shimDisconnect: true }),
    ],
  },
]);


const wagmiClient = createClient({
  connectors,
  provider,
  autoConnect: true,
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/view/:requestId',
        element: <RequestView />
      }
    ]
  }
])


 function Router() {
  
  const { data: walletClient } = useSigner()
  let _signatureProvider: any
  const bananaProvider = getBananaInstance()
  const requestClient = useMemo(() => {
    if (!walletClient)
      return new RequestNetwork({
        nodeConnectionConfig: { baseURL: "https://xdai.gateway.request.network/" },
      })
    return new RequestNetwork({
      nodeConnectionConfig: { baseURL: "https://xdai.gateway.request.network/" },
      signatureProvider: new Web3SignatureProvider(provider),
    })
  }, [walletClient])

  return <RequestContext value={requestClient}>
    <RouterProvider router={router} />
  </RequestContext>
}

function App() {
  
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Router />
        <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>

  );
}

export default App;
