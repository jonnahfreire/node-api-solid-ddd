import express, { Express } from "express";
import cors from "cors";

import UserRouter from "./routes/UserRouter";
import IHttpServer from "../interfaces/IHttpServer";
import GetAllUsers from "../../../application/usecase/GetAllUsers";
import SignIn from "../../../application/usecase/SignIn";
import SignUp from "../../../application/usecase/SignUp";
import AuthRouter from "./routes/AuthRouter";
import defaultRoutes from "./routes/default";
import UserDatabaseRepository from "../../repository/UserDatabaseRepository";
import IDatabaseConnection from "../../database/IDatabaseConnection";
import PgPromiseDatabaseConnection from "../../database/PgPromiseDatabaseConnection";


export default class ExpressHttpServer implements IHttpServer {
    server: Express;
    constructor() {
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

        // Auth configuration
        const database: IDatabaseConnection = new PgPromiseDatabaseConnection();
        const userRepository = new UserDatabaseRepository(database);
        const signin = new SignIn(userRepository);
        const signup = new SignUp(userRepository);
        const authRoutes = new AuthRouter(signin, signup)
        authRoutes.configure();
        this.server.use('/api/auth', authRoutes.router);

        // User configuration
        const getAllUsers = new GetAllUsers(userRepository);
        const userRoutes = new UserRouter(getAllUsers);
        userRoutes.configure();
        this.server.use('/api/users', userRoutes.router);
    }

    listen(port: number): void {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}