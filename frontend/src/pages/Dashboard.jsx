import React, { useEffect } from "react";
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

const Dashboard = () => {
  //navigation to go back home if token not valid
  const navigate = useNavigate();

  //stores
  const { fetchData, error, loading } = useDataStore();
  const { content, showModal } = useContentStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tryFetch = async () => {
        await fetchData(token);
        if (error) {
          console.error("error in fetch:", error);
          navigate("/");
        }
      };
      tryFetch();
    } else {
      navigate("/");
    }
  }, [fetchData, navigate]);

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
    <div className="h-screen overflow-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
      <Navigation />
      <div>{renderedContent}</div>
      {showModal ? <Modal /> : ""}
    </div>
  );
};

export default Dashboard;
