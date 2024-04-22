/* eslint-disable @typescript-eslint/no-explicit-any */
import SigninUseCase from "../../../../application/usecase/auth/SigninUsecase";
import SignupUseCase from "../../../../application/usecase/auth/SignupUseCase";
import AuthRouter from "../routes/AuthRouter";
import IRouteConfiguration from "../../interfaces/IRouteConfiguration";

export default class AuthRouteConfiguration implements IRouteConfiguration {
    private readonly router: any;
    constructor(
        private readonly signinUseCase: SigninUseCase,
        private readonly signupUseCase: SignupUseCase
    ) {
        const authRouter = new AuthRouter(this.signinUseCase, this.signupUseCase);
        authRouter.configure();
        this.router = authRouter.router;
    }

    getRouter() {
        return this.router;
    }
}