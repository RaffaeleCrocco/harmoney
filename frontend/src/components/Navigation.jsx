import React from "react";
import { LogOut } from "lucide-react";
import harmoneylogo from "../assets/harmoney-logo.svg";
import harmoneyicon from "../assets/icon.svg";
import { useNavigate } from "react-router-dom";
import useDataStore from "../store/useDataStore";
import useContentStore from "../store/useContentStore";

const Navigation = () => {
  const { user } = useDataStore();
  const { content, setContent } = useContentStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("token");
    navigate(0);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-2 px-6">
        <div className="ms-3 flex flex-col justify-start">
          <div>
            <img className="h-8" src={harmoneylogo} />
          </div>
          <p className="text-xs ps-0.5 font-semibold leading-none">
            Money, with harmony
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex flex-col items-end">
            <p className="leading-tight">
              <span className="font-semibold">{user?.username}</span>
            </p>
            <p
              onClick={handleLogout}
              className="text-xs text-gray-500 cursor-pointer leading-tight flex items-center gap-1 hover:underline"
            >
              Disconnettiti <LogOut size={10} />
            </p>
          </div>
          <img
            className="w-10 h-10 border-2 border-zinc-600 rounded-full"
            src={`https://api.dicebear.com/9.x/notionists-neutral/svg?backgroundColor=ffffff&seed=${user?.userId}`}
          />
        </div>
      </div>
      <div className="relative flex mt-3 px-6 gap-10 text-sm border-b border-zinc-200">
        <div
          onClick={() => {
            localStorage.setItem("page", 1);
            setContent(1);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 flex flex-col justify-center hover:text-zinc-900 ${
            content == 1 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Overview</span>
          <div
            className={`w-full border-2 border-zinc-800 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 1 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            localStorage.setItem("page", 2);
            setContent(2);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 hidden lg:flex flex-col justify-center hover:text-zinc-900 ${
            content == 2 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Uscite</span>
          <div
            className={`w-full border-2 border-zinc-800 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 2 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            localStorage.setItem("page", 3);
            setContent(3);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 hidden lg:flex flex-col justify-center hover:text-zinc-900 ${
            content == 3 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Entrate</span>
          <div
            className={`w-full border-2 border-zinc-800 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 3 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            localStorage.setItem("page", 4);
            setContent(4);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 hidden lg:flex flex-col justify-center hover:text-zinc-900 ${
            content == 4 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Prelievi</span>
          <div
            className={`w-full border-2 border-zinc-800 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 4 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            localStorage.setItem("page", 5);
            setContent(5);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 flex flex-col justify-center hover:text-zinc-900 ${
            content == 5 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Categorie</span>
          <div
            className={`w-full border-2 border-zinc-800 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 5 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            localStorage.setItem("page", 6);
            setContent(6);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 hidden lg:flex flex-col justify-center hover:text-zinc-900 ${
            content == 6 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Cronologia</span>
          <div
            className={`w-full border-2 border-zinc-800 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 6 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            localStorage.setItem("page", 7);
            setContent(7);
          }}
          className={`ms-auto group cursor-pointer font-normal text-zinc-500 hidden:flex flex-col justify-center hover:text-zinc-900 ${
            content == 7 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Settings</span>
          <div
            className={`w-full border-2 border-zinc-800 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 7 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
