/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize } from 'sequelize';
import IDatabaseConnection from '../IDatabaseConnection';

export default class SequelizeDatabaseConnection implements IDatabaseConnection {
    connection: Sequelize;

    constructor() {
        this.connection = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'nodeapi',
        });
    }
    async query(statement: string, params?: any): Promise<any> {
        if (params?.length) {
            return await this.connection.query({ query: statement, values: params }, { logging: false });
        }
        return await this.connection.query(statement, { logging: false });
    }

    async close(): Promise<void> {
        await this.connection.close();
    }
}