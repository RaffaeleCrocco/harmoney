import useFiltersStore from "../store/useFiltersStore";

export const applyFilters = (transaction, filters) => {
  const { categories, type } = filters;

  // Check categories filter
  const isCategorizedFilterPassed =
    categories === "all" ||
    (categories === "categorized" &&
      transaction.categoryIds &&
      transaction.categoryIds.length > 0) ||
    (categories === "uncategorized" &&
      (!transaction.categoryIds || transaction.categoryIds.length === 0));

  // Check type filter
  const typeFilterPassed = type === "all" || transaction.type === type;

  // Apply all filters
  return isCategorizedFilterPassed && typeFilterPassed;
};
