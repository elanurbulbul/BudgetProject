"use client";
import { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const [categories, setCategories] = useState([
    "Gıda",
    "Ulaşım",
    "Eğlence",
    "Faturalar",
    "Sağlık",
    "Diğer",
  ]);

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);


  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        categories,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
