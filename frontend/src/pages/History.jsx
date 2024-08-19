import React, { useEffect } from "react";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import TransactionsTable from "../components/TransactionsTable";

const History = ({
  transactions,
  filters,
  setFilters,
  handleCategoriesTag,
  applyFilters,
}) => {
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: "all",
    }));
  }, []);
  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Cronologia</div>
        <div className="border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
          <select
            className="cursor-pointer flex items-center gap-x-2 text-sm border-none"
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                type: e.target.value,
              }))
            }
            value={filters.type}
          >
            <option value="all">Tutte le transazioni</option>
            <option value="expense">Uscite</option>
            <option value="income">Entrate</option>
            <option value="withdrawal">Prelievi</option>
          </select>
        </div>
        <div className="border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
          <select
            className="cursor-pointer flex items-center gap-x-2 text-sm border-none"
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                categories: e.target.value,
              }))
            }
            value={filters.categories}
          >
            <option value="all">Tutte le transazioni</option>
            <option value="categorized">Categorizzate</option>
            <option value="uncategorized">Non categorizzate</option>
          </select>
        </div>
      </div>
      <div className="flex m-8 gap-8">
        <TransactionsTable
          transactions={transactions}
          handleCategoriesTag={handleCategoriesTag}
          applyFilters={applyFilters}
        />
      </div>
    </div>
  );
};

export default History;
