export const domDeclarations_d_ts = `
export interface AbstractCoreEvent {
}
export interface AbstractCoreAnimationEvent extends Event {
}
export interface AbstractCoreClipboardEvent extends Event {
}
export interface AbstractCoreCompositionEvent extends Event {
}
export interface AbstractCoreDragEvent extends Event {
}
export interface AbstractCoreFocusEvent extends Event {
}
export interface AbstractCoreKeyboardEvent extends Event {
}
export interface AbstractCoreMouseEvent extends Event {
}
export interface AbstractCoreTouchEvent extends Event {
}
export interface AbstractCorePointerEvent extends Event {
}
export interface AbstractCoreTransitionEvent extends Event {
}
export interface AbstractCoreUIEvent extends Event {
}
export interface AbstractCoreWheelEvent extends Event {
}
export interface EventTarget {
}
export interface Document {
}
export interface DataTransfer {
}
export interface StyleMedia {
}
export interface Element {
}
export interface HTMLWebViewElement extends HTMLElement {
}
export interface Text {
}
export interface TouchList {
}
export interface WebGLRenderingContext {
}
declare type NativeAnimationEvent = AbstractCoreAnimationEvent;
declare type NativeClipboardEvent = AbstractCoreClipboardEvent;
declare type NativeCompositionEvent = AbstractCoreCompositionEvent;
declare type NativeDragEvent = AbstractCoreDragEvent;
declare type NativeFocusEvent = AbstractCoreFocusEvent;
declare type NativeKeyboardEvent = AbstractCoreKeyboardEvent;
declare type NativeMouseEvent = AbstractCoreMouseEvent;
declare type NativeTouchEvent = AbstractCoreTouchEvent;
declare type NativePointerEvent = AbstractCorePointerEvent;
declare type NativeTransitionEvent = AbstractCoreTransitionEvent;
declare type NativeUIEvent = AbstractCoreUIEvent;
declare type NativeWheelEvent = AbstractCoreWheelEvent;
declare type ReactType<P = any> = {
    [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never;
}[keyof JSX.IntrinsicElements] | ComponentType<P>;
declare type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
declare type Key = string | number;
export interface RefObject<T> {
    readonly current: T | null;
}
declare type Ref<T> = {
    bivarianceHack(instance: T | null): void;
}['bivarianceHack'] | RefObject<T> | null;
declare type LegacyRef<T> = string | Ref<T>;
declare type ComponentState = any;
export interface Attributes {
    key?: Key;
}
export interface RefAttributes<T> extends Attributes {
    ref?: Ref<T>;
}
export interface ClassAttributes<T> extends Attributes {
    ref?: LegacyRef<T>;
}
export interface ReactElement<P> {
    type: string | ComponentClass<P> | FunctionComponent<P>;
    props: P;
    key: Key | null;
}
export interface FunctionComponentElement<P> extends ReactElement<P> {
    type: FunctionComponent<P>;
    ref?: 'ref' extends keyof P ? P extends {
        ref?: infer R;
    } ? R : never : never;
}
export interface ComponentElement<P, T extends Component<P, ComponentState>> extends ReactElement<P> {
    type: ComponentClass<P>;
    ref?: LegacyRef<T>;
}
export interface DOMElement<P extends HTMLAttributes<T> | SVGAttributes<T>, T extends Element> extends ReactElement<P> {
    type: string;
    ref: LegacyRef<T>;
}
export interface ReactHTMLElement<T extends HTMLElement> extends DetailedReactHTMLElement<AllHTMLAttributes<T>, T> {
}
export interface DetailedReactHTMLElement<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMElement<P, T> {
    type: keyof ReactHTML;
}
export interface ReactSVGElement extends DOMElement<SVGAttributes<SVGElement>, SVGElement> {
    type: keyof ReactSVG;
}
export interface ReactPortal extends ReactElement<any> {
    key: Key | null;
    children: ReactNode;
}
declare type DOMFactory<P extends DOMAttributes<T>, T extends Element> = (props?: (ClassAttributes<T> & P) | null, ...children: ReactNode[]) => DOMElement<P, T>;
export interface HTMLFactory<T extends HTMLElement> extends DetailedHTMLFactory<AllHTMLAttributes<T>, T> {
}
export interface DetailedHTMLFactory<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMFactory<P, T> {
    (props?: (ClassAttributes<T> & P) | null, ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
}
export interface SVGFactory extends DOMFactory<SVGAttributes<SVGElement>, SVGElement> {
    (props?: (ClassAttributes<SVGElement> & SVGAttributes<SVGElement>) | null, ...children: ReactNode[]): ReactSVGElement;
}
declare type ReactText = string | number;
declare type ReactChild = ReactElement<any> | ReactText;
export interface ReactNodeArray extends Array<ReactNode> {
}
export declare type ReactFragment = {} | ReactNodeArray;
export declare type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
export interface ProviderProps<T> {
    value: T;
    children?: ReactNode;
}
export interface ConsumerProps<T> {
    children: (value: T) => ReactNode;
    unstable_observedBits?: number;
}
export interface ExoticComponent<P = {}> {
    (props: P): (ReactElement<any> | null);
    readonly $$typeof: symbol;
}
export interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
    displayName?: string;
}
export interface ProviderExoticComponent<P> extends ExoticComponent<P> {
    propTypes?: WeakValidationMap<P>;
}
declare type Provider<T> = ProviderExoticComponent<ProviderProps<T>>;
declare type Consumer<T> = ExoticComponent<ConsumerProps<T>>;
export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
}
export interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {
}
export interface PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {
}
export interface ClassicComponent<P = {}, S = {}> extends Component<P, S> {
    replaceState(nextState: S, callback?: () => void): void;
    isMounted(): boolean;
    getInitialState?(): S;
}
export interface ChildContextProvider<CC> {
    getChildContext(): CC;
}
export interface FunctionComponent<P = {}> {
    (props: P & {
        children?: ReactNode;
    }, context?: any): ReactElement<any> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}
export interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
    new (props: P, context?: any): Component<P, S>;
    propTypes?: WeakValidationMap<P>;
    contextType?: Context<any>;
    contextTypes?: ValidationMap<any>;
    childContextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}
export interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
}
export interface StaticLifecycle<P, S> {
    getDerivedStateFromProps?: GetDerivedStateFromProps<P, S>;
    getDerivedStateFromError?: GetDerivedStateFromError<P, S>;
}
declare type GetDerivedStateFromProps<P, S> = (nextProps: Readonly<P>, prevState: S) => Partial<S> | null;
declare type GetDerivedStateFromError<P, S> = (error: any) => Partial<S> | null;
export interface NewLifecycle<P, S, SS> {
    getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
    componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
}
export interface DeprecatedLifecycle<P, S> {
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
}
export interface Mixin<P, S> extends ComponentLifecycle<P, S> {
    mixins?: Array<Mixin<P, S>>;
    statics?: {
        [key: string]: any;
    };
    displayName?: string;
    propTypes?: ValidationMap<any>;
    contextTypes?: ValidationMap<any>;
    childContextTypes?: ValidationMap<any>;
    getDefaultProps?(): P;
    getInitialState?(): S;
}
export interface ComponentSpec<P, S> extends Mixin<P, S> {
    render(): ReactNode;
    [propertyName: string]: any;
}
export interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
    defaultProps?: Partial<P>;
}
declare type PropsWithoutRef<P> = 'ref' extends keyof P ? Pick<P, Exclude<keyof P, 'ref'>> : P;
declare type PropsWithRef<P> = 'ref' extends keyof P ? P extends {
    ref?: infer R;
} ? string extends R ? PropsWithoutRef<P> & {
    ref?: Exclude<R, string>;
} : P : P : P;
declare type ComponentProps<T extends ReactType> = T extends ComponentType<infer P> ? P : T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : {};
declare type ComponentPropsWithRef<T extends ReactType> = T extends ComponentClass<infer P> ? PropsWithoutRef<P> & RefAttributes<InstanceType<T>> : PropsWithRef<ComponentProps<T>>;
export interface MemoExoticComponent<T extends ComponentType<any>> extends NamedExoticComponent<ComponentPropsWithRef<T>> {
    readonly type: T;
}
export interface LazyExoticComponent<T extends ComponentType<any>> extends ExoticComponent<ComponentPropsWithRef<T>> {
    readonly _result: T;
}
export interface MutableRefObject<T> {
    current: T;
}
export interface BaseSyntheticEvent<E = object, C = any, T = any> {
    nativeEvent: E;
    currentTarget: C;
    target: T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
}
export interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {
}
export interface ClipboardEvent<T = Element> extends SyntheticEvent<T, NativeClipboardEvent> {
    clipboardData: DataTransfer;
}
export interface CompositionEvent<T = Element> extends SyntheticEvent<T, NativeCompositionEvent> {
    data: string;
}
export interface DragEvent<T = Element> extends MouseEvent<T, NativeDragEvent> {
    dataTransfer: DataTransfer;
}
export interface PointerEvent<T = Element> extends MouseEvent<T, NativePointerEvent> {
    pointerId: number;
    pressure: number;
    tiltX: number;
    tiltY: number;
    width: number;
    height: number;
    pointerType: 'mouse' | 'pen' | 'touch';
    isPrimary: boolean;
}
export interface FocusEvent<T = Element> extends SyntheticEvent<T, NativeFocusEvent> {
    relatedTarget: EventTarget;
    target: EventTarget & T;
}
export interface FormEvent<T = Element> extends SyntheticEvent<T> {
}
export interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}
export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}
export interface KeyboardEvent<T = Element> extends SyntheticEvent<T, NativeKeyboardEvent> {
    altKey: boolean;
    charCode: number;
    ctrlKey: boolean;
    getModifierState(key: string): boolean;
    key: string;
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    which: number;
}
export interface MouseEvent<T = Element, E = NativeMouseEvent> extends SyntheticEvent<T, E> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    getModifierState(key: string): boolean;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
}
export interface TouchEvent<T = Element> extends SyntheticEvent<T, NativeTouchEvent> {
    altKey: boolean;
    changedTouches: TouchList;
    ctrlKey: boolean;
    getModifierState(key: string): boolean;
    metaKey: boolean;
    shiftKey: boolean;
    targetTouches: TouchList;
    touches: TouchList;
}
export interface UIEvent<T = Element> extends SyntheticEvent<T, NativeUIEvent> {
    detail: number;
    view: AbstractView;
}
export interface WheelEvent<T = Element> extends MouseEvent<T, NativeWheelEvent> {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
}
export interface AnimationEvent<T = Element> extends SyntheticEvent<T, NativeAnimationEvent> {
    animationName: string;
    elapsedTime: number;
    pseudoElement: string;
}
export interface TransitionEvent<T = Element> extends SyntheticEvent<T, NativeTransitionEvent> {
    elapsedTime: number;
    propertyName: string;
    pseudoElement: string;
}
declare type EventHandler<E extends SyntheticEvent<any>> = {
    bivarianceHack(event: E): void;
}['bivarianceHack'];
declare type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;
declare type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
declare type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
declare type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
declare type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
declare type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
declare type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
declare type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
declare type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
declare type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
declare type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
declare type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
declare type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
declare type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
declare type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
export interface Props<T> {
    children?: ReactNode;
    key?: Key;
    ref?: LegacyRef<T>;
}
export interface HTMLProps<T> extends AllHTMLAttributes<T>, ClassAttributes<T> {
}
declare type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;
export interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
}
export interface DOMAttributes<T> {
    children?: ReactNode;
    dangerouslySetInnerHTML?: {
        __html: string;
    };
    onCopy?: ClipboardEventHandler<T>;
    onCopyCapture?: ClipboardEventHandler<T>;
    onCut?: ClipboardEventHandler<T>;
    onCutCapture?: ClipboardEventHandler<T>;
    onPaste?: ClipboardEventHandler<T>;
    onPasteCapture?: ClipboardEventHandler<T>;
    onCompositionEnd?: CompositionEventHandler<T>;
    onCompositionEndCapture?: CompositionEventHandler<T>;
    onCompositionStart?: CompositionEventHandler<T>;
    onCompositionStartCapture?: CompositionEventHandler<T>;
    onCompositionUpdate?: CompositionEventHandler<T>;
    onCompositionUpdateCapture?: CompositionEventHandler<T>;
    onFocus?: FocusEventHandler<T>;
    onFocusCapture?: FocusEventHandler<T>;
    onBlur?: FocusEventHandler<T>;
    onBlurCapture?: FocusEventHandler<T>;
    onChange?: FormEventHandler<T>;
    onChangeCapture?: FormEventHandler<T>;
    onBeforeInput?: FormEventHandler<T>;
    onBeforeInputCapture?: FormEventHandler<T>;
    onInput?: FormEventHandler<T>;
    onInputCapture?: FormEventHandler<T>;
    onReset?: FormEventHandler<T>;
    onResetCapture?: FormEventHandler<T>;
    onSubmit?: FormEventHandler<T>;
    onSubmitCapture?: FormEventHandler<T>;
    onInvalid?: FormEventHandler<T>;
    onInvalidCapture?: FormEventHandler<T>;
    onLoad?: ReactEventHandler<T>;
    onLoadCapture?: ReactEventHandler<T>;
    onError?: ReactEventHandler<T>;
    onErrorCapture?: ReactEventHandler<T>;
    onKeyDown?: KeyboardEventHandler<T>;
    onKeyDownCapture?: KeyboardEventHandler<T>;
    onKeyPress?: KeyboardEventHandler<T>;
    onKeyPressCapture?: KeyboardEventHandler<T>;
    onKeyUp?: KeyboardEventHandler<T>;
    onKeyUpCapture?: KeyboardEventHandler<T>;
    onAbort?: ReactEventHandler<T>;
    onAbortCapture?: ReactEventHandler<T>;
    onCanPlay?: ReactEventHandler<T>;
    onCanPlayCapture?: ReactEventHandler<T>;
    onCanPlayThrough?: ReactEventHandler<T>;
    onCanPlayThroughCapture?: ReactEventHandler<T>;
    onDurationChange?: ReactEventHandler<T>;
    onDurationChangeCapture?: ReactEventHandler<T>;
    onEmptied?: ReactEventHandler<T>;
    onEmptiedCapture?: ReactEventHandler<T>;
    onEncrypted?: ReactEventHandler<T>;
    onEncryptedCapture?: ReactEventHandler<T>;
    onEnded?: ReactEventHandler<T>;
    onEndedCapture?: ReactEventHandler<T>;
    onLoadedData?: ReactEventHandler<T>;
    onLoadedDataCapture?: ReactEventHandler<T>;
    onLoadedMetadata?: ReactEventHandler<T>;
    onLoadedMetadataCapture?: ReactEventHandler<T>;
    onLoadStart?: ReactEventHandler<T>;
    onLoadStartCapture?: ReactEventHandler<T>;
    onPause?: ReactEventHandler<T>;
    onPauseCapture?: ReactEventHandler<T>;
    onPlay?: ReactEventHandler<T>;
    onPlayCapture?: ReactEventHandler<T>;
    onPlaying?: ReactEventHandler<T>;
    onPlayingCapture?: ReactEventHandler<T>;
    onProgress?: ReactEventHandler<T>;
    onProgressCapture?: ReactEventHandler<T>;
    onRateChange?: ReactEventHandler<T>;
    onRateChangeCapture?: ReactEventHandler<T>;
    onSeeked?: ReactEventHandler<T>;
    onSeekedCapture?: ReactEventHandler<T>;
    onSeeking?: ReactEventHandler<T>;
    onSeekingCapture?: ReactEventHandler<T>;
    onStalled?: ReactEventHandler<T>;
    onStalledCapture?: ReactEventHandler<T>;
    onSuspend?: ReactEventHandler<T>;
    onSuspendCapture?: ReactEventHandler<T>;
    onTimeUpdate?: ReactEventHandler<T>;
    onTimeUpdateCapture?: ReactEventHandler<T>;
    onVolumeChange?: ReactEventHandler<T>;
    onVolumeChangeCapture?: ReactEventHandler<T>;
    onWaiting?: ReactEventHandler<T>;
    onWaitingCapture?: ReactEventHandler<T>;
    onClick?: MouseEventHandler<T>;
    onClickCapture?: MouseEventHandler<T>;
    onContextMenu?: MouseEventHandler<T>;
    onContextMenuCapture?: MouseEventHandler<T>;
    onDoubleClick?: MouseEventHandler<T>;
    onDoubleClickCapture?: MouseEventHandler<T>;
    onDrag?: DragEventHandler<T>;
    onDragCapture?: DragEventHandler<T>;
    onDragEnd?: DragEventHandler<T>;
    onDragEndCapture?: DragEventHandler<T>;
    onDragEnter?: DragEventHandler<T>;
    onDragEnterCapture?: DragEventHandler<T>;
    onDragExit?: DragEventHandler<T>;
    onDragExitCapture?: DragEventHandler<T>;
    onDragLeave?: DragEventHandler<T>;
    onDragLeaveCapture?: DragEventHandler<T>;
    onDragOver?: DragEventHandler<T>;
    onDragOverCapture?: DragEventHandler<T>;
    onDragStart?: DragEventHandler<T>;
    onDragStartCapture?: DragEventHandler<T>;
    onDrop?: DragEventHandler<T>;
    onDropCapture?: DragEventHandler<T>;
    onMouseDown?: MouseEventHandler<T>;
    onMouseDownCapture?: MouseEventHandler<T>;
    onMouseEnter?: MouseEventHandler<T>;
    onMouseLeave?: MouseEventHandler<T>;
    onMouseMove?: MouseEventHandler<T>;
    onMouseMoveCapture?: MouseEventHandler<T>;
    onMouseOut?: MouseEventHandler<T>;
    onMouseOutCapture?: MouseEventHandler<T>;
    onMouseOver?: MouseEventHandler<T>;
    onMouseOverCapture?: MouseEventHandler<T>;
    onMouseUp?: MouseEventHandler<T>;
    onMouseUpCapture?: MouseEventHandler<T>;
    onSelect?: ReactEventHandler<T>;
    onSelectCapture?: ReactEventHandler<T>;
    onTouchCancel?: TouchEventHandler<T>;
    onTouchCancelCapture?: TouchEventHandler<T>;
    onTouchEnd?: TouchEventHandler<T>;
    onTouchEndCapture?: TouchEventHandler<T>;
    onTouchMove?: TouchEventHandler<T>;
    onTouchMoveCapture?: TouchEventHandler<T>;
    onTouchStart?: TouchEventHandler<T>;
    onTouchStartCapture?: TouchEventHandler<T>;
    onPointerDown?: PointerEventHandler<T>;
    onPointerDownCapture?: PointerEventHandler<T>;
    onPointerMove?: PointerEventHandler<T>;
    onPointerMoveCapture?: PointerEventHandler<T>;
    onPointerUp?: PointerEventHandler<T>;
    onPointerUpCapture?: PointerEventHandler<T>;
    onPointerCancel?: PointerEventHandler<T>;
    onPointerCancelCapture?: PointerEventHandler<T>;
    onPointerEnter?: PointerEventHandler<T>;
    onPointerEnterCapture?: PointerEventHandler<T>;
    onPointerLeave?: PointerEventHandler<T>;
    onPointerLeaveCapture?: PointerEventHandler<T>;
    onPointerOver?: PointerEventHandler<T>;
    onPointerOverCapture?: PointerEventHandler<T>;
    onPointerOut?: PointerEventHandler<T>;
    onPointerOutCapture?: PointerEventHandler<T>;
    onGotPointerCapture?: PointerEventHandler<T>;
    onGotPointerCaptureCapture?: PointerEventHandler<T>;
    onLostPointerCapture?: PointerEventHandler<T>;
    onLostPointerCaptureCapture?: PointerEventHandler<T>;
    onScroll?: UIEventHandler<T>;
    onScrollCapture?: UIEventHandler<T>;
    onWheel?: WheelEventHandler<T>;
    onWheelCapture?: WheelEventHandler<T>;
    onAnimationStart?: AnimationEventHandler<T>;
    onAnimationStartCapture?: AnimationEventHandler<T>;
    onAnimationEnd?: AnimationEventHandler<T>;
    onAnimationEndCapture?: AnimationEventHandler<T>;
    onAnimationIteration?: AnimationEventHandler<T>;
    onAnimationIterationCapture?: AnimationEventHandler<T>;
    onTransitionEnd?: TransitionEventHandler<T>;
    onTransitionEndCapture?: TransitionEventHandler<T>;
}
import * as CSS from './cssDeclarations';
export interface CSSProperties extends CSS.Properties<string | number> {
}
export interface HTMLAttributes<T> extends DOMAttributes<T> {
    defaultChecked?: boolean;
    defaultValue?: string | string[];
    suppressContentEditableWarning?: boolean;
    suppressHydrationWarning?: boolean;
    accessKey?: string;
    className?: string;
    contentEditable?: boolean;
    contextMenu?: string;
    dir?: string;
    draggable?: boolean;
    hidden?: boolean;
    id?: string;
    lang?: string;
    placeholder?: string;
    slot?: string;
    spellCheck?: boolean;
    style?: CSSProperties;
    tabIndex?: number;
    title?: string;
    inputMode?: string;
    is?: string;
    radioGroup?: string;
    role?: string;
    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;
    autoCapitalize?: string;
    autoCorrect?: string;
    autoSave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: 'on' | 'off';
}
export interface HTMLAttributes<T> extends DOMAttributes<T> {
    'aria-activedescendant'?: string;
    'aria-atomic'?: boolean | 'false' | 'true';
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    'aria-busy'?: boolean | 'false' | 'true';
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
    'aria-colcount'?: number;
    'aria-colindex'?: number;
    'aria-colspan'?: number;
    'aria-controls'?: string;
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-disabled'?: boolean | 'false' | 'true';
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
    'aria-errormessage'?: string;
    'aria-expanded'?: boolean | 'false' | 'true';
    'aria-flowto'?: string;
    'aria-grabbed'?: boolean | 'false' | 'true';
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-hidden'?: boolean | 'false' | 'true';
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
    'aria-keyshortcuts'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-level'?: number;
    'aria-live'?: 'off' | 'assertive' | 'polite';
    'aria-modal'?: boolean | 'false' | 'true';
    'aria-multiline'?: boolean | 'false' | 'true';
    'aria-multiselectable'?: boolean | 'false' | 'true';
    'aria-orientation'?: 'horizontal' | 'vertical';
    'aria-owns'?: string;
    'aria-placeholder'?: string;
    'aria-posinset'?: number;
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true';
    'aria-readonly'?: boolean | 'false' | 'true';
    'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text';
    'aria-required'?: boolean | 'false' | 'true';
    'aria-roledescription'?: string;
    'aria-rowcount'?: number;
    'aria-rowindex'?: number;
    'aria-rowspan'?: number;
    'aria-selected'?: boolean | 'false' | 'true';
    'aria-setsize'?: number;
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
    'aria-valuemax'?: number;
    'aria-valuemin'?: number;
    'aria-valuenow'?: number;
    'aria-valuetext'?: string;
}
export interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string;
    acceptCharset?: string;
    action?: string;
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    alt?: string;
    as?: string;
    async?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    autoPlay?: boolean;
    capture?: boolean | string;
    cellPadding?: number | string;
    cellSpacing?: number | string;
    charSet?: string;
    challenge?: string;
    checked?: boolean;
    cite?: string;
    classID?: string;
    cols?: number;
    colSpan?: number;
    content?: string;
    controls?: boolean;
    coords?: string;
    crossOrigin?: string;
    data?: string;
    dateTime?: string;
    default?: boolean;
    defer?: boolean;
    disabled?: boolean;
    download?: any;
    encType?: string;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    frameBorder?: number | string;
    headers?: string;
    height?: number | string;
    high?: number;
    href?: string;
    hrefLang?: string;
    htmlFor?: string;
    httpEquiv?: string;
    integrity?: string;
    keyParams?: string;
    keyType?: string;
    kind?: string;
    label?: string;
    list?: string;
    loop?: boolean;
    low?: number;
    manifest?: string;
    marginHeight?: number;
    marginWidth?: number;
    max?: number | string;
    maxLength?: number;
    media?: string;
    mediaGroup?: string;
    method?: string;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    muted?: boolean;
    name?: string;
    nonce?: string;
    noValidate?: boolean;
    open?: boolean;
    optimum?: number;
    pattern?: string;
    placeholder?: string;
    playsInline?: boolean;
    poster?: string;
    preload?: string;
    readOnly?: boolean;
    rel?: string;
    required?: boolean;
    reversed?: boolean;
    rows?: number;
    rowSpan?: number;
    sandbox?: string;
    scope?: string;
    scoped?: boolean;
    scrolling?: string;
    seamless?: boolean;
    selected?: boolean;
    shape?: string;
    size?: number;
    sizes?: string;
    span?: number;
    src?: string;
    srcDoc?: string;
    srcLang?: string;
    srcSet?: string;
    start?: number;
    step?: number | string;
    summary?: string;
    target?: string;
    type?: string;
    useMap?: string;
    value?: string | string[] | number;
    width?: number | string;
    wmode?: string;
    wrap?: string;
}
export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    target?: string;
    type?: string;
}
export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
}
export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    coords?: string;
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    shape?: string;
    target?: string;
}
export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string;
    target?: string;
}
export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}
export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    type?: string;
    value?: string | string[] | number;
}
export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    width?: number | string;
}
export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
    width?: number | string;
}
export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
}
export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
}
export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}
export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
}
export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    src?: string;
    type?: string;
    width?: number | string;
}
export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    form?: string;
    name?: string;
}
export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string;
    action?: string;
    autoComplete?: string;
    encType?: string;
    method?: string;
    name?: string;
    noValidate?: boolean;
    target?: string;
}
export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string;
}
export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allow?: string;
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    frameBorder?: number | string;
    height?: number | string;
    marginHeight?: number;
    marginWidth?: number;
    name?: string;
    sandbox?: string;
    scrolling?: string;
    seamless?: boolean;
    src?: string;
    srcDoc?: string;
    width?: number | string;
}
export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    crossOrigin?: 'anonymous' | 'use-credentials' | '';
    decoding?: 'async' | 'auto' | 'sync';
    height?: number | string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    useMap?: string;
    width?: number | string;
}
export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}
export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string;
    alt?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    capture?: boolean | string;
    checked?: boolean;
    crossOrigin?: string;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    height?: number | string;
    list?: string;
    max?: number | string;
    maxLength?: number;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    size?: number;
    src?: string;
    step?: number | string;
    type?: string;
    value?: string | string[] | number;
    width?: number | string;
    onChange?: ChangeEventHandler<T>;
}
export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean;
    challenge?: string;
    disabled?: boolean;
    form?: string;
    keyType?: string;
    keyParams?: string;
    name?: string;
}
export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    htmlFor?: string;
}
export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[] | number;
}
export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string;
    crossOrigin?: string;
    href?: string;
    hrefLang?: string;
    integrity?: string;
    media?: string;
    rel?: string;
    sizes?: string;
    type?: string;
}
export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
}
export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
}
export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoPlay?: boolean;
    controls?: boolean;
    controlsList?: string;
    crossOrigin?: string;
    loop?: boolean;
    mediaGroup?: string;
    muted?: boolean;
    playsinline?: boolean;
    preload?: string;
    src?: string;
}
export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charSet?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}
export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    high?: number;
    low?: number;
    max?: number | string;
    min?: number | string;
    optimum?: number;
    value?: string | string[] | number;
}
export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}
export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classID?: string;
    data?: string;
    form?: string;
    height?: number | string;
    name?: string;
    type?: string;
    useMap?: string;
    width?: number | string;
    wmode?: string;
}
export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean;
    start?: number;
    type?: '1' | 'a' | 'A' | 'i' | 'I';
}
export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
}
export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string | string[] | number;
}
export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    htmlFor?: string;
    name?: string;
}
export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
    value?: string | string[] | number;
}
export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string;
    value?: string | string[] | number;
}
export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean;
    charSet?: string;
    crossOrigin?: string;
    defer?: boolean;
    integrity?: string;
    noModule?: boolean;
    nonce?: string;
    src?: string;
    type?: string;
}
export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
    value?: string | string[] | number;
    onChange?: ChangeEventHandler<T>;
}
export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    type?: string;
}
export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    nonce?: string;
    scoped?: boolean;
    type?: string;
}
export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    cellPadding?: number | string;
    cellSpacing?: number | string;
    summary?: string;
}
export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string;
    autoFocus?: boolean;
    cols?: number;
    dirName?: string;
    disabled?: boolean;
    form?: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    rows?: number;
    value?: string | string[] | number;
    wrap?: string;
    onChange?: ChangeEventHandler<T>;
}
export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
}
export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
}
export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    dateTime?: string;
}
export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srcLang?: string;
}
export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string;
    playsInline?: boolean;
    poster?: string;
    width?: number | string;
}
export interface SVGAttributes<T> extends DOMAttributes<T> {
    className?: string;
    color?: string;
    height?: number | string;
    id?: string;
    lang?: string;
    max?: number | string;
    media?: string;
    method?: string;
    min?: number | string;
    name?: string;
    style?: CSSProperties;
    target?: string;
    type?: string;
    width?: number | string;
    role?: string;
    tabIndex?: number;
    accentHeight?: number | string;
    accumulate?: 'none' | 'sum';
    additive?: 'replace' | 'sum';
    alignmentBaseline?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit';
    allowReorder?: 'no' | 'yes';
    alphabetic?: number | string;
    amplitude?: number | string;
    arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated';
    ascent?: number | string;
    attributeName?: string;
    attributeType?: string;
    autoReverse?: number | string;
    azimuth?: number | string;
    baseFrequency?: number | string;
    baselineShift?: number | string;
    baseProfile?: number | string;
    bbox?: number | string;
    begin?: number | string;
    bias?: number | string;
    by?: number | string;
    calcMode?: number | string;
    capHeight?: number | string;
    clip?: number | string;
    clipPath?: string;
    clipPathUnits?: number | string;
    clipRule?: number | string;
    colorInterpolation?: number | string;
    colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit';
    colorProfile?: number | string;
    colorRendering?: number | string;
    contentScriptType?: number | string;
    contentStyleType?: number | string;
    cursor?: number | string;
    cx?: number | string;
    cy?: number | string;
    d?: string;
    decelerate?: number | string;
    descent?: number | string;
    diffuseConstant?: number | string;
    direction?: number | string;
    display?: number | string;
    divisor?: number | string;
    dominantBaseline?: number | string;
    dur?: number | string;
    dx?: number | string;
    dy?: number | string;
    edgeMode?: number | string;
    elevation?: number | string;
    enableBackground?: number | string;
    end?: number | string;
    exponent?: number | string;
    externalResourcesRequired?: number | string;
    fill?: string;
    fillOpacity?: number | string;
    fillRule?: 'nonzero' | 'evenodd' | 'inherit';
    filter?: string;
    filterRes?: number | string;
    filterUnits?: number | string;
    floodColor?: number | string;
    floodOpacity?: number | string;
    focusable?: number | string;
    fontFamily?: string;
    fontSize?: number | string;
    fontSizeAdjust?: number | string;
    fontStretch?: number | string;
    fontStyle?: number | string;
    fontVariant?: number | string;
    fontWeight?: number | string;
    format?: number | string;
    from?: number | string;
    fx?: number | string;
    fy?: number | string;
    g1?: number | string;
    g2?: number | string;
    glyphName?: number | string;
    glyphOrientationHorizontal?: number | string;
    glyphOrientationVertical?: number | string;
    glyphRef?: number | string;
    gradientTransform?: string;
    gradientUnits?: string;
    hanging?: number | string;
    horizAdvX?: number | string;
    horizOriginX?: number | string;
    href?: string;
    ideographic?: number | string;
    imageRendering?: number | string;
    in2?: number | string;
    in?: string;
    intercept?: number | string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    k?: number | string;
    kernelMatrix?: number | string;
    kernelUnitLength?: number | string;
    kerning?: number | string;
    keyPoints?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    lengthAdjust?: number | string;
    letterSpacing?: number | string;
    lightingColor?: number | string;
    limitingConeAngle?: number | string;
    local?: number | string;
    markerEnd?: string;
    markerHeight?: number | string;
    markerMid?: string;
    markerStart?: string;
    markerUnits?: number | string;
    markerWidth?: number | string;
    mask?: string;
    maskContentUnits?: number | string;
    maskUnits?: number | string;
    mathematical?: number | string;
    mode?: number | string;
    numOctaves?: number | string;
    offset?: number | string;
    opacity?: number | string;
    operator?: number | string;
    order?: number | string;
    orient?: number | string;
    orientation?: number | string;
    origin?: number | string;
    overflow?: number | string;
    overlinePosition?: number | string;
    overlineThickness?: number | string;
    paintOrder?: number | string;
    panose1?: number | string;
    pathLength?: number | string;
    patternContentUnits?: string;
    patternTransform?: number | string;
    patternUnits?: string;
    pointerEvents?: number | string;
    points?: string;
    pointsAtX?: number | string;
    pointsAtY?: number | string;
    pointsAtZ?: number | string;
    preserveAlpha?: number | string;
    preserveAspectRatio?: string;
    primitiveUnits?: number | string;
    r?: number | string;
    radius?: number | string;
    refX?: number | string;
    refY?: number | string;
    renderingIntent?: number | string;
    repeatCount?: number | string;
    repeatDur?: number | string;
    requiredExtensions?: number | string;
    requiredFeatures?: number | string;
    restart?: number | string;
    result?: string;
    rotate?: number | string;
    rx?: number | string;
    ry?: number | string;
    scale?: number | string;
    seed?: number | string;
    shapeRendering?: number | string;
    slope?: number | string;
    spacing?: number | string;
    specularConstant?: number | string;
    specularExponent?: number | string;
    speed?: number | string;
    spreadMethod?: string;
    startOffset?: number | string;
    stdDeviation?: number | string;
    stemh?: number | string;
    stemv?: number | string;
    stitchTiles?: number | string;
    stopColor?: string;
    stopOpacity?: number | string;
    strikethroughPosition?: number | string;
    strikethroughThickness?: number | string;
    string?: number | string;
    stroke?: string;
    strokeDasharray?: string | number;
    strokeDashoffset?: string | number;
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
    strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
    strokeMiterlimit?: number | string;
    strokeOpacity?: number | string;
    strokeWidth?: number | string;
    surfaceScale?: number | string;
    systemLanguage?: number | string;
    tableValues?: number | string;
    targetX?: number | string;
    targetY?: number | string;
    textAnchor?: string;
    textDecoration?: number | string;
    textLength?: number | string;
    textRendering?: number | string;
    to?: number | string;
    transform?: string;
    u1?: number | string;
    u2?: number | string;
    underlinePosition?: number | string;
    underlineThickness?: number | string;
    unicode?: number | string;
    unicodeBidi?: number | string;
    unicodeRange?: number | string;
    unitsPerEm?: number | string;
    vAlphabetic?: number | string;
    values?: string;
    vectorEffect?: number | string;
    version?: string;
    vertAdvY?: number | string;
    vertOriginX?: number | string;
    vertOriginY?: number | string;
    vHanging?: number | string;
    vIdeographic?: number | string;
    viewBox?: string;
    viewTarget?: number | string;
    visibility?: number | string;
    vMathematical?: number | string;
    widths?: number | string;
    wordSpacing?: number | string;
    writingMode?: number | string;
    x1?: number | string;
    x2?: number | string;
    x?: number | string;
    xChannelSelector?: string;
    xHeight?: number | string;
    xlinkActuate?: string;
    xlinkArcrole?: string;
    xlinkHref?: string;
    xlinkRole?: string;
    xlinkShow?: string;
    xlinkTitle?: string;
    xlinkType?: string;
    xmlBase?: string;
    xmlLang?: string;
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
    y1?: number | string;
    y2?: number | string;
    y?: number | string;
    yChannelSelector?: string;
    z?: number | string;
    zoomAndPan?: string;
}
export interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
    allowFullScreen?: boolean;
    allowpopups?: boolean;
    autoFocus?: boolean;
    autosize?: boolean;
    blinkfeatures?: string;
    disableblinkfeatures?: string;
    disableguestresize?: boolean;
    disablewebsecurity?: boolean;
    guestinstance?: string;
    httpreferrer?: string;
    nodeintegration?: boolean;
    partition?: string;
    plugins?: boolean;
    preload?: string;
    src?: string;
    useragent?: string;
    webpreferences?: string;
}
export interface ReactHTML {
    a: DetailedHTMLFactory<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
    abbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    address: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    area: DetailedHTMLFactory<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
    article: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    aside: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    audio: DetailedHTMLFactory<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
    b: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    base: DetailedHTMLFactory<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
    bdi: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    bdo: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    big: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    blockquote: DetailedHTMLFactory<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
    body: DetailedHTMLFactory<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
    br: DetailedHTMLFactory<HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
    button: DetailedHTMLFactory<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    canvas: DetailedHTMLFactory<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
    caption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    cite: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    code: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    col: DetailedHTMLFactory<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
    colgroup: DetailedHTMLFactory<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
    data: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    datalist: DetailedHTMLFactory<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
    dd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    del: DetailedHTMLFactory<DelHTMLAttributes<HTMLElement>, HTMLElement>;
    details: DetailedHTMLFactory<DetailsHTMLAttributes<HTMLElement>, HTMLElement>;
    dfn: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    dialog: DetailedHTMLFactory<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
    div: DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    dl: DetailedHTMLFactory<HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
    dt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    em: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    embed: DetailedHTMLFactory<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
    fieldset: DetailedHTMLFactory<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
    figcaption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    figure: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    footer: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    form: DetailedHTMLFactory<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    h1: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h2: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h3: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h4: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h5: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h6: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    head: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLHeadElement>;
    header: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    hgroup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    hr: DetailedHTMLFactory<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
    html: DetailedHTMLFactory<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
    i: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    iframe: DetailedHTMLFactory<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
    img: DetailedHTMLFactory<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    input: DetailedHTMLFactory<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    ins: DetailedHTMLFactory<InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
    kbd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    keygen: DetailedHTMLFactory<KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
    label: DetailedHTMLFactory<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
    legend: DetailedHTMLFactory<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
    li: DetailedHTMLFactory<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
    link: DetailedHTMLFactory<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
    main: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    map: DetailedHTMLFactory<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
    mark: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    menu: DetailedHTMLFactory<MenuHTMLAttributes<HTMLElement>, HTMLElement>;
    menuitem: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    meta: DetailedHTMLFactory<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
    meter: DetailedHTMLFactory<MeterHTMLAttributes<HTMLElement>, HTMLElement>;
    nav: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    noscript: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    object: DetailedHTMLFactory<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
    ol: DetailedHTMLFactory<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
    optgroup: DetailedHTMLFactory<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
    option: DetailedHTMLFactory<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
    output: DetailedHTMLFactory<OutputHTMLAttributes<HTMLElement>, HTMLElement>;
    p: DetailedHTMLFactory<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    param: DetailedHTMLFactory<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
    picture: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    pre: DetailedHTMLFactory<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
    progress: DetailedHTMLFactory<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
    q: DetailedHTMLFactory<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
    rp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    rt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    ruby: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    s: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    samp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    script: DetailedHTMLFactory<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
    section: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    select: DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    small: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    source: DetailedHTMLFactory<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
    span: DetailedHTMLFactory<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    strong: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    style: DetailedHTMLFactory<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
    sub: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    summary: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    sup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    table: DetailedHTMLFactory<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
    tbody: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
    td: DetailedHTMLFactory<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
    textarea: DetailedHTMLFactory<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    tfoot: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
    th: DetailedHTMLFactory<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
    thead: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
    time: DetailedHTMLFactory<TimeHTMLAttributes<HTMLElement>, HTMLElement>;
    title: DetailedHTMLFactory<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
    tr: DetailedHTMLFactory<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
    track: DetailedHTMLFactory<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
    u: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    ul: DetailedHTMLFactory<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
    'var': DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    video: DetailedHTMLFactory<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
    wbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
    webview: DetailedHTMLFactory<WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>;
}
export interface ReactSVG {
    animate: SVGFactory;
    circle: SVGFactory;
    clipPath: SVGFactory;
    defs: SVGFactory;
    desc: SVGFactory;
    ellipse: SVGFactory;
    feBlend: SVGFactory;
    feColorMatrix: SVGFactory;
    feComponentTransfer: SVGFactory;
    feComposite: SVGFactory;
    feConvolveMatrix: SVGFactory;
    feDiffuseLighting: SVGFactory;
    feDisplacementMap: SVGFactory;
    feDistantLight: SVGFactory;
    feDropShadow: SVGFactory;
    feFlood: SVGFactory;
    feFuncA: SVGFactory;
    feFuncB: SVGFactory;
    feFuncG: SVGFactory;
    feFuncR: SVGFactory;
    feGaussianBlur: SVGFactory;
    feImage: SVGFactory;
    feMerge: SVGFactory;
    feMergeNode: SVGFactory;
    feMorphology: SVGFactory;
    feOffset: SVGFactory;
    fePointLight: SVGFactory;
    feSpecularLighting: SVGFactory;
    feSpotLight: SVGFactory;
    feTile: SVGFactory;
    feTurbulence: SVGFactory;
    filter: SVGFactory;
    foreignObject: SVGFactory;
    g: SVGFactory;
    image: SVGFactory;
    line: SVGFactory;
    linearGradient: SVGFactory;
    marker: SVGFactory;
    mask: SVGFactory;
    metadata: SVGFactory;
    path: SVGFactory;
    pattern: SVGFactory;
    polygon: SVGFactory;
    polyline: SVGFactory;
    radialGradient: SVGFactory;
    rect: SVGFactory;
    stop: SVGFactory;
    svg: SVGFactory;
    switch: SVGFactory;
    symbol: SVGFactory;
    text: SVGFactory;
    textPath: SVGFactory;
    tspan: SVGFactory;
    use: SVGFactory;
    view: SVGFactory;
}
declare type Validator<T = any> = any;
declare type ValidationMap<T = any> = any;
declare type WeakValidationMap<T> = {
    [K in keyof T]?: null extends T[K] ? Validator<T[K] | null | undefined> : undefined extends T[K] ? Validator<T[K] | null | undefined> : Validator<T[K]>;
};
export interface AbstractView {
    styleMedia: StyleMedia;
    document: Document;
}
export interface ErrorInfo {
    componentStack: string;
}
declare global {
    namespace JSX {
        interface Element extends ReactElement<any> {
        }
        interface ElementClass extends Component<any> {
            render(): ReactNode;
        }
        interface ElementAttributesProperty {
            props: {};
        }
        interface ElementChildrenAttribute {
            children: {};
        }
        interface IntrinsicAttributes extends Attributes {
        }
        interface IntrinsicClassAttributes<T> extends ClassAttributes<T> {
        }
        interface IntrinsicElements {
            a: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
            abbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            address: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            area: DetailedHTMLProps<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
            article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            aside: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            audio: DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
            b: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            base: DetailedHTMLProps<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
            bdi: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            bdo: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            big: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            blockquote: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
            body: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
            br: DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
            button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
            canvas: DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
            caption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            col: DetailedHTMLProps<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
            colgroup: DetailedHTMLProps<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
            data: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            datalist: DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
            dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            del: DetailedHTMLProps<DelHTMLAttributes<HTMLElement>, HTMLElement>;
            details: DetailedHTMLProps<DetailsHTMLAttributes<HTMLElement>, HTMLElement>;
            dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            dialog: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
            div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
            dl: DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
            dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            embed: DetailedHTMLProps<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
            fieldset: DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
            figcaption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            figure: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            form: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
            h1: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h3: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h4: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h5: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h6: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            head: DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>;
            header: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            hgroup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            hr: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
            html: DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
            i: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            iframe: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
            img: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
            input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
            ins: DetailedHTMLProps<InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
            kbd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            keygen: DetailedHTMLProps<KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
            label: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
            legend: DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
            li: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
            link: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
            main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            map: DetailedHTMLProps<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
            mark: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            menu: DetailedHTMLProps<MenuHTMLAttributes<HTMLElement>, HTMLElement>;
            menuitem: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            meta: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
            meter: DetailedHTMLProps<MeterHTMLAttributes<HTMLElement>, HTMLElement>;
            nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            noindex: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            noscript: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            object: DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
            ol: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
            optgroup: DetailedHTMLProps<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
            option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
            output: DetailedHTMLProps<OutputHTMLAttributes<HTMLElement>, HTMLElement>;
            p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
            param: DetailedHTMLProps<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
            picture: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
            progress: DetailedHTMLProps<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
            q: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
            rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            script: DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
            section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
            small: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            source: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
            span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
            strong: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            style: DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
            sub: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            summary: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            sup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            table: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
            tbody: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
            textarea: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
            tfoot: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            th: DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
            thead: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            time: DetailedHTMLProps<TimeHTMLAttributes<HTMLElement>, HTMLElement>;
            title: DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
            tr: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
            track: DetailedHTMLProps<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
            u: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            ul: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
            'var': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            video: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
            wbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
            webview: DetailedHTMLProps<WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>;
            svg: SVGProps<SVGSVGElement>;
            animate: SVGProps<SVGElement>;
            animateTransform: SVGProps<SVGElement>;
            circle: SVGProps<SVGCircleElement>;
            clipPath: SVGProps<SVGClipPathElement>;
            defs: SVGProps<SVGDefsElement>;
            desc: SVGProps<SVGDescElement>;
            ellipse: SVGProps<SVGEllipseElement>;
            feBlend: SVGProps<SVGFEBlendElement>;
            feColorMatrix: SVGProps<SVGFEColorMatrixElement>;
            feComponentTransfer: SVGProps<SVGFEComponentTransferElement>;
            feComposite: SVGProps<SVGFECompositeElement>;
            feConvolveMatrix: SVGProps<SVGFEConvolveMatrixElement>;
            feDiffuseLighting: SVGProps<SVGFEDiffuseLightingElement>;
            feDisplacementMap: SVGProps<SVGFEDisplacementMapElement>;
            feDistantLight: SVGProps<SVGFEDistantLightElement>;
            feFlood: SVGProps<SVGFEFloodElement>;
            feFuncA: SVGProps<SVGFEFuncAElement>;
            feFuncB: SVGProps<SVGFEFuncBElement>;
            feFuncG: SVGProps<SVGFEFuncGElement>;
            feFuncR: SVGProps<SVGFEFuncRElement>;
            feGaussianBlur: SVGProps<SVGFEGaussianBlurElement>;
            feImage: SVGProps<SVGFEImageElement>;
            feMerge: SVGProps<SVGFEMergeElement>;
            feMergeNode: SVGProps<SVGFEMergeNodeElement>;
            feMorphology: SVGProps<SVGFEMorphologyElement>;
            feOffset: SVGProps<SVGFEOffsetElement>;
            fePointLight: SVGProps<SVGFEPointLightElement>;
            feSpecularLighting: SVGProps<SVGFESpecularLightingElement>;
            feSpotLight: SVGProps<SVGFESpotLightElement>;
            feTile: SVGProps<SVGFETileElement>;
            feTurbulence: SVGProps<SVGFETurbulenceElement>;
            filter: SVGProps<SVGFilterElement>;
            foreignObject: SVGProps<SVGForeignObjectElement>;
            g: SVGProps<SVGGElement>;
            image: SVGProps<SVGImageElement>;
            line: SVGProps<SVGLineElement>;
            linearGradient: SVGProps<SVGLinearGradientElement>;
            marker: SVGProps<SVGMarkerElement>;
            mask: SVGProps<SVGMaskElement>;
            metadata: SVGProps<SVGMetadataElement>;
            path: SVGProps<SVGPathElement>;
            pattern: SVGProps<SVGPatternElement>;
            polygon: SVGProps<SVGPolygonElement>;
            polyline: SVGProps<SVGPolylineElement>;
            radialGradient: SVGProps<SVGRadialGradientElement>;
            rect: SVGProps<SVGRectElement>;
            stop: SVGProps<SVGStopElement>;
            switch: SVGProps<SVGSwitchElement>;
            symbol: SVGProps<SVGSymbolElement>;
            text: SVGProps<SVGTextElement>;
            textPath: SVGProps<SVGTextPathElement>;
            tspan: SVGProps<SVGTSpanElement>;
            use: SVGProps<SVGUseElement>;
            view: SVGProps<SVGViewElement>;
        }
    }
}
export {};
` 