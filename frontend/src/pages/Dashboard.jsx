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
import { BASEURL } from "../config";

const Dashboard = () => {
  const navigate = useNavigate(); //navigation to go back home if token not valid
  const [content, setContent] = useState(
    parseInt(localStorage.getItem("page")) || 1
  );
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState();
  const [categories, setCategories] = useState();
  const [filters, setFilters] = useState({ categories: "all", type: "all" });
  const [user, setUser] = useState({ username: "", userId: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(0);

  const [transactionIdToUpdate, setTransactionIdToUpdate] = useState("");
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState("");

  const token = localStorage.getItem("token"); //getting token from local storage

  useEffect(() => {
    const fetchAuth = axios.get(`${BASEURL}/auth/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const fetchTransactions = axios.get(`${BASEURL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const fetchCategories = axios.get(`${BASEURL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Promise.all([fetchAuth, fetchTransactions, fetchCategories])
      .then(([authResponse, transactionResponse, categoryResponse]) => {
        setTransactions(transactionResponse.data.data);
        setCategories(categoryResponse.data.data);
        setUser({
          username: authResponse.data.user.username,
          userId: authResponse.data.user.userId,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        navigate("/");
      });
  }, []);

  const handleCategoriesTag = (categoryIds) => {
    return categoryIds.map((id) => {
      const category = categories.find((category) => category._id === id);
      return category ? category.name : "Eliminata";
    });
  };

  const applyFilters = (transaction) => {
    const { categories, type } = filters;

    // Check categories filter
    const isCategorizedFilterPassed =
      categories === "all" ||
      (categories === "categorized" &&
        transaction.categoryIds &&
        transaction.categoryIds.length > 0) ||
      (categories === "uncategorized" &&
        (!transaction.categoryIds || transaction.categoryIds.length === 0));

    // Check type filter
    const typeFilterPassed = type === "all" || transaction.type === type;

    // Apply all filters
    return isCategorizedFilterPassed && typeFilterPassed;
  };

  let renderedContent;
  switch (content) {
    case 1:
      renderedContent = (
        <Overview
          transactions={transactions}
          filters={filters}
          setFilters={setFilters}
          handleCategoriesTag={handleCategoriesTag}
          applyFilters={applyFilters}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          setTransactionIdToUpdate={setTransactionIdToUpdate}
        />
      );
      break;
    case 2:
      renderedContent = (
        <Expenses
          transactions={transactions}
          filters={filters}
          setFilters={setFilters}
          handleCategoriesTag={handleCategoriesTag}
          applyFilters={applyFilters}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          setTransactionIdToUpdate={setTransactionIdToUpdate}
        />
      );
      break;
    case 3:
      renderedContent = (
        <Incomes
          transactions={transactions}
          filters={filters}
          setFilters={setFilters}
          handleCategoriesTag={handleCategoriesTag}
          applyFilters={applyFilters}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          setTransactionIdToUpdate={setTransactionIdToUpdate}
        />
      );
      break;
    case 4:
      renderedContent = (
        <Withdrawals
          transactions={transactions}
          filters={filters}
          setFilters={setFilters}
          handleCategoriesTag={handleCategoriesTag}
          applyFilters={applyFilters}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          setTransactionIdToUpdate={setTransactionIdToUpdate}
        />
      );
      break;
    case 5:
      renderedContent = (
        <Categories
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          handleCategoriesTag={handleCategoriesTag}
          applyFilters={applyFilters}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          setCategoryIdToUpdate={setCategoryIdToUpdate}
        />
      );
      break;
    case 6:
      renderedContent = (
        <History
          transactions={transactions}
          filters={filters}
          setFilters={setFilters}
          handleCategoriesTag={handleCategoriesTag}
          applyFilters={applyFilters}
        />
      );
      break;
    case 7:
      renderedContent = <Settings userId={user.userId} />;
      break;
    default:
      renderedContent = <div>Default content</div>;
  }

  if (loading) return <Spinner />;

  return (
    <div>
      <Navigation user={user} content={content} setContent={setContent} />
      <div>{renderedContent}</div>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          modalContent={modalContent}
          categories={categories}
          transactionId={transactionIdToUpdate}
          categoryId={categoryIdToUpdate}
          setContent={setContent}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
