import { FilePlus, MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const TransactionsTable = ({
  transactions,
  handleCategoriesTag,
  applyFilters,
  setShowModal,
  setModalContent,
  setTransactionIdToUpdate,
}) => {
  return (
    <div className="w-full border border-zinc-400 lg:border-zinc-800 rounded-md overflow-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
      {transactions.filter((transaction) => applyFilters(transaction)).length >
      0 ? (
        transactions
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .filter((transaction) => applyFilters(transaction))
          .map((transaction) => (
            <div
              onClick={() => {
                setShowModal(true);
                setModalContent(2);
                setTransactionIdToUpdate(transaction._id);
              }}
              className="w-full py-2 lg:py-0.5 border-b last:border-none border-gray-200 rounded-sm flex items-center hover:bg-gray-100 text-sm"
              key={transaction._id}
            >
              <div className="hidden lg:block w-44 mx-2 text-xs text-zinc-400 text-center">
                {new Date(transaction.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </div>
              <div className="flex lg:hidden justify-end gap-1 ms-2">
                {handleCategoriesTag(transaction.categoryIds).map(
                  (category, item) => (
                    <div
                      className="h-4 w-1 rounded-sm"
                      key={item}
                      style={{ backgroundColor: category.hexColor }}
                    ></div>
                  )
                )}
              </div>
              <div className="ms-2 lg:ms-0 w-full lg:min-w-72 max-w-96 truncate">
                <div className="text-zinc-800">{transaction.title}</div>
              </div>
              <div className="w-full hidden lg:flex justify-end">
                <div className="flex h-full flex-wrap gap-2">
                  {handleCategoriesTag(transaction.categoryIds).map(
                    (category, item) => (
                      <div
                        className="bg-zinc-100 px-2.5 rounded-sm text-xs text-zinc-600"
                        key={item}
                      >
                        {category.name}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-44 mx-4 text-end">
                <span
                  className={`inline-flex items-center gap-2 text-xs font-semibold ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : transaction.type === "expense"
                      ? "text-zinc-500"
                      : "text-blue-500"
                  }`}
                >
                  &#8364; {transaction.amount.toFixed(2)}
                  {transaction.type === "income" ? (
                    <TrendingUp />
                  ) : transaction.type === "expense" ? (
                    <TrendingDown />
                  ) : (
                    <MoveRight />
                  )}
                </span>
              </div>
            </div>
          ))
      ) : (
        <div
          onClick={() => {
            setModalContent(1);
            setShowModal(true);
          }}
          className="flex flex-col items-center justify-center my-10 gap-5 cursor-pointer"
        >
          <p className="font-semibold">Nessuna transazione</p>
          <FilePlus size={30} className="animate-bounce" />
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
