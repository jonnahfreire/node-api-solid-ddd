import "reflect-metadata";
import { Container } from "inversify";
import IDatabaseConnection from "./database/IDatabaseConnection";
import IUserRepository from "../domain/user/repository/IUserRepository";
import SignInUseCase from "../application/usecase/SignIn";
import SignUpUseCase from "../application/usecase/SignUp";
import GetAllUsersUseCase from "../application/usecase/GetAllUsers";
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
container.bind<SignInUseCase>(Registry.SigninUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new SignInUseCase(repo);
}).inSingletonScope();

container.bind<SignUpUseCase>(Registry.SignupUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new SignUpUseCase(repo);
}).inSingletonScope();

container.bind<GetAllUsersUseCase>(Registry.GetAllUsersUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new GetAllUsersUseCase(repo);
}).inSingletonScope();
