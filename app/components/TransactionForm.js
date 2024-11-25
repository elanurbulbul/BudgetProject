"use client"
import { useState } from "react";

export default function TransactionForm({ categories, addTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      alert("Lütfen bir kategori seçin.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: date || new Date().toISOString().slice(0, 10),
    };

    addTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setType("income");
    setCategory("");
    setDate("");
    alert("İşlem başarıyla eklendi!");
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="flex flex-col items-center gap-4 mx-auto w-full max-w-lg p-6 bg-gray-100 rounded shadow-md dark:bg-gray-800"
    >
    <div className="w-full">
      <label className="block text-md font-medium mb-1">Açıklama</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-400"
        required
      />
    </div>
    <div className="w-full">
      <label className="block text-m font-medium mb-1">Tutar</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-400"
        required
      />
    </div>
    <div className="w-full">
      <label className="block text-md font-medium mb-1">Tür</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-400"
      >
        <option value="income">Gelir</option>
        <option value="expense">Gider</option>
      </select>
    </div>
    <div className="w-full">
      <label className="block text-md font-medium mb-1">Kategori</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-400"
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
    <div className="w-full">
      <label className="block text-md font-medium mb-1">Tarih</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-400"
      />
    </div>
    <button
      type="submit"
      className="px-6 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Kaydet
    </button>
  </form>
  
  );
}
