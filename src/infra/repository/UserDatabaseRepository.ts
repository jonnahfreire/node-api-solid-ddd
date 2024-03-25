/* eslint-disable @typescript-eslint/no-explicit-any */
import IDatabaseConnection from "../database/PgPromiseDatabaseConnection/IDatabaseConnection";
import User from "../../domain/entity/User";
import Password from "../../domain/entity/Password";
import IUserRepository from "../../domain/repository/IUserRepository";

export default class UserDatabaseRepository implements IUserRepository {

    constructor(private readonly database: IDatabaseConnection) { }

    async find(id: string): Promise<User> {
        const [user] = await this.database.query(`select * from into users where id=$1`, [id]);

        if (!user) throw new Error(`User not found`);
        return User.restore(user.id, user.name, user.email, new Password(user.password, user.salt));
    }

    async findAll(): Promise<User[]> {
        const data = await this.database.query(`select * from into users`, []);

        const users: User[] = [];
        data.forEach((user: any) => users.push(
            new User(
                user.id,
                user.name,
                user.email,
                user.password,
            )
        ));

        return users;
    }

    async findByEmail(email: string): Promise<User> {
        const [user] = await this.database.query(`select * from into users where email=$1`, [email]);

        if (!user) throw new Error(`User not found`);
        return User.restore(user.id, user.name, user.email, new Password(user.password, user.salt));
    }

    async save(user: User): Promise<void> {
        await this.database.query(`insert into users values($1, $2, $3)`,
            [user.name.getValue(), user.email.getValue(), user.password.value],
        );
    }
}