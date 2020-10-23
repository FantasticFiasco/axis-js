/**
 * Interface responsible for HTTP communication on the network.
 */
export interface IHttpClient {
    /**
     * Send GET request over the network.
     * @param url Fully qualified URL.
     * @returns Promise with response body.
     */
    get(url: string): Promise<string>;
}
