import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";

const CreateCategory = ({ setShowModal }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveCategory = () => {
    const data = {
      name,
      description,
    };
    console.log(data);
    setLoading(true);
    axios
      .post(`${BASEURL}/category/create`, data, {
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

  return (
    <div className="w-80 p-4 flex flex-col space-y-4">
      {/* <span className="text-xl font-medium">Nuova transazione</span> */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-4">
          {/* Selezione del nome per la categoria */}
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
            placeholder="Nome della categoria"
          />
          {/* Descrizione della categoria */}
          <input
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
              onClick={handleSaveCategory}
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

export default CreateCategory;
