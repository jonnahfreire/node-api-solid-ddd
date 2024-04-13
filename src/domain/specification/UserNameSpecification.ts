import User from "../entity/User";
import { AbstractSpecification } from "./ISpecification";

export default class UserNameSpecification extends AbstractSpecification<User> {

	isSatisfiedBy(user: User): boolean {
		return user.name.value.split(" ").length >= 2;
	}

}
