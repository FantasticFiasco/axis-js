/**
 * Interface responsible for HTTP communication on the network.
 */
export interface IHttpClient {
    /**
     * Send GET request over the network.
     * @param url Fully qualified URL.
     * @returns Promise with response.
     */
    get(url: string): Promise<Response>;
}
