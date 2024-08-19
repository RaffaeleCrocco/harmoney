import React from "react";
import coin from "../assets/coin.png";

const CoinAnimation = () => {
  return (
    <div className="flex items-center min-h-[50vh]">
      <div className="relative w-20">
        <img
          src={coin}
          className="w-20 absolute bottom-0 left-0 animate-coin-1"
        />
        <img
          src={coin}
          className="w-20 absolute bottom-0 left-0 animate-coin-1 animation-delay-300 opacity-0"
        />
        <img
          src={coin}
          className="w-20 absolute bottom-0 left-0 animate-coin-1 animation-delay-600 opacity-0"
        />
        <img
          src={coin}
          className="w-20 absolute bottom-0 left-0 animate-coin-1 animation-delay-900 opacity-0"
        />
        <img
          src={coin}
          className="w-20 absolute bottom-0 left-0  animate-coin-1 animation-delay-1200 opacity-0"
        />
      </div>
    </div>
  );
};

export default CoinAnimation;
