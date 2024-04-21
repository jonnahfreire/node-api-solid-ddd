import "reflect-metadata";
import { Container } from "inversify";
import IDatabaseConnection from "./database/IDatabaseConnection";
import IUserRepository from "../domain/user/repository/IUserRepository";
import SignIn from "../application/usecase/SignIn";
import SignUp from "../application/usecase/SignUp";
import GetAllUsers from "../application/usecase/GetAllUsers";
import SequelizeDatabaseConnection from "./database/SequelizeDatabaseConnection";
import { RepositoryInstanceResolver } from "./repository/UserRepositoryFactory";
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
container.bind<SignIn>(Registry.SigninUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new SignIn(repo);
}).inSingletonScope();

container.bind<SignUp>(Registry.SignupUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new SignUp(repo);
}).inSingletonScope();

container.bind<GetAllUsers>(Registry.GetAllUsersUseCase).toDynamicValue((context) => {
    const repo = context.container.get<IUserRepository>(Registry.UserRepository);
    return new GetAllUsers(repo);
}).inSingletonScope();
