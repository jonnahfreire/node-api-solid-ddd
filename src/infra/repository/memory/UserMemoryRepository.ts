import User from "../../../domain/user/entity/user.entity";
import IUserRepository from "../../../domain/user/repository/IUserRepository";

export default class UserMemoryRepository implements IUserRepository {
    users: User[];

    constructor() {
        this.users = [];
    }

    async create(user: User): Promise<void> {
        this.users.push(user);
    }

    async update(user: User): Promise<void> {
        const userIndex = this.users.findIndex(u => u.id == user.id);
        if (userIndex > -1) {
            this.users[userIndex] = user;
        }
    }

    async find(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new Error(`User not found`);
        return user;
    }
    async findAll(): Promise<User[]> {
        return this.users;
    }
}