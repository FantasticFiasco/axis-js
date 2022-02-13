import * as http from 'http';
import * as https from 'https';
import { client } from '../../src/auth/client';

describe('#client should', () => {
    test('respect http agent', () => {
        // Arrange
        const agent = new http.Agent({ keepAlive: true });

        // Act
        const got = client('GET', 'https://github.com/FantasticFiasco/axis-js', '', '', agent);

        // Assert
        expect((got.defaults.options.agent as { http: http.Agent }).http).toBe(agent);
    });

    test('respect https agent', () => {
        // Arrange
        const agent = new https.Agent({ keepAlive: true });

        // Act
        const got = client('GET', 'https://github.com/FantasticFiasco/axis-js', '', '', agent);

        // Assert
        expect((got.defaults.options.agent as { https: https.Agent }).https).toBe(agent);
    });
});
