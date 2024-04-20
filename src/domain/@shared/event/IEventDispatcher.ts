import IEvent from "./IEvent";
import IEventHandler from "./IEventHandler";

export default interface IEventDispatcher {
    get getEventHandlers(): { [eventName: string]: IEventHandler[] }
    dispatch(event: IEvent): void;
    register(handler: IEventHandler): void;
    unregister(handler: IEventHandler): void;
    unregisterAll(): void;
}