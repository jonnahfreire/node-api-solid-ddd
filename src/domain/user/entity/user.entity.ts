import { randomUUID } from "crypto";
import Email from "../value-object/Email";
import Name from "../value-object/Name";
import Password from "../value-object/Password";

export default class User {
    private constructor(
        readonly id: string,
        readonly name: Name,
        readonly email: Email,
        readonly password: Password = new Password('', '')
    ) { }

    static async create(name: string, email: string, password: string): Promise<User> {
        return new User(randomUUID(), new Name(name), new Email(email), await Password.create(password));
    }

    static restore(id: string, name: string, email: string): User {
        return new User(id, new Name(name), new Email(email));
    }

    async validatePassword(password: string) {
        return this.password?.validate(password);
    }
}