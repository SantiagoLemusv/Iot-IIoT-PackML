# IoT-IIoT-PackML — Demo Node-RED + PackML

Autor: Santiago Lemus Vallejo

## Objetivo
Reproducir el tutorial "How to create a Node-RED flow with simulated PackML data" (UMH) de forma dockerizada.

## Requisitos
- Docker & docker-compose
- Git

## Pasos rápidos
1. Clona este repo o descarga el ZIP.
2. Levanta los servicios:
   ```
   docker-compose up -d
   ```
3. Abre Node-RED en: http://localhost:1880
4. Importa `node-red/flows.json` (Menu -> Import -> Clipboard/File).
   - Alternativamente: Node-RED cargará flows desde ./node-red si es la primera ejecución.
5. Verifica que hay un broker configurado (usa el alias `hivemq` apuntando a mosquitto:1883).
6. Si usas el simulador interno (imagen libremfg), ya publicará tópicos. Si prefieres ejecutar local:
   ```
   cd simulators
   npm install
   node packml_simulator.js
   ```
7. Verifica tópicos publicados (MQTT Explorer o mosquitto_sub).
8. Abre Grafana (http://localhost:3000) y configura InfluxDB como datasource (opcional).

## Crear repo y tag
```bash
git init
git add .
git commit -m "Initial commit - Node-RED PackML demo"
git remote add origin git@github.com:TU_USUARIO/Iot-IIoT-PackML.git
git push -u origin main
git tag -a v1.0.0 -m "Release v1.0.0 - Demo Node-RED PackML"
git push origin v1.0.0
```

## Notas
- Esta configuración permite ejecuciones de prueba y demo. Para producción: desactivar `allow_anonymous` en mosquitto, usar TLS y autenticación.
- El tutorial oficial UMH (pasos detallados) debe verse en: https://learn.umh.app/course/creating-a-node-red-flow-with-packml/

