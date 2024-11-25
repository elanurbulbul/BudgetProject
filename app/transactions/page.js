"use client"
import { useBudget } from "../context/BudgetContext";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import PDFFormat from "../components/PDFFormat";
import ReportPage from "../components/Reports";

export default function TransactionsPage() {
  const {
    categories,
    transactions,
    addTransaction,
    deleteTransaction,
    getCategoryWarning,
  } = useBudget();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className=" mx-auto p-4 ">
      <h2 className="text-3xl font-bold mb-4 text-center">Gelir/Gider Ekle</h2>
      
      <TransactionForm categories={categories} addTransaction={addTransaction} />
       
       
      <div className="mt-12">
        <h3 className="text-3xl font-semibold">Toplam Gelir ve Gider</h3>
        <div className="grid grid-cols-2 gap-8 mt-10">
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

      <div className="mt-10 flex flex-col flex-wrap md:flex-row gap-10">
  <div className="flex-1">
    <h4 className="text-lg text-green-800 dark:text-green-400 font-bold">Gelir Listesi</h4>
    <TransactionList
      transactions={transactions}
      deleteTransaction={deleteTransaction}
      getCategoryWarning={getCategoryWarning}
      type="income"
    />
  </div>
  <div className="flex-1">
    <h4 className="text-lg text-red-900 dark:text-red-600 font-bold">Gider Listesi</h4>
    <TransactionList
      transactions={transactions}
      deleteTransaction={deleteTransaction}
      getCategoryWarning={getCategoryWarning}
      type="expense"
    />
  </div>
</div>
<div>
        <ReportPage/>
        </div>
    <div className="flex justify-center">
    <PDFFormat
        transactions={transactions}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />
    </div>
    
    </div>
  );
}
