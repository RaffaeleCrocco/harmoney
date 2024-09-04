import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  eachDayOfInterval,
  endOfToday,
} from "date-fns";
import { Calendar, Eye, EyeOff, Info, Wallet } from "lucide-react";
import useDataStore from "../store/useDataStore";

const MoneyIland = () => {
  //store
  const { transactions, user } = useDataStore();

  //component state
  const [hidden, setHidden] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyTotalAmount, setMonthlyTotalAmount] = useState(0);
  const [infoTooltipVisible, setInfoTooltipVisible] = useState(false);

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
    setTotalAmount(calculateTotal(transactions, user?.settings.startingAmount));
    setMonthlyTotalAmount(calculateMonthlyTotal(transactions));
    setHidden(user?.settings.isPrivacyFilterOn);
  }, [transactions, user]);

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
        <div className="w-full flex gap-2 font-semibold items-center">
          <span className="text-sm">€</span>
          <div
            className={`w-full text-3xl leading-none ${
              hidden ? "blur-md bg-white/30" : ""
            }`}
          >
            {monthlyTotalAmount.toFixed(2)}
          </div>
          <div
            className="relative flex items-center cursor-pointer"
            onMouseEnter={() => setInfoTooltipVisible(true)}
            onMouseLeave={() => setInfoTooltipVisible(false)}
          >
            <Info size={18} className="text-gray-300" />
            <div
              className={` bg-white border right-6 top-0 p-2 text-xs rounded-md min-w-32 ${
                infoTooltipVisible ? "absolute" : "hidden"
              }`}
            >
              <p>Questa cifra mostra l'andamento del mese. </p>
              <p className="mt-2 font-normal">
                Se negativa significa che al momento le uscite di questo mese
                superano le entrate.
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs mt-4">Sto lavorando alla sezione.</p>
      </div>
    </div>
  );
};

export default MoneyIland;
