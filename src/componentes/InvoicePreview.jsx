import React from "react";
//QUITAR PRODUCTO, CANTIDAD, PRECIO, TOTAL DE MI FACTURA, que
// cuando se borre en dinero recibido no se ponga el numero 0
const InvoicePreview = ({ data }) => {
  const { products, customerName, totalAmount, changeToReturn } = data;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Factura</h2>
      <div>
        <h3>Cliente: {customerName}</h3>

        <table
          style={{
            width: "100%",
            margin: "0 auto",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Total: {totalAmount}</h4>
          <h4>Cambio a devolver: {changeToReturn}</h4>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
