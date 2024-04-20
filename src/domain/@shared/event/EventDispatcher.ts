import IEvent from "./IEvent";
import IEventDispatcher from "./IEventDispatcher";
import IEventHandler from "./IEventHandler";

export default class EventDispatcher implements IEventDispatcher {
    private handlers: { [eventName: string]: IEventHandler[] } = {};

    get getEventHandlers() { return this.handlers; }

    register(handler: IEventHandler): void {
        if (!this.handlers[handler.eventName]) {
            this.handlers[handler.eventName] = [];
        }
        this.handlers[handler.eventName].push(handler);
    }

    dispatch(event: IEvent): void {
        const handlers = this.handlers[event.constructor.name];
        if (handlers) {
            handlers.forEach(handler => handler.handle(event));
        }
    }

    unregister(handler: IEventHandler): void {
        if (this.handlers[handler.eventName]) {
            const index = this.handlers[handler.eventName].indexOf(handler);
            if (index !== -1) {
                this.handlers[handler.eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.handlers = {};
    }
}