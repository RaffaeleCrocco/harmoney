import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";
import useContentStore from "../store/useContentStore";
import useDataStore from "../store/useDataStore";

const UpdateCategory = () => {
  const { setShowModal } = useContentStore();
  const { categoryIdToUpdate } = useDataStore();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hexColor, setHexColor] = useState("");
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
        setLoading(false);
      })
      .catch((error) => {
        alert("Check console");
        setLoading(false);
      });
  }, []);

  const handleUpdateCategory = () => {
    const data = {
      name,
      description,
      hexColor,
    };
    console.log(data);
    setLoading(true);
    axios
      .put(`${BASEURL}/category/${categoryIdToUpdate}`, data, {
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

  const handleDeleteCategory = () => {
    setLoading(true);
    axios
      .delete(`${BASEURL}/category/${categoryIdToUpdate}`, {
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
        setLoading(false);
        console.log(error);
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
              className="inline-flex w-full items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
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
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
            placeholder="Descrizione facoltativa"
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
              onClick={handleUpdateCategory}
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

export default UpdateCategory;
