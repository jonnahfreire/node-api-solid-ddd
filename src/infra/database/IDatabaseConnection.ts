/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IDatabaseConnection {
    connection: any
    query(statement: string, params?: any): Promise<any>;
    close(): Promise<void>;
}