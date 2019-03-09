interface MIEventTarget {
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
  readonly currentTarget: MIEventTarget | null;
  readonly target: MIEventTarget | null;
  readonly type: string;
}
export class MEventTarget implements MIEventTarget {
  addEventListener(type: string, listener: EventListener | null, options?: boolean | AddEventListenerOptions): void {
    throw 'not implemented';
  }
  removeEventListener(type: string, callback: EventListener | null, options?: EventListenerOptions | boolean): void {
    throw 'not implemented';
  }
}
