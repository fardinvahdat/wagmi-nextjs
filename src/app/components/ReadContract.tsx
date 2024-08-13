// "use client";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";

export default function ReadContract({
  counter,
  result,
}: {
  counter: number;
  result: string;
}) {
  console.log("execute read contract", counter);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <button onClick={() => disconnect()}>Disconnect</button>
      <p>Connected Address : {address}</p>
      {result ? <p>value : {result}</p> : "Loading..."}
    </>
  );
}
