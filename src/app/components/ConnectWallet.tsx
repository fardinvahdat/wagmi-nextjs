"use client";
import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function ConnectWallet() {
  const { open } = useWeb3Modal();

  const connectWallet = () => {
    open();
  };

  return <button onClick={connectWallet}>Connect Wallet</button>;
}
