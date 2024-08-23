import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useDataStore from "../store/useDataStore";
import { getTotalExpensesForCategories } from "../functions/graphs";

const CategoryGraph = () => {
  const { categories, transactions } = useDataStore();

  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("thisMonth");

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [maxExpenses, setMaxExpenses] = useState(0);

  useEffect(() => {
    const functionData = getTotalExpensesForCategories(
      categories,
      transactions,
      period
    );
    setData(functionData.categories);
    setMaxExpenses(functionData.maxExpense);
  }, [period]);

  return (
    <div className="w-full h-96 p-1 lg:p-6 border border-zinc-800 rounded-md overflow-hidden mb-8">
      <div className="flex mb-5 justify-end text-xs">
        <button
          onClick={() => setPeriod("thisMonth")}
          className={`px-4 py-1 ${
            period === "thisMonth" ? "bg-zinc-800 text-white rounded-md" : ""
          }`}
        >
          Questo mese
        </button>
        <button
          onClick={() => setPeriod("thisYear")}
          className={`px-4 py-1 ${
            period === "thisYear" ? "bg-zinc-800 text-white rounded-md" : ""
          }`}
        >
          Quest'anno
        </button>
        <button
          onClick={() => setPeriod("allTime")}
          className={`px-4 py-1 ${
            period === "allTime" ? "bg-zinc-800 text-white rounded-md" : ""
          }`}
        >
          Sempre
        </button>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            dataKey="amount"
            width={30}
            domain={([dataMin, dataMax]) => {
              return [0, maxExpenses];
            }}
          />
          <Tooltip />
          <Bar
            dataKey="amount"
            name="Totale spesa"
            onMouseEnter={(data, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === hoveredIndex ? entry.hexColor : "#000000"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryGraph;
