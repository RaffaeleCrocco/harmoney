import {
  startOfMonth,
  endOfMonth,
  parseISO,
  startOfYear,
  endOfYear,
  format,
} from "date-fns";

export const getTotalExpensesForCategories = (
  categories,
  transactions,
  period
) => {
  const now = new Date();
  let startingDate = new Date();
  let endingDate = new Date();

  if (period === "thisMonth") {
    startingDate = startOfMonth(now);
    endingDate = endOfMonth(now);
  } else if (period === "thisYear") {
    startingDate = startOfYear(now);
    endingDate = endOfYear(now);
  } else if (period === "allTime") {
    startingDate = new Date(0);
    endingDate = now;
  }

  const expensesData = categories.map((category) => {
    // get transactions for this category
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = parseISO(transaction.date); // Assuming date is in ISO format
      const isExpense = transaction.type === "expense";
      const isInCurrentPeriod =
        transactionDate >= startingDate && transactionDate <= endingDate;
      const hasMatchingCategory = transaction.categoryIds.includes(
        category._id
      );

      return isExpense && isInCurrentPeriod && hasMatchingCategory;
    });

    // get total expenses for this category
    const totalExpenses = filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    if (totalExpenses === 0) return null;

    //category object + amount
    return {
      ...category,
      amount: totalExpenses.toFixed(2),
    };
  });

  // take out categories with no expenses
  const filteredData = expensesData.filter((data) => data !== null);

  // get max expense
  const maxExpense = filteredData.reduce((max, item) => {
    return Math.max(max, parseFloat(item.amount));
  }, 0);

  return {
    categories: filteredData,
    maxExpense: maxExpense.toFixed(0),
  };
};

export const getDailyExpensesAndIncomes = (transactions, period) => {
  const now = new Date();
  let startingDate = new Date();
  let endingDate = new Date();

  if (period === "thisMonth") {
    startingDate = startOfMonth(now);
    endingDate = endOfMonth(now);
  } else if (period === "thisYear") {
    startingDate = startOfYear(now);
    endingDate = endOfYear(now);
  } else if (period === "allTime") {
    startingDate = new Date(0);
    endingDate = now;
  }

  // get transactions in the date range
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = parseISO(transaction.date);
    return transactionDate >= startingDate && transactionDate <= endingDate;
  });

  // aggregate expenses and incomes by day
  const dailyAggregates = {};
  let maxTotal = 0;

  filteredTransactions.forEach((transaction) => {
    const transactionDate = parseISO(transaction.date);
    const formattedDate = format(transactionDate, "dd MMM yyyy");

    if (!dailyAggregates[formattedDate]) {
      dailyAggregates[formattedDate] = {
        date: transaction.date,
        formattedDate: formattedDate,
        totalExpenses: 0,
        totalIncomes: 0,
      };
    }

    if (transaction.type === "expense") {
      dailyAggregates[formattedDate].totalExpenses += transaction.amount;
    } else if (transaction.type === "income") {
      dailyAggregates[formattedDate].totalIncomes += transaction.amount;
    }

    const dayMaxTotal = Math.max(
      dailyAggregates[formattedDate].totalExpenses.toFixed(2),
      dailyAggregates[formattedDate].totalIncomes.toFixed(2)
    );
    if (dayMaxTotal > maxTotal) {
      //update
      maxTotal = dayMaxTotal;
    }
  });

  // converting dailyAggregates object to an array
  const dailyData = Object.values(dailyAggregates)
    .map((day) => ({
      ...day,
      totalExpenses: day.totalExpenses.toFixed(2),
      totalIncomes: day.totalIncomes.toFixed(2),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // sorting by date

  return {
    dailyData,
    maxTotal,
  };
};
