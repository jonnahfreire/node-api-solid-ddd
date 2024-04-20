import IEventDispatcher from "../../src/domain/@shared/event/IEventDispatcher";
import IEventHandler from "../../src/domain/@shared/event/IEventHandler";
import UserCreatedEvent from "../../src/domain/user/event/UserCreatedEvent";
import EventDispatcher from "../../src/domain/@shared/event/EventDispatcher";
import SendEmailWhenUserIsCreatedHandler from "../../src/domain/user/event/handlers/SendEmailWhenUserIsCreated";
import UserMemoryRepository from "../../src/infra/repository/memory/UserMemoryRepository";
import SignUp from "../../src/application/usecase/SignUp";

describe('Domains Events Test | Dispatchers | Handlers', () => {
    let eventDispatcher: IEventDispatcher;
    let userCreatedEventHandler: IEventHandler;

    beforeEach(() => {
        eventDispatcher = new EventDispatcher();
        userCreatedEventHandler = new SendEmailWhenUserIsCreatedHandler();
    });

    test('should register an event handler', () => {
        eventDispatcher.register(userCreatedEventHandler);
        expect(eventDispatcher.getEventHandlers['UserCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['UserCreatedEvent']).toHaveLength(1);
    });

    test('should notify when an event ocurred', async () => {
        const userMemoryRepository = new UserMemoryRepository();
        const signup = new SignUp(userMemoryRepository);
        const user = await signup.execute({
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: '12345678'
        });

        eventDispatcher.register(userCreatedEventHandler);
        const spyOnHandler = jest.spyOn(userCreatedEventHandler, 'handle');

        const userCreatedEvent = new UserCreatedEvent(user);

        eventDispatcher.dispatch(userCreatedEvent);
        expect(spyOnHandler).toHaveBeenCalled();
    });
});