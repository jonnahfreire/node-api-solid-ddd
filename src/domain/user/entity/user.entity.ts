import { randomUUID } from "crypto";
import Email from "../value-object/Email";
import Name from "../value-object/Name";
import Password from "../value-object/Password";

export default class User {
    private constructor(
        readonly id: string,
        readonly name: Name,
        readonly email: Email,
        readonly password: Password
    ) { }

    static async create(name: string, email: string, password: string): Promise<User> {
        return new User(randomUUID(), new Name(name), new Email(email), await Password.create(password));
    }

    static async restore(id: string, name: string, email: string, password: string, salt: string): Promise<User> {
        return new User(id, new Name(name), new Email(email), new Password(password, salt));
    }

    async validatePassword(password: string): Promise<boolean> {
        return this.password?.validate(password);
    }
}