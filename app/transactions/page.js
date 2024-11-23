"use client";
import { useState } from "react";
import { useBudget } from "../context/BudgetContext"; // BudgetContext'ten kategorileri almak için

export default function TransactionsPage() {
  const { categories, transactions, addTransaction } = useBudget();
  const [description, setDescription] = useState(""); // Kategori açıklaması
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState(""); // Kategori state
  const [date, setDate] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      alert("Lütfen bir kategori seçin.");
      return;
    }

    const newTransaction = {
      description: category,  
      amount: parseFloat(amount),
      type,
      date: date || new Date().toISOString().slice(0, 10),
    };

    addTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setType("income");
    setCategory("");  // Kategoriyi sıfırlama
    setDate("");
    alert("İşlem başarıyla eklendi!");
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

    
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Gelir/Gider Ekle</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block text-sm font-medium">Açıklama</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tutar</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tür</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="income">Gelir</option>
            <option value="expense">Gider</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Kategori Seç</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Tarih</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Kaydet
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Toplam Gelir ve Gider</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <h4 className="font-medium">Toplam Gelir:</h4>
            <p className="text-green-500">{totalIncome.toFixed(2)} ₺</p>
          </div>
          <div>
            <h4 className="font-medium">Toplam Gider:</h4>
            <p className="text-red-500">{totalExpenses.toFixed(2)} ₺</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Gelir/Gider Listesi</h3>
        <ul className="mt-2">
          {transactions.map((transaction, index) => (
            <li key={index} className="border-b py-2">
              <div className="flex justify-between">
                <p>{transaction.description}</p>
                <span
                  className={`${
                    transaction.type === "income" ? "text-green-500" : "text-red-500"
                  } font-semibold`}
                >
                  {transaction.type === "income" ? "+" : "-"} {transaction.amount.toFixed(2)} ₺
                </span>
              </div>
              <div className="text-sm text-gray-500">{transaction.date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
