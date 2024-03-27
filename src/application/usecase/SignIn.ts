import IUserRepository from "../../domain/repository/IUserRepository";
import IUseCase from "./IUseCase";

export default class SignIn implements IUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(input: Input): Promise<Output> {
        const user = await this.userRepository.findByEmail(input.email);

        const passwordIsValid = await user.validatePassword(input.password);
        if (!passwordIsValid) throw new Error("Invalid password");

        return {
            id: user.id,
            name: user.name.getValue(),
            email: user.email.getValue(),
        };
    }
}

type Input = {
    email: string,
    password: string,
}

type Output = {
    id: string,
    name: string,
    email: string,
}