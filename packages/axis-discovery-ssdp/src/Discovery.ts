import * as expect from '@fantasticfiasco/expect';
import { EventEmitter } from 'events';
import { Device } from './';
import { log } from './logging';
import { getIPv4Addresses } from './network-interfaces';
import { HttpClient, IOptions } from './options';
import { mapFromRootDescription, RootDescriptionRequest } from './root-descriptions';
import { mapFromMessage, Message, MSearchSocket, NotifySocket, SocketBase } from './sockets';

/**
 * Interface describing the supported events of Discovery.
 */
interface Events {
    hello: Device;
    goodbye: Device;
}

/**
 * Class responsible for discovering Axis cameras on the network.
 */
export class Discovery implements EventEmitter {
    private readonly eventEmitter = new EventEmitter();
    private readonly options: IOptions;
    private sockets?: SocketBase[];

    /**
     * Initializes a new instance of the class.
     * @param options The SSDP discovery options.
     */
    constructor(options?: IOptions) {
        this.options = options || {};
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public async start(): Promise<void> {
        expect.toNotExist(this.sockets, 'Discovery has already been started');

        log('Discovery#start');

        await this.setup();
    }

    /**
     * Stop listening for device advertisements.
     */
    public async stop(): Promise<void> {
        expect.toExist(this.sockets, 'Discovery has not been started');

        log('Discovery#stop');

        await this.teardown();
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public async search(): Promise<void> {
        expect.toExist(this.sockets, 'Discovery has not been started');

        log('Discovery#search');

        for (const socket of this.sockets!) {
            if (socket instanceof MSearchSocket) {
                await socket.search();
            }
        }
    }

    /**
     * Alias for on(eventName, listener).
     */
    addListener<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this {
        this.eventEmitter.addListener(eventName, listener);
        return this;
    }

    /**
     * Adds the listener function to the end of the listeners array for the event named eventName.
     * No checks are made to see if the listener has already been added. Multiple calls passing the
     * same combination of eventName and listener will result in the listener being added, and
     * called, multiple times.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    on<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this {
        this.eventEmitter.on(eventName, listener);
        return this;
    }

    /**
     * Adds a one-time listener function for the event named eventName. The next time eventName is
     * triggered, this listener is removed and then invoked.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    once<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this {
        this.eventEmitter.once(eventName, listener);
        return this;
    }

    /**
     * Alias for off(eventName, listener).
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    removeListener<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this {
        this.eventEmitter.removeListener(eventName, listener);
        return this;
    }

    /**
     * Removes the specified listener from the listener array for the event named eventName.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    off<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this {
        this.eventEmitter.off(eventName, listener);
        return this;
    }

    /**
     * Removes all listeners, or those of the specified eventName.
     * @param eventName The name of the event.
     */
    removeAllListeners<E extends keyof Events>(eventName?: E): this {
        this.eventEmitter.removeAllListeners(eventName);
        return this;
    }

    /**
     * By default EventEmitters will print a warning if more than 10 listeners are added for a
     * particular event. This is a useful default that helps finding memory leaks. The
     * emitter.setMaxListeners() method allows the limit to be modified for this specific
     * EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited
     * number of listeners.
     */
    setMaxListeners(n: number): this {
        this.eventEmitter.setMaxListeners(n);
        return this;
    }

    /**
     * Returns the current max listener value for the EventEmitter which is either set by
     * emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
     */
    getMaxListeners(): number {
        return this.eventEmitter.getMaxListeners();
    }

    /**
     * Returns a copy of the array of listeners for the event named eventName.
     * @param eventName The name of the event.
     */
    listeners<E extends keyof Events>(eventName: E): Function[] {
        return this.eventEmitter.listeners(eventName);
    }

    /**
     * Returns a copy of the array of listeners for the event named eventName, including any
     * wrappers (such as those created by once()).
     * @param eventName The name of the event.
     */
    rawListeners<E extends keyof Events>(eventName: E): Function[] {
        return this.eventEmitter.rawListeners(eventName);
    }

    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the
     * order they were registered, passing the supplied arguments to each.
     * @param eventName The name of the event.
     */
    emit<E extends keyof Events>(eventName: E, args: Events[E]): boolean {
        return this.eventEmitter.emit(eventName, args);
    }

    /**
     * Returns the number of listeners listening to the event named eventName.
     * @param eventName The name of the event.
     */
    listenerCount<E extends keyof Events>(eventName: E): number {
        return this.eventEmitter.listenerCount(eventName);
    }

    /**
     * Adds the listener function to the beginning of the listeners array for the event named
     * eventName. No checks are made to see if the listener has already been added. Multiple calls
     * passing the same combination of eventName and listener will result in the listener being
     * added, and called, multiple times.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    prependListener<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this {
        this.eventEmitter.prependListener(eventName, listener);
        return this;
    }

    /**
     * Adds a one-time listener function for the event named eventName to the beginning of the
     * listeners array. The next time eventName is triggered, this listener is removed, and then
     * invoked.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    prependOnceListener<E extends keyof Events>(eventName: E, listener: (arg: Events[E]) => void): this {
        this.eventEmitter.prependOnceListener(eventName, listener);
        return this;
    }

    /**
     * Returns an array listing the events for which the emitter has registered listeners. The
     * values in the array are strings or Symbols.
     */
    eventNames(): (string | symbol)[] {
        return this.eventEmitter.eventNames();
    }

    private async setup(): Promise<void> {
        this.sockets = [];
        const addresses = getIPv4Addresses();
        log('Discovery#setup - interface addresses: %o', addresses);

        // Passive SSDP
        await this.setupSocket(new NotifySocket(addresses));

        // Active SSDP
        for (const address of addresses) {
            await this.setupSocket(new MSearchSocket(address));
        }
    }

    private async setupSocket(socket: SocketBase): Promise<void> {
        this.sockets!.push(socket);
        socket.on('hello', (message: Message) => this.onHelloMessage(message));
        socket.on('goodbye', (message: Message) => this.onGoodbyeMessage(message));
        await socket.start();
    }

    private async teardown(): Promise<void> {
        for (const socket of this.sockets!) {
            this.teardownSocket(socket);
        }

        this.sockets = undefined;
    }

    private async teardownSocket(socket: SocketBase): Promise<void> {
        socket.removeAllListeners('hello');
        socket.removeAllListeners('goodbye');
        await socket.stop();
    }

    private onHelloMessage(message: Message) {
        log('Discovery#onHelloMessage - %s', message.remoteAddress);

        const device = mapFromMessage(message);
        if (device) {
            // Emit initial hello
            this.eventEmitter.emit('hello', device);

            // Request root description
            this.requestRootDescription(message.remoteAddress, message.location);
        } else {
            log('Discovery#onHelloMessage - ignore %s since mapping was unsuccessful', message.remoteAddress);
        }
    }

    private onGoodbyeMessage(message: Message) {
        log('Discovery#onGoodbyeMessage - %s', message.remoteAddress);

        const device = mapFromMessage(message);
        if (device) {
            this.eventEmitter.emit('goodbye', device);
        } else {
            log('Discovery#onGoodbyeMessage - ignore %s since mapping was unsuccessful', message.remoteAddress);
        }
    }

    private async requestRootDescription(remoteAddress: string, location: string): Promise<void> {
        try {
            const httpClient = this.options.httpClient || new HttpClient();
            const rootDescriptionRequest = new RootDescriptionRequest(remoteAddress, location, httpClient);
            const rootDescription = await rootDescriptionRequest.send();

            const device = mapFromRootDescription(rootDescription);
            if (device !== null) {
                this.eventEmitter.emit('hello', device);
            }
        } catch (error) {
            log('Discovery#requestRootDescription - %o', error);
        }
    }
}
