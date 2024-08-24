import React, { useEffect } from "react";
import TransactionsTable from "../components/TransactionsTable";
import useFiltersStore from "../store/useFiltersStore";
import { SlidersHorizontal } from "lucide-react";
import MultiSelect from "../components/MultiSelect";
import useContentStore from "../store/useContentStore";

const History = () => {
  //store
  const { setModalContent, setShowModal } = useContentStore();
  const { filters, setFilters } = useFiltersStore();

  useEffect(() => {
    setFilters({ type: "all" });
  }, []);

  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Cronologia</div>
        <SlidersHorizontal
          className="cursor-pointer mx-2 text-gray-400"
          size={16}
          onClick={() => {
            setModalContent(5);
            setShowModal(true);
          }}
        />
        <MultiSelect />
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
      </div>
      <div className="flex m-8 gap-8">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default History;
