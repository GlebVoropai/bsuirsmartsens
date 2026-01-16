const WebSocket = require('ws');
const state = require('./state');

module.exports = function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });
  console.log('WebSocket initialized');
};