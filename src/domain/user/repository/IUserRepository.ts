import IRepository from "../../@shared/repository/IRepository";
import User from "../entity/user.entity";

export default interface IUserRepository extends IRepository<User> { }