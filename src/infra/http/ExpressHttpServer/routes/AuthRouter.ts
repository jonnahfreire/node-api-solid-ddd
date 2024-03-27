/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import SignIn from "../../../../application/usecase/SignIn";
import SignUp from "../../../../application/usecase/SignUp";
import IServerRouter from "../../interfaces/IServerRouter";

export default class AuthRouter implements IServerRouter {
    router: Router = Router();

    constructor(private readonly signin: SignIn, private readonly signup: SignUp) { }

    configure() {
        this.router.post('/login', async (req, res) => {
            try {
                const user = await this.signin.execute(req.body);
                res.status(200).send({ success: true, user });
            } catch (err: any) {
                res.status(400).send({ success: false, message: err.message });
            }
        });

        this.router.post('/register', async (req, res) => {
            try {
                await this.signup.execute(req.body);
                res.status(201).send({ success: true });
            } catch (err: any) {
                res.status(400).send({ success: false, message: err.message });
            }
        });

        return this;
    }
}