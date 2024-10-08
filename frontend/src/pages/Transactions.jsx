import React, { useEffect } from "react";
import TransactionsTable from "../components/TransactionsTable";
import useFiltersStore from "../store/useFiltersStore";
import { SlidersHorizontal } from "lucide-react";
import MultiSelect from "../components/MultiSelect";
import useContentStore from "../store/useContentStore";
import useDataStore from "../store/useDataStore";

const Transactions = () => {
  //store
  const { user } = useDataStore();
  const { setModalContent, setShowModal } = useContentStore();
  const { filters, setFilters } = useFiltersStore();

  //token
  const token = localStorage.getItem("token");

  return (
    <div>
      <div className="w-full border-b border-zinc-200 dark:border-gray-600 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Transazioni</div>
        <SlidersHorizontal
          className="cursor-pointer mx-2 text-gray-400"
          size={16}
          onClick={() => {
            setModalContent(5);
            setShowModal(true);
          }}
        />
        <div className="w-52 h-8 py-[0.75px] hidden lg:block">
          <MultiSelect />
        </div>
        <div className="hidden lg:block border border-zinc-800 dark:border-gray-400 text-zinc-800 rounded-md py-1 ps-2 pe-4">
          <select
            className="cursor-pointer flex items-center gap-x-2 text-sm border-none dark:bg-black dark:text-gray-200"
            onChange={(e) => setFilters({ period: e.target.value }, token)}
            value={filters.period}
          >
            <option value="this_month">Questo mese</option>
            <option value="this_week">Questa settimana</option>
            <option value="today">Oggi</option>
            <option value="this_trimester">Questo trimestre</option>
            <option value="always">Sempre</option>
          </select>
        </div>
        <div
          onClick={() => {
            setShowModal(true);
            setModalContent(1);
          }}
          className="text-sm cursor-pointer text-center bg-zinc-800 dark:bg-white text-white dark:text-black rounded-md py-[5.2px] px-4"
        >
          Crea nuova
        </div>
      </div>
      <div className="flex p-5 lg:p-8  gap-8">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Transactions;
