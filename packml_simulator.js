// Simple PackML simulator (fallback). Use official libremfg image in docker-compose by default.
// Requires: npm install mqtt
const mqtt = require('mqtt');
const host = process.env.MQTT_HOST || 'localhost';
const port = process.env.MQTT_PORT || 1883;
const url = `mqtt://${host}:${port}`;
const client = mqtt.connect(url);

client.on('connect', () => {
  console.log('Simulator connected to MQTT', url);
  let stateIndex = 0;
  const states = [ "Stopped","Idle","Starting","Execute","Complete","Holding","Held","Resetting","Aborting","Aborted" ];
  let total = 0;
  let defective = 0;

  setInterval(() => {
    const state = states[stateIndex % states.length];
    client.publish('testLocation/DefaultArea/DefaultProductionLine/Status/StateCurrent', state);
    const speed = Math.floor(Math.random() * 102);
    client.publish('testLocation/DefaultArea/DefaultProductionLine/Status/CurMachSpeed', String(speed));
    total += Math.floor(Math.random() * 3);
    defective += Math.floor(Math.random() * 1);
    client.publish('testLocation/DefaultArea/DefaultProductionLine/Admin/ProdProcessedCount/0/Count', String(total));
    client.publish('testLocation/DefaultArea/DefaultProductionLine/Admin/ProdDefectiveCount/0/Count', String(defective));
    stateIndex++;
  }, 2000);
});

client.on('error', (err) => {
  console.error('MQTT error', err);
  client.end();
});
