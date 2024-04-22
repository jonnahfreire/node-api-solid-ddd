/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import ListUsersUseCase from "../../../../application/usecase/user/ListUsersUseCase";
import IServerRouter from "../../interfaces/IServerRouter";

export default class UserRouter implements IServerRouter {
    router: Router = Router();

    constructor(private readonly listUsers: ListUsersUseCase) { }

    configure() {
        this.router.get('/', async (__, res) => {
            try {
                const users = await this.listUsers.execute();
                res.status(200).send({ users });
            } catch (err: any) {
                res.status(404).send({ success: false, message: err.message });
            }
        });

        return this;
    }
}