import IUserRepository from "../../domain/user/repository/IUserRepository";
export default class GetAllUsers {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(): Promise<Output[]> {
        const data = await this.userRepository.findAll();

        if (!data.length) throw new Error('No users found');

        const users: Output[] = [];
        data.forEach(user => users.push(
            {
                id: user.id,
                name: user.name.value,
                email: user.email.value,
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