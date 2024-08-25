import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";
import useContentStore from "../store/useContentStore";
import { HandCoins } from "lucide-react";

const CreateCategory = () => {
  const { setShowModal } = useContentStore();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hexColor, setHexColor] = useState("#D0D0D0");
  const [loading, setLoading] = useState(false);

  const handleSaveCategory = () => {
    const data = {
      name,
      description,
      hexColor,
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
              className="inline-flex w-full items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
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
