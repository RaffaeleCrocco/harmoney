import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
} from "victory";

const CategoryGraph = ({ data }) => {
  return (
    <div className="w-full h-96 p-6 border border-zinc-800 rounded-md overflow-hidden">
      <VictoryPie
        padAngle={({ datum }) => datum.y}
        innerRadius={100}
        categories={{ x: data.categoryName }}
        data={data.totalExpenses}
      />
    </div>
  );
};

export default CategoryGraph;
