export default interface IHttpServer {
    configureMiddlewares(): void;
    configureRoutes(): void;
    listen(port: number): void;
}