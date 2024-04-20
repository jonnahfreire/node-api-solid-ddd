
import User from "../entity/user.entity";
import { AbstractSpecification } from "../../@shared/specification/ISpecification";


export default class UserPasswordSpecification extends AbstractSpecification<User> {
	isSatisfiedBy(user: User): boolean {
		return user.password.value.length >= 8;
	}
}
