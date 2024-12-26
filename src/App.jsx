import React, { useState } from 'react';
import './App.css';
import BillingForm from './componentes/BillingForm';
import InvoicePreview from './componentes/InvoicePreview';
import GenerateInvoice from './componentes/GenerateInvoice';
import { Container, Button } from '@mui/material';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleCalculate = (data) => {
    setInvoiceData(data);
  };

  return (
    <div>
      <h1>Facturas</h1>
      
      <Container sx={{ padding: 2 }}>
        <BillingForm onCalculate={handleCalculate} />

        {/* Si hay datos de la factura, mostramos la vista previa y el botón para generar la factura PDF */}
        {invoiceData && (
          <>
            <InvoicePreview data={invoiceData} />
            <GenerateInvoice data={invoiceData} />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
