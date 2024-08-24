import React from "react";
import useFiltersStore from "../store/useFiltersStore";

const FilterModal = () => {
  //store
  const { filters, setFilters } = useFiltersStore();
  return (
    <div className="flex flex-col gap-5 p-4 w-full">
      <div className="block border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
        <select
          className="cursor-pointer flex items-center gap-x-2 text-sm border-none w-full h-8"
          onChange={(e) => setFilters({ type: e.target.value })}
          value={filters.type}
        >
          <option value="all">Tutte le transazioni</option>
          <option value="expense">Uscite</option>
          <option value="income">Entrate</option>
          <option value="withdrawal">Prelievi</option>
        </select>
      </div>
      <div className="block border border-zinc-800 text-zinc-800 rounded-md py-1 ps-2 pe-4">
        <select
          className="cursor-pointer flex items-center gap-x-2 text-sm border-none w-full h-8"
          onChange={(e) => setFilters({ categories: e.target.value })}
          value={filters.categories}
        >
          <option value="all">Tutte le transazioni</option>
          <option value="categorized">Categorizzate</option>
          <option value="uncategorized">Non categorizzate</option>
        </select>
      </div>
    </div>
  );
};

export default FilterModal;
