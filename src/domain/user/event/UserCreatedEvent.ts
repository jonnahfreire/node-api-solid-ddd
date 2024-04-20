import IEvent from "../../@shared/event/IEvent";

export default class UserCreatedEvent implements IEvent {
    ocurrenceDate: Date;
    data: UserCreatedEventData;

    constructor(data: UserCreatedEventData) {
        this.ocurrenceDate = new Date();
        this.data = data;
    }
}

type UserCreatedEventData = {
    id: string;
    name: string;
    email: string;
};