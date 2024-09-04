import React, { useEffect } from "react";
import TransactionsTable from "../components/TransactionsTable";
import useFiltersStore from "../store/useFiltersStore";
import { SlidersHorizontal } from "lucide-react";
import MultiSelect from "../components/MultiSelect";
import useContentStore from "../store/useContentStore";

const Transactions = () => {
  //store
  const { setModalContent, setShowModal } = useContentStore();
  const { filters, setFilters } = useFiltersStore();

  useEffect(() => {
    setFilters({ type: "all" });
  }, []);

  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
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
      <div className="flex p-5 lg:p-8  gap-8">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Transactions;
