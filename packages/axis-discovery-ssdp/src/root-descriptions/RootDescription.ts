import { parseString } from 'xml2js';

interface Data {
    ['root']: {
        ['device']: {
            [0]: {
                ['friendlyName']: {
                    [0]: string;
                };
                ['modelDescription']?: {
                    [0]: string;
                };
                ['modelName']: {
                    [0]: string;
                };
                ['modelNumber']?: {
                    [0]: string;
                };
                ['serialNumber']?: {
                    [0]: string;
                };
                ['presentationURL']?: {
                    [0]: string;
                };
            };
        };
    };
}

export class RootDescription {
    private constructor(
        readonly remoteAddress: string,
        private readonly rootDescription: Data,
    ) {}

    public static parse(remoteAddress: string, xml: string): Promise<RootDescription> {
        return new Promise<RootDescription>((resolve, reject) => {
            parseString(xml, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(new RootDescription(remoteAddress, result));
                }
            });
        });
    }

    public get friendlyName(): string {
        return this.rootDescription['root']['device'][0]['friendlyName'][0];
    }

    public get modelDescription(): string | undefined {
        if (!this.rootDescription['root']['device'][0]['modelDescription']) {
            return undefined;
        }

        return this.rootDescription['root']['device'][0]['modelDescription'][0];
    }

    public get modelName(): string {
        return this.rootDescription['root']['device'][0]['modelName'][0];
    }

    public get modelNumber(): string | undefined {
        if (!this.rootDescription['root']['device'][0]['modelNumber']) {
            return undefined;
        }

        return this.rootDescription['root']['device'][0]['modelNumber'][0];
    }

    public get macAddress(): string | undefined {
        // This package is opinionated regarding the terms 'serial number' and
        // 'MAC address'. What the devices are calling 'serial numbers' are
        // actually 'MAC addresses', so lets call them for what they are...
        if (!this.rootDescription['root']['device'][0]['serialNumber']) {
            return undefined;
        }

        return this.rootDescription['root']['device'][0]['serialNumber'][0].toUpperCase();
    }

    public get presentationUrl(): string | undefined {
        if (!this.rootDescription['root']['device'][0]['presentationURL']) {
            return undefined;
        }

        return this.rootDescription['root']['device'][0]['presentationURL'][0];
    }
}
