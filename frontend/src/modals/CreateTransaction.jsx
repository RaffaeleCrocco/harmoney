import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";
import Select from "react-select";
import useDataStore from "../store/useDataStore";
import useContentStore from "../store/useContentStore";
import { ReceiptText } from "lucide-react";

const CreateTransaction = () => {
  const { setShowModal } = useContentStore();
  const { categories } = useDataStore();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    return now.toISOString().slice(0, 16);
  });
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSaveTransaction = () => {
    const data = {
      type,
      amount,
      title,
      date,
      categoryIds,
    };
    console.log(data);
    setLoading(true);
    axios
      .post(`${BASEURL}/transaction/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        setShowModal(false);
        navigate(0);
      })
      .catch((error) => {
        alert("Controlla i campi");
        setLoading(false);
      });
  };

  const handleCategoryChange = (selectedOptions) => {
    // Extract the category IDs from the selected options
    const ids = selectedOptions
      ? selectedOptions.map((option) => option._id)
      : [];
    setCategoryIds(ids);
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
      <span className="text-xl font-semibold flex gap-3 items-center">
        Nuova transazione
        <ReceiptText />
      </span>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-4">
          {/* Selezione del titolo per la transazione */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
            placeholder="Spesa settimanale"
          />
          {/* Importo della transazione */}
          <input
            autoFocus
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
            placeholder="12,50 €"
          />
          {/* Selezione del tipo di transazione */}
          <ul className="flex flex-col sm:flex-row">
            <li className="w-full inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-md sm:last:rounded-es-none sm:last:rounded-se-md">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    onClick={(e) => setType(e.target.value)}
                    defaultChecked
                    value="expense"
                    id="transactionType-1"
                    name="transactionType"
                    type="radio"
                    className="border-gray-200 rounded-full"
                  />
                </div>
                <label
                  htmlFor="transactionType-1"
                  className="ms-3 block w-full text-sm text-gray-600"
                >
                  Spesa
                </label>
              </div>
            </li>
            <li className="w-full inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-md sm:last:rounded-es-none sm:last:rounded-se-md">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    onClick={(e) => setType(e.target.value)}
                    value="income"
                    id="transactionType-2"
                    name="transactionType"
                    type="radio"
                    className="border-gray-200 rounded-full "
                  />
                </div>
                <label
                  htmlFor="transactionType-2"
                  className="ms-3 block w-full text-sm text-gray-600"
                >
                  Entrata
                </label>
              </div>
            </li>
            <li className="w-full inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-md first:mt-0 last:rounded-b-md sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-md sm:last:rounded-es-none sm:last:rounded-se-md">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    onClick={(e) => setType(e.target.value)}
                    value="withdrawal"
                    id="transactionType-3"
                    name="transactionType"
                    type="radio"
                    className="border-gray-200 rounded-full "
                  />
                </div>
                <label
                  htmlFor="transactionType-3"
                  className="ms-3 block w-full text-sm text-gray-600"
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
              value={date ? date : undefined}
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
              onClick={handleSaveTransaction}
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

export default CreateTransaction;
