/* eslint-disable @typescript-eslint/no-explicit-any */
import pgp from "pg-promise";
import IDatabaseConnection from "../IDatabaseConnection";
import { injectable } from "inversify";

@injectable()
export default class PgPromiseDatabaseConnection implements IDatabaseConnection {
    public connection: any;

    constructor() {
        this.connection = pgp()("postgres://postgres:postgres@localhost:5432/nodeapi");
    }

    async query(statement: string, params?: unknown): Promise<unknown> {
        return await this.connection.query(statement, params ?? []);
    }
    async close(): Promise<void> {
        return await this.connection.$pool.end();
    }
}