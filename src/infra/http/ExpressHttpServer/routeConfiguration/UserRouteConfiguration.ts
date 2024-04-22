/* eslint-disable @typescript-eslint/no-explicit-any */
import ListUsersUseCase from "../../../../application/usecase/user/ListUsersUseCase";
import UserRouter from "../routes/UserRouter";
import IRouteConfiguration from "../../interfaces/IRouteConfiguration";

export default class UserRouteConfiguration implements IRouteConfiguration {
    private readonly router: any;

    constructor(private readonly getAllUsersUseCase: ListUsersUseCase) {
        const userRouter = new UserRouter(this.getAllUsersUseCase);
        userRouter.configure();
        this.router = userRouter.router;
    }

    getRouter() {
        return this.router;
    }
}