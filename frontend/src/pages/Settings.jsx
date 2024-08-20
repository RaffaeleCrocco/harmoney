import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../config";
import CoinAnimation from "../components/CoinAnimation";

const Settings = ({ userId }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = () => {
    setLoading(true);
    axios
      .delete(`${BASEURL}/settings/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        navigate(0);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Impostazioni</div>
      </div>
      <div className="min-w-full h-[60vh] flex flex-col items-center p-8">
        <p className="text-xs">Sto lavorando a questa pagina.</p>
        <CoinAnimation />
      </div>
    </div>
  );
};

export default Settings;
