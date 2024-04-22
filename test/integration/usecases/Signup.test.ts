import UserMemoryRepository from "../../../src/infra/repository/memory/UserMemoryRepository";
import SignUpUseCase from "../../../src/application/usecase/SignUp";

describe('Integration', () => {
    const memoryRepository = new UserMemoryRepository();
    let createdUser: {
        id: string,
        name: string,
        email: string,
    };

    const signupInput = {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: '12345678'
    }

    beforeEach(async () => {
        const signup = new SignUpUseCase(memoryRepository);
        createdUser = await signup.execute(signupInput);
    });

    test('Deve buscar um usuário por id', async () => {
        const user = await memoryRepository.find(createdUser.id);

        expect(user).toBeDefined();
        expect(user.id).toEqual(createdUser.id);
    });

    test('Deve validar a senha de um usuário', async () => {
        const user = await memoryRepository.find(createdUser.id);

        const userPasswordIsValid = await user.password.validate('12345678');
        const userPasswordIsNotValid = await user.password.validate('1234567');

        expect(userPasswordIsValid).toBe(true);
        expect(userPasswordIsNotValid).toBe(false);
    });

    afterEach(() => {
        memoryRepository.users = [];
    });
});