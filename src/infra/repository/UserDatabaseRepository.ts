/* eslint-disable @typescript-eslint/no-explicit-any */
import IDatabaseConnection from "../database/IDatabaseConnection";
import User from "../../domain/user/entity/user.entity";
import IUserRepository from "../../domain/user/repository/IUserRepository";

export default class UserDatabaseRepository implements IUserRepository {
    constructor(private readonly database: IDatabaseConnection) { }

    async find(id: string): Promise<User> {
        const [user] = await this.database.query(`select * from users where id='${id}'`);
        await this.database.close();

        if (!user) throw new Error(`User not found`);
        return await User.restore(user.id, user.name, user.email, user.password, user.salt);
    }

    async findAll(): Promise<User[]> {
        const [data] = await this.database.query(`select * from users`, []);
        if (!data) throw new Error(`No users found`);

        const users: User[] = [];
        data.forEach(async (user: any) => users.push(await User.restore(user.id, user.name, user.email, user.password, user.salt)));

        await this.database.close();
        return users;
    }


    async create(user: User): Promise<void> {
        await this.database.query(`
            insert into users ("id", "name", "email", "password", "salt") 
                values (
                    '${user.id}', 
                    '${user.name.value}', 
                    '${user.email.value}', 
                    '${user.password.value}', 
                    '${user.password.salt}'
                )`,
        );

        await this.database.close();
    }

    async update(user: User): Promise<void> {
        await this.database.query(`
            update users 
                set "name" = '${user.name.value}', 
                set "email" = '${user.email.value}', 
                set "password" = '${user.password.value}', 
                where id = '${user.id}'`,
        );

        await this.database.close();
    }
}