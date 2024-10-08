import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";
import useDataStore from "../store/useDataStore";
import Spinner from "../components/Spinner";
import useFiltersStore from "../store/useFiltersStore";

const Settings = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //store
  const { user } = useDataStore();
  const { filters } = useFiltersStore();

  //form state
  const [isPrivacyFilterOn, setIsPrivacyFilterOn] = useState(true);
  const [isSimpleModeOn, setIsSimpleModeOn] = useState(false);
  const [isRememberFiltersOn, setIsRememberFiltersOn] = useState(false);
  const [startingAmount, setStartingAmount] = useState(0);
  const [deleteLabel, setDeleteLabel] = useState("");
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //filter state
  const [currentFilters, setCurrentFilters] = useState();

  useEffect(() => {
    setIsPrivacyFilterOn(user?.settings.isPrivacyFilterOn);
    setStartingAmount(user?.settings.startingAmount);
    setIsSimpleModeOn(user?.settings.isSimpleModeOn);
    setIsRememberFiltersOn(user?.settings.isRememberFiltersOn);
    setIsDarkModeOn(user?.settings.isDarkModeOn);
    setCurrentFilters(filters);
  }, [user, filters]);

  const handleUpdateSettings = () => {
    const data = {
      isSimpleModeOn,
      isPrivacyFilterOn,
      startingAmount,
      isRememberFiltersOn,
      isDarkModeOn,
    };
    setLoading(true);
    axios
      .put(`${BASEURL}/settings/update`, data, {
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

  const handlePasswordChange = () => {
    const data = {
      currentPassword,
      newPassword,
    };
    setLoading(true);
    axios
      .put(`${BASEURL}/settings/change-password`, data, {
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

  if (loading) return <Spinner />;

  return (
    <div className="mb-10">
      <div className="w-full border-b border-zinc-200 dark:border-gray-600 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Impostazioni</div>
      </div>
      <div className="min-w-full min-h-[60vh]">
        {/* Filtro privacy */}
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Filtro privacy</p>
            <p className="text-xs mt-1">
              Quando attivo il totale mensile e generale verranno nascosti di
              default.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-zinc-800 rounded-md">
            <label className="flex p-3 w-full text-sm ">
              <p className="text-xs mt-1 w-2/3">
                Potrai comunque vedere l'importo cliccando l'icona
                corrispondente accanto ad esso.
              </p>
              <input
                type="checkbox"
                checked={isPrivacyFilterOn}
                onChange={() => setIsPrivacyFilterOn(!isPrivacyFilterOn)}
                className="appearance-none w-4 h-4 border-2 border-zinc-800 ms-auto mt-0.5 rounded bg-white checked:bg-zinc-800 dark:border-gray-200 dark:bg-black dark:checked:bg-gray-200"
              />
            </label>
          </div>
        </div>
        {/* Dark mode */}
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Dark Mode</p>
            <p className="text-xs mt-1">
              Imposta il sito in dark mode. Ricorderemo della scelta ad ogni
              accesso.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-zinc-800 rounded-md">
            <label className="flex p-3 w-full text-sm ">
              <p className="text-xs mt-1 w-2/3">
                Le opzioni di dashboard semplificata rimarranno disponibili.
              </p>
              <input
                type="checkbox"
                checked={isDarkModeOn}
                onChange={() => setIsDarkModeOn(!isDarkModeOn)}
                className="appearance-none w-4 h-4 border-2 border-zinc-800 ms-auto mt-0.5 rounded bg-white checked:bg-zinc-800 dark:border-gray-200 dark:bg-black dark:checked:bg-gray-200 "
              />
            </label>
          </div>
        </div>
        {/* Dashboard semplificata */}
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Dashboard semplificata</p>
            <p className="text-xs mt-1">
              Quando attiva l'interfaccia utente apparirà più organica e
              semplificata.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-zinc-800 rounded-md">
            <label className="flex p-3 w-full text-sm ">
              <p className="text-xs mt-1 w-2/3">
                Tenderemo a mantenere visibili gli elementi chiave della
                piattaforma.
              </p>
              <input
                type="checkbox"
                checked={isSimpleModeOn}
                onChange={() => setIsSimpleModeOn(!isSimpleModeOn)}
                className="appearance-none w-4 h-4 border-2 border-zinc-800 ms-auto mt-0.5 rounded bg-white checked:bg-zinc-800 dark:border-gray-200 dark:bg-black dark:checked:bg-gray-200 "
              />
            </label>
          </div>
        </div>
        {/* Saldo iniziale */}
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Saldo iniziale</p>
            <p className="text-xs mt-1">
              Il totale dei soldi posseduti quando inizi ad usare l'app,
              inizieremo i conti da qui.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-zinc-800 rounded-md p-4 ">
            <p className="text-xs">
              Inserisci la somma (in euro) dei soldi che possiedi, in contanti e
              su carte.
            </p>
            <input
              value={startingAmount}
              onChange={(e) => setStartingAmount(e.target.value)}
              type="number"
              className="w-full items-center mt-2 py-3 px-4 text-sm font-medium bg-white dark:bg-black dark:border-gray-900 dark:text-gray-200 border text-gray-800 rounded-md"
            />
          </div>
        </div>
        {/* Ricorda i miei filtri */}
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Ricorda i miei filtri</p>
            <p className="text-xs mt-1">
              Imposta automaticamente gli ultimi filtri usati come di default.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-zinc-800 rounded-md">
            <label className="flex p-3 w-full text-sm ">
              <p className="text-xs mt-1 w-2/3">
                Ci ricorderemo degli ultimi filtri che hai usato. Se 'off'
                useremo quelli di default.
              </p>
              <input
                type="checkbox"
                checked={isRememberFiltersOn}
                onChange={() => setIsRememberFiltersOn(!isRememberFiltersOn)}
                className="appearance-none w-4 h-4 border-2 border-zinc-800 ms-auto mt-0.5 rounded bg-white checked:bg-zinc-800 dark:border-gray-200 dark:bg-black dark:checked:bg-gray-200 "
              />
            </label>
          </div>
        </div>
        {/* Modifica password */}
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Modifica password</p>
            <p className="text-xs mt-1">
              Verrai disconennesso e dovrai utilizzare la nuova password per
              effettuare il login.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-zinc-800 rounded-md p-4 flex flex-col lg:flex-row gap-4">
            <div className="w-full">
              <p className="text-xs">
                Per confermare inserisci la tua password precedente.
              </p>
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="text"
                className="w-full items-center mt-2 py-3 px-4 text-sm font-medium bg-white dark:bg-black dark:border-gray-900 dark:text-gray-200 border text-gray-800 rounded-md"
                placeholder="Password attuale"
              />
            </div>
            <div className="w-full">
              <p className="text-xs">
                Inserisci la nuova password e premi Modifica.
              </p>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                className="w-full items-center mt-2 py-3 px-4 text-sm font-medium bg-white dark:bg-black dark:border-gray-900 dark:text-gray-200 border text-gray-800 rounded-md"
                placeholder="Nuova password"
              />
            </div>
            <div className="flex items-end justify-end">
              <button
                onClick={handlePasswordChange}
                type="button"
                className="flex-inline text-center py-3 px-8 text-sm font-medium rounded-md bg-zinc-800 dark:bg-gray-200 text-white dark:text-black"
              >
                Modifica
              </button>
            </div>
          </div>
        </div>
        {/* Elimina account */}
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8">
          <div className="w-full lg:w-1/4 text-start lg:text-end pe-10">
            <p className="font-semibold">Elimina account</p>
            <p className="text-xs mt-1">
              Tutte le transazioni e le categorie associate all'account verranno
              eliminate, l'azione è irreversibile.
            </p>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:w-3/4 border border-red-500 rounded-md p-4 flex gap-4">
            <div className="w-full">
              <p className="text-xs">
                Per confermare l'intenzione di eliminare il tuo account
                inserisci il tuo username e premi Elimina.
              </p>
              <input
                onChange={(e) => setDeleteLabel(e.target.value)}
                type="text"
                className="w-full items-center mt-2 py-3 px-4 text-sm font-medium bg-white dark:bg-black dark:border-gray-900 dark:text-gray-200 border text-gray-800 rounded-md"
                placeholder={user.username}
              />
            </div>
            <div className="flex items-end justify-end">
              <button
                onClick={handleDeleteUser}
                type="button"
                className="flex-inline text-center py-3 px-8 text-sm font-medium rounded-md bg-zinc-800 dark:bg-red-500 text-white dark:text-black"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
        {/* Salva impostazioni */}
        <div className="w-full flex flex-col lg:flex-row px-6 lg:px-52 mt-8 justify-end">
          <button
            onClick={handleUpdateSettings}
            type="button"
            className="flex-inline text-center py-3 px-8 text-sm font-medium rounded-md border border-transparent bg-green-600 dark:bg-green-400 dark:text-black text-white"
          >
            Salva le modifiche
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
