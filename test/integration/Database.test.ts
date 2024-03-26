import SequelizeDatabaseConnection from '../../src/infra/database/SequelizeDatabaseConnection';

describe('SequelizeDatabasedb test', () => {

    test('Deve conectar ao banco de dados local', async () => {
        const db = new SequelizeDatabaseConnection();
        expect(db.connection).toBeDefined();

        const [users] = await db.connection.query('SELECT * FROM users');
        console.log(users)
        db.close();
    });

    test('Deve buscar a lista de usuários se houver', async () => {
        const db = new SequelizeDatabaseConnection();

        const [users] = await db.connection.query('SELECT * FROM users');
        expect(users).toBeDefined();
        db.close();
    });
});