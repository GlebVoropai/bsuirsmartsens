// udp.js
const dgram = require('dgram');
const state = require('./state');
const WebSocket = require('ws');

let wss = null;

function attachWebSocketServer(server) {
  wss = new WebSocket.Server({ server });
  console.log('WebSocket attached to HTTP server');
}

function broadcastState() {
  if (!wss) return;

  const payload = JSON.stringify(state);

  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    }
  });
}

const UDP_PORT = 8888;
const udpServer = dgram.createSocket('udp4');

udpServer.bind(UDP_PORT);

udpServer.on('message', (msg) => {
  const parts = msg.toString().trim().split(/\s+/);
  if (parts.length < 4) return;

  const temp = Number(parts[0]);
  const humid = Number(parts[1]);
  const rssi = Number(parts[2]);
  const uptime = Number(parts[3]);

  if ([temp, humid, rssi, uptime].some(Number.isNaN)) return;

  state.temp = temp;
  state.humid = humid;
  state.rssi = rssi;
  state.uptime = uptime;
  state.updatedAt = Date.now();

  broadcastState(); // отправляем сразу
});


module.exports = { attachWebSocketServer };
