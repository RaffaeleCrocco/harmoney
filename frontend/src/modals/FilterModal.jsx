import React from "react";
import useFiltersStore from "../store/useFiltersStore";

import MultiSelect from "../components/MultiSelect";
import { SlidersHorizontal } from "lucide-react";

const FilterModal = () => {
  //store
  const { filters, setFilters } = useFiltersStore();
  //token
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col p-4 w-full">
      <span className="text-xl font-semibold flex gap-3 items-center">
        Tutti i filtri
        <SlidersHorizontal />
      </span>
      <p className="text-xs text-gray-500 mt-4 mb-2">
        Visualizza unicamente le entrate, le uscite o i prelievi.
      </p>
      <div className="block border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
        <select
          className="cursor-pointer flex items-center gap-x-2 text-sm border-none w-full h-8"
          onChange={(e) => setFilters({ type: e.target.value }, token)}
          value={filters.type}
        >
          <option value="all">Tutte le transazioni</option>
          <option value="expense">Uscite</option>
          <option value="income">Entrate</option>
          <option value="withdrawal">Prelievi</option>
        </select>
      </div>
      <p className="text-xs text-gray-500 mt-4 mb-2">
        Scegli di vedere solo le transazioni non categorizzate.
      </p>
      <div className="block border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
        <select
          className="cursor-pointer flex items-center gap-x-2 text-sm border-none w-full h-8"
          onChange={(e) => setFilters({ categories: e.target.value }, token)}
          value={filters.categories}
        >
          <option value="all">Tutte le transazioni</option>
          <option value="categorized">Categorizzate</option>
          <option value="uncategorized">Non categorizzate</option>
        </select>
      </div>
      <p className="text-xs text-gray-500 mt-4 mb-2">
        Scegli una o più categorie di transazioni.
      </p>
      <div className="w-full h-11">
        <MultiSelect />
      </div>
      <p className="text-xs text-gray-500 mt-4 mb-2">
        Filtra per periodo di tempo.
      </p>
      <div className="border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
        <select
          className="cursor-pointer flex items-center gap-x-2 text-sm border-none w-full h-8"
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
      <p className="text-xs text-gray-500 my-8">
        Questi i filtri vengono applicati a tutti i grafici e alle liste di
        transazioni e prevalgono sui filtri specifici di ogni grafico.
      </p>
    </div>
  );
};

export default FilterModal;
