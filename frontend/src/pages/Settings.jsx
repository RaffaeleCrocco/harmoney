import React from "react";
import CoinAnimation from "../components/CoinAnimation";

const Settings = () => {
  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Impostazioni</div>
      </div>
      <div className="min-w-full h-[60vh] flex items-center justify-center">
        <CoinAnimation />
      </div>
    </div>
  );
};

export default Settings;
