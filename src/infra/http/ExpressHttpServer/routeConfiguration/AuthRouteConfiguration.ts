/* eslint-disable @typescript-eslint/no-explicit-any */
import SignIn from "../../../../application/usecase/SignIn";
import SignUp from "../../../../application/usecase/SignUp";
import IUserRepository from "../../../../domain/user/repository/IUserRepository";
import AuthRouter from "../routes/AuthRouter";
import IRouteConfiguration from "./IRouteConfiguration";

export default class AuthRouteConfiguration implements IRouteConfiguration {
    private readonly router: any;
    constructor(private readonly userRepository: IUserRepository) {
        const signin = new SignIn(this.userRepository);
        const signup = new SignUp(this.userRepository);
        const authRouter = new AuthRouter(signin, signup);
        authRouter.configure();
        this.router = authRouter.router;
    }

    getRouter() {
        return this.router;
    }
}