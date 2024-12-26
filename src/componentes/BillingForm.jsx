import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import '../hojas-de-estilo/BillingForm.css'; // Asegúrate de tener este archivo de estilos

function BillingForm() {
    const [customerName, setCustomerName] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [moneyReceived, setMoneyReceived] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [change, setChange] = useState(0);

    // Función para agregar un producto
    const addProduct = () => {
        if (product && quantity && price) {
            const total = parseFloat(price) * parseFloat(quantity);
            const newTotalAmount = totalAmount + total;
            setProducts([...products, { product, quantity, price, total }]);
            setTotalAmount(newTotalAmount);
            setProduct('');
            setQuantity('');
            setPrice('');
        } else {
            alert('Por favor, complete todos los campos de producto.');
        }
    };

    // Función para eliminar un producto
    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        const updatedTotalAmount = updatedProducts.reduce((acc, p) => acc + p.total, 0);
        setProducts(updatedProducts);
        setTotalAmount(updatedTotalAmount);
    };

    // Función para manejar el dinero recibido
    const handleMoneyReceived = (e) => {
        const received = parseFloat(e.target.value) || 0;
        setMoneyReceived(received);
        const changeToReturn = received >= totalAmount ? received - totalAmount : 0;
        setChange(changeToReturn);
    };

    // Función para generar la factura en PDF
    const generateInvoice = () => {
        const doc = new jsPDF();

        // Título de la factura
        doc.setFontSize(18);
        doc.text("Factura - IRC DEV", 14, 16);

        // Información del cliente
        doc.setFontSize(12);
        doc.text(`Cliente: ${customerName}`, 14, 24);

        // Tabla de productos
        const productDetails = products.map(p => [p.product, p.quantity, p.price, p.total]);
        doc.autoTable({
            head: ['Producto', 'Cantidad', 'Precio', 'Total'],
            body: productDetails,
            startY: 40,
            theme: 'grid', // Cambiar el tema de la tabla a 'grid'
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
            },
            bodyStyles: {
                fontSize: 10,
            },
        });

        // Total de la factura
        doc.text(`Total: $${totalAmount.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);

        // Dinero recibido y cambio
        doc.text(`Dinero Recibido: $${moneyReceived}`, 14, doc.lastAutoTable.finalY + 20);
        doc.text(`Cambio: $${change.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 30);

        // Descargar PDF
        doc.save('factura.pdf');
    };

    return (
        <div className="billing-form">
            <h1>Generar Factura</h1>

            {/* Formulario de cliente */}
            <div className="form-group">
                <label>Nombre del Cliente</label>
                <input 
                    type="text" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    placeholder="Nombre del Cliente" 
                />
            </div>

            {/* Formulario de productos */}
            <div className="form-group">
                <label>Producto</label>
                <input 
                    type="text" 
                    value={product} 
                    onChange={(e) => setProduct(e.target.value)} 
                    placeholder="Nombre del Producto" 
                />
            </div>
            <div className="form-group">
                <label>Cantidad</label>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    placeholder="Cantidad" 
                />
            </div>
            <div className="form-group">
                <label>Precio</label>
                <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder="Precio" 
                />
            </div>
            <button onClick={addProduct} className="add-product-btn">Agregar Producto</button>

            {/* Tabla de productos */}
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>${item.total.toFixed(2)}</td>
                            <td>
                                <button onClick={() => deleteProduct(index)} className="delete-btn">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Dinero recibido y cambio */}
            <div className="form-group">
                <label>Dinero Recibido</label>
                <input 
                    type="number" 
                    value={moneyReceived} 
                    onChange={handleMoneyReceived} 
                    placeholder="Dinero Recibido" 
                />
            </div>

            {/* Mostrar el dinero a devolver */}
            <div className="change-display">
                <p><strong>Total: </strong>${totalAmount.toFixed(2)}</p>
                <p><strong>Dinero Recibido: </strong>${moneyReceived || 0}</p>
                <p><strong>Cambio a Devolver: </strong>${change.toFixed(2)}</p>
            </div>

            {/* Botón para generar la factura */}
            <button onClick={generateInvoice} className="generate-invoice-btn">Generar Factura</button>
        </div>
    );
}

export default BillingForm;
