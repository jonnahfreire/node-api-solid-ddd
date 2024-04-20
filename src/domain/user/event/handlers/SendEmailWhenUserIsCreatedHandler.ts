import IEvent from "../../../@shared/event/IEvent";
import IEventHandler from "../../../@shared/event/IEventHandler";
import UserCreatedEvent from "../UserCreatedEvent";

export default class SendEmailWhenUserIsCreatedHandler implements IEventHandler<IEvent> {
    eventName = "UserCreatedEvent";
    handle(event: UserCreatedEvent): void {
        console.log('Send email to: ', event.data.email);
    }
}