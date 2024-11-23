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

  // Kategori başına belirlenen bütçe limitleri
  const categoryLimits = {
    "Gıda": 50,
    "Ulaşım": 50,
    "Eğlence": 50,
    "Faturalar": 50,
    "Sağlık": 50,
    "Diğer": 50,
  };

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

  // Kategorilere göre giderlerin toplamını hesapla
  const getCategoryExpenses = (category) => {
    return transactions
      .filter((t) => t.type === "expense" && t.description === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // Kategoriler için %80 limit kontrolü
  const getCategoryWarning = (category) => {
    const totalSpent = getCategoryExpenses(category);
    const limit = categoryLimits[category];
    if (totalSpent >= limit * 0.8) {
      return `Uyarı: ${category} kategorisinin %80 limitine ulaşıldı!`;
    }
    return null;
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        categories,
        categoryLimits,
        getCategoryExpenses,
        getCategoryWarning,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
