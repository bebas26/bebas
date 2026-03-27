const SERVICE_UUID =
  "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const RX_UUID =
  "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

// 1. Scan & pilih device bernama "ESP32..."
device = await navigator.bluetooth
  .requestDevice({
    filters: [{ namePrefix: 'ESP32' }],
    optionalServices: [SERVICE_UUID]
  });

// 2. Koneksi ke GATT server
const server = await device.gatt.connect();

// 3. Dapatkan service
const service = await server
  .getPrimaryService(SERVICE_UUID);

// 4. Ambil RX characteristic (untuk write)
rxCharacteristic = await service
  .getCharacteristic(RX_UUID);

// 5. Kirim perintah (encode ke bytes)
const encoder = new TextEncoder();
await rxCharacteristic
  .writeValue(encoder.encode("on"));
// Konstanta UUID (Nordic UART)
const SERVICE_UUID =
  "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const RX_UUID =
  "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

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
