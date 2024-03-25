import { config } from "dotenv";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
config();


const main = async () => {
    const port = Number(process.env.PORT) || 3333;

    const server = new ExpressHttpServer();
    server.listen(port);
}

main();