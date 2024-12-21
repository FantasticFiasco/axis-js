import * as http from 'http';
import * as https from 'https';
import { clientProvider } from '../../src/auth/client-provider';

describe('#clientProvider should', () => {
    test('respect http agent', () => {
        // Arrange
        const agent = new http.Agent({ keepAlive: true });

        // Act
        const got = clientProvider('GET', 'https://github.com/FantasticFiasco/axis-js', '', '', { agent });

        // Assert
        expect((got.defaults.options.agent as { http: http.Agent }).http).toBe(agent);
    });

    test('respect https agent', () => {
        // Arrange
        const agent = new https.Agent({ keepAlive: true });

        // Act
        const got = clientProvider('GET', 'https://github.com/FantasticFiasco/axis-js', '', '', { agent });

        // Assert
        expect((got.defaults.options.agent as { https: https.Agent }).https).toBe(agent);
    });

    test('respect https reject unauthorized disabled', () => {
        // Act
        const got = clientProvider('GET', 'https://github.com/FantasticFiasco/axis-js', '', '', { rejectUnauthorized: false });

        // Assert
        expect(got.defaults.options.https?.rejectUnauthorized).toBe(false);
    });

    test('default https reject unauthorized to enabled', () => {
        // Act
        const got = clientProvider('GET', 'https://github.com/FantasticFiasco/axis-js', '', '');

        // Assert
        expect(got.defaults.options.https?.rejectUnauthorized).toBe(true);
    });
});
