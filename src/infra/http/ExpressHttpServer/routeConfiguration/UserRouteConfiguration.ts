/* eslint-disable @typescript-eslint/no-explicit-any */
import GetAllUsersUseCase from "../../../../application/usecase/GetAllUsers";
import UserRouter from "../routes/UserRouter";
import IRouteConfiguration from "../../interfaces/IRouteConfiguration";

export default class UserRouteConfiguration implements IRouteConfiguration {
    private readonly router: any;

    constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {
        const userRouter = new UserRouter(this.getAllUsersUseCase);
        userRouter.configure();
        this.router = userRouter.router;
    }

    getRouter() {
        return this.router;
    }
}