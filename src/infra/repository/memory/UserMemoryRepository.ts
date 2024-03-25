import User from "../../../domain/entity/User";
import IUserRepository from "../../../domain/repository/IUserRepository";

export default class UserMemoryRepository implements IUserRepository {
    users: User[];

    constructor() {
        this.users = [];
    }
    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email.getValue() === email);
        if (!user) throw new Error(`User not found`);
        return user;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}