import { config } from "dotenv";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import { Registry, container } from "./infra/ContainerRegistry";
import SignInUseCase from "./application/usecase/SignIn";
import SignUpUseCase from "./application/usecase/SignUp";
import GetAllUsersUseCase from "./application/usecase/GetAllUsers";
config();


const main = async () => {
    const port = Number(process.env.PORT) || 3333;

    const getAllUsersUseCase = container.get<GetAllUsersUseCase>(Registry.GetAllUsersUseCase);
    const signinUseCase = container.get<SignInUseCase>(Registry.SigninUseCase);
    const signupUseCase = container.get<SignUpUseCase>(Registry.SignupUseCase);

    const server = new ExpressHttpServer(getAllUsersUseCase, signinUseCase, signupUseCase);
    server.listen(port);
}

main();