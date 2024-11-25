"use client";

import { useEffect, useState } from "react";
import TransactionsPage from "./transactions/page"; // İşlem bileşeni
import ThemeToggle from "./components/ThemeToggle";
import Suggestions from "./components/Suggestions";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("budgetData")) || [];
    setTransactions(storedData);
    calculateTotals(storedData);
  }, []);

  const calculateTotals = (data) => {
    const income = data
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);
    const expense = data
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-blue-500 dark:bg-blue-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Kişisel Bütçe Takip Uygulaması</h1>
        <ThemeToggle />

      </header>

      <main className="p-4 lg:max-w-100">
        <div className="p-10">
          <TransactionsPage />
          <Suggestions />
        </div>
      </main>

      <footer className="bg-blue-500 dark:bg-blue-800 text-white p-4 text-center">
        © 2024 Bütçe Uygulaması
      </footer>
    </div>
  );
}
