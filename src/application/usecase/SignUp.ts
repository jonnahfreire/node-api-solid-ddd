import User from "../../domain/user/entity/user.entity";
import IUserRepository from "../../domain/user/repository/IUserRepository";

export default class SignUp {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(input: Input): Promise<Output> {
        const user = await User.create(input.name, input.email, input.password);
        this.userRepository.create(user);

        return { id: user.id, email: user.email.value, name: user.name.value };
    }
}

type Input = {
    name: string,
    email: string,
    password: string,
}

type Output = {
    id: string,
    name: string,
    email: string,
}