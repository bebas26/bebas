const SERVICE_UUID =
  "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";

const RX_UUID =
  "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

let device;
let server;
let service;
let rxCharacteristic;

const btnConnect = document.getElementById("btnConnect");
const btnOn = document.getElementById("btnOn");
const btnOff = document.getElementById("btnOff");
const statusText = document.getElementById("status");

// =========================
// CONNECT BLE
// =========================
async function connectBLE() {

  try {

    statusText.innerHTML = "Status: Menghubungkan...";

    device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "ESP32" }],
      optionalServices: [SERVICE_UUID]
    });

    server = await device.gatt.connect();

    service = await server.getPrimaryService(SERVICE_UUID);

    rxCharacteristic = await service.getCharacteristic(RX_UUID);

    statusText.innerHTML = "Status: Terhubung ✅";
    statusText.className = "connected";

    btnOn.disabled = false;
    btnOff.disabled = false;

    console.log("BLE Connected");

  } catch(error) {

    console.log(error);

    statusText.innerHTML = "Status: Gagal connect ❌";
    statusText.className = "disconnected";
  }
}

// =========================
// KIRIM DATA
// =========================
async function sendCommand(command) {

  if (!rxCharacteristic) {
    alert("Belum terhubung ke ESP32");
    return;
  }

  const encoder = new TextEncoder();

  await rxCharacteristic.writeValue(
    encoder.encode(command)
  );

  console.log("Kirim:", command);
}

// =========================
// EVENT BUTTON
// =========================
btnConnect.addEventListener("click", connectBLE);

btnOn.addEventListener("click", () => {
  sendCommand("on");
});

btnOff.addEventListener("click", () => {
  sendCommand("off");
});
