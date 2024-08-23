import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { startOfMonth, endOfMonth, parseISO } from "date-fns";
import useDataStore from "../store/useDataStore";

const CategoryGraph = () => {
  const { categories, transactions } = useDataStore();

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getTotalExpensesForCategories(categories, transactions));
  }, []);

  const getTotalExpensesForCategories = (categories, transactions) => {
    // Get the current date and the start/end of the month
    const now = new Date();
    const startOfMonthDate = startOfMonth(now);
    const endOfMonthDate = endOfMonth(now);

    const expensesData = categories.map((category) => {
      // Filter transactions for the specific category
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = parseISO(transaction.date); // Assuming date is in ISO format
        const isExpense = transaction.type === "expense";
        const isInCurrentMonth =
          transactionDate >= startOfMonthDate &&
          transactionDate <= endOfMonthDate;
        const hasMatchingCategory = transaction.categoryIds.includes(
          category._id
        );

        return isExpense && isInCurrentMonth && hasMatchingCategory;
      });

      // Sum up the total expenses for this category
      const totalExpenses = filteredTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      if (totalExpenses == 0) return null;

      // Return the category object with an additional 'amount' field
      return {
        ...category,
        amount: totalExpenses.toFixed(2),
      };
    });

    // Filter out null values (categories with zero expenses)
    return expensesData.filter((data) => data !== null);
  };

  return (
    <div className="w-full h-96 p-1 lg:p-6 border border-zinc-800 rounded-md overflow-hidden mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amount" width={20} />
          <Tooltip />
          <Bar
            dataKey="amount"
            name="Totale spesa"
            activeBar={<Rectangle fill="#000000" />}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.hexColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryGraph;
