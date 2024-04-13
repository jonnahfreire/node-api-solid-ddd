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
            logging: false,
        });
    }
    async query(statement: string, params?: any): Promise<any> {
        if (params?.length) {
            return await this.connection.query({ query: statement, values: params });
        }
        return await this.connection.query({ query: statement, values: [] });
    }

    async close(): Promise<void> {
        await this.connection.close();
    }
}