/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import GetAllUsers from "../../../../application/usecase/GetAllUsers";
import IServerRouter from "../../interfaces/IServerRouter";

export default class UserRouter implements IServerRouter {
    router: Router = Router();

    constructor(private readonly getAllUsers: GetAllUsers) { }

    configure() {
        this.router.get('/', async (__, res) => {
            try {
                const users = await this.getAllUsers.execute();
                res.status(200).send({ users });
            } catch (err: any) {
                res.status(404).send({ success: false, message: err.message });
            }
        });
    }
}