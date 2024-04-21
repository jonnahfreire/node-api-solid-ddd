/* eslint-disable @typescript-eslint/no-explicit-any */
import SignIn from "../../../../application/usecase/SignIn";
import SignUp from "../../../../application/usecase/SignUp";
import AuthRouter from "../routes/AuthRouter";
import IRouteConfiguration from "./IRouteConfiguration";

export default class AuthRouteConfiguration implements IRouteConfiguration {
    private readonly router: any;
    constructor(
        private readonly signinUseCase: SignIn,
        private readonly signupUseCase: SignUp
    ) {
        const authRouter = new AuthRouter(this.signinUseCase, this.signupUseCase);
        authRouter.configure();
        this.router = authRouter.router;
    }

    getRouter() {
        return this.router;
    }
}