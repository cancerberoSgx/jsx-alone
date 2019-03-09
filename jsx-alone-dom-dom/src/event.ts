interface EventTarget {
  addEventListener(type: string, listener: EventListener | null, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: string, callback: EventListener | null, options?: EventListenerOptions | boolean): void;
}
interface EventListenerOptions {
  capture?: boolean;
}
interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
}
interface EventListener {
  (evt: Event): void;
}
interface Event {
  readonly currentTarget: EventTarget | null;
  readonly target: EventTarget | null;
  readonly type: string;
}
export class EventTargetImpl implements EventTarget {
  addEventListener(type: string, listener: EventListener | null, options?: boolean | AddEventListenerOptions): void {
    throw 'not implemented';
  }
  removeEventListener(type: string, callback: EventListener | null, options?: EventListenerOptions | boolean): void {
    throw 'not implemented';
  }
}
