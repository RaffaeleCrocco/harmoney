import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  startOfMonth,
  addMonths,
  isWithinInterval,
  parseISO,
} from "date-fns";

export const applyFilters = (transaction, filters) => {
  const { categories, type, period } = filters;

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

  // Check period filter
  const transactionDate = parseISO(transaction.date); // Assuming the transaction date is an ISO string
  let isPeriodFilterPassed = true;
  const today = new Date();

  switch (period) {
    case "today":
      isPeriodFilterPassed = isSameDay(transactionDate, today);
      break;
    case "this_week":
      isPeriodFilterPassed = isSameWeek(transactionDate, today, {
        weekStartsOn: 1,
      });
      break;
    case "this_month":
      isPeriodFilterPassed = isSameMonth(transactionDate, today);
      break;
    case "this_trimester":
      const startOfTrimester = addMonths(
        startOfMonth(today),
        -(today.getMonth() % 3)
      );
      isPeriodFilterPassed = isWithinInterval(transactionDate, {
        start: startOfTrimester,
        end: today,
      });
      break;
    case "this_semester":
      const startOfSemester = addMonths(
        startOfMonth(today),
        -(today.getMonth() % 6)
      );
      isPeriodFilterPassed = isWithinInterval(transactionDate, {
        start: startOfSemester,
        end: today,
      });
      break;
    case "always":
      isPeriodFilterPassed = true; // No filter for 'always'
      break;
    default:
      isPeriodFilterPassed = true; // If no valid period is provided, no filtering
      break;
  }

  // Apply all filters
  return isCategorizedFilterPassed && typeFilterPassed && isPeriodFilterPassed;
};
