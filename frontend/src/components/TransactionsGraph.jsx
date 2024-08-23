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
} from "recharts";
import useDataStore from "../store/useDataStore";
import { getDailyExpensesAndIncomes } from "../functions/graphs";
import { applyFilters } from "../functions/filters";
import useFiltersStore from "../store/useFiltersStore";

const TransactionsGraph = () => {
  //store
  const { transactions } = useDataStore();
  const { filters } = useFiltersStore();
  //component state
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("thisMonth");
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    // Apply filters and sort the transactions
    const filteredTransactions = transactions.filter((transaction) =>
      applyFilters(transaction, filters)
    );

    setData(getDailyExpensesAndIncomes(filteredTransactions, period));
  }, [period, filters]);

  return (
    <div
      className={
        fullscreen
          ? "fixed top-0 left-0 z-50 w-full h-full bg-white p-10"
          : `w-full h-96 p-1 lg:p-6 border border-zinc-400 lg:border-zinc-800 rounded-md overflow-hidden mb-8`
      }
    >
      <div className="flex mb-5 text-xs">
        <button
          onClick={() => setFullscreen(!fullscreen)}
          className={`me-auto px-4 py-1 border rounded-md ${
            fullscreen ? "bg-zinc-800 text-white" : ""
          }`}
        >
          Fullscreen
        </button>
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
          <Tooltip />
          <XAxis dataKey="formattedDate" />
          <Bar
            dataKey="totalExpenses"
            name="Totale spesa"
            activeBar={<Rectangle fill="#71717A" />}
            fill="#71717A"
          ></Bar>
          <Bar
            dataKey="totalIncomes"
            name="Totale spesa"
            activeBar={<Rectangle fill="#22C55E" />}
            fill="#22C55E"
          ></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsGraph;
