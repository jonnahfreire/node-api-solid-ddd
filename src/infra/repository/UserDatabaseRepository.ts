/* eslint-disable @typescript-eslint/no-explicit-any */
import IDatabaseConnection from "../database/IDatabaseConnection";
import User from "../../domain/entity/User";
import Password from "../../domain/entity/Password";
import IUserRepository from "../../domain/repository/IUserRepository";
import Email from "../../domain/entity/Email";
import Name from "../../domain/entity/Name";
import PgPromiseDatabaseConnection from "../database/PgPromiseDatabaseConnection";

export default class UserDatabaseRepository implements IUserRepository {
    database: IDatabaseConnection

    constructor() {
        this.database = new PgPromiseDatabaseConnection();
    }

    async find(id: string): Promise<User> {
        const [user] = await this.database.query(`select * from users where id='${id}'`);
        await this.database.close();

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
                new Password(user.password, user.salt),
            )
        ));

        await this.database.close();
        return users;
    }

    async findByEmail(email: string): Promise<User> {
        const result = await this.database.query(`select * from users where email='${email}'`);
        if (result.length > 0) {
            const user = result[0];
            return User.restore(user.id, user.name, user.email, new Password(user.password, user.salt));
        }

        await this.database.close();
        throw new Error(`User not found`);
    }

    async save(user: User): Promise<void> {
        await this.database.query(`insert into users ("id", "name", "email", "password", "salt") 
                values ('${user.id}', '${user.name.getValue()}', '${user.email.getValue()}', '${user.password.value}', '${user.password.salt}')`,
        );
        await this.database.close();
    }
}