/* eslint-disable @typescript-eslint/no-explicit-any */
import SignInUseCase from "../../../../application/usecase/SignIn";
import SignUpUseCase from "../../../../application/usecase/SignUp";
import AuthRouter from "../routes/AuthRouter";
import IRouteConfiguration from "../../interfaces/IRouteConfiguration";

export default class AuthRouteConfiguration implements IRouteConfiguration {
    private readonly router: any;
    constructor(
        private readonly signinUseCase: SignInUseCase,
        private readonly signupUseCase: SignUpUseCase
    ) {
        const authRouter = new AuthRouter(this.signinUseCase, this.signupUseCase);
        authRouter.configure();
        this.router = authRouter.router;
    }

    getRouter() {
        return this.router;
    }
}