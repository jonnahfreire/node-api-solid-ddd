/* eslint-disable @typescript-eslint/no-explicit-any */
import pgp from "pg-promise";
import IDatabaseConnection from "../IDatabaseConnection";

export default class PgPromiseDatabaseConnection implements IDatabaseConnection {
    private connection: any;

    constructor() {
        this.connection = pgp()("postgres://postgres:postgres@localhost:5432/nodeapi");
    }

    async query(statement: string, params?: unknown): Promise<unknown> {
        return this.connection.query(statement, params ?? []);
    }
    async close(): Promise<void> {
        return this.connection.end;
    }

}