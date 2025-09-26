import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [services, setServices] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/services').then(response => {
      setServices(response.data);
    });
  }, []);

  const handleBuy = (serviceId) => {
    axios.post('http://localhost:5000/order', { serviceId }).then(response => {
      setOrder(response.data);
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-600 text-center">Service Catalogue</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="border p-4 rounded-2xl shadow-lg bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-xl font-semibold text-indigo-700">{service.name}</h2>
            <p className="mt-2 text-gray-700">{service.description}</p>
            <p className="mt-2 font-bold text-green-600">₹{service.price}</p>
            <button
              onClick={() => handleBuy(service.id)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition duration-300"
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      {order && (
        <div className="mt-8 p-4 border rounded-2xl bg-green-100 shadow-md">
          <h2 className="text-xl font-bold text-green-700">Order Confirmed!</h2>
          <p>Order ID: <span className="font-mono">{order.orderId}</span></p>
          <p>Service: <strong>{order.serviceDetails.name}</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
