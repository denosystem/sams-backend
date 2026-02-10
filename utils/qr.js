const { nanoid } = require("nanoid");
const QRCode = require("qrcode");

function makeQrToken() {
  return nanoid(18);
}

// returns a PNG buffer
async function qrToPngBuffer(payloadObj) {
  const text = JSON.stringify(payloadObj);
  const buffer = await QRCode.toBuffer(text, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 2,
    scale: 6
  });
  return buffer;
}

module.exports = { makeQrToken, qrToPngBuffer };
