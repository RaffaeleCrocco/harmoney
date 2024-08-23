import React, { useEffect } from "react";
import TransactionsTable from "../components/TransactionsTable";
import MoneyIland from "../components/MoneyIland";
import useContentStore from "../store/useContentStore";
import useFiltersStore from "../store/useFiltersStore";

const Overview = () => {
  //store
  const { setModalContent, setShowModal } = useContentStore();
  const { filters, setFilters } = useFiltersStore();

  useEffect(() => {
    setFilters({ type: "all" });
  }, []);

  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Overview</div>
        <div className="hidden lg:block border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
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
        <div className="hidden lg:block border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
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
        <div
          onClick={() => {
            setShowModal(true);
            setModalContent(1);
          }}
          className="text-sm cursor-pointer text-center bg-zinc-800 text-white rounded-md py-[5.2px] px-4"
        >
          Crea nuova
        </div>
      </div>
      <div className="flex flex-col lg:flex-row p-5 lg:p-8 gap-5 lg:gap-8">
        <MoneyIland />
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Overview;
