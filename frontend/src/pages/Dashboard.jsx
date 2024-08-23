import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Categories from "./Categories";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import Withdrawals from "./Withdrawals";
import Overview from "./Overview";
import Spinner from "../components/Spinner";
import History from "./History";
import Modal from "../components/Modal";
import Settings from "./Settings";
import useDataStore from "../store/useDataStore";
import useContentStore from "../store/useContentStore";

const Dashboard = () => {
  //navigation to go back home if token not valid
  const navigate = useNavigate();

  //stores
  const { fetchData, user, loading } = useDataStore();
  const { content, showModal } = useContentStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData(token);
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
      renderedContent = <Expenses />;
      break;
    case 3:
      renderedContent = <Incomes />;
      break;
    case 4:
      renderedContent = <Withdrawals />;
      break;
    case 5:
      renderedContent = <Categories />;
      break;
    case 6:
      renderedContent = <History />;
      break;
    case 7:
      renderedContent = <Settings />;
      break;
    default:
      renderedContent = <div>Default content</div>;
  }

  if (loading) return <Spinner />;

  return (
    <div>
      <Navigation />
      <div>{renderedContent}</div>
      {showModal ? <Modal /> : ""}
    </div>
  );
};

export default Dashboard;
