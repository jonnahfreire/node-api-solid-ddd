import User  from "../../domain/entity/User";
import IUserRepository from "../../domain/repository/IUserRepository";
import IUseCase from "./IUseCase";

export default class SignUp implements IUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(input: Input): Promise<void> {
        const user = await User.create(input.name, input.email, input.password);
        this.userRepository.save(user);
    }
}

type Input = {
    name: string,
    email: string,
    password: string,
}