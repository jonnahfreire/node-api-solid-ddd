import IEvent from "./IEvent";

export default interface IEventHandler<T extends IEvent = IEvent> {
    eventName: string;
    handle(event: T): void;
}