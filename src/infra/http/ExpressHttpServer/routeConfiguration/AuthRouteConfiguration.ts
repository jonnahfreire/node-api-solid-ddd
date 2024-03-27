/* eslint-disable @typescript-eslint/no-explicit-any */
import SignIn from "../../../../application/usecase/SignIn";
import SignUp from "../../../../application/usecase/SignUp";
import IUserRepository from "../../../../domain/repository/IUserRepository";
import AuthRouter from "../routes/AuthRouter";

export default class AuthRouteConfiguration {
    router: any;
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