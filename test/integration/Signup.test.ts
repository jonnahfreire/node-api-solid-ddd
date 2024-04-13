import UserMemoryRepository from "../../src/infra/repository/memory/UserMemoryRepository";
import SignUp from "../../src/application/usecase/SignUp";

describe('Integration', () => {
    const memoryRepository = new UserMemoryRepository();
    const signupInput = {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: '12345678'
    }

    beforeEach(async () => {
        const signup = new SignUp(memoryRepository);
        await signup.execute(signupInput);
    });

    test('Deve buscar um usuário por email', async () => {
        const user = await memoryRepository.findByEmail(signupInput.email);
        expect(user).toBeDefined();
    });

    test('Deve validar a senha de usuário', async () => {
        const user = await memoryRepository.findByEmail(signupInput.email);
        const userPasswordIsValid = await user.password.validate('12345678');
        const userPasswordIsNotValid = await user.password.validate('1234567');

        expect(userPasswordIsValid).toBe(true);
        expect(userPasswordIsNotValid).toBe(false);
    });

    test('Deve retornar exceção ao buscar um usuário com email inválido', async () => {
        expect(async () => await memoryRepository.findByEmail('john.doe@gmail')).rejects.toThrow('User not found');
    });

    afterEach(() => {
        memoryRepository.users = [];
    });
});