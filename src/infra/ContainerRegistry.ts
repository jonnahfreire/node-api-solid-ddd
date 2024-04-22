import "reflect-metadata";
import { Container } from "inversify";
import IDatabaseConnection from "./database/IDatabaseConnection";
import IUserRepository from "../domain/user/repository/IUserRepository";
import SigninUseCase from "../application/usecase/auth/SigninUsecase";
import SignupUseCase from "../application/usecase/auth/SignupUseCase";
import ListUsersUseCase from "../application/usecase/user/ListUsersUseCase";
import SequelizeDatabaseConnection from "./database/SequelizeDatabaseConnection";
import { RepositoryInstanceResolver } from "./repository/RepositoryInstanceResolver";
// import PgPromiseDatabaseConnection from "./database/PgPromiseDatabaseConnection";


export const Registry = {
    DatabaseConnection: Symbol.for("DatabaseConnection"),
    UserRepository: Symbol.for("UserRepository"),
    GetAllUsersUseCase: Symbol.for("GetAllUsersUseCase"),
    SigninUseCase: Symbol.for("SigninUseCase"),
    SignupUseCase: Symbol.for("SignupUseCase"),
};

export const container = new Container();
// Databases
container.bind<IDatabaseConnection>(Registry.DatabaseConnection).toConstantValue(new SequelizeDatabaseConnection());

// Repositories
container.bind<IUserRepository>(Registry.UserRepository).toConstantValue(RepositoryInstanceResolver.resolve());

// Use Cases
container.bind<SigninUseCase>(Registry.SigninUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new SigninUseCase(repo);
}).inSingletonScope();

container.bind<SignupUseCase>(Registry.SignupUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new SignupUseCase(repo);
}).inSingletonScope();

container.bind<ListUsersUseCase>(Registry.GetAllUsersUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new ListUsersUseCase(repo);
}).inSingletonScope();
