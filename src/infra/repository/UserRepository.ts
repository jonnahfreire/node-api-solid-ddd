import IDatabaseConnection from "../database/PgPromiseDatabaseConnection/IDatabaseConnection";
import User from "../../domain/entity/User";
import Password from "../../domain/entity/Password";

export default class UserDatabaseRepository {

    constructor(private readonly database: IDatabaseConnection) { }
    async save(user: User): Promise<void> {
        await this.database.query(`insert into users values($1, $2, $3)`,
            [user.name.getValue(), user.email.getValue(), user.password.value],
        );
    }

    async find(id: string): Promise<User> {
        const [user] = await this.database.query(`select * from into users where id=$1`, [id]);

        if (!user) throw new Error(`User not found`);
        return User.restore(user.id, user.name, user.email, new Password(user.password, user.salt));
    }
}