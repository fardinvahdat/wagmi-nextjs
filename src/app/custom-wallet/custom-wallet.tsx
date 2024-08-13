"use client";
import React, { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWatchContractEvent,
  useReconnect,
} from "wagmi";

import ABI from "@/app/abi/ABI.json";

import { config } from "../config";

import ReadContract from "../components/ReadContract";
import ConnectWallet from "../components/ConnectWallet";
import WriteContract from "../components/WriteContract";

export default function CustomWallet({
  changeVisibility,
}: {
  changeVisibility: (show: boolean) => void;
}) {
  debugger;
  const { isConnected } = useAccount();
  const [counter, setCounter] = useState<number>(0);
  const { reconnect } = useReconnect();

  const {
    data: hash,
    isPending: isPending,
    status: writingStatus,
    writeContractAsync,
  } = useWriteContract();

  const { data: redData } = useReadContract({
    abi: ABI,
    address: "0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe",
    functionName: "getValue",
    query: {
      enabled: true,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  });

  useWatchContractEvent({
    ...config,
    address: "0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe",
    abi: ABI,
    eventName: "Increament",
    onLogs(logs) {
      setCounter(counter + 1);
      changeVisibility(false);
      setTimeout(() => {
        changeVisibility(true);
      }, 3000);
      console.log("New logs!", logs);
    },
    syncConnectedChain: true,
  });

  useWatchContractEvent({
    ...config,
    address: "0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe",
    abi: ABI,
    eventName: "Decreament",
    onLogs(logs) {
      setCounter(counter + 1);
      changeVisibility(false);
      setTimeout(() => {
        changeVisibility(true);
      }, 3000);
      console.log("New logs!", logs);
    },
    syncConnectedChain: true,
  });

  if (isConnected) {
    const increament = async () => {
      await writeContractAsync({
        abi: ABI,
        address: "0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe",
        functionName: "increament",
      });
    };
    const decreament = async () => {
      await writeContractAsync({
        abi: ABI,
        address: "0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe",
        functionName: "decreament",
      });
    };

    return (
      <>
        <ReadContract
          counter={counter}
          result={redData ? redData?.toString() : ""}
        />
        <WriteContract
          increament={increament}
          decreament={decreament}
          isPending={isPending}
          status={writingStatus}
          hash={hash || ""}
        />
      </>
    );
  }

  return <ConnectWallet />;
}
