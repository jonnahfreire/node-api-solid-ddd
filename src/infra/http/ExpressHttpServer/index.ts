import express, { Express } from "express";
import cors from "cors";

import IHttpServer from "../interfaces/IHttpServer";
import defaultRoutes from "./routes/default";
import AuthRouteConfiguration from "./routeConfiguration/AuthRouteConfiguration";
import UserRouteConfiguration from "./routeConfiguration/UserRouteConfiguration";
import SigninUseCase from "../../../application/usecase/auth/SigninUsecase";
import SignupUseCase from "../../../application/usecase/auth/SignupUseCase";
import ListUsersUseCase from "../../../application/usecase/user/ListUsersUseCase";

export default class ExpressHttpServer implements IHttpServer {
    server: Express;
    constructor(
        private readonly getAllUsersUseCase: ListUsersUseCase,
        private readonly signinUseCase: SigninUseCase,
        private readonly signupUseCase: SignupUseCase,
    ) {
        this.server = express();
        this.configureMiddlewares();
        this.configureRoutes();
    }

    configureMiddlewares(): void {
        this.server.use(cors());
        this.server.use(express.json())
        this.server.use(express.urlencoded({ extended: true }));
    }

    configureRoutes(): void {
        this.server.use('/api', defaultRoutes);
        this.server.use('/api/auth', new AuthRouteConfiguration(this.signinUseCase, this.signupUseCase).getRouter());
        this.server.use('/api/users', new UserRouteConfiguration(this.getAllUsersUseCase).getRouter());
    }

    listen(port: number): void {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}