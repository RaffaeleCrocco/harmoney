import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Categories from "./Categories";
import Overview from "./Overview";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Settings from "./Settings";
import useDataStore from "../store/useDataStore";
import useContentStore from "../store/useContentStore";
import Transactions from "./Transactions";
import useFiltersStore from "../store/useFiltersStore";

const Dashboard = () => {
  //navigation to go back home if token not valid
  const navigate = useNavigate();

  //stores
  const { fetchData, error, loading, user } = useDataStore();
  const { content, showModal } = useContentStore();
  const { fetchFilters } = useFiltersStore();

  //component state
  const [darkMode, setDarkMode] = useState(false);

  //use effect da testare
  useEffect(() => {
    const token = localStorage.getItem("token");

    const tryFetch = async () => {
      if (!token) {
        navigate("/");
        return;
      }

      try {
        await fetchData(token);
        await fetchFilters(token);

        if (error) {
          console.error("error in fetching:", error);
          navigate("/");
        }
      } catch (err) {
        console.error("error:", err);
        navigate("/");
      }
    };

    tryFetch();
  }, [fetchData, fetchFilters, error, navigate]);

  useEffect(() => {
    setDarkMode(user?.settings.isDarkModeOn);
  }, [user]);

  let renderedContent;
  switch (content) {
    case 1:
      renderedContent = <Overview />;
      break;
    case 2:
      renderedContent = <Transactions />;
      break;
    case 3:
      renderedContent = <Categories />;
      break;
    case 4:
      renderedContent = <Settings />;
      break;
    default:
      renderedContent = <Overview />;
  }

  if (loading) return <Spinner />;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-black select-none h-screen overflow-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <Navigation />
        <div className="dark:bg-black dark:text-gray-200">
          {renderedContent}
        </div>
        {showModal ? <Modal /> : ""}
      </div>
    </div>
  );
};

export default Dashboard;
