import * as expect from '@fantasticfiasco/expect';
import { EventEmitter } from 'events';
import * as bonjour from '../vendor/bonjour';
import { Device } from './Device';
import { log } from './Log';
import { mapFromService } from './Mappings';
import { getIPv4Addresses } from './NetworkInterface';

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
    private bonjour?: bonjour.Bonjour;
    private browser?: bonjour.Browser;

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public start(): void {
        expect.toNotExist(this.bonjour, 'Discovery has already been started');
        expect.toNotExist(this.browser, 'Discovery has already been started');

        log('Discovery#start');

        this.setup();
    }

    /**
     * Stop listening for device advertisements.
     */
    public stop(): void {
        expect.toExist(this.bonjour, 'Discovery has not been started');
        expect.toExist(this.browser, 'Discovery has not been started');

        log('Discovery#stop');

        this.teardown();
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public search(): void {
        if (!this.browser) {
            throw new Error('Discovery has not been started');
        }

        log('Discovery#search');
        this.browser.update();
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    listeners<E extends keyof Events>(eventName: E): Function[] {
        return this.eventEmitter.listeners(eventName);
    }

    /**
     * Returns a copy of the array of listeners for the event named eventName, including any
     * wrappers (such as those created by once()).
     * @param eventName The name of the event.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
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

    private onUp(service: bonjour.Service) {
        log('Discovery#onUp - %s', service.host);

        const device = mapFromService(service);
        if (device) {
            this.eventEmitter.emit('hello', device);
        } else {
            log('Discovery#onUp - unable to map %o', service);
        }
    }

    private onDown(service: bonjour.Service) {
        log('Discovery#onDown - %s', service.host);

        const device = mapFromService(service);
        if (device) {
            this.eventEmitter.emit('goodbye', device);
        } else {
            log('Discovery#onDown - unable to map %o', service);
        }
    }

    private setup() {
        const addresses = getIPv4Addresses();
        log('Discovery#setup - interface addresses: %o', addresses);

        // The type definitions are not in sync with the fork of Bonjour I am
        // depending on, that's why we have to go to the dark side
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const untypedBonjour: any = bonjour;
        this.bonjour = untypedBonjour({ interface: addresses }) as bonjour.Bonjour;

        this.browser = this.bonjour.find({ type: 'axis-video' });
        this.browser.on('up', (service: bonjour.Service) => this.onUp(service));
        this.browser.on('down', (service: bonjour.Service) => this.onDown(service));
    }

    private teardown() {
        if (this.browser) {
            this.browser.removeAllListeners('up');
            this.browser.removeAllListeners('down');
            this.browser.stop();
            this.browser = undefined;
        }

        if (this.bonjour) {
            this.bonjour.destroy();
            this.bonjour = undefined;
        }
    }
}
