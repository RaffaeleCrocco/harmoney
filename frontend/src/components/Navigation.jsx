import React, { useEffect } from "react";
import { LogOut } from "lucide-react";
import harmoneylogo from "../assets/harmoney-logo.svg";
import harmoneylogodark from "../assets/harmoney-logo-dark.svg";
import { useNavigate } from "react-router-dom";
import useDataStore from "../store/useDataStore";
import useContentStore from "../store/useContentStore";

const Navigation = () => {
  //store
  const { user } = useDataStore();
  const { content, setContent } = useContentStore();
  //utils
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("token");
    navigate(0);
  };

  return (
    <div className="dark:bg-black dark:text-gray-200">
      <div className="flex justify-between items-center py-3 px-6">
        <div className="ms-3 flex flex-col justify-start">
          <div>
            <img
              className="h-8 text-black dark:text-white"
              src={
                user?.settings.isDarkModeOn ? harmoneylogodark : harmoneylogo
              }
            />
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
            className="w-10 h-10 border-2 border-zinc-600 rounded-full dark:border-0"
            src={`https://api.dicebear.com/9.x/notionists-neutral/svg?backgroundColor=ffffff&seed=${user?.userId}`}
          />
        </div>
      </div>
      <div className="relative flex mt-3 px-6 gap-10 text-sm border-b border-zinc-200 dark:border-gray-600 overflow-x-auto overflow-y-hidden">
        <div
          onClick={() => {
            setContent(1);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 dark:text-gray-200 dark:hover:text-gray-400 flex flex-col justify-center hover:text-zinc-900 ${
            content == 1 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Overview</span>
          <div
            className={`w-full border-2 border-zinc-800 dark:border-gray-100 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 1 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            setContent(2);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 dark:text-gray-200 dark:hover:text-gray-400 flex flex-col justify-center hover:text-zinc-900 ${
            content == 2 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Transazioni</span>
          <div
            className={`w-full border-2 border-zinc-800 dark:border-gray-100 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 2 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            setContent(3);
          }}
          className={`group cursor-pointer font-normal text-zinc-500 dark:text-gray-200 dark:hover:text-gray-400 flex flex-col justify-center hover:text-zinc-900 ${
            content == 3 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Categorie</span>
          <div
            className={`w-full border-2 border-zinc-800 dark:border-gray-100 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 3 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
        <div
          onClick={() => {
            setContent(4);
          }}
          className={`ms-auto group cursor-pointer font-normal text-zinc-500 dark:text-gray-200 dark:hover:text-gray-400 flex flex-col justify-center hover:text-zinc-900 ${
            content == 4 ? "text-zinc-900" : ""
          }`}
        >
          <span className="mx-3">Settings</span>
          <div
            className={`w-full border-2 border-zinc-800 dark:border-gray-100 rounded-md -mb-[1px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              content == 4 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
