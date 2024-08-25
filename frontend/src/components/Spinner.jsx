import React from "react";
import CoinAnimation from "./CoinAnimation";

const Spinner = () => {
  return (
    <div className="w-full min-h-[200px] flex justify-center items-center">
      <CoinAnimation />
    </div>
  );
};

export default Spinner;
