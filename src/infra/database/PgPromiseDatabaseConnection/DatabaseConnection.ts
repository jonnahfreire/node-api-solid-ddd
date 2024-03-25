/* eslint-disable @typescript-eslint/no-explicit-any */
import pgp from "pg-promise";
import IDatabaseConnection from "./IDatabaseConnection";

export default class DatabaseConnection implements IDatabaseConnection {
    connection: any;

    constructor() {
        this.connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    }

    async query(statement: string, params: unknown): Promise<unknown> {
        return this.connection.query(statement, params);
    }
    async close(): Promise<void> {
        return this.connection.end();
    }

}