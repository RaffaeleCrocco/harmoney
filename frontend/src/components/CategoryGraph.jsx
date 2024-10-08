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
import useFiltersStore from "../store/useFiltersStore";
import { applyFilters } from "../functions/filters";
import { Maximize2, Minimize2 } from "lucide-react";

const CategoryGraph = () => {
  //store
  const { categories, transactions, user } = useDataStore();
  const { filters, setFilters } = useFiltersStore();
  //component state
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("thisMonth");
  const [fullscreen, setFullscreen] = useState(false);
  //utils
  const token = localStorage.getItem("token");
  // to make recharts work as intended
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [maxExpenses, setMaxExpenses] = useState(0);

  useEffect(() => {
    // Apply filters and sort the transactions
    const filteredTransactions = transactions.filter((transaction) =>
      applyFilters(transaction, filters)
    );

    const functionData = getTotalExpensesForCategories(
      categories,
      filteredTransactions,
      period
    );
    setData(functionData.categories);
    setMaxExpenses(functionData.maxExpense);
  }, [period, filters]);

  const handleCategorySelected = (selectedCategoryId) => {
    const isIncluded = filters.selectedCategories.includes(selectedCategoryId);

    const updatedCategories = isIncluded
      ? filters.selectedCategories.filter((id) => id !== selectedCategoryId)
      : [...filters.selectedCategories, selectedCategoryId];

    setFilters({ selectedCategories: updatedCategories }, token);
  };

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-black p-2 rounded-sm border text-sm pe-5">
          <p className="font-semibold mb-1">{label}</p>
          <div>
            Uscite: <span>&euro;{payload[0].value}</span>
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
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid
            strokeDasharray="2 2"
            opacity={user?.settings.isDarkModeOn ? 0.3 : 1}
          />
          <XAxis
            dataKey="name"
            style={{
              fontSize: "10px",
            }}
          />
          <YAxis
            dataKey="amount"
            width={30}
            style={{
              fontSize: "10px",
            }}
            domain={([dataMin, dataMax]) => {
              return [0, maxExpenses];
            }}
          />
          <Tooltip
            content={customTooltip}
            cursor={
              user?.settings.isDarkModeOn
                ? { opacity: "0.2" }
                : { opacity: "0.8" }
            }
          />
          <Bar
            dataKey="amount"
            name="Totale spesa"
            onMouseEnter={(data, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                onClick={() => handleCategorySelected(entry._id)}
                fill={
                  user?.settings.isSimpleModeOn
                    ? index === hoveredIndex
                      ? entry.hexColor
                      : user?.settings.isDarkModeOn
                      ? "#a6a6a6"
                      : "#000000"
                    : index === hoveredIndex
                    ? user?.settings.isDarkModeOn
                      ? "#a6a6a6"
                      : "#000000"
                    : entry.hexColor
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryGraph;
