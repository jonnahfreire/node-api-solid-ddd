/* eslint-disable @typescript-eslint/no-explicit-any */
import GetAllUsers from "../../../../application/usecase/GetAllUsers";
import IUserRepository from "../../../../domain/user/repository/IUserRepository";
import UserRouter from "../routes/UserRouter";
import IRouteConfiguration from "./IRouteConfiguration";

export default class UserRouteConfiguration implements IRouteConfiguration {
    private readonly router: any;

    constructor(private readonly userRepository: IUserRepository) {
        const getAllUsers = new GetAllUsers(this.userRepository);
        const userRouter = new UserRouter(getAllUsers);
        userRouter.configure();
        this.router = userRouter.router;
    }

    getRouter() {
        return this.router;
    }
}