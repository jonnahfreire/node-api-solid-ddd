import { Router } from "express";
const defaultRouter = Router();

defaultRouter.get('/', (__, res) => {
    res.send('Welcome!');
});

const defaultRoutes = defaultRouter;
export default defaultRoutes;