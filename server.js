const express = require('express');
const path = require('path');
const dgram = require('dgram');
const WebSocket = require('ws');

const app = express();
const PORT = 3000;

// --- Express часть ---
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});

// (опционально)
app.get('/api', (req, res) => {
  res.json(require('./state'));
});

// --- Запускаем HTTP сервер ---
const server = app.listen(PORT, () => {
  console.log(`bsuirsmartsens running at http://localhost:${PORT}`);
});

const udp = require('./udp'); 
udp.attachWebSocketServer(server);