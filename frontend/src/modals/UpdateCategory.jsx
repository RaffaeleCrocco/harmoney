import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { BASEURL } from "../config";
import useContentStore from "../store/useContentStore";
import useDataStore from "../store/useDataStore";

const UpdateCategory = () => {
  //store
  const { setShowModal } = useContentStore();
  const { categoryIdToUpdate, deleteCategory, updateCategory } = useDataStore();

  //utils
  const token = localStorage.getItem("token");

  //form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hexColor, setHexColor] = useState("");
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASEURL}/category/${categoryIdToUpdate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setName(response.data.data.name);
        setDescription(response.data.data.description);
        setHexColor(response.data.data.hexColor);
        setBudget(response.data.data.budget);
        setLoading(false);
      })
      .catch((error) => {
        console.error("errore al caricamento della categoria: ", error);
        setLoading(false);
      });
  }, []);

  const handleUpdateCategory = () => {
    const data = {
      name,
      description,
      hexColor,
      budget,
    };
    console.log(data);
    setLoading(true);
    axios
      .put(`${BASEURL}/category/${categoryIdToUpdate}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        updateCategory(res.data);
        setLoading(false);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("errore nell'update della categoria: ", error);
        setLoading(false);
      });
  };

  const handleDeleteCategory = () => {
    setLoading(true);
    axios
      .delete(`${BASEURL}/category/${categoryIdToUpdate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        deleteCategory(res.data.deletedCategoryId);
        setLoading(false);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("errore alla cancellazione: ", error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="flex justify-between">
        <span className="text-xl font-medium">Modifica</span>
        <div
          onClick={() => handleDeleteCategory()}
          className="cursor-pointer text-center py-1.5 text-sm font-semibold font-sm text-red-800"
        >
          Elimina
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-4">
          {/* Selzione del nome per la categoria */}
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="inline-flex w-full items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800  dark:bg-black dark:text-gray-200 dark:border-gray-600 rounded-md"
              placeholder="Nome della categoria"
            />
            <input
              value={hexColor}
              type="color"
              className="p-1 h-12 w-14 block bg-white border cursor-pointer rounded-md "
              onChange={(e) => setHexColor(e.target.value)}
            />
          </div>
          {/* Descrizione della categoria */}
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800  dark:bg-black dark:text-gray-200 dark:border-gray-600 rounded-md"
            placeholder="Descrizione facoltativa"
          />
          {/* Budget della categoria */}
          <input
            value={budget}
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
              onClick={handleUpdateCategory}
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

export default UpdateCategory;
