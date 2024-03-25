import { randomUUID } from "crypto";
import Email from "./Email";
import Name from "./Name";
import Password from "./Password";

export default class User {
    constructor(readonly id: string, readonly name: Name, readonly email: Email, readonly password: Password) { }

    static async create(name: string, email: string, password: string): Promise<User> {
        return new User(randomUUID(), new Name(name), new Email(email), await Password.create(password));
    }

    static restore(id: string, name: string, email: string, password: Password): User {
        return new User(id, new Name(name), new Email(email), password);
    }

    async validatePassword(password: string) {
        return this.password.validate(password);
    }
}