import IUserRepository from "../../domain/user/repository/IUserRepository";

export default class SignIn {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(input: Input): Promise<Output> {
        const users = await this.userRepository.findAll();
        const user = users.find(user => user.email.value === input.email);
        if (!user) throw new Error("User not found");

        const passwordIsValid = await user.validatePassword(input.password);
        if (!passwordIsValid) throw new Error("Invalid password");

        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
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