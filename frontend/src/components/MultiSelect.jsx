import React, { useEffect, useRef, useState } from "react";
import useDataStore from "../store/useDataStore";
import useFiltersStore from "../store/useFiltersStore";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const MultiSelect = () => {
  //componente state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //store
  const { categories } = useDataStore();
  const { setFilters, filters } = useFiltersStore();

  const handleCategorySelected = (selectedCategoryId) => {
    const isIncluded = filters.selectedCategories.includes(selectedCategoryId);

    const updatedCategories = isIncluded
      ? filters.selectedCategories.filter((id) => id !== selectedCategoryId)
      : [...filters.selectedCategories, selectedCategoryId];

    setFilters({ selectedCategories: updatedCategories });
  };

  // handle the click out of the box
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef?.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-52 text-sm select-none" ref={dropdownRef}>
      <div
        className="w-full px-4 py-[4.5px] rounded-md border border-zinc-800 flex items-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {filters.selectedCategories?.length} item selezionati
        <div
          className="ms-auto text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(false);
            setFilters({ selectedCategories: [] });
          }}
        >
          <X size={16} strokeWidth={2} />
        </div>
        <div className="ms-1">
          {isDropdownOpen ? (
            <ChevronUp size={20} strokeWidth={2} />
          ) : (
            <ChevronDown size={20} strokeWidth={2} />
          )}
        </div>
      </div>
      <div
        className={`${
          isDropdownOpen ? "absolute" : "hidden"
        } z-10 -bottom-2 translate-y-full bg-white w-full flex flex-col gap-1 border border-gray-200 rounded-md px-2 py-2 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent`}
      >
        {categories.map((category) => {
          const isSelected = filters.selectedCategories?.includes(category._id);
          return (
            <div
              key={category._id}
              className={`flex gap-2 items-center cursor-pointer rounded-md p-1 ${
                isSelected ? "bg-gray-200" : ""
              }`}
              onClick={() => handleCategorySelected(category._id)}
            >
              <div
                className="h-5 w-5 rounded-sm"
                style={{ backgroundColor: category.hexColor }}
              ></div>
              <div className="w-32 overflow-hidden truncate">
                {category.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
