import { FaTrash } from "react-icons/fa"; // Font Awesome'dan çöp kutusu ikonu

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
    <ul className="mt-4 space-y-4">
      {filteredTransactions.map((transaction) => (
        <li
          key={transaction.id}
          style={{minHeight:"145px"}}
          className="p-4 border rounded shadow bg-gray-50 dark:bg-gray-800"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-yellow-500 text-lg font-bold">
              Kategori: {transaction.category}
            </h3>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Delete Transaction"
            >
              <FaTrash size={20} />
            </button>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
              {transaction.description}
            </p>
            <span
              className={`font-semibold ${
                type === "income" ? "text-green-500" : "text-red-500"
              }`}
            >
              {type === "income" ? "+" : "-"} {transaction.amount.toFixed(2)} ₺
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {transaction.date}
          </div>
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
