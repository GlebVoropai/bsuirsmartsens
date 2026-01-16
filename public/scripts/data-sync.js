const ws = new WebSocket(`ws://${location.host}`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  // Температура
  if (typeof data.temp === 'number') {
    const tempValue = document.getElementById('temp-text-value');
    const tempRing = document.getElementById('temp-ring');

    tempValue.textContent = `${data.temp.toFixed(1)} °C`;
    tempRing.style.setProperty('--value', data.temp / 100); // нормализация под твой круг
  }


  // Аптайм
  function formatUptimeHuman(ms) {
    const totalSec = Math.floor(ms / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    let out = '';
    if (hours > 0) out += `${hours} ч `;
    if (minutes > 0 || hours > 0) out += `${minutes} мин `;
    out += `${seconds} сек`;

    return out.trim();
    }

  if (typeof data.uptime === 'number') {
    const sec = Math.floor(data.uptime / 1000);
    document.getElementById('uptime-value').textContent = formatUptimeHuman(data.uptime);
  }


  // Влажность
  if (typeof data.humid === 'number') {
    const humidValue = document.getElementById('humid-text-value');
    const humidRing = document.getElementById('humid-ring');

    humidValue.textContent = `${data.humid.toFixed(1)} %`;
    humidRing.style.setProperty('--value', data.humid / 100);
  }
};
