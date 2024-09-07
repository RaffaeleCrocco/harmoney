import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { BASEURL } from "../config";
import Select from "react-select";
import useContentStore from "../store/useContentStore";
import useDataStore from "../store/useDataStore";

const UpdateTransaction = () => {
  //store
  const { setShowModal } = useContentStore();
  const {
    categories,
    transactionIdToUpdate,
    updateTransaction,
    deleteTransaction,
  } = useDataStore();

  //util
  const token = localStorage.getItem("token");

  //component state
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASEURL}/transaction/${transactionIdToUpdate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setType(response.data.data.type);
        setAmount(response.data.data.amount);
        setTitle(response.data.data.title);
        setDate(response.data.data.date);
        setCategoryIds(response.data.data.categoryIds);
        setLoading(false);
      })
      .catch((error) => {
        alert("Check console");
        setLoading(false);
      });
  }, []);

  const handleUpdateTransaction = () => {
    const data = {
      type,
      amount,
      title,
      date,
      categoryIds,
    };
    setLoading(true);
    axios
      .put(`${BASEURL}/transaction/${transactionIdToUpdate}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        updateTransaction(res.data);
        setLoading(false);
        setShowModal(false);
      })
      .catch((error) => {
        alert("errore in update:", error);
        setLoading(false);
      });
  };

  const handleDeleteTransaction = () => {
    setLoading(true);
    axios
      .delete(`${BASEURL}/transaction/${transactionIdToUpdate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        deleteTransaction(res.data.deletedTransactionId);
        setLoading(false);
        setShowModal(false);
      })
      .catch((error) => {
        alert("errore in delete:", error);
        setLoading(false);
      });
  };

  const handleCategoryChange = (selectedOptions) => {
    // Extract the category IDs from the selected options
    const ids = selectedOptions
      ? selectedOptions.map((option) => option._id)
      : [];
    setCategoryIds(ids);
    console.log(ids);
  };

  const formatOptionLabel = ({ name, hexColor }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "2px 10px 2px 5px",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          backgroundColor: hexColor,
          width: 18,
          height: 18,
          borderRadius: 4,
          marginRight: 8,
        }}
      />
      {name.slice(0, 12)}
    </div>
  );

  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="flex justify-between">
        <span className="text-xl font-medium">Modifica</span>
        <div
          onClick={() => handleDeleteTransaction()}
          className="cursor-pointer text-center py-1.5 text-sm font-semibold font-sm text-red-800"
        >
          Elimina
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-4">
          {/* Selezione del titolo per la transazione */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
            placeholder="Titolo della transazione"
          />
          {/* Importo della transazione */}
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
            placeholder="10$"
          />
          {/* Selezione del tipo di transazione */}
          <ul className="flex flex-col sm:flex-row">
            <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-md sm:last:rounded-es-none sm:last:rounded-se-md">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    onClick={(e) => setType(e.target.value)}
                    defaultChecked
                    value="expense"
                    id="transactionType-1"
                    name="transactionType"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="transactionType-1"
                  className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                >
                  Spesa
                </label>
              </div>
            </li>
            <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-md sm:last:rounded-es-none sm:last:rounded-se-md">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    onClick={(e) => setType(e.target.value)}
                    value="income"
                    id="transactionType-2"
                    name="transactionType"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="transactionType-2"
                  className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                >
                  Entrata
                </label>
              </div>
            </li>
            <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-md sm:last:rounded-es-none sm:last:rounded-se-md">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    onClick={(e) => setType(e.target.value)}
                    value="withdrawal"
                    id="transactionType-3"
                    name="transactionType"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="transactionType-3"
                  className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                >
                  Prelievo
                </label>
              </div>
            </li>
          </ul>
          {/* Seleziona la data della transizione */}
          <div className="w-full rounded-md bg-gray-200">
            <input
              onChange={(e) => {
                // Get the input value
                const value = e.target.value;
                if (value) {
                  // Convert the input value to a Date object
                  const date = new Date(value);
                  // Convert the Date object to an ISO string
                  const isoDate = date.toISOString();
                  // Set the ISO string to state
                  setDate(isoDate);
                } else {
                  // Handle empty value if necessary
                  setDate("");
                }
              }}
              type="datetime-local"
              className="w-full py-3 px-4 pe-11 h-12 border border-gray-200 rounded-md text-sm "
            />
          </div>
          {/* Selezione della categoria della transazione */}
          <Select
            isMulti
            getOptionValue={(option) => option._id}
            name="categories"
            options={categories}
            formatOptionLabel={formatOptionLabel}
            onChange={handleCategoryChange}
            value={categories.filter((option) =>
              categoryIds.includes(option._id)
            )}
            placeholder="-"
          />

          <div className="flex gap-5">
            <div
              onClick={() => {
                setShowModal(false);
              }}
              className="cursor-pointer text-center w-full py-3 px-4 text-sm font-medium rounded-md border border-zinc-800 text-zinc-800"
            >
              Annulla
            </div>
            <button
              onClick={handleUpdateTransaction}
              type="button"
              className="text-center w-full py-3 px-4 text-sm font-medium rounded-md border border-transparent bg-zinc-800 text-white"
            >
              Salva
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTransaction;
