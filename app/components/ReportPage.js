"use client";

import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useBudget } from "../context/BudgetContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ReportPage() {
  const { transactions } = useBudget();
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState({});
  const [monthlyExpense, setMonthlyExpense] = useState({});

  useEffect(() => {
    const income = {};
    const expenses = {};

    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", { month: "short" });
      if (transaction.type === "income") {
        income[month] = (income[month] || 0) + transaction.amount;
      } else if (transaction.type === "expense") {
        expenses[month] = (expenses[month] || 0) + transaction.amount;
      }
    });

    setIncomeData(Object.values(income));
    setExpenseData(Object.values(expenses));
    setMonthlyIncome(income);
    setMonthlyExpense(expenses);
  }, [transactions]);

  const dataBar = {
    labels: Object.keys(monthlyIncome), // Aylık veriler
    datasets: [
      {
        label: "Gelir",
        data: Object.values(monthlyIncome),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Gider",
        data: Object.values(monthlyExpense),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataPie = {
    labels: ["Gelir", "Gider"],
    datasets: [
      {
        label: "Gelir ve Gider Dağılımı",
        data: [incomeData.reduce((a, b) => a + b, 0), expenseData.reduce((a, b) => a + b, 0)],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded dark:bg-slate-700">
      <h2 className="text-2xl font-bold mb-4">Gelir ve Gider Raporları</h2>

      <div className="grid gap-6">
        {/* Çubuk Grafik - Gelir ve Gider Aylık Dağılımı */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Aylık Gelir ve Gider Dağılımı</h3>
          <Bar data={dataBar} />
        </div>

        {/* Pasta Grafik - Toplam Gelir ve Gider Dağılımı */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Toplam Gelir ve Gider Dağılımı</h3>
          <Pie data={dataPie} />
        </div>
      </div>
    </div>
  );
}