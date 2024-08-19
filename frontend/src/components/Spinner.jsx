import React from "react";
import CoinAnimation from "./CoinAnimation";

const Spinner = () => {
  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-center items-center">
      <CoinAnimation />
    </div>
  );
};

export default Spinner;
