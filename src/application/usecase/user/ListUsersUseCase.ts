import IUserRepository from "../../../domain/user/repository/IUserRepository";
import IUseCase from "../IUseCase";

type ListUsersUseCaseInputProps = void;

export default class ListUsersUseCase implements IUseCase<ListUsersUseCaseInputProps, Output[]> {
    constructor(private readonly userRepository: IUserRepository) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(_input: void): Promise<Output[]> {
        const data = await this.userRepository.findAll();
        if (!data.length) throw new Error('No users found');

        const users: Output[] = data.map(user => (
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