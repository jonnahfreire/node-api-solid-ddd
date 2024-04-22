import { config } from "dotenv";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import { Registry, container } from "./infra/ContainerRegistry";
import SigninUseCase from "./application/usecase/auth/SigninUsecase";
import SignupUseCase from "./application/usecase/auth/SignupUseCase";
import ListUsersUseCase from "./application/usecase/user/ListUsersUseCase";
config();


const main = async () => {
    const port = Number(process.env.PORT) || 3333;

    const getAllUsersUseCase = container.get<ListUsersUseCase>(Registry.GetAllUsersUseCase);
    const signinUseCase = container.get<SigninUseCase>(Registry.SigninUseCase);
    const signupUseCase = container.get<SignupUseCase>(Registry.SignupUseCase);

    const server = new ExpressHttpServer(getAllUsersUseCase, signinUseCase, signupUseCase);
    server.listen(port);
}

main();