import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import React, { useEffect } from "react";
import TransactionsTable from "../components/TransactionsTable";
import useFiltersStore from "../store/useFiltersStore";

const Incomes = () => {
  //store
  const { filters, setFilters } = useFiltersStore();

  useEffect(() => {
    setFilters({ type: "income" });
  }, []);

  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Entrate</div>
        <div className="hidden lg:block border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
          <select
            className="cursor-pointer flex items-center gap-x-2 text-sm border-none"
            onChange={(e) => setFilters({ period: e.target.value })}
            value={filters.period}
          >
            <option value="this_month">Questo mese</option>
            <option value="this_week">Questa settimana</option>
            <option value="today">Oggi</option>
            <option value="this_trimester">Questo trimestre</option>
            <option value="always">Sempre</option>
          </select>
        </div>
        <div className="border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
          <select
            className="cursor-pointer flex items-center gap-x-2 text-sm border-none"
            onChange={(e) => setFilters({ categories: e.target.value })}
            value={filters.categories}
          >
            <option value="all">Tutte le transazioni</option>
            <option value="categorized">Categorizzate</option>
            <option value="uncategorized">Non categorizzate</option>
          </select>
        </div>
      </div>
      <div className="flex m-8 gap-8">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Incomes;
