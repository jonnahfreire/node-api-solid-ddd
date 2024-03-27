import { config } from "dotenv";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import UserDatabaseRepository from "./infra/repository/UserDatabaseRepository";
config();


const main = async () => {
    const port = Number(process.env.PORT) || 3333;

    const server = new ExpressHttpServer(new UserDatabaseRepository());
    server.listen(port);
}

main();