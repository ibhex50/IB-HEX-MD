async function downloadMedia(sock, m) {
  const type = Object.keys(m.message)[0];
  const msg = m.message[type];

  return await sock.downloadMediaMessage({
    message: msg
  });
}

module.exports = downloadMedia;
