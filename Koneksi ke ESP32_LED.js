const SERVICE_UUID = 
  "77EB7594-4E18-41a0-83af-142732aa26f7";
const RX_UUID = 
  "77EB7594-4E18-41a0-83af-142732aa26f7";
// 1. Scan & pilih device bernama "ESP32_CIA"
device = await navigator.bluetooth
  .requestDevice({
    filters:[{ namePrefix: 'ESP32'}],
    optionalServices:[SERVICE_UUID]
  });
// 2. Koneksi ke GATT server 
const server = await device.gatt.connect();
// 3. Dapatkan service 
const service = await server.
  .getPrimaryService(SERVICE_UUID);
//4. Ambil RX characteristic (untuk write)
rxCharacteristic = await service
  .getCharacteristic(RX_UUID);
//5. Kirim perintah (encode ke bytes)
const encorder = new TextEncorder();
await rxCharacteristic
  .writeValue(encorder.encode("on"));
