import { IHttpClient } from './IHttpClient';

/**
 * The SSDP discovery options.
 */
export interface IOptions {
    /**
     * An implementation of a HTTP client. Default value is based
     * on <a href="https://www.npmjs.com/package/request">Request</a> but a
     * custom implementation can be provided. This can be useful if discovery
     * is required in an Electron application where one wish to benefit from
     * the proxy configuration provided by using Electron's
     * <a href="https://electronjs.org/docs/api/net">net.request</a>.
     */
    httpClient?: IHttpClient;
}
