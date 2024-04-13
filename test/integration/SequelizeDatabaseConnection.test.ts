import IDatabaseConnection from '../../src/infra/database/IDatabaseConnection';
import SequelizeDatabaseConnection from '../../src/infra/database/SequelizeDatabaseConnection';

describe('SequelizeDatabaseConnection test', () => {
    let db: IDatabaseConnection;

    beforeAll(() => {
        db = new SequelizeDatabaseConnection();
    });

    test('Deve conectar ao banco com Sequelize', async () => {
        const [result] = await db.connection.query('SELECT 1+1');
        expect(result).toBeDefined();
    });

    test('Deve buscar a lista de usuários se houver', async () => {
        const [users] = await db.connection.query('SELECT * FROM users');
        expect(users).toBeDefined();
    });

    afterAll(async () => {
        await db.close();
    });
});