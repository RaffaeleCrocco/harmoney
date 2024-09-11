import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  eachDayOfInterval,
  endOfToday,
  differenceInDays,
} from "date-fns";
import { Eye, EyeOff, Info } from "lucide-react";
import useDataStore from "../store/useDataStore";
import useFiltersStore from "../store/useFiltersStore";
import { applyFilters } from "../functions/filters";

const MoneyIland = () => {
  //store
  const { transactions, user } = useDataStore();
  const { filters } = useFiltersStore();

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

  const calculateTrend = (transactions, filters) => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const daysPassed = differenceInDays(now, start) + 1; // Include today by adding 1
    const totalDays = differenceInDays(end, start) + 1;

    const money = Math.abs(
      calculateMonthlyTotal(
        transactions.filter((transaction) => applyFilters(transaction, filters))
      )
    );

    return ((money / daysPassed) * totalDays).toFixed(2);
  };

  useEffect(() => {
    setTotalAmount(calculateTotal(transactions, user?.settings.startingAmount));
    setMonthlyTotalAmount(calculateMonthlyTotal(transactions));
    setHidden(user?.settings.isPrivacyFilterOn);
  }, [transactions, user]);

  return (
    <div className="w-full lg:max-w-56 lg:h-96 flex flex-col gap-6">
      <div className="w-full p-6 border border-gray-400 rounded-md overflow-hidden flex gap-1 font-semibold items-center">
        <div
          className={`w-full text-3xl leading-none me-auto ${
            hidden ? "blur-md bg-white/30 dark:bg-black/30" : ""
          }`}
        >
          {totalAmount.toFixed(2)} &euro;
        </div>
        <div
          onClick={() => setHidden(!hidden)}
          className="flex items-center cursor-pointer ms-4"
        >
          {hidden ? <Eye size={18} /> : <EyeOff size={18} />}
        </div>
      </div>
      <div className="flex-col w-full h-full p-6 border border-gray-400 rounded-md overflow-hidden flex flex-col">
        <div className="w-full flex gap-2 font-semibold items-center">
          <div
            className={`w-full text-3xl leading-none ${
              hidden ? "blur-md bg-white/30 dark:bg-black/30" : ""
            }`}
          >
            {monthlyTotalAmount.toFixed(2)} &euro;
          </div>
          <div
            className="relative flex items-center cursor-pointer"
            onMouseEnter={() => setInfoTooltipVisible(true)}
            onMouseLeave={() => setInfoTooltipVisible(false)}
          >
            <Info size={16} className="text-gray-300 dark:text-zinc-600" />
            <div
              className={` bg-white dark:bg-black border right-6 top-0 p-2 text-xs rounded-md min-w-32 ${
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
        <p className="text-xs mt-auto hidden lg:block">
          <b>Seleziona delle categorie</b> per controllare quanto stai spendendo
          e quanto avrai speso a fine mese continuando con questo ritmo.
        </p>
        <p className="text-xs mt-4 hidden lg:block">
          Totale per le categorie selezionate: &euro;{" "}
          <span
            className={hidden ? "blur-md bg-black/10 dark:bg-white/10" : ""}
          >
            {Math.abs(
              calculateMonthlyTotal(
                transactions.filter((transaction) =>
                  applyFilters(transaction, filters)
                )
              ).toFixed(2)
            )}
          </span>
        </p>
        <p className="text-xs mt-4 hidden lg:block">
          Se continui con questo trend a fine mese raggiungi: &euro;{" "}
          <span
            className={hidden ? "blur-md bg-black/10 dark:bg-white/10" : ""}
          >
            {calculateTrend(transactions, filters)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MoneyIland;
