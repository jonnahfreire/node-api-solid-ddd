import User from "../entity/User";

export default interface IUserRepository {
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>;
}