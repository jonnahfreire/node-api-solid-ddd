import User from "../entity/user.entity";
import { AbstractSpecification } from "../../@shared/specification/ISpecification";


export default class UserNameSpecification extends AbstractSpecification<User> {

	isSatisfiedBy(user: User): boolean {
		return user.name.value.split(" ").length >= 2;
	}

}
