export default interface IUseCase {
    execute(input: unknown): Promise<unknown>;
}