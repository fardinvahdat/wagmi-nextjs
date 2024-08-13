"use client";
import React from "react";
export default function WriteContract({
  increament,
  decreament,
  isPending,
  status,
  hash,
}: {
  increament: () => void;
  decreament: () => void;
  isPending: boolean;
  status: string;
  hash: string;
}) {
  return (
    <>
      {isPending ? (
        "Loading..."
      ) : (
        <div className="flex gap-2">
          <button onClick={() => increament()} disabled={isPending}>
            Increase value
          </button>
          <button onClick={() => decreament()} disabled={isPending}>
            Decrease value
          </button>
        </div>
      )}
      <p>
        {hash && `write to contract ${status}, hash : `}
        <a
          href={`https://sepolia.etherscan.io/tx/${hash}`}
          target="_blank"
          className="underline text-blue-800 font-medium"
        >
          {hash}
        </a>
      </p>
    </>
  );
}
