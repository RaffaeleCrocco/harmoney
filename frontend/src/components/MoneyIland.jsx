import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  eachDayOfInterval,
  endOfToday,
} from "date-fns";
import { Calendar, Wallet } from "lucide-react";
import useDataStore from "../store/useDataStore";

const MoneyIland = () => {
  const { transactions } = useDataStore();
  const [startingAmount, setStartingAmount] = useState(0); // Set default starting amount
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyTotalAmount, setMonthlyTotalAmount] = useState(0);
  const [avgTransactionsPerDay, setAvgTransactionsPerDay] = useState(0);
  const [dailyTotalsArray, setDailyTotalsArray] = useState();
  const [biggestExpenseOfTheMonth, setBiggestExpenseOfTheMonth] = useState(0);
  const [biggestIncomeOfTheMonth, setBiggestIncomeOfTheMonth] = useState(0);
  const [totalExpensesByCategory, setTotalExpensesByCategory] = useState({});

  // Function to calculate total amount
  const calculateTotal = (transactions, startingAmount) => {
    return transactions.reduce((total, transaction) => {
      switch (transaction.type) {
        case "expense":
          return total - transaction.amount; // Subtract expenses
        case "income":
          return total + transaction.amount; // Add income
        case "withdrawal":
          return total; // Ignore withdrawals
        default:
          return total; // For any unrecognized type, do nothing
      }
    }, startingAmount);
  };

  const calculateMonthlyTotal = (transactions) => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const filteredTransactions = transactions.filter((transaction) => {
      const date = new Date(transaction.date);
      return isWithinInterval(date, { start, end });
    });

    return calculateTotal(filteredTransactions, 0);
  };

  const calculateDaysWithTransactionsAndDailyTotals = (transactions) => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = now; // End is today, to only consider past days

    // Initialize an array to store the daily totals
    const dailyTotals = eachDayOfInterval({ start, end }).map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      total: 0,
    }));

    // Create a map to quickly access daily totals
    const dailyTotalsMap = dailyTotals.reduce((acc, day) => {
      acc[day.date] = day.total;
      return acc;
    }, {});

    // Initialize variables for the biggest expense and income
    let biggestExpense = 0;
    let biggestIncome = 0;

    // Calculate total amount per day based on transactions
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const formattedDate = format(date, "yyyy-MM-dd");

      if (
        isWithinInterval(date, { start, end }) &&
        transaction.type !== "withdrawal"
      ) {
        if (transaction.type === "expense") {
          dailyTotalsMap[formattedDate] -= transaction.amount;
          biggestExpense = Math.min(
            biggestExpense,
            dailyTotalsMap[formattedDate]
          );
        } else if (transaction.type === "income") {
          dailyTotalsMap[formattedDate] += transaction.amount;
          biggestIncome = Math.max(biggestIncome, transaction.amount);
        }
      }
    });

    // Update the dailyTotals array with the calculated totals
    dailyTotals.forEach((day) => {
      day.total = dailyTotalsMap[day.date];
    });

    // Calculate the number of days with transactions (excluding days with zero total)
    const daysWithTransactions = dailyTotals.filter(
      (day) => day.total !== 0
    ).length;

    // Create an array of daily totals for each day from start to end of the month
    const dailyTotalsArray = dailyTotals.map((day) => day.total);

    return {
      daysWithTransactions,
      dailyTotalsArray,
      biggestExpenseOfTheMonth: biggestExpense,
      biggestIncomeOfTheMonth: biggestIncome,
    };
  };

  const calculateTotalExpensesByCategory = (transactions) => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfToday(now);

    // Create a map to store the total expenses for each category
    const categoryTotals = {};

    // Iterate over each transaction
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);

      // Check if the transaction is within the date range and is an expense
      if (
        isWithinInterval(transactionDate, { start, end }) &&
        transaction.type === "expense"
      ) {
        // If the category does not exist in the map, initialize it
        if (!categoryTotals[transaction.categoryIds]) {
          categoryTotals[transaction.categoryIds] = 0;
        }
        // Add the transaction amount to the corresponding category
        categoryTotals[transaction.categoryIds] += transaction.amount;
      }
    });

    // Convert the categoryTotals object to an array of objects
    const result = Object.keys(categoryTotals).map((category) => ({
      categoryName: category,
      totalExpenses: categoryTotals[category],
    }));

    return result;
  };

  useEffect(() => {
    setTotalAmount(calculateTotal(transactions, startingAmount));
    setMonthlyTotalAmount(calculateMonthlyTotal(transactions));
    setAvgTransactionsPerDay(
      monthlyTotalAmount /
        calculateDaysWithTransactionsAndDailyTotals(transactions)
          .daysWithTransactions
    );
    setDailyTotalsArray(
      calculateDaysWithTransactionsAndDailyTotals(transactions).dailyTotalsArray
    );
    setBiggestExpenseOfTheMonth(
      calculateDaysWithTransactionsAndDailyTotals(transactions)
        .biggestExpenseOfTheMonth
    );
    setBiggestIncomeOfTheMonth(
      calculateDaysWithTransactionsAndDailyTotals(transactions)
        .biggestIncomeOfTheMonth
    );
    setTotalExpensesByCategory(calculateTotalExpensesByCategory(transactions));
  }, [transactions, monthlyTotalAmount, startingAmount]);

  return (
    <div className="w-full lg:w-64 lg:h-96 flex flex-col gap-6">
      <div className="w-full p-6 border border-zinc-400 lg:border-zinc-800 rounded-md overflow-hidden flex gap-1 font-semibold items-center">
        <span className="text-sm">€</span>
        <div className="w-full text-3xl leading-none me-auto">
          {totalAmount.toFixed(2)}
        </div>
        <Wallet size={30} />
      </div>
      <div className="hidden lg:flex flex-col w-full h-full p-6 border border-zinc-800 rounded-md overflow-hidden">
        <div className="w-full flex gap-1 font-semibold items-center">
          <span className="text-sm">€</span>
          <div className="w-full text-3xl leading-none me-auto">
            {monthlyTotalAmount.toFixed(2)}
          </div>
          <Calendar size={30} />
        </div>
        <div className="mt-auto text-sm">
          Uscita complessiva maggiore del mese in un solo giorno:{" "}
          <span className="font-semibold">
            &#8364; {biggestExpenseOfTheMonth.toFixed(2)}
          </span>
        </div>
        <div className="mt-2 text-sm">
          Entrata complessiva maggiore del mese in un solo giorno:{" "}
          <span className="font-semibold">
            &#8364; {biggestIncomeOfTheMonth.toFixed(2)}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-1">
          {/* <DottedMonth
            average={avgTransactionsPerDay.toFixed(2)}
            dailyTotalsArray={dailyTotalsArray}
            downLimit={biggestExpenseOfTheMonth}
            upLimit={biggestIncomeOfTheMonth}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default MoneyIland;
