
import User from "../entity/User";
import { AbstractSpecification } from "./ISpecification";

export default class UserPasswordSpecification extends AbstractSpecification<User> {
	isSatisfiedBy(user: User): boolean {
		return user.password.value.length >= 8;
	}
}
