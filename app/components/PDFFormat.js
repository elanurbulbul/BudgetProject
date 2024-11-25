import { jsPDF } from "jspdf";

export default function PDFFormat({ transactions, totalIncome, totalExpenses }) {
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Finansal Rapor", 20, 20);
    doc.setFontSize(12);
    doc.text(`Toplam Gelir: ${totalIncome.toFixed(2)} ₺`, 20, 30);
    doc.text(`Toplam Gider: ${totalExpenses.toFixed(2)} ₺`, 20, 40);

    doc.text("Gelir Listesi:", 20, 50);
    let yPosition = 60;
    transactions
      .filter((t) => t.type === "income")
      .forEach((t) => {
        doc.text(`${t.description} (${t.category}): +${t.amount.toFixed(2)} ₺`, 20, yPosition);
        yPosition += 10;
      });

    doc.text("Gider Listesi:", 20, yPosition + 10);
    yPosition += 20;
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        doc.text(`${t.description} (${t.category}): -${t.amount.toFixed(2)} ₺`, 20, yPosition);
        yPosition += 10;
      });

    doc.save("finansal_rapor.pdf");
  };

  return (
    <button
      onClick={generatePDFReport}
      className="mt-6 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      PDF Olarak İndir
    </button>
  );
}
