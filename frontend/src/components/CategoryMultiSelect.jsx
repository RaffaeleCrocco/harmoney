import React, { useEffect, useRef, useState } from "react";
import useDataStore from "../store/useDataStore";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const CategoryMultiSelect = ({ categoryIds, setCategoryIds }) => {
  //componente state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //store
  const { categories } = useDataStore();
  //token
  const token = localStorage.getItem("token");

  const handleCategorySelected = (selectedCategoryId) => {
    const isIncluded = categoryIds.includes(selectedCategoryId);

    const selectedCategories = isIncluded
      ? categoryIds.filter((id) => id !== selectedCategoryId)
      : [...categoryIds, selectedCategoryId];

    setCategoryIds(selectedCategories);
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
    <div
      className="relative w-full h-full text-sm select-none"
      ref={dropdownRef}
    >
      <div
        className="w-full h-full px-4 py-[4.5px] rounded-md border border-gray-200 dark:border-gray-400 flex items-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {categoryIds?.length} item selezionati
        <div
          className="ms-auto text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(false);
            setCategoryIds([]);
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
        } z-10 -bottom-2 translate-y-full bg-white dark:bg-black w-full flex flex-col gap-1 border border-gray-200 dark:border-gray-600 rounded-md px-2 py-2 max-h-40 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent`}
      >
        {categories.map((category) => {
          const isSelected = categoryIds?.includes(category._id);
          return (
            <div
              key={category._id}
              className={`flex gap-2 items-center cursor-pointer rounded-md p-1 ${
                isSelected ? "bg-gray-200 dark:bg-zinc-800" : ""
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

export default CategoryMultiSelect;
