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
  LineChart,
  Line,
} from "recharts";
import useDataStore from "../store/useDataStore";
import { getDailyExpensesAndIncomes } from "../functions/graphs";
import { applyFilters } from "../functions/filters";
import useFiltersStore from "../store/useFiltersStore";
import { Maximize2, Minimize2 } from "lucide-react";

const TransactionsGraph = () => {
  //store
  const { transactions, user } = useDataStore();
  const { filters } = useFiltersStore();
  //component state
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("thisMonth");
  const [fullscreen, setFullscreen] = useState(false);
  // to make recharts work as intended
  const [maxExpenses, setMaxExpenses] = useState(0);

  useEffect(() => {
    // Apply filters and sort the transactions
    const filteredTransactions = transactions.filter((transaction) =>
      applyFilters(transaction, filters)
    );

    const functionData = getDailyExpensesAndIncomes(
      filteredTransactions,
      period
    );

    setData(functionData.dailyData);
    setMaxExpenses(functionData.maxTotal);
  }, [period, filters]);

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-black p-2 rounded-sm border text-sm pe-5">
          <p className="font-semibold mb-1">{label}</p>
          <div>
            Uscite:{" "}
            <span style={{ color: payload[0].stroke }}>
              &euro;{payload[0].payload.totalExpenses}
            </span>
          </div>
          <div>
            Entrate:{" "}
            <span style={{ color: payload[1].stroke }}>
              &euro;{payload[1].payload.totalIncomes}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={
        fullscreen
          ? "fixed top-0 left-0 z-50 w-full h-full bg-white dark:bg-black p-2 lg:p-10"
          : `w-full h-96 p-1 lg:p-6 border border-gray-400 rounded-md overflow-hidden mb-8`
      }
    >
      <div className="flex mb-5 text-xs">
        <div
          onClick={() => setFullscreen(!fullscreen)}
          className="me-auto px-4 py-1 border rounded-md cursor-pointer"
        >
          {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </div>
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
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid
            strokeDasharray="2 2"
            opacity={user?.settings.isDarkModeOn ? 0.3 : 1}
          />
          <Tooltip
            content={customTooltip}
            cursor={
              user?.settings.isDarkModeOn
                ? { color: "#ffffff" }
                : { color: "#000000" }
            }
          />
          <YAxis
            width={40}
            style={{
              fontSize: "10px",
            }}
            domain={([dataMin, dataMax]) => {
              return [0, maxExpenses];
            }}
          />
          <XAxis
            dataKey="formattedDate"
            style={{
              fontSize: "10px",
            }}
          />
          <Line
            type="monotone"
            dataKey="totalExpenses"
            name="Totale spese nel giorno"
            stroke="#71717A"
            strokeWidth={2}
          ></Line>
          <Line
            type="monotone"
            dataKey="totalIncomes"
            name="Totale entrate nel giorno"
            stroke="#22C55E"
            strokeWidth={2}
          ></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsGraph;
