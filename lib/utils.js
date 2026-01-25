function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m ${s % 60}s`;
}

module.exports = { pickRandom, formatTime };
