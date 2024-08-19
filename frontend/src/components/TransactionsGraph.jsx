import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

const TransactionsGraph = ({ transactions }) => {
  return (
    <div className="w-full h-96 p-6 border border-zinc-800 rounded-md overflow-hidden">
      <VictoryChart
        width="1000"
        theme={VictoryTheme.grayscale}
        domain={{ x: [1, 30] }}
        domainPadding={{ x: 10 }}
      >
        <VictoryAxis
          tickValues={[7, 14, 21, 28]}
          tickFormat={["Week 1", "Week 2", "Week 3", "Week 4"]}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar data={transactions} x="title" y="amount" />
      </VictoryChart>
    </div>
  );
};

export default TransactionsGraph;
