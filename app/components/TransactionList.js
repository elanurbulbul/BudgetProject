"use client"

export default function TransactionList({
    transactions,
    deleteTransaction,
    getCategoryWarning,
    type,
  }) {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.type === type
    );
  
    return (
      <ul className="mt-2">
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id} className="py-2">
            <button onClick={() => deleteTransaction(transaction.id)}>X</button>
            <div className="flex justify-between">
              <p className="text-yellow-500 text-lg font-bold">
                Kategori: {transaction.category}
              </p>
              <span
                className={`font-semibold ${
                  type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {type === "income" ? "+" : "-"} {transaction.amount.toFixed(2)} ₺
              </span>
            </div>
            <div className="text-sm text-gray-500">{transaction.date}</div>
            <p>{transaction.description}</p>
            {type === "expense" && getCategoryWarning(transaction.category) && (
              <p className="text-yellow-500 text-sm mt-2">
                {getCategoryWarning(transaction.category)}
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  }
  