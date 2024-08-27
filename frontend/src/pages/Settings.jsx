import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";
import CoinAnimation from "../components/CoinAnimation";
import useDataStore from "../store/useDataStore";

const Settings = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //store
  const { user } = useDataStore();
  //form state
  const [isPrivacyFilterOn, setIsPrivacyFilterOn] = useState(true);
  const [deleteLabel, setDeleteLabel] = useState("");

  useEffect(() => {
    setIsPrivacyFilterOn(user?.settings.isPrivacyFilterOn);
    console.log("aggioranto", user?.settings.isPrivacyFilterOn);
  }, [user]);

  const handleUpdateSettings = () => {
    const data = {
      isPrivacyFilterOn,
    };
    setLoading(true);
    axios
      .put(`${BASEURL}/settings/privacy`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        navigate(0);
      })
      .catch((error) => {
        alert("Controlla i campi");
        setLoading(false);
      });
  };

  const handleDeleteUser = () => {
    if (deleteLabel != user.username) {
      console.log("username non corretto");
      return;
    }
    setLoading(true);
    axios
      .delete(`${BASEURL}/settings/delete-user/${user.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        localStorage.removeItem("token");
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  if (loading) return <p>loading</p>;

  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Impostazioni</div>
      </div>
      <div className="min-w-full min-h-[60vh]">
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Filtro privacy</p>
            <p className="text-xs mt-1">
              Quando attivo il totale mensile e generale verranno nascosti di
              default.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-zinc-800 rounded-md">
            <label class="flex p-3 w-full text-sm ">
              <p className="text-xs mt-1 w-2/3">
                Potrai comunque vedere l'importo cliccando l'icona
                corrispondente accanto ad esso.
              </p>
              <input
                type="checkbox"
                checked={isPrivacyFilterOn}
                onChange={() => setIsPrivacyFilterOn(!isPrivacyFilterOn)}
                class="appearance-none w-4 h-4 border-2 border-zinc-800 ms-auto mt-0.5 rounded bg-white checked:bg-zinc-800 "
              />
            </label>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Elimina account</p>
            <p className="text-xs mt-1">
              Tutte le transazioni e le categorie associate all'account verranno
              eliminate, l'azione è irreversibile.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-zinc-800 rounded-md p-4 flex gap-4">
            <div className="w-full">
              <p className="text-xs">
                Per confermare l'intenzione di eliminare il tuo account
                inserisci il tuo username e premi Elimina.
              </p>
              <input
                value={deleteLabel}
                onChange={(e) => setDeleteLabel(e.target.value)}
                type="text"
                className="w-full items-center mt-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 rounded-md"
                placeholder={user.username}
              />
            </div>
            <div className="flex items-end justify-end">
              <button
                onClick={handleDeleteUser}
                type="button"
                className="flex-inline text-center py-3 px-8 text-sm font-medium rounded-md border border-transparent bg-zinc-800 text-white"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8 justify-end">
          <button
            onClick={handleUpdateSettings}
            type="button"
            className="flex-inline text-center py-3 px-8 text-sm font-medium rounded-md border border-transparent bg-green-600 text-white"
          >
            Salva le modifiche
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
