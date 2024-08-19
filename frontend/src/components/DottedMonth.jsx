import React, { useEffect, useState } from "react";

const DottedMonth = ({ average, dailyTotalsArray, downLimit, upLimit }) => {
  const [upScale, setUpScale] = useState(0);
  const [downScale, setDownScale] = useState(0);
  useEffect(() => {
    const upscale = ((upLimit - average) / 100).toFixed(3);
    const downscale = ((downLimit - average) / 100).toFixed(3);
    setUpScale(upscale);
    setDownScale(downscale);

    console.log("average", average);
    console.log("upLimit", upLimit);
    console.log("downLimit", downLimit);
    console.log("upscale", upscale);
    console.log("downscale", downscale);
  }, [downLimit, upLimit, average]);
  return (
    <div className="grid grid-cols-7 gap-1">
      {dailyTotalsArray?.map((item, index) => (
        <div key={index} className="h-5 w-5 rounded-full overflow-hidden">
          <div
            className={`h-5 w-5 ${
              item > average ? `bg-green-800` : `bg-red-800`
            }`}
            style={{
              opacity:
                item > average
                  ? Math.floor((item - average) / upScale) / 100
                  : Math.floor((item - average) / downScale) / 100,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default DottedMonth;
