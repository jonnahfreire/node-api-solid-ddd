import { config } from "dotenv";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import { Registry, container } from "./infra/ContainerRegistry";
import IUserRepository from "./domain/user/repository/IUserRepository";
import SignIn from "./application/usecase/SignIn";
import SignUp from "./application/usecase/SignUp";
config();


const main = async () => {
    const port = Number(process.env.PORT) || 3333;

    const userRepository = container.get<IUserRepository>(Registry.UserRepository);
    const signinUseCase = container.get<SignIn>(Registry.SigninUseCase);
    const signupUseCase = container.get<SignUp>(Registry.SignupUseCase);

    const server = new ExpressHttpServer(userRepository, signinUseCase, signupUseCase);
    server.listen(port);
}

main();