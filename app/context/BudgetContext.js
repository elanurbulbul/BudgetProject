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

  // bütçe 
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
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };


  // Kategorilere göre giderlerin toplamı
  const getCategoryExpenses = (category) => {
    return transactions
      .filter((t) => t.type === "expense" && t.category === category)
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
  
  const getSavingsSuggestions = () => {
    const suggestions = [];
  
    categories.forEach((category) => {
      const totalSpent = getCategoryExpenses(category);
      const limit = categoryLimits[category];
      if (totalSpent > limit) {
        suggestions.push(
          `${category} kategorisinde limitinizi aştınız. Gelecek ay bu kategoride daha az harcama yapmalısın..`
        );
      } else if (totalSpent > limit * 0.8) {
        suggestions.push(
          `${category} kategorisinde harcamalarınız limitin %80'ine ulaştı. Harcamalarınızı kontrol altında tutmaya çalışın.`
        );
      }
    });
  
    if (suggestions.length === 0) {
      suggestions.push("Harcamalarınız kontrol altında! Böyle devam edin.");
    }
  
    return suggestions;
  };
  

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        categories,
        categoryLimits,
        getCategoryExpenses,
        getCategoryWarning,
        getSavingsSuggestions
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
