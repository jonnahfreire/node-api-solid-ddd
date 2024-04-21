import IUserRepository from "../../domain/user/repository/IUserRepository";
import { Registry, container } from "../ContainerRegistry";
import IDatabaseConnection from "../database/IDatabaseConnection";
import UserPgPromiseDatabaseRepository from "./UserPgPromiseRepository/UserPgPromiseDatabaseRepository";
import UserSequelizeDatabaseRepository from "./UserSequelizeRepository/UserSequelizeDatabaseRepository";

type InstanceProps = { [connectionName: string]: (connection: IDatabaseConnection) => IUserRepository };

export class RepositoryInstanceResolver {
    private static instances: InstanceProps = {
        "SequelizeDatabaseConnection": (connection: IDatabaseConnection) => {
            return new UserSequelizeDatabaseRepository(connection);
        },
        "PgPromiseDatabaseConnection": (connection: IDatabaseConnection) => {
            return new UserPgPromiseDatabaseRepository(connection);
        },
    };

    static resolve(): IUserRepository {
        const connection = container.get<IDatabaseConnection>(Registry.DatabaseConnection);
        return this.instances[connection.constructor.name](connection);
    }
}