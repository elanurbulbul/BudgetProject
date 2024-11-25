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
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label className="block text-sm font-medium">Açıklama</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded dark:bg-slate-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tutar</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded dark:bg-slate-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tür</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded dark:bg-slate-400"
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
          className="w-full p-2 border rounded dark:bg-slate-400"
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
          className="w-full p-2 border rounded dark:bg-slate-400"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-slate-500 text-white rounded hover:bg-blue-600"
      >
        Kaydet
      </button>
    </form>
  );
}
