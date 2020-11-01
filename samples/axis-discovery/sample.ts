import { Device, Discovery } from 'axis-discovery';

(async () => {
    const discovery = new Discovery();

    discovery.on('hello', (device: Device) => {
        console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.macAddress} on ${device.address}`);
        console.log(`\tport: ${device.port}`);
        console.log(`\tmodel: ${device.modelName}`);
    });

    discovery.on('goodbye', (device: Device) => {
        console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.macAddress} on ${device.address}`);
    });

    await discovery.start();
    await discovery.search();
})();
