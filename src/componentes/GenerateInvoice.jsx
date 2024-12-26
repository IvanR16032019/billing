import React from 'react';
import { jsPDF } from 'jspdf';

const GenerateInvoice = ({ data }) => {
  const { products, customerName, totalAmount, changeToReturn } = data;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Factura", 20, 10);
    doc.text(`Cliente: ${customerName}`, 20, 20);
    doc.autoTable({
      startY: 30,
      head: [["Producto", "Cantidad", "Precio", "Total"]],
      body: products.map((product) => [
        product.name,
        product.quantity,
        product.price,
        product.total,
      ]),
    });
    doc.text(`Total: ${totalAmount}`, 20, doc.lastAutoTable.finalY + 10);
    doc.text(`Cambio a devolver: ${changeToReturn}`, 20, doc.lastAutoTable.finalY + 20);
    doc.save("factura.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
};

export default GenerateInvoice;
