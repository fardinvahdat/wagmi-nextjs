"use client";

import { useState } from "react";
import CustomWallet from "./custom-wallet/custom-wallet";

export default function Home() {
  const [isShown, setIsShown] = useState<boolean>(true);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isShown ? (
        <CustomWallet changeVisibility={setIsShown} />
      ) : (
        "Fetching New Data ..."
      )}
    </main>
  );
}
