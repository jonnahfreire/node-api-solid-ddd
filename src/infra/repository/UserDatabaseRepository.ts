/* eslint-disable @typescript-eslint/no-explicit-any */
import IDatabaseConnection from "../database/IDatabaseConnection";
import User from "../../domain/entity/User";
import Password from "../../domain/entity/Password";
import IUserRepository from "../../domain/repository/IUserRepository";
import Email from "../../domain/entity/Email";
import Name from "../../domain/entity/Name";

export default class UserDatabaseRepository implements IUserRepository {

    constructor(private readonly database: IDatabaseConnection) { }

    async find(id: string): Promise<User> {
        const [user] = await this.database.query(`select * from users where id='${id}'`);

        if (!user) throw new Error(`User not found`);
        return User.restore(user.id, user.name, user.email, new Password(user.password, user.salt));
    }

    async findAll(): Promise<User[]> {
        const data = await this.database.query(`select * from users`);
        if (!data) throw new Error(`No users found`);

        const users: User[] = [];
        data.forEach((user: any) => users.push(
            new User(
                user.id,
                new Name(user.name),
                new Email(user.email),
                new Password(user.password, user.salt,),
            )
        ));

        return users;
    }

    async findByEmail(email: string): Promise<User> {
        const result = await this.database.query(`select * from users where email='${email}'`);
        if (result.length > 0) {
            const user = result[0];
            return User.restore(user.id, user.name, user.email, new Password(user.password, user.salt));
        }

        throw new Error(`User not found`);
    }

    async save(user: User): Promise<void> {
        await this.database.query(`insert into users ("id", "name", "email", "password", "salt") 
                values ('${user.id}', '${user.name.getValue()}', '${user.email.getValue()}', '${user.password.value}', '${user.password.salt}')`,
        );
    }
}