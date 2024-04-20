import express, { Express } from "express";
import cors from "cors";

import IHttpServer from "../interfaces/IHttpServer";
import defaultRoutes from "./routes/default";
import AuthRouteConfiguration from "./routeConfiguration/AuthRouteConfiguration";
import UserRouteConfiguration from "./routeConfiguration/UserRouteConfiguration";
import IUserRepository from "../../../domain/user/repository/IUserRepository";

export default class ExpressHttpServer implements IHttpServer {
    server: Express;
    constructor(
        private readonly userRepository: IUserRepository,
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
        this.server.use('/api/auth', new AuthRouteConfiguration(this.userRepository).getRouter());
        this.server.use('/api/users', new UserRouteConfiguration(this.userRepository).getRouter());
    }

    listen(port: number): void {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}