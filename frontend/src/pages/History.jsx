import React, { useEffect } from "react";
import TransactionsTable from "../components/TransactionsTable";
import useFiltersStore from "../store/useFiltersStore";

const History = () => {
  //store
  const { filters, setFilters } = useFiltersStore();

  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Cronologia</div>
        <div className="border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
          <select
            className="cursor-pointer flex items-center gap-x-2 text-sm border-none"
            onChange={(e) => setFilters({ type: e.target.value })}
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

export default History;
