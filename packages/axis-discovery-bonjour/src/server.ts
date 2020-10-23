import { Device, Discovery } from './';

const discovery = new Discovery();

discovery.on('hello', (device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.macAddress} on ${device.address}`);
});

discovery.on('goodbye', (device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.macAddress} on ${device.address}`);
});

discovery.start();
discovery.search();
