// Konstanta UUID (Nordic UART)
const SERVICE_UUID =
  "6e400001-b5a3-f393-...";
const RX_UUID =
  "6e400003-b5a3-f393-...";

// Kirim perintah ke ESP32
async function sendCommand(cmd) {
  const enc = new TextEncoder();
  await rxCharacteristic
    .writeValue(enc.encode(cmd));
}

// Tombol ON/OFF
btnOn.onclick = ()=>sendCommand('on');
btnOff.onclick = ()=>sendCommand('off');

// Koneksi BLE
async function connectBLE() {
  device = await navigator.bluetooth
    .requestDevice({

filters:[{namePrefix:'ESP32'}],

optionalServices:[SERVICE_UUID]
    });
  const server =
    await device.gatt.connect();
  const svc = await server
    .getPrimaryService(SERVICE_UUID);
  rxCharacteristic = await svc
    .getCharacteristic(RX_UUID);
  connected = true; updateUI();
}
