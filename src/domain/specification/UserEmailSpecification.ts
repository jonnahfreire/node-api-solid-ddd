
import User from "../entity/User";
import { AbstractSpecification } from "./ISpecification";

export default class UserEmailSpecification extends AbstractSpecification<User> {
	isSatisfiedBy(user: User): boolean {
		return !!String(user.email.value).toLowerCase().match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/);
	}
}
