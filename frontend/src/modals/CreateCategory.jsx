import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { BASEURL } from "../config";
import useContentStore from "../store/useContentStore";
import { HandCoins } from "lucide-react";
import useDataStore from "../store/useDataStore";

const CreateCategory = () => {
  //store
  const { addCategory } = useDataStore();
  const { setShowModal } = useContentStore();
  //util
  const token = localStorage.getItem("token");
  //component state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hexColor, setHexColor] = useState("#D0D0D0");
  const [budget, setBudget] = useState();
  const [loading, setLoading] = useState(false);

  const handleSaveCategory = () => {
    const data = {
      name,
      description,
      hexColor,
      budget,
    };
    setLoading(true);
    axios
      .post(`${BASEURL}/category/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        addCategory(res.data);
        setLoading(false);
        setShowModal(false);
      })
      .catch((error) => {
        alert("errore in creazione categoria: ", error);
        setLoading(false);
      });
  };

  return (
    <div className="w-full p-4 flex flex-col space-y-4">
      <span className="text-xl font-semibold flex gap-3 items-center">
        Nuova categoria
        <HandCoins />
      </span>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-4">
          {/* Selezione del nome per la categoria */}
          <div className="flex gap-2">
            <input
              autoFocus
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="inline-flex w-full items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800   dark:bg-black dark:text-gray-200 dark:border-gray-600 rounded-md"
              placeholder="Nome della categoria"
            />
            <input
              type="color"
              className="p-1 h-12 w-14 block bg-white border cursor-pointer rounded-md "
              onChange={(e) => setHexColor(e.target.value)}
              value={hexColor}
            />
          </div>
          {/* Descrizione della categoria */}
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800   dark:bg-black dark:text-gray-200 dark:border-gray-600 rounded-md"
            placeholder="Descrizione facoltativa"
          />
          {/* Budget della categoria */}
          <input
            onChange={(e) => setBudget(e.target.value)}
            type="number"
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800   dark:bg-black dark:text-gray-200 dark:border-gray-600 rounded-md"
            placeholder="Budget mensile per la categoria (210€)"
          />

          <div className="flex gap-5">
            <div
              onClick={() => {
                setShowModal(false);
              }}
              className="cursor-pointer text-center w-full py-3 px-4 text-sm font-medium rounded-md border border-zinc-800 text-zinc-800 dark:border-gray-200 dark:text-gray-200"
            >
              Annulla
            </div>
            <button
              onClick={handleSaveCategory}
              type="button"
              className="text-center w-full py-3 px-4 text-sm font-medium rounded-md border border-transparent bg-zinc-800 text-white dark:bg-white dark:text-black"
            >
              Salva
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
