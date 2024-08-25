import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  eachDayOfInterval,
  endOfToday,
} from "date-fns";
import { Calendar, Eye, EyeOff, Wallet } from "lucide-react";
import useDataStore from "../store/useDataStore";

const MoneyIland = () => {
  const { transactions } = useDataStore();
  const [startingAmount, setStartingAmount] = useState(0); // Set default starting amount
  const [hidden, setHidden] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyTotalAmount, setMonthlyTotalAmount] = useState(0);

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

  useEffect(() => {
    setTotalAmount(calculateTotal(transactions, startingAmount));
    setMonthlyTotalAmount(calculateMonthlyTotal(transactions));
  }, [transactions, startingAmount]);

  return (
    <div className="w-full lg:w-64 lg:h-96 flex flex-col gap-6">
      <div className="w-full p-6 border border-zinc-400 lg:border-zinc-800 rounded-md overflow-hidden flex gap-1 font-semibold items-center">
        <span className="text-sm">€</span>
        <div
          className={`w-full text-3xl leading-none me-auto ${
            hidden ? "blur-md bg-white/30" : ""
          }`}
        >
          {totalAmount.toFixed(2)}
        </div>
        <div
          onClick={() => setHidden(!hidden)}
          className="flex items-center cursor-pointer ms-4"
        >
          {hidden ? <Eye size={18} /> : <EyeOff size={18} />}
        </div>
      </div>
      <div className="hidden lg:flex flex-col w-full h-full p-6 border border-zinc-800 rounded-md overflow-hidden">
        <div className="w-full flex gap-1 font-semibold items-center">
          <span className="text-sm">€</span>
          <div
            className={`w-full text-3xl leading-none me-auto ${
              hidden ? "blur-md bg-white/30" : ""
            }`}
          >
            {totalAmount.toFixed(2)}
          </div>
        </div>
        <p className="text-xs mt-4">Sto lavorando alla sezione.</p>
      </div>
    </div>
  );
};

export default MoneyIland;
