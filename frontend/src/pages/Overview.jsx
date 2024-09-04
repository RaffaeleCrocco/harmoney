import React, { useEffect } from "react";
import MoneyIland from "../components/MoneyIland";
import useContentStore from "../store/useContentStore";
import useFiltersStore from "../store/useFiltersStore";
import CategoryGraph from "../components/CategoryGraph";
import TransactionsGraph from "../components/TransactionsGraph";
import MultiSelect from "../components/MultiSelect";
import { SlidersHorizontal } from "lucide-react";

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
      <div className="flex flex-col lg:flex-row p-5 lg:p-8 gap-5 lg:gap-8">
        <MoneyIland />
        <CategoryGraph />
        <TransactionsGraph />
      </div>
      {/* <div className="flex flex-col lg:flex-row p-5 lg:p-8 gap-5 lg:gap-8 pt-0 lg:pt-0">
        <TransactionsTable />
      </div> */}
    </div>
  );
};

export default Overview;
