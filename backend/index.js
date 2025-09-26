const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const services = require('./services.json');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/services', (req, res) => {
  res.json(services);
});

app.post('/order', (req, res) => {
  const { serviceId } = req.body;
  const service = services.find(s => s.id === serviceId);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  const orderId = uuidv4();
  res.json({ orderId, serviceDetails: service });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});