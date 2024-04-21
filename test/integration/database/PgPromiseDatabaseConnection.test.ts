import "reflect-metadata";

import IDatabaseConnection from '../../../src/infra/database/IDatabaseConnection';
import PgPromiseDatabaseConnection from '../../../src/infra/database/PgPromiseDatabaseConnection';

describe('PgPromiseDatabaseConnection test', () => {
    let db: IDatabaseConnection;

    beforeAll(() => {
        db = new PgPromiseDatabaseConnection();
    });

    afterAll(async () => {
        await db.close();
    });

    test('Deve conectar ao banco com PGPromise', async () => {
        const result = await db.query('SELECT 1+1');
        expect(result).toBeDefined();
    });

    test.skip('Deve buscar um usuário por email', async () => {
        const [user] = await db.query('SELECT * FROM users where email=$1', ['john.doe@gmail.com']);
        console.log(user)
        expect(user).toBeDefined();
    });

    test('Deve buscar a lista de usuários se houver', async () => {
        const users = await db.connection.query('SELECT * FROM users');
        expect(users).toBeDefined();
    });
});