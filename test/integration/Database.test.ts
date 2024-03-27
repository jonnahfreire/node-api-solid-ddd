import PgPromiseDatabaseConnection from '../../src/infra/database/PgPromiseDatabaseConnection';
import SequelizeDatabaseConnection from '../../src/infra/database/SequelizeDatabaseConnection';

describe('Database test', () => {

    test('Deve conectar ao banco com Sequelize', async () => {
        const db = new SequelizeDatabaseConnection();
        expect(db.connection).toBeDefined();

        const [result] = await db.connection.query('SELECT 1+1');
        expect(result).toBeDefined();
        await db.close();
    });

    test('Deve conectar ao banco com PGPromise', async () => {
        const db = new PgPromiseDatabaseConnection();
        expect(db).toBeDefined();
        const result = await db.query('SELECT 1+1');
        expect(result).toBeDefined();

        const user = await db.query('SELECT * FROM users where email=$1', ['john.doe@gmail.com']);
        expect(user).toBeDefined();

        await db.close();
    });

    test('Deve buscar a lista de usuários se houver', async () => {
        const db = new SequelizeDatabaseConnection();

        const [users] = await db.connection.query('SELECT * FROM users');
        expect(users).toBeDefined();
        await db.close();
    });
});