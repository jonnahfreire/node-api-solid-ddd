import IUserRepository from "../../domain/repository/IUserRepository";
import IUseCase from "./IUseCase";

export default class GetAllUsers implements IUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(): Promise<Output[]> {
        const data = await this.userRepository.findAll();

        if (!data.length) throw new Error('No users found');

        const users: Output[] = [];
        data.forEach(user => users.push(
            {
                id: user.id,
                name: user.name.getValue(),
                email: user.email.getValue(),
            }
        ));

        return users;
    }
}

type Output = {
    id: string;
    name: string;
    email: string;
}