/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
export declare const __hack = "NOT TYPE ONLY";
export interface Account {
    displayName: string;
    id: string;
    imageURL?: string;
    name?: string;
    rpDisplayName: string;
}
export interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
}
export interface AesCbcParams extends Algorithm {
    iv: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
}
export interface AesCtrParams extends Algorithm {
    counter: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
    length: number;
}
export interface AesDerivedKeyParams extends Algorithm {
    length: number;
}
export interface AesGcmParams extends Algorithm {
    additionalData?: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
    iv: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
    tagLength?: number;
}
export interface AesKeyAlgorithm extends KeyAlgorithm {
    length: number;
}
export interface AesKeyGenParams extends Algorithm {
    length: number;
}
export interface Algorithm {
    name: string;
}
export interface AnalyserOptions extends AudioNodeOptions {
    fftSize?: number;
    maxDecibels?: number;
    minDecibels?: number;
    smoothingTimeConstant?: number;
}
export interface AnimationEventInit extends EventInit {
    animationName?: string;
    elapsedTime?: number;
    pseudoElement?: string;
}
export interface AnimationPlaybackEventInit extends EventInit {
    currentTime?: number | null;
    timelineTime?: number | null;
}
export interface AssertionOptions {
    allowList?: ScopedCredentialDescriptor[];
    extensions?: WebAuthnExtensions;
    rpId?: string;
    timeoutSeconds?: number;
}
export interface AssignedNodesOptions {
    flatten?: boolean;
}
export interface AudioBufferOptions {
    length: number;
    numberOfChannels?: number;
    sampleRate: number;
}
export interface AudioBufferSourceOptions {
    buffer?: AudioBuffer | null;
    detune?: number;
    loop?: boolean;
    loopEnd?: number;
    loopStart?: number;
    playbackRate?: number;
}
export interface AudioContextInfo {
    currentTime?: number;
    sampleRate?: number;
}
export interface AudioContextOptions {
    latencyHint?: AudioContextLatencyCategory | number;
    sampleRate?: number;
}
export interface AudioNodeOptions {
    channelCount?: number;
    channelCountMode?: ChannelCountMode;
    channelInterpretation?: ChannelInterpretation;
}
export interface AudioParamDescriptor {
    automationRate?: AutomationRate;
    defaultValue?: number;
    maxValue?: number;
    minValue?: number;
    name: string;
}
export interface AudioProcessingEventInit extends EventInit {
    inputBuffer: AudioBuffer;
    outputBuffer: AudioBuffer;
    playbackTime: number;
}
export interface AudioTimestamp {
    contextTime?: number;
    performanceTime?: number;
}
export interface AudioWorkletNodeOptions extends AudioNodeOptions {
    numberOfInputs?: number;
    numberOfOutputs?: number;
    outputChannelCount?: number[];
    parameterData?: Record<string, number>;
    processorOptions?: any;
}
export interface AuthenticationExtensionsClientInputs {
    appid?: string;
    authnSel?: AuthenticatorSelectionList;
    exts?: boolean;
    loc?: boolean;
    txAuthGeneric?: txAuthGenericArg;
    txAuthSimple?: string;
    uvi?: boolean;
    uvm?: boolean;
}
export interface AuthenticationExtensionsClientOutputs {
    appid?: boolean;
    authnSel?: boolean;
    exts?: AuthenticationExtensionsSupported;
    loc?: Coordinates;
    txAuthGeneric?: ArrayBuffer;
    txAuthSimple?: string;
    uvi?: ArrayBuffer;
    uvm?: UvmEntries;
}
export interface AuthenticatorSelectionCriteria {
    authenticatorAttachment?: AuthenticatorAttachment;
    requireResidentKey?: boolean;
    userVerification?: UserVerificationRequirement;
}
export interface BiquadFilterOptions extends AudioNodeOptions {
    Q?: number;
    detune?: number;
    frequency?: number;
    gain?: number;
    type?: BiquadFilterType;
}
export interface BlobPropertyBag {
    endings?: EndingType;
    type?: string;
}
export interface ByteLengthChunk {
    byteLength?: number;
}
export interface CacheQueryOptions {
    ignoreMethod?: boolean;
    ignoreSearch?: boolean;
    ignoreVary?: boolean;
}
export interface CanvasRenderingContext2DSettings {
    alpha?: boolean;
    desynchronized?: boolean;
}
export interface ChannelMergerOptions extends AudioNodeOptions {
    numberOfInputs?: number;
}
export interface ChannelSplitterOptions extends AudioNodeOptions {
    numberOfOutputs?: number;
}
export interface ClientData {
    challenge: string;
    extensions?: WebAuthnExtensions;
    hashAlg: string | Algorithm;
    origin: string;
    rpId: string;
    tokenBinding?: string;
}
export interface ClientQueryOptions {
    includeUncontrolled?: boolean;
    type?: ClientTypes;
}
export interface ClipboardEventInit extends EventInit {
    clipboardData?: DataTransfer | null;
}
export interface CloseEventInit extends EventInit {
    code?: number;
    reason?: string;
    wasClean?: boolean;
}
export interface CompositionEventInit extends UIEventInit {
    data?: string;
}
export interface ComputedEffectTiming extends EffectTiming {
    activeDuration?: number;
    currentIteration?: number | null;
    endTime?: number;
    localTime?: number | null;
    progress?: number | null;
}
export interface ComputedKeyframe {
    composite: CompositeOperationOrAuto;
    computedOffset: number;
    easing: string;
    offset: number | null;
    [property: string]: string | number | null | undefined;
}
export interface ConfirmSiteSpecificExceptionsInformation extends ExceptionInformation {
    arrayOfDomainStrings?: string[];
}
export interface ConstantSourceOptions {
    offset?: number;
}
export interface ConstrainBooleanParameters {
    exact?: boolean;
    ideal?: boolean;
}
export interface ConstrainDOMStringParameters {
    exact?: string | string[];
    ideal?: string | string[];
}
export interface ConstrainDoubleRange extends DoubleRange {
    exact?: number;
    ideal?: number;
}
export interface ConstrainULongRange extends ULongRange {
    exact?: number;
    ideal?: number;
}
export interface ConstrainVideoFacingModeParameters {
    exact?: VideoFacingModeEnum | VideoFacingModeEnum[];
    ideal?: VideoFacingModeEnum | VideoFacingModeEnum[];
}
export interface ConvolverOptions extends AudioNodeOptions {
    buffer?: AudioBuffer | null;
    disableNormalization?: boolean;
}
export interface CredentialCreationOptions {
    publicKey?: PublicKeyCredentialCreationOptions;
    signal?: AbortSignal;
}
export interface CredentialRequestOptions {
    mediation?: CredentialMediationRequirement;
    publicKey?: PublicKeyCredentialRequestOptions;
    signal?: AbortSignal;
}
export interface CustomEventInit<T = any> extends EventInit {
    detail?: T;
}
export interface DOMMatrix2DInit {
    a?: number;
    b?: number;
    c?: number;
    d?: number;
    e?: number;
    f?: number;
    m11?: number;
    m12?: number;
    m21?: number;
    m22?: number;
    m41?: number;
    m42?: number;
}
export interface DOMMatrixInit extends DOMMatrix2DInit {
    is2D?: boolean;
    m13?: number;
    m14?: number;
    m23?: number;
    m24?: number;
    m31?: number;
    m32?: number;
    m33?: number;
    m34?: number;
    m43?: number;
    m44?: number;
}
export interface DOMPointInit {
    w?: number;
    x?: number;
    y?: number;
    z?: number;
}
export interface DOMQuadInit {
    p1?: DOMPointInit;
    p2?: DOMPointInit;
    p3?: DOMPointInit;
    p4?: DOMPointInit;
}
export interface DOMRectInit {
    height?: number;
    width?: number;
    x?: number;
    y?: number;
}
export interface DelayOptions extends AudioNodeOptions {
    delayTime?: number;
    maxDelayTime?: number;
}
export interface DeviceLightEventInit extends EventInit {
    value?: number;
}
export interface DeviceMotionEventAccelerationInit {
    x?: number | null;
    y?: number | null;
    z?: number | null;
}
export interface DeviceMotionEventInit extends EventInit {
    acceleration?: DeviceMotionEventAccelerationInit;
    accelerationIncludingGravity?: DeviceMotionEventAccelerationInit;
    interval?: number;
    rotationRate?: DeviceMotionEventRotationRateInit;
}
export interface DeviceMotionEventRotationRateInit {
    alpha?: number | null;
    beta?: number | null;
    gamma?: number | null;
}
export interface DeviceOrientationEventInit extends EventInit {
    absolute?: boolean;
    alpha?: number | null;
    beta?: number | null;
    gamma?: number | null;
}
export interface DevicePermissionDescriptor extends PermissionDescriptor {
    deviceId?: string;
    name: "camera" | "microphone" | "speaker";
}
export interface DocumentTimelineOptions {
    originTime?: number;
}
export interface DoubleRange {
    max?: number;
    min?: number;
}
export interface DragEventInit extends MouseEventInit {
    dataTransfer?: DataTransfer | null;
}
export interface DynamicsCompressorOptions extends AudioNodeOptions {
    attack?: number;
    knee?: number;
    ratio?: number;
    release?: number;
    threshold?: number;
}
export interface EcKeyAlgorithm extends KeyAlgorithm {
    namedCurve: NamedCurve;
}
export interface EcKeyGenParams extends Algorithm {
    namedCurve: NamedCurve;
}
export interface EcKeyImportParams extends Algorithm {
    namedCurve: NamedCurve;
}
export interface EcdhKeyDeriveParams extends Algorithm {
    public: CryptoKey;
}
export interface EcdsaParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
}
export interface EffectTiming {
    delay?: number;
    direction?: PlaybackDirection;
    duration?: number | string;
    easing?: string;
    endDelay?: number;
    fill?: FillMode;
    iterationStart?: number;
    iterations?: number;
}
export interface ElementCreationOptions {
    is?: string;
}
export interface ElementDefinitionOptions {
    extends?: string;
}
export interface ErrorEventInit extends EventInit {
    colno?: number;
    error?: any;
    filename?: string;
    lineno?: number;
    message?: string;
}
export interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
export interface EventListenerOptions {
    capture?: boolean;
}
export interface EventModifierInit extends UIEventInit {
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    modifierAltGraph?: boolean;
    modifierCapsLock?: boolean;
    modifierFn?: boolean;
    modifierFnLock?: boolean;
    modifierHyper?: boolean;
    modifierNumLock?: boolean;
    modifierScrollLock?: boolean;
    modifierSuper?: boolean;
    modifierSymbol?: boolean;
    modifierSymbolLock?: boolean;
    shiftKey?: boolean;
}
export interface EventSourceInit {
    withCredentials?: boolean;
}
export interface ExceptionInformation {
    domain?: string | null;
}
export interface FilePropertyBag extends BlobPropertyBag {
    lastModified?: number;
}
export interface FocusEventInit extends UIEventInit {
    relatedTarget?: EventTarget | null;
}
export interface FocusNavigationEventInit extends EventInit {
    navigationReason?: string | null;
    originHeight?: number;
    originLeft?: number;
    originTop?: number;
    originWidth?: number;
}
export interface FocusNavigationOrigin {
    originHeight?: number;
    originLeft?: number;
    originTop?: number;
    originWidth?: number;
}
export interface FocusOptions {
    preventScroll?: boolean;
}
export interface FullscreenOptions {
    navigationUI?: FullscreenNavigationUI;
}
export interface GainOptions extends AudioNodeOptions {
    gain?: number;
}
export interface GamepadEventInit extends EventInit {
    gamepad: Gamepad;
}
export interface GetNotificationOptions {
    tag?: string;
}
export interface GetRootNodeOptions {
    composed?: boolean;
}
export interface HashChangeEventInit extends EventInit {
    newURL?: string;
    oldURL?: string;
}
export interface HkdfParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    info: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
    salt: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
}
export interface HmacImportParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    length?: number;
}
export interface HmacKeyAlgorithm extends KeyAlgorithm {
    hash: KeyAlgorithm;
    length: number;
}
export interface HmacKeyGenParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
    length?: number;
}
export interface IDBIndexParameters {
    multiEntry?: boolean;
    unique?: boolean;
}
export interface IDBObjectStoreParameters {
    autoIncrement?: boolean;
    keyPath?: string | string[] | null;
}
export interface IDBVersionChangeEventInit extends EventInit {
    newVersion?: number | null;
    oldVersion?: number;
}
export interface IIRFilterOptions extends AudioNodeOptions {
    feedback: number[];
    feedforward: number[];
}
export interface ImageBitmapRenderingContextSettings {
    alpha?: boolean;
}
export interface ImageEncodeOptions {
    quality?: number;
    type?: string;
}
export interface InputEventInit extends UIEventInit {
    data?: string | null;
    inputType?: string;
    isComposing?: boolean;
}
export interface IntersectionObserverEntryInit {
    boundingClientRect: DOMRectInit;
    intersectionRatio: number;
    intersectionRect: DOMRectInit;
    isIntersecting: boolean;
    rootBounds: DOMRectInit | null;
    target: Element;
    time: number;
}
export interface IntersectionObserverInit {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}
export interface JsonWebKey {
    alg?: string;
    crv?: string;
    d?: string;
    dp?: string;
    dq?: string;
    e?: string;
    ext?: boolean;
    k?: string;
    key_ops?: string[];
    kty?: string;
    n?: string;
    oth?: RsaOtherPrimesInfo[];
    p?: string;
    q?: string;
    qi?: string;
    use?: string;
    x?: string;
    y?: string;
}
export interface KeyAlgorithm {
    name: string;
}
export interface KeyboardEventInit extends EventModifierInit {
    code?: string;
    isComposing?: boolean;
    key?: string;
    location?: number;
    repeat?: boolean;
}
export interface Keyframe {
    composite?: CompositeOperationOrAuto;
    easing?: string;
    offset?: number | null;
    [property: string]: string | number | null | undefined;
}
export interface KeyframeAnimationOptions extends KeyframeEffectOptions {
    id?: string;
}
export interface KeyframeEffectOptions extends EffectTiming {
    composite?: CompositeOperation;
    iterationComposite?: IterationCompositeOperation;
}
export interface MediaElementAudioSourceOptions {
    mediaElement: HTMLMediaElement;
}
export interface MediaEncryptedEventInit extends EventInit {
    initData?: ArrayBuffer | null;
    initDataType?: string;
}
export interface MediaKeyMessageEventInit extends EventInit {
    message: ArrayBuffer;
    messageType: MediaKeyMessageType;
}
export interface MediaKeySystemConfiguration {
    audioCapabilities?: MediaKeySystemMediaCapability[];
    distinctiveIdentifier?: MediaKeysRequirement;
    initDataTypes?: string[];
    label?: string;
    persistentState?: MediaKeysRequirement;
    sessionTypes?: string[];
    videoCapabilities?: MediaKeySystemMediaCapability[];
}
export interface MediaKeySystemMediaCapability {
    contentType?: string;
    robustness?: string;
}
export interface MediaQueryListEventInit extends EventInit {
    matches?: boolean;
    media?: string;
}
export interface MediaStreamAudioSourceOptions {
    mediaStream: MediaStream;
}
export interface MediaStreamConstraints {
    audio?: boolean | MediaTrackConstraints;
    peerIdentity?: string;
    video?: boolean | MediaTrackConstraints;
}
export interface MediaStreamErrorEventInit extends EventInit {
    error?: MediaStreamError | null;
}
export interface MediaStreamEventInit extends EventInit {
    stream?: MediaStream;
}
export interface MediaStreamTrackAudioSourceOptions {
    mediaStreamTrack: MediaStreamTrack;
}
export interface MediaStreamTrackEventInit extends EventInit {
    track: MediaStreamTrack;
}
export interface MediaTrackCapabilities {
    aspectRatio?: DoubleRange;
    autoGainControl?: boolean[];
    channelCount?: ULongRange;
    deviceId?: string;
    echoCancellation?: boolean[];
    facingMode?: string[];
    frameRate?: DoubleRange;
    groupId?: string;
    height?: ULongRange;
    latency?: DoubleRange;
    noiseSuppression?: boolean[];
    resizeMode?: string[];
    sampleRate?: ULongRange;
    sampleSize?: ULongRange;
    width?: ULongRange;
}
export interface MediaTrackConstraintSet {
    aspectRatio?: ConstrainDouble;
    autoGainControl?: ConstrainBoolean;
    channelCount?: ConstrainULong;
    deviceId?: ConstrainDOMString;
    echoCancellation?: ConstrainBoolean;
    facingMode?: ConstrainDOMString;
    frameRate?: ConstrainDouble;
    groupId?: ConstrainDOMString;
    height?: ConstrainULong;
    latency?: ConstrainDouble;
    noiseSuppression?: ConstrainBoolean;
    resizeMode?: ConstrainDOMString;
    sampleRate?: ConstrainULong;
    sampleSize?: ConstrainULong;
    width?: ConstrainULong;
}
export interface MediaTrackConstraints extends MediaTrackConstraintSet {
    advanced?: MediaTrackConstraintSet[];
}
export interface MediaTrackSettings {
    aspectRatio?: number;
    autoGainControl?: boolean;
    channelCount?: number;
    deviceId?: string;
    echoCancellation?: boolean;
    facingMode?: string;
    frameRate?: number;
    groupId?: string;
    height?: number;
    latency?: number;
    noiseSuppression?: boolean;
    resizeMode?: string;
    sampleRate?: number;
    sampleSize?: number;
    width?: number;
}
export interface MediaTrackSupportedConstraints {
    aspectRatio?: boolean;
    autoGainControl?: boolean;
    channelCount?: boolean;
    deviceId?: boolean;
    echoCancellation?: boolean;
    facingMode?: boolean;
    frameRate?: boolean;
    groupId?: boolean;
    height?: boolean;
    latency?: boolean;
    noiseSuppression?: boolean;
    resizeMode?: boolean;
    sampleRate?: boolean;
    sampleSize?: boolean;
    width?: boolean;
}
export interface MessageEventInit extends EventInit {
    data?: any;
    lastEventId?: string;
    origin?: string;
    ports?: MessagePort[];
    source?: MessageEventSource | null;
}
export interface MidiPermissionDescriptor extends PermissionDescriptor {
    name: "midi";
    sysex?: boolean;
}
export interface MouseEventInit extends EventModifierInit {
    button?: number;
    buttons?: number;
    clientX?: number;
    clientY?: number;
    movementX?: number;
    movementY?: number;
    relatedTarget?: EventTarget | null;
    screenX?: number;
    screenY?: number;
}
export interface MultiCacheQueryOptions extends CacheQueryOptions {
    cacheName?: string;
}
export interface MutationObserverInit {
    /**
     * Set to a list of attribute local names (without namespace) if not all attribute mutations need to be observed and attributes is true or omitted.
     */
    attributeFilter?: string[];
    /**
     * Set to true if attributes is true or omitted and target's attribute value before the mutation needs to be recorded.
     */
    attributeOldValue?: boolean;
    /**
     * Set to true if mutations to target's attributes are to be observed. Can be omitted if attributeOldValue or attributeFilter is specified.
     */
    attributes?: boolean;
    /**
     * Set to true if mutations to target's data are to be observed. Can be omitted if characterDataOldValue is specified.
     */
    characterData?: boolean;
    /**
     * Set to true if characterData is set to true or omitted and target's data before the mutation needs to be recorded.
     */
    characterDataOldValue?: boolean;
    /**
     * Set to true if mutations to target's children are to be observed.
     */
    childList?: boolean;
    /**
     * Set to true if mutations to not just target, but also target's descendants are to be observed.
     */
    subtree?: boolean;
}
export interface NavigationPreloadState {
    enabled?: boolean;
    headerValue?: string;
}
export interface NotificationAction {
    action: string;
    icon?: string;
    title: string;
}
export interface NotificationOptions {
    actions?: NotificationAction[];
    badge?: string;
    body?: string;
    data?: any;
    dir?: NotificationDirection;
    icon?: string;
    image?: string;
    lang?: string;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    tag?: string;
    timestamp?: number;
    vibrate?: VibratePattern;
}
export interface OfflineAudioCompletionEventInit extends EventInit {
    renderedBuffer: AudioBuffer;
}
export interface OfflineAudioContextOptions {
    length: number;
    numberOfChannels?: number;
    sampleRate: number;
}
export interface OptionalEffectTiming {
    delay?: number;
    direction?: PlaybackDirection;
    duration?: number | string;
    easing?: string;
    endDelay?: number;
    fill?: FillMode;
    iterationStart?: number;
    iterations?: number;
}
export interface OscillatorOptions extends AudioNodeOptions {
    detune?: number;
    frequency?: number;
    periodicWave?: PeriodicWave;
    type?: OscillatorType;
}
export interface PageTransitionEventInit extends EventInit {
    persisted?: boolean;
}
export interface PannerOptions extends AudioNodeOptions {
    coneInnerAngle?: number;
    coneOuterAngle?: number;
    coneOuterGain?: number;
    distanceModel?: DistanceModelType;
    maxDistance?: number;
    orientationX?: number;
    orientationY?: number;
    orientationZ?: number;
    panningModel?: PanningModelType;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    refDistance?: number;
    rolloffFactor?: number;
}
export interface PaymentCurrencyAmount {
    currency: string;
    currencySystem?: string;
    value: string;
}
export interface PaymentDetailsBase {
    displayItems?: PaymentItem[];
    modifiers?: PaymentDetailsModifier[];
    shippingOptions?: PaymentShippingOption[];
}
export interface PaymentDetailsInit extends PaymentDetailsBase {
    id?: string;
    total: PaymentItem;
}
export interface PaymentDetailsModifier {
    additionalDisplayItems?: PaymentItem[];
    data?: any;
    supportedMethods: string | string[];
    total?: PaymentItem;
}
export interface PaymentDetailsUpdate extends PaymentDetailsBase {
    error?: string;
    total?: PaymentItem;
}
export interface PaymentItem {
    amount: PaymentCurrencyAmount;
    label: string;
    pending?: boolean;
}
export interface PaymentMethodData {
    data?: any;
    supportedMethods: string | string[];
}
export interface PaymentOptions {
    requestPayerEmail?: boolean;
    requestPayerName?: boolean;
    requestPayerPhone?: boolean;
    requestShipping?: boolean;
    shippingType?: string;
}
export interface PaymentRequestUpdateEventInit extends EventInit {
}
export interface PaymentShippingOption {
    amount: PaymentCurrencyAmount;
    id: string;
    label: string;
    selected?: boolean;
}
export interface Pbkdf2Params extends Algorithm {
    hash: HashAlgorithmIdentifier;
    iterations: number;
    salt: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
}
export interface PerformanceObserverInit {
    buffered?: boolean;
    entryTypes?: string[];
    type?: string;
}
export interface PeriodicWaveConstraints {
    disableNormalization?: boolean;
}
export interface PeriodicWaveOptions extends PeriodicWaveConstraints {
    imag?: number[] | Float32Array;
    real?: number[] | Float32Array;
}
export interface PermissionDescriptor {
    name: PermissionName;
}
export interface PipeOptions {
    preventAbort?: boolean;
    preventCancel?: boolean;
    preventClose?: boolean;
    signal?: AbortSignal;
}
export interface PointerEventInit extends MouseEventInit {
    height?: number;
    isPrimary?: boolean;
    pointerId?: number;
    pointerType?: string;
    pressure?: number;
    tangentialPressure?: number;
    tiltX?: number;
    tiltY?: number;
    twist?: number;
    width?: number;
}
export interface PopStateEventInit extends EventInit {
    state?: any;
}
export interface PositionOptions {
    enableHighAccuracy?: boolean;
    maximumAge?: number;
    timeout?: number;
}
export interface PostMessageOptions {
    transfer?: any[];
}
export interface ProgressEventInit extends EventInit {
    lengthComputable?: boolean;
    loaded?: number;
    total?: number;
}
export interface PromiseRejectionEventInit extends EventInit {
    promise: Promise<any>;
    reason?: any;
}
export interface PropertyIndexedKeyframes {
    composite?: CompositeOperationOrAuto | CompositeOperationOrAuto[];
    easing?: string | string[];
    offset?: number | (number | null)[];
    [property: string]: string | string[] | number | null | (number | null)[] | undefined;
}
export interface PublicKeyCredentialCreationOptions {
    attestation?: AttestationConveyancePreference;
    authenticatorSelection?: AuthenticatorSelectionCriteria;
    challenge: BufferSource;
    excludeCredentials?: PublicKeyCredentialDescriptor[];
    extensions?: AuthenticationExtensionsClientInputs;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    rp: PublicKeyCredentialRpEntity;
    timeout?: number;
    user: PublicKeyCredentialUserEntity;
}
export interface PublicKeyCredentialDescriptor {
    id: BufferSource;
    transports?: AuthenticatorTransport[];
    type: PublicKeyCredentialType;
}
export interface PublicKeyCredentialEntity {
    icon?: string;
    name: string;
}
export interface PublicKeyCredentialParameters {
    alg: COSEAlgorithmIdentifier;
    type: PublicKeyCredentialType;
}
export interface PublicKeyCredentialRequestOptions {
    allowCredentials?: PublicKeyCredentialDescriptor[];
    challenge: BufferSource;
    extensions?: AuthenticationExtensionsClientInputs;
    rpId?: string;
    timeout?: number;
    userVerification?: UserVerificationRequirement;
}
export interface PublicKeyCredentialRpEntity extends PublicKeyCredentialEntity {
    id?: string;
}
export interface PublicKeyCredentialUserEntity extends PublicKeyCredentialEntity {
    displayName: string;
    id: BufferSource;
}
export interface PushPermissionDescriptor extends PermissionDescriptor {
    name: "push";
    userVisibleOnly?: boolean;
}
export interface PushSubscriptionJSON {
    endpoint?: string;
    expirationTime?: number | null;
    keys?: Record<string, string>;
}
export interface PushSubscriptionOptionsInit {
    applicationServerKey?: BufferSource | string | null;
    userVisibleOnly?: boolean;
}
export interface QueuingStrategy<T = any> {
    highWaterMark?: number;
    size?: QueuingStrategySizeCallback<T>;
}
export interface RTCAnswerOptions extends RTCOfferAnswerOptions {
}
export interface RTCCertificateExpiration {
    expires?: number;
}
export interface RTCConfiguration {
    bundlePolicy?: RTCBundlePolicy;
    certificates?: RTCCertificate[];
    iceCandidatePoolSize?: number;
    iceServers?: RTCIceServer[];
    iceTransportPolicy?: RTCIceTransportPolicy;
    peerIdentity?: string;
    rtcpMuxPolicy?: RTCRtcpMuxPolicy;
}
export interface RTCDTMFToneChangeEventInit extends EventInit {
    tone: string;
}
export interface RTCDataChannelEventInit extends EventInit {
    channel: RTCDataChannel;
}
export interface RTCDataChannelInit {
    id?: number;
    maxPacketLifeTime?: number;
    maxRetransmits?: number;
    negotiated?: boolean;
    ordered?: boolean;
    priority?: RTCPriorityType;
    protocol?: string;
}
export interface RTCDtlsFingerprint {
    algorithm?: string;
    value?: string;
}
export interface RTCDtlsParameters {
    fingerprints?: RTCDtlsFingerprint[];
    role?: RTCDtlsRole;
}
export interface RTCErrorEventInit extends EventInit {
    error: RTCError;
}
export interface RTCErrorInit {
    errorDetail: RTCErrorDetailType;
    httpRequestStatusCode?: number;
    receivedAlert?: number;
    sctpCauseCode?: number;
    sdpLineNumber?: number;
    sentAlert?: number;
}
export interface RTCIceCandidateAttributes extends RTCStats {
    addressSourceUrl?: string;
    candidateType?: RTCStatsIceCandidateType;
    ipAddress?: string;
    portNumber?: number;
    priority?: number;
    transport?: string;
}
export interface RTCIceCandidateComplete {
}
export interface RTCIceCandidateDictionary {
    foundation?: string;
    ip?: string;
    msMTurnSessionId?: string;
    port?: number;
    priority?: number;
    protocol?: RTCIceProtocol;
    relatedAddress?: string;
    relatedPort?: number;
    tcpType?: RTCIceTcpCandidateType;
    type?: RTCIceCandidateType;
}
export interface RTCIceCandidateInit {
    candidate?: string;
    sdpMLineIndex?: number | null;
    sdpMid?: string | null;
    usernameFragment?: string | null;
}
export interface RTCIceCandidatePair {
    local?: RTCIceCandidate;
    remote?: RTCIceCandidate;
}
export interface RTCIceCandidatePairStats extends RTCStats {
    availableIncomingBitrate?: number;
    availableOutgoingBitrate?: number;
    bytesReceived?: number;
    bytesSent?: number;
    localCandidateId?: string;
    nominated?: boolean;
    priority?: number;
    readable?: boolean;
    remoteCandidateId?: string;
    roundTripTime?: number;
    state?: RTCStatsIceCandidatePairState;
    transportId?: string;
    writable?: boolean;
}
export interface RTCIceGatherOptions {
    gatherPolicy?: RTCIceGatherPolicy;
    iceservers?: RTCIceServer[];
}
export interface RTCIceParameters {
    password?: string;
    usernameFragment?: string;
}
export interface RTCIceServer {
    credential?: string | RTCOAuthCredential;
    credentialType?: RTCIceCredentialType;
    urls: string | string[];
    username?: string;
}
export interface RTCIdentityProviderOptions {
    peerIdentity?: string;
    protocol?: string;
    usernameHint?: string;
}
export interface RTCInboundRTPStreamStats extends RTCRTPStreamStats {
    bytesReceived?: number;
    fractionLost?: number;
    jitter?: number;
    packetsLost?: number;
    packetsReceived?: number;
}
export interface RTCMediaStreamTrackStats extends RTCStats {
    audioLevel?: number;
    echoReturnLoss?: number;
    echoReturnLossEnhancement?: number;
    frameHeight?: number;
    frameWidth?: number;
    framesCorrupted?: number;
    framesDecoded?: number;
    framesDropped?: number;
    framesPerSecond?: number;
    framesReceived?: number;
    framesSent?: number;
    remoteSource?: boolean;
    ssrcIds?: string[];
    trackIdentifier?: string;
}
export interface RTCOAuthCredential {
    accessToken: string;
    macKey: string;
}
export interface RTCOfferAnswerOptions {
    voiceActivityDetection?: boolean;
}
export interface RTCOfferOptions extends RTCOfferAnswerOptions {
    iceRestart?: boolean;
    offerToReceiveAudio?: boolean;
    offerToReceiveVideo?: boolean;
}
export interface RTCOutboundRTPStreamStats extends RTCRTPStreamStats {
    bytesSent?: number;
    packetsSent?: number;
    roundTripTime?: number;
    targetBitrate?: number;
}
export interface RTCPeerConnectionIceErrorEventInit extends EventInit {
    errorCode: number;
    hostCandidate?: string;
    statusText?: string;
    url?: string;
}
export interface RTCPeerConnectionIceEventInit extends EventInit {
    candidate?: RTCIceCandidate | null;
    url?: string | null;
}
export interface RTCRTPStreamStats extends RTCStats {
    associateStatsId?: string;
    codecId?: string;
    firCount?: number;
    isRemote?: boolean;
    mediaTrackId?: string;
    mediaType?: string;
    nackCount?: number;
    pliCount?: number;
    sliCount?: number;
    ssrc?: string;
    transportId?: string;
}
export interface RTCRtcpFeedback {
    parameter?: string;
    type?: string;
}
export interface RTCRtcpParameters {
    cname?: string;
    reducedSize?: boolean;
}
export interface RTCRtpCapabilities {
    codecs: RTCRtpCodecCapability[];
    headerExtensions: RTCRtpHeaderExtensionCapability[];
}
export interface RTCRtpCodecCapability {
    channels?: number;
    clockRate: number;
    mimeType: string;
    sdpFmtpLine?: string;
}
export interface RTCRtpCodecParameters {
    channels?: number;
    clockRate: number;
    mimeType: string;
    payloadType: number;
    sdpFmtpLine?: string;
}
export interface RTCRtpCodingParameters {
    rid?: string;
}
export interface RTCRtpContributingSource {
    audioLevel?: number;
    rtpTimestamp: number;
    source: number;
    timestamp: number;
}
export interface RTCRtpDecodingParameters extends RTCRtpCodingParameters {
}
export interface RTCRtpEncodingParameters extends RTCRtpCodingParameters {
    active?: boolean;
    codecPayloadType?: number;
    dtx?: RTCDtxStatus;
    maxBitrate?: number;
    maxFramerate?: number;
    ptime?: number;
    scaleResolutionDownBy?: number;
}
export interface RTCRtpFecParameters {
    mechanism?: string;
    ssrc?: number;
}
export interface RTCRtpHeaderExtension {
    kind?: string;
    preferredEncrypt?: boolean;
    preferredId?: number;
    uri?: string;
}
export interface RTCRtpHeaderExtensionCapability {
    uri?: string;
}
export interface RTCRtpHeaderExtensionParameters {
    encrypted?: boolean;
    id: number;
    uri: string;
}
export interface RTCRtpParameters {
    codecs: RTCRtpCodecParameters[];
    headerExtensions: RTCRtpHeaderExtensionParameters[];
    rtcp: RTCRtcpParameters;
}
export interface RTCRtpReceiveParameters extends RTCRtpParameters {
    encodings: RTCRtpDecodingParameters[];
}
export interface RTCRtpRtxParameters {
    ssrc?: number;
}
export interface RTCRtpSendParameters extends RTCRtpParameters {
    degradationPreference?: RTCDegradationPreference;
    encodings: RTCRtpEncodingParameters[];
    priority?: RTCPriorityType;
    transactionId: string;
}
export interface RTCRtpSynchronizationSource extends RTCRtpContributingSource {
    voiceActivityFlag?: boolean;
}
export interface RTCRtpTransceiverInit {
    direction?: RTCRtpTransceiverDirection;
    sendEncodings?: RTCRtpEncodingParameters[];
    streams?: MediaStream[];
}
export interface RTCRtpUnhandled {
    muxId?: string;
    payloadType?: number;
    ssrc?: number;
}
export interface RTCSessionDescriptionInit {
    sdp?: string;
    type?: RTCSdpType;
}
export interface RTCSrtpKeyParam {
    keyMethod?: string;
    keySalt?: string;
    lifetime?: string;
    mkiLength?: number;
    mkiValue?: number;
}
export interface RTCSrtpSdesParameters {
    cryptoSuite?: string;
    keyParams?: RTCSrtpKeyParam[];
    sessionParams?: string[];
    tag?: number;
}
export interface RTCSsrcRange {
    max?: number;
    min?: number;
}
export interface RTCStats {
    id: string;
    timestamp: number;
    type: RTCStatsType;
}
export interface RTCStatsEventInit extends EventInit {
    report: RTCStatsReport;
}
export interface RTCStatsReport {
}
export interface RTCTrackEventInit extends EventInit {
    receiver: RTCRtpReceiver;
    streams?: MediaStream[];
    track: MediaStreamTrack;
    transceiver: RTCRtpTransceiver;
}
export interface RTCTransportStats extends RTCStats {
    activeConnection?: boolean;
    bytesReceived?: number;
    bytesSent?: number;
    localCertificateId?: string;
    remoteCertificateId?: string;
    rtcpTransportStatsId?: string;
    selectedCandidatePairId?: string;
}
export interface ReadableStreamReadDoneResult<T> {
    done: true;
    value?: T;
}
export interface ReadableStreamReadValueResult<T> {
    done: false;
    value: T;
}
export interface RegistrationOptions {
    scope?: string;
    type?: WorkerType;
    updateViaCache?: ServiceWorkerUpdateViaCache;
}
export interface RequestInit {
    /**
     * A BodyInit object or null to set request's body.
     */
    body?: BodyInit | null;
    /**
     * A string indicating how the request will interact with the browser's cache to set request's cache.
     */
    cache?: RequestCache;
    /**
     * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.
     */
    credentials?: RequestCredentials;
    /**
     * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
     */
    headers?: HeadersInit;
    /**
     * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
     */
    integrity?: string;
    /**
     * A boolean to set request's keepalive.
     */
    keepalive?: boolean;
    /**
     * A string to set request's method.
     */
    method?: string;
    /**
     * A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
     */
    mode?: RequestMode;
    /**
     * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
     */
    redirect?: RequestRedirect;
    /**
     * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
     */
    referrer?: string;
    /**
     * A referrer policy to set request's referrerPolicy.
     */
    referrerPolicy?: ReferrerPolicy;
    /**
     * An AbortSignal to set request's signal.
     */
    signal?: AbortSignal | null;
    /**
     * Can only be null. Used to disassociate request from any Window.
     */
    window?: any;
}
export interface ResponseInit {
    headers?: HeadersInit;
    status?: number;
    statusText?: string;
}
export interface RsaHashedImportParams extends Algorithm {
    hash: HashAlgorithmIdentifier;
}
export interface RsaHashedKeyAlgorithm extends RsaKeyAlgorithm {
    hash: KeyAlgorithm;
}
export interface RsaHashedKeyGenParams extends RsaKeyGenParams {
    hash: HashAlgorithmIdentifier;
}
export interface RsaKeyAlgorithm extends KeyAlgorithm {
    modulusLength: number;
    publicExponent: BigInteger;
}
export interface RsaKeyGenParams extends Algorithm {
    modulusLength: number;
    publicExponent: BigInteger;
}
export interface RsaOaepParams extends Algorithm {
    label?: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
}
export interface RsaOtherPrimesInfo {
    d?: string;
    r?: string;
    t?: string;
}
export interface RsaPssParams extends Algorithm {
    saltLength: number;
}
export interface SVGBoundingBoxOptions {
    clipped?: boolean;
    fill?: boolean;
    markers?: boolean;
    stroke?: boolean;
}
export interface ScopedCredentialDescriptor {
    id: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | null;
    transports?: Transport[];
    type: ScopedCredentialType;
}
export interface ScopedCredentialOptions {
    excludeList?: ScopedCredentialDescriptor[];
    extensions?: WebAuthnExtensions;
    rpId?: string;
    timeoutSeconds?: number;
}
export interface ScopedCredentialParameters {
    algorithm: string | Algorithm;
    type: ScopedCredentialType;
}
export interface ScrollIntoViewOptions extends ScrollOptions {
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
}
export interface ScrollOptions {
    behavior?: ScrollBehavior;
}
export interface ScrollToOptions extends ScrollOptions {
    left?: number;
    top?: number;
}
export interface SecurityPolicyViolationEventInit extends EventInit {
    blockedURI?: string;
    columnNumber?: number;
    documentURI?: string;
    effectiveDirective?: string;
    lineNumber?: number;
    originalPolicy?: string;
    referrer?: string;
    sourceFile?: string;
    statusCode?: number;
    violatedDirective?: string;
}
export interface ServiceWorkerMessageEventInit extends EventInit {
    data?: any;
    lastEventId?: string;
    origin?: string;
    ports?: MessagePort[] | null;
    source?: ServiceWorker | MessagePort | null;
}
export interface ShadowRootInit {
    delegatesFocus?: boolean;
    mode: ShadowRootMode;
}
export interface SpeechSynthesisErrorEventInit extends SpeechSynthesisEventInit {
    error: SpeechSynthesisErrorCode;
}
export interface SpeechSynthesisEventInit extends EventInit {
    charIndex?: number;
    charLength?: number;
    elapsedTime?: number;
    name?: string;
    utterance: SpeechSynthesisUtterance;
}
export interface StaticRangeInit {
    endContainer: Node;
    endOffset: number;
    startContainer: Node;
    startOffset: number;
}
export interface StereoPannerOptions extends AudioNodeOptions {
    pan?: number;
}
export interface StorageEstimate {
    quota?: number;
    usage?: number;
}
export interface StorageEventInit extends EventInit {
    key?: string | null;
    newValue?: string | null;
    oldValue?: string | null;
    storageArea?: Storage | null;
    url?: string;
}
export interface StoreExceptionsInformation extends ExceptionInformation {
    detailURI?: string | null;
    explanationString?: string | null;
    siteName?: string | null;
}
export interface StoreSiteSpecificExceptionsInformation extends StoreExceptionsInformation {
    arrayOfDomainStrings?: string[];
}
export interface TextDecodeOptions {
    stream?: boolean;
}
export interface TextDecoderOptions {
    fatal?: boolean;
    ignoreBOM?: boolean;
}
export interface TextEncoderEncodeIntoResult {
    read?: number;
    written?: number;
}
export interface TouchEventInit extends EventModifierInit {
    changedTouches?: Touch[];
    targetTouches?: Touch[];
    touches?: Touch[];
}
export interface TouchInit {
    altitudeAngle?: number;
    azimuthAngle?: number;
    clientX?: number;
    clientY?: number;
    force?: number;
    identifier: number;
    pageX?: number;
    pageY?: number;
    radiusX?: number;
    radiusY?: number;
    rotationAngle?: number;
    screenX?: number;
    screenY?: number;
    target: EventTarget;
    touchType?: TouchType;
}
export interface TrackEventInit extends EventInit {
    track?: VideoTrack | AudioTrack | TextTrack | null;
}
export interface Transformer<I = any, O = any> {
    flush?: TransformStreamDefaultControllerCallback<O>;
    readableType?: undefined;
    start?: TransformStreamDefaultControllerCallback<O>;
    transform?: TransformStreamDefaultControllerTransformCallback<I, O>;
    writableType?: undefined;
}
export interface TransitionEventInit extends EventInit {
    elapsedTime?: number;
    propertyName?: string;
    pseudoElement?: string;
}
export interface UIEventInit extends EventInit {
    detail?: number;
    view?: Window | null;
}
export interface ULongRange {
    max?: number;
    min?: number;
}
export interface UnderlyingByteSource {
    autoAllocateChunkSize?: number;
    cancel?: ReadableStreamErrorCallback;
    pull?: ReadableByteStreamControllerCallback;
    start?: ReadableByteStreamControllerCallback;
    type: "bytes";
}
export interface UnderlyingSink<W = any> {
    abort?: WritableStreamErrorCallback;
    close?: WritableStreamDefaultControllerCloseCallback;
    start?: WritableStreamDefaultControllerStartCallback;
    type?: undefined;
    write?: WritableStreamDefaultControllerWriteCallback<W>;
}
export interface UnderlyingSource<R = any> {
    cancel?: ReadableStreamErrorCallback;
    pull?: ReadableStreamDefaultControllerCallback<R>;
    start?: ReadableStreamDefaultControllerCallback<R>;
    type?: undefined;
}
export interface VRDisplayEventInit extends EventInit {
    display: VRDisplay;
    reason?: VRDisplayEventReason;
}
export interface VRLayer {
    leftBounds?: number[] | Float32Array | null;
    rightBounds?: number[] | Float32Array | null;
    source?: HTMLCanvasElement | null;
}
export interface VRStageParameters {
    sittingToStandingTransform?: Float32Array;
    sizeX?: number;
    sizeY?: number;
}
export interface WaveShaperOptions extends AudioNodeOptions {
    curve?: number[] | Float32Array;
    oversample?: OverSampleType;
}
export interface WebAuthnExtensions {
}
export interface WebGLContextAttributes {
    alpha?: boolean;
    antialias?: boolean;
    depth?: boolean;
    desynchronized?: boolean;
    failIfMajorPerformanceCaveat?: boolean;
    powerPreference?: WebGLPowerPreference;
    premultipliedAlpha?: boolean;
    preserveDrawingBuffer?: boolean;
    stencil?: boolean;
}
export interface WebGLContextEventInit extends EventInit {
    statusMessage?: string;
}
export interface WheelEventInit extends MouseEventInit {
    deltaMode?: number;
    deltaX?: number;
    deltaY?: number;
    deltaZ?: number;
}
export interface WorkerOptions {
    credentials?: RequestCredentials;
    name?: string;
    type?: WorkerType;
}
export interface WorkletOptions {
    credentials?: RequestCredentials;
}
export interface txAuthGenericArg {
    content: ArrayBuffer;
    contentType: string;
}
export interface EventListener {
    (evt: Event): void;
}
export declare type XPathNSResolver = ((prefix: string | null) => string | null) | {
    lookupNamespaceURI(prefix: string | null): string | null;
};
/** The ANGLE_instanced_arrays extension is part of the WebGL API and allows to draw the same object, or groups of similar objects multiple times, if they share the same vertex data, primitive count and type. */
export interface ANGLE_instanced_arrays {
    drawArraysInstancedANGLE(mode: GLenum, first: GLint, count: GLsizei, primcount: GLsizei): void;
    drawElementsInstancedANGLE(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, primcount: GLsizei): void;
    vertexAttribDivisorANGLE(index: GLuint, divisor: GLuint): void;
    readonly VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: GLenum;
}
/** A controller object that allows you to abort one or more DOM requests as and when desired. */
export interface AbortController {
    /**
     * Returns the AbortSignal object associated with this object.
     */
    readonly signal: AbortSignal;
    /**
     * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.
     */
    abort(): void;
}
export interface AbortSignalEventMap {
    "abort": Event;
}
/** A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object. */
export interface AbortSignal extends EventTarget {
    /**
     * Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise.
     */
    readonly aborted: boolean;
    onabort: ((this: AbortSignal, ev: Event) => any) | null;
    addEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface AbstractRange {
    /**
     * Returns true if range is collapsed, and false otherwise.
     */
    readonly collapsed: boolean;
    /**
     * Returns range's end node.
     */
    readonly endContainer: Node;
    /**
     * Returns range's end offset.
     */
    readonly endOffset: number;
    /**
     * Returns range's start node.
     */
    readonly startContainer: Node;
    /**
     * Returns range's start offset.
     */
    readonly startOffset: number;
}
export interface AbstractWorkerEventMap {
    "error": ErrorEvent;
}
export interface AbstractWorker {
    onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null;
    addEventListener<K extends keyof AbstractWorkerEventMap>(type: K, listener: (this: AbstractWorker, ev: AbstractWorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AbstractWorkerEventMap>(type: K, listener: (this: AbstractWorker, ev: AbstractWorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface AesCfbParams extends Algorithm {
    iv: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
}
export interface AesCmacParams extends Algorithm {
    length: number;
}
/** A node able to provide real-time frequency and time-domain analysis information. It is an AudioNode that passes the audio stream unchanged from the input to the output, but allows you to take the generated data, process it, and create audio visualizations. */
export interface AnalyserNode extends AudioNode {
    fftSize: number;
    readonly frequencyBinCount: number;
    maxDecibels: number;
    minDecibels: number;
    smoothingTimeConstant: number;
    getByteFrequencyData(array: Uint8Array): void;
    getByteTimeDomainData(array: Uint8Array): void;
    getFloatFrequencyData(array: Float32Array): void;
    getFloatTimeDomainData(array: Float32Array): void;
}
export interface Animatable {
    animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
    getAnimations(): Animation[];
}
export interface AnimationEventMap {
    "cancel": AnimationPlaybackEvent;
    "finish": AnimationPlaybackEvent;
}
export interface Animation extends EventTarget {
    currentTime: number | null;
    effect: AnimationEffect | null;
    readonly finished: Promise<Animation>;
    id: string;
    oncancel: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null;
    onfinish: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null;
    readonly pending: boolean;
    readonly playState: AnimationPlayState;
    playbackRate: number;
    readonly ready: Promise<Animation>;
    startTime: number | null;
    timeline: AnimationTimeline | null;
    cancel(): void;
    finish(): void;
    pause(): void;
    play(): void;
    reverse(): void;
    updatePlaybackRate(playbackRate: number): void;
    addEventListener<K extends keyof AnimationEventMap>(type: K, listener: (this: Animation, ev: AnimationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AnimationEventMap>(type: K, listener: (this: Animation, ev: AnimationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface AnimationEffect {
    getComputedTiming(): ComputedEffectTiming;
    getTiming(): EffectTiming;
    updateTiming(timing?: OptionalEffectTiming): void;
}
/** Events providing information related to animations. */
export interface AnimationEvent extends Event {
    readonly animationName: string;
    readonly elapsedTime: number;
    readonly pseudoElement: string;
}
export interface AnimationFrameProvider {
    cancelAnimationFrame(handle: number): void;
    requestAnimationFrame(callback: FrameRequestCallback): number;
}
export interface AnimationPlaybackEvent extends Event {
    readonly currentTime: number | null;
    readonly timelineTime: number | null;
}
export interface AnimationTimeline {
    readonly currentTime: number | null;
}
export interface ApplicationCacheEventMap {
    "cached": Event;
    "checking": Event;
    "downloading": Event;
    "error": Event;
    "noupdate": Event;
    "obsolete": Event;
    "progress": ProgressEvent<ApplicationCache>;
    "updateready": Event;
}
export interface ApplicationCache extends EventTarget {
    /** @deprecated */
    oncached: ((this: ApplicationCache, ev: Event) => any) | null;
    /** @deprecated */
    onchecking: ((this: ApplicationCache, ev: Event) => any) | null;
    /** @deprecated */
    ondownloading: ((this: ApplicationCache, ev: Event) => any) | null;
    /** @deprecated */
    onerror: ((this: ApplicationCache, ev: Event) => any) | null;
    /** @deprecated */
    onnoupdate: ((this: ApplicationCache, ev: Event) => any) | null;
    /** @deprecated */
    onobsolete: ((this: ApplicationCache, ev: Event) => any) | null;
    /** @deprecated */
    onprogress: ((this: ApplicationCache, ev: ProgressEvent<ApplicationCache>) => any) | null;
    /** @deprecated */
    onupdateready: ((this: ApplicationCache, ev: Event) => any) | null;
    /** @deprecated */
    readonly status: number;
    /** @deprecated */
    abort(): void;
    /** @deprecated */
    swapCache(): void;
    /** @deprecated */
    update(): void;
    readonly CHECKING: number;
    readonly DOWNLOADING: number;
    readonly IDLE: number;
    readonly OBSOLETE: number;
    readonly UNCACHED: number;
    readonly UPDATEREADY: number;
    addEventListener<K extends keyof ApplicationCacheEventMap>(type: K, listener: (this: ApplicationCache, ev: ApplicationCacheEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ApplicationCacheEventMap>(type: K, listener: (this: ApplicationCache, ev: ApplicationCacheEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A DOM element's attribute as an object. In most DOM methods, you will probably directly retrieve the attribute as a string (e.g., Element.getAttribute(), but certain functions (e.g., Element.getAttributeNode()) or means of iterating give Attr types. */
export interface Attr extends Node {
    readonly localName: string;
    readonly name: string;
    readonly namespaceURI: string | null;
    readonly ownerElement: Element | null;
    readonly prefix: string | null;
    readonly specified: boolean;
    value: string;
}
/** A short audio asset residing in memory, created from an audio file using the AudioContext.decodeAudioData() method, or from raw data using AudioContext.createBuffer(). Once put into an AudioBuffer, the audio can then be played by being passed into an AudioBufferSourceNode. */
export interface AudioBuffer {
    readonly duration: number;
    readonly length: number;
    readonly numberOfChannels: number;
    readonly sampleRate: number;
    copyFromChannel(destination: Float32Array, channelNumber: number, bufferOffset?: number): void;
    copyToChannel(source: Float32Array, channelNumber: number, bufferOffset?: number): void;
    getChannelData(channel: number): Float32Array;
}
/** An AudioScheduledSourceNode which represents an audio source consisting of in-memory audio data, stored in an AudioBuffer. It's especially useful for playing back audio which has particularly stringent timing accuracy requirements, such as for sounds that must match a specific rhythm and can be kept in memory rather than being played from disk or the network. */
export interface AudioBufferSourceNode extends AudioScheduledSourceNode {
    buffer: AudioBuffer | null;
    readonly detune: AudioParam;
    loop: boolean;
    loopEnd: number;
    loopStart: number;
    readonly playbackRate: AudioParam;
    start(when?: number, offset?: number, duration?: number): void;
    addEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: AudioBufferSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: AudioBufferSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** An audio-processing graph built from audio modules linked together, each represented by an AudioNode. */
export interface AudioContext extends BaseAudioContext {
    readonly baseLatency: number;
    readonly outputLatency: number;
    close(): Promise<void>;
    createMediaElementSource(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode;
    createMediaStreamDestination(): MediaStreamAudioDestinationNode;
    createMediaStreamSource(mediaStream: MediaStream): MediaStreamAudioSourceNode;
    createMediaStreamTrackSource(mediaStreamTrack: MediaStreamTrack): MediaStreamTrackAudioSourceNode;
    getOutputTimestamp(): AudioTimestamp;
    resume(): Promise<void>;
    suspend(): Promise<void>;
    addEventListener<K extends keyof BaseAudioContextEventMap>(type: K, listener: (this: AudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof BaseAudioContextEventMap>(type: K, listener: (this: AudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** AudioDestinationNode has no output (as it is the output, no more AudioNode can be linked after it in the audio graph) and one input. The number of channels in the input must be between 0 and the maxChannelCount value or an exception is raised. */
export interface AudioDestinationNode extends AudioNode {
    readonly maxChannelCount: number;
}
/** The position and orientation of the unique person listening to the audio scene, and is used in audio spatialization. All PannerNodes spatialize in relation to the AudioListener stored in the BaseAudioContext.listener attribute. */
export interface AudioListener {
    readonly forwardX: AudioParam;
    readonly forwardY: AudioParam;
    readonly forwardZ: AudioParam;
    readonly positionX: AudioParam;
    readonly positionY: AudioParam;
    readonly positionZ: AudioParam;
    readonly upX: AudioParam;
    readonly upY: AudioParam;
    readonly upZ: AudioParam;
    /** @deprecated */
    setOrientation(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void;
    /** @deprecated */
    setPosition(x: number, y: number, z: number): void;
}
/** A generic interface for representing an audio processing module. Examples include: */
export interface AudioNode extends EventTarget {
    channelCount: number;
    channelCountMode: ChannelCountMode;
    channelInterpretation: ChannelInterpretation;
    readonly context: BaseAudioContext;
    readonly numberOfInputs: number;
    readonly numberOfOutputs: number;
    connect(destinationNode: AudioNode, output?: number, input?: number): AudioNode;
    connect(destinationParam: AudioParam, output?: number): void;
    disconnect(): void;
    disconnect(output: number): void;
    disconnect(destinationNode: AudioNode): void;
    disconnect(destinationNode: AudioNode, output: number): void;
    disconnect(destinationNode: AudioNode, output: number, input: number): void;
    disconnect(destinationParam: AudioParam): void;
    disconnect(destinationParam: AudioParam, output: number): void;
}
/** The Web Audio API's AudioParam interface represents an audio-related parameter, usually a parameter of an AudioNode (such as GainNode.gain). */
export interface AudioParam {
    automationRate: AutomationRate;
    readonly defaultValue: number;
    readonly maxValue: number;
    readonly minValue: number;
    value: number;
    cancelAndHoldAtTime(cancelTime: number): AudioParam;
    cancelScheduledValues(cancelTime: number): AudioParam;
    exponentialRampToValueAtTime(value: number, endTime: number): AudioParam;
    linearRampToValueAtTime(value: number, endTime: number): AudioParam;
    setTargetAtTime(target: number, startTime: number, timeConstant: number): AudioParam;
    setValueAtTime(value: number, startTime: number): AudioParam;
    setValueCurveAtTime(values: number[] | Float32Array, startTime: number, duration: number): AudioParam;
}
export interface AudioParamMap {
    forEach(callbackfn: (value: AudioParam, key: string, parent: AudioParamMap) => void, thisArg?: any): void;
}
/** The Web Audio API events that occur when a ScriptProcessorNode input buffer is ready to be processed. */
export interface AudioProcessingEvent extends Event {
    readonly inputBuffer: AudioBuffer;
    readonly outputBuffer: AudioBuffer;
    readonly playbackTime: number;
}
export interface AudioScheduledSourceNodeEventMap {
    "ended": Event;
}
export interface AudioScheduledSourceNode extends AudioNode {
    onended: ((this: AudioScheduledSourceNode, ev: Event) => any) | null;
    start(when?: number): void;
    stop(when?: number): void;
    addEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: AudioScheduledSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: AudioScheduledSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A single audio track from one of the HTML media elements, <audio> or <video>.  */
export interface AudioTrack {
    enabled: boolean;
    readonly id: string;
    kind: string;
    readonly label: string;
    language: string;
    readonly sourceBuffer: SourceBuffer | null;
}
export interface AudioTrackListEventMap {
    "addtrack": TrackEvent;
    "change": Event;
    "removetrack": TrackEvent;
}
/** Used to represent a list of the audio tracks contained within a given HTML media element, with each track represented by a separate AudioTrack object in the list. */
export interface AudioTrackList extends EventTarget {
    readonly length: number;
    onaddtrack: ((this: AudioTrackList, ev: TrackEvent) => any) | null;
    onchange: ((this: AudioTrackList, ev: Event) => any) | null;
    onremovetrack: ((this: AudioTrackList, ev: TrackEvent) => any) | null;
    getTrackById(id: string): AudioTrack | null;
    item(index: number): AudioTrack;
    addEventListener<K extends keyof AudioTrackListEventMap>(type: K, listener: (this: AudioTrackList, ev: AudioTrackListEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AudioTrackListEventMap>(type: K, listener: (this: AudioTrackList, ev: AudioTrackListEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    [index: number]: AudioTrack;
}
export interface AudioWorklet extends Worklet {
}
export interface AudioWorkletNodeEventMap {
    "processorerror": Event;
}
export interface AudioWorkletNode extends AudioNode {
    onprocessorerror: ((this: AudioWorkletNode, ev: Event) => any) | null;
    readonly parameters: AudioParamMap;
    readonly port: MessagePort;
    addEventListener<K extends keyof AudioWorkletNodeEventMap>(type: K, listener: (this: AudioWorkletNode, ev: AudioWorkletNodeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AudioWorkletNodeEventMap>(type: K, listener: (this: AudioWorkletNode, ev: AudioWorkletNodeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface AuthenticatorAssertionResponse extends AuthenticatorResponse {
    readonly authenticatorData: ArrayBuffer;
    readonly signature: ArrayBuffer;
    readonly userHandle: ArrayBuffer | null;
}
export interface AuthenticatorAttestationResponse extends AuthenticatorResponse {
    readonly attestationObject: ArrayBuffer;
}
export interface AuthenticatorResponse {
    readonly clientDataJSON: ArrayBuffer;
}
export interface BarProp {
    readonly visible: boolean;
}
export interface BaseAudioContextEventMap {
    "statechange": Event;
}
export interface BaseAudioContext extends EventTarget {
    readonly audioWorklet: AudioWorklet;
    readonly currentTime: number;
    readonly destination: AudioDestinationNode;
    readonly listener: AudioListener;
    onstatechange: ((this: BaseAudioContext, ev: Event) => any) | null;
    readonly sampleRate: number;
    readonly state: AudioContextState;
    createAnalyser(): AnalyserNode;
    createBiquadFilter(): BiquadFilterNode;
    createBuffer(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer;
    createBufferSource(): AudioBufferSourceNode;
    createChannelMerger(numberOfInputs?: number): ChannelMergerNode;
    createChannelSplitter(numberOfOutputs?: number): ChannelSplitterNode;
    createConstantSource(): ConstantSourceNode;
    createConvolver(): ConvolverNode;
    createDelay(maxDelayTime?: number): DelayNode;
    createDynamicsCompressor(): DynamicsCompressorNode;
    createGain(): GainNode;
    createIIRFilter(feedforward: number[], feedback: number[]): IIRFilterNode;
    createOscillator(): OscillatorNode;
    createPanner(): PannerNode;
    createPeriodicWave(real: number[] | Float32Array, imag: number[] | Float32Array, constraints?: PeriodicWaveConstraints): PeriodicWave;
    createScriptProcessor(bufferSize?: number, numberOfInputChannels?: number, numberOfOutputChannels?: number): ScriptProcessorNode;
    createStereoPanner(): StereoPannerNode;
    createWaveShaper(): WaveShaperNode;
    decodeAudioData(audioData: ArrayBuffer, successCallback?: DecodeSuccessCallback | null, errorCallback?: DecodeErrorCallback | null): Promise<AudioBuffer>;
    addEventListener<K extends keyof BaseAudioContextEventMap>(type: K, listener: (this: BaseAudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof BaseAudioContextEventMap>(type: K, listener: (this: BaseAudioContext, ev: BaseAudioContextEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The beforeunload event is fired when the window, the document and its resources are about to be unloaded. */
export interface BeforeUnloadEvent extends Event {
    returnValue: any;
}
export interface BhxBrowser {
    readonly lastError: DOMException;
    checkMatchesGlobExpression(pattern: string, value: string): boolean;
    checkMatchesUriExpression(pattern: string, value: string): boolean;
    clearLastError(): void;
    currentWindowId(): number;
    fireExtensionApiTelemetry(functionName: string, isSucceeded: boolean, isSupported: boolean, errorString: string): void;
    genericFunction(functionId: number, destination: any, parameters?: string, callbackId?: number): void;
    genericSynchronousFunction(functionId: number, parameters?: string): string;
    getExtensionId(): string;
    getThisAddress(): any;
    registerGenericFunctionCallbackHandler(callbackHandler: Function): void;
    registerGenericListenerHandler(eventHandler: Function): void;
    setLastError(parameters: string): void;
    webPlatformGenericFunction(destination: any, parameters?: string, callbackId?: number): void;
}
/** A simple low-order filter, and is created using the AudioContext.createBiquadFilter() method. It is an AudioNode that can represent different kinds of filters, tone control devices, and graphic equalizers. */
export interface BiquadFilterNode extends AudioNode {
    readonly Q: AudioParam;
    readonly detune: AudioParam;
    readonly frequency: AudioParam;
    readonly gain: AudioParam;
    type: BiquadFilterType;
    getFrequencyResponse(frequencyHz: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void;
}
/** A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system. */
export interface Blob {
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    slice(start?: number, end?: number, contentType?: string): Blob;
    stream(): ReadableStream;
    text(): Promise<string>;
}
export interface Body {
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}
export interface BroadcastChannelEventMap {
    "message": MessageEvent;
    "messageerror": MessageEvent;
}
export interface BroadcastChannel extends EventTarget {
    /**
     * Returns the channel name (as passed to the constructor).
     */
    readonly name: string;
    onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
    /**
     * Closes the BroadcastChannel object, opening it up to garbage collection.
     */
    close(): void;
    /**
     * Sends the given message to other BroadcastChannel objects set up for this channel. Messages can be structured objects, e.g. nested objects and arrays.
     */
    postMessage(message: any): void;
    addEventListener<K extends keyof BroadcastChannelEventMap>(type: K, listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof BroadcastChannelEventMap>(type: K, listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** This Streams API interface provides a built-in byte length queuing strategy that can be used when constructing streams. */
export interface ByteLengthQueuingStrategy extends QueuingStrategy<ArrayBufferView> {
    highWaterMark: number;
    size(chunk: ArrayBufferView): number;
}
/** A CDATA section that can be used within XML to include extended portions of unescaped text. The symbols < and & don’t need escaping as they normally do when inside a CDATA section. */
export interface CDATASection extends Text {
}
/** Holds useful CSS-related methods. No object with this interface are implemented: it contains only static methods and therefore is a utilitarian interface. */
export interface CSS {
    escape(value: string): string;
    supports(property: string, value?: string): boolean;
}
/** A single condition CSS at-rule, which consists of a condition and a statement block. It is a child of CSSGroupingRule. */
export interface CSSConditionRule extends CSSGroupingRule {
    conditionText: string;
}
export interface CSSFontFaceRule extends CSSRule {
    readonly style: CSSStyleDeclaration;
}
/** Any CSS at-rule that contains other rules nested within it. */
export interface CSSGroupingRule extends CSSRule {
    readonly cssRules: CSSRuleList;
    deleteRule(index: number): void;
    insertRule(rule: string, index: number): number;
}
export interface CSSImportRule extends CSSRule {
    readonly href: string;
    readonly media: MediaList;
    readonly styleSheet: CSSStyleSheet;
}
/** An object representing a set of style for a given keyframe. It corresponds to the contains of a single keyframe of a @keyframes at-rule. It implements the CSSRule interface with a type value of 8 (CSSRule.KEYFRAME_RULE). */
export interface CSSKeyframeRule extends CSSRule {
    keyText: string;
    readonly style: CSSStyleDeclaration;
}
/** An object representing a complete set of keyframes for a CSS animation. It corresponds to the contains of a whole @keyframes at-rule. It implements the CSSRule interface with a type value of 7 (CSSRule.KEYFRAMES_RULE). */
export interface CSSKeyframesRule extends CSSRule {
    readonly cssRules: CSSRuleList;
    name: string;
    appendRule(rule: string): void;
    deleteRule(select: string): void;
    findRule(select: string): CSSKeyframeRule | null;
}
/** A single CSS @media rule. It implements the CSSConditionRule interface, and therefore the CSSGroupingRule and the CSSRule interface with a type value of 4 (CSSRule.MEDIA_RULE). */
export interface CSSMediaRule extends CSSConditionRule {
    readonly media: MediaList;
}
/** An object representing a single CSS @namespace at-rule. It implements the CSSRule interface, with a type value of 10 (CSSRule.NAMESPACE_RULE). */
export interface CSSNamespaceRule extends CSSRule {
    readonly namespaceURI: string;
    readonly prefix: string;
}
/** CSSPageRule is an interface representing a single CSS @page rule. It implements the CSSRule interface with a type value of 6 (CSSRule.PAGE_RULE). */
export interface CSSPageRule extends CSSRule {
    readonly pseudoClass: string;
    readonly selector: string;
    selectorText: string;
    readonly style: CSSStyleDeclaration;
}
/** A single CSS rule. There are several types of rules, listed in the Type constants section below. */
export interface CSSRule {
    cssText: string;
    readonly parentRule: CSSRule | null;
    readonly parentStyleSheet: CSSStyleSheet | null;
    readonly type: number;
    readonly CHARSET_RULE: number;
    readonly FONT_FACE_RULE: number;
    readonly IMPORT_RULE: number;
    readonly KEYFRAMES_RULE: number;
    readonly KEYFRAME_RULE: number;
    readonly MEDIA_RULE: number;
    readonly NAMESPACE_RULE: number;
    readonly PAGE_RULE: number;
    readonly STYLE_RULE: number;
    readonly SUPPORTS_RULE: number;
    readonly UNKNOWN_RULE: number;
    readonly VIEWPORT_RULE: number;
}
/** A CSSRuleList is an (indirect-modify only) array-like object containing an ordered collection of CSSRule objects. */
export interface CSSRuleList {
    readonly length: number;
    item(index: number): CSSRule | null;
    [index: number]: CSSRule;
}
/** An object that is a CSS declaration block, and exposes style information and various style-related methods and properties. */
export interface CSSStyleDeclaration {
    alignContent: string;
    alignItems: string;
    alignSelf: string;
    alignmentBaseline: string;
    animation: string;
    animationDelay: string;
    animationDirection: string;
    animationDuration: string;
    animationFillMode: string;
    animationIterationCount: string;
    animationName: string;
    animationPlayState: string;
    animationTimingFunction: string;
    backfaceVisibility: string;
    background: string;
    backgroundAttachment: string;
    backgroundClip: string;
    backgroundColor: string;
    backgroundImage: string;
    backgroundOrigin: string;
    backgroundPosition: string;
    backgroundPositionX: string;
    backgroundPositionY: string;
    backgroundRepeat: string;
    backgroundSize: string;
    baselineShift: string;
    blockSize: string;
    border: string;
    borderBlockEnd: string;
    borderBlockEndColor: string;
    borderBlockEndStyle: string;
    borderBlockEndWidth: string;
    borderBlockStart: string;
    borderBlockStartColor: string;
    borderBlockStartStyle: string;
    borderBlockStartWidth: string;
    borderBottom: string;
    borderBottomColor: string;
    borderBottomLeftRadius: string;
    borderBottomRightRadius: string;
    borderBottomStyle: string;
    borderBottomWidth: string;
    borderCollapse: string;
    borderColor: string;
    borderImage: string;
    borderImageOutset: string;
    borderImageRepeat: string;
    borderImageSlice: string;
    borderImageSource: string;
    borderImageWidth: string;
    borderInlineEnd: string;
    borderInlineEndColor: string;
    borderInlineEndStyle: string;
    borderInlineEndWidth: string;
    borderInlineStart: string;
    borderInlineStartColor: string;
    borderInlineStartStyle: string;
    borderInlineStartWidth: string;
    borderLeft: string;
    borderLeftColor: string;
    borderLeftStyle: string;
    borderLeftWidth: string;
    borderRadius: string;
    borderRight: string;
    borderRightColor: string;
    borderRightStyle: string;
    borderRightWidth: string;
    borderSpacing: string;
    borderStyle: string;
    borderTop: string;
    borderTopColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    borderTopStyle: string;
    borderTopWidth: string;
    borderWidth: string;
    bottom: string;
    boxShadow: string;
    boxSizing: string;
    breakAfter: string;
    breakBefore: string;
    breakInside: string;
    captionSide: string;
    caretColor: string;
    clear: string;
    clip: string;
    clipPath: string;
    clipRule: string;
    color: string;
    colorInterpolation: string;
    colorInterpolationFilters: string;
    columnCount: string;
    columnFill: string;
    columnGap: string;
    columnRule: string;
    columnRuleColor: string;
    columnRuleStyle: string;
    columnRuleWidth: string;
    columnSpan: string;
    columnWidth: string;
    columns: string;
    content: string;
    counterIncrement: string;
    counterReset: string;
    cssFloat: string | null;
    cssText: string;
    cursor: string;
    direction: string;
    display: string;
    dominantBaseline: string;
    emptyCells: string;
    enableBackground: string | null;
    fill: string;
    fillOpacity: string;
    fillRule: string;
    filter: string;
    flex: string;
    flexBasis: string;
    flexDirection: string;
    flexFlow: string;
    flexGrow: string;
    flexShrink: string;
    flexWrap: string;
    float: string;
    floodColor: string;
    floodOpacity: string;
    font: string;
    fontFamily: string;
    fontFeatureSettings: string;
    fontKerning: string;
    fontSize: string;
    fontSizeAdjust: string;
    fontStretch: string;
    fontStyle: string;
    fontSynthesis: string;
    fontVariant: string;
    fontVariantCaps: string;
    fontVariantEastAsian: string;
    fontVariantLigatures: string;
    fontVariantNumeric: string;
    fontVariantPosition: string;
    fontWeight: string;
    gap: string;
    glyphOrientationHorizontal: string | null;
    glyphOrientationVertical: string;
    grid: string;
    gridArea: string;
    gridAutoColumns: string;
    gridAutoFlow: string;
    gridAutoRows: string;
    gridColumn: string;
    gridColumnEnd: string;
    gridColumnGap: string;
    gridColumnStart: string;
    gridGap: string;
    gridRow: string;
    gridRowEnd: string;
    gridRowGap: string;
    gridRowStart: string;
    gridTemplate: string;
    gridTemplateAreas: string;
    gridTemplateColumns: string;
    gridTemplateRows: string;
    height: string;
    hyphens: string;
    imageOrientation: string;
    imageRendering: string;
    imeMode: string | null;
    inlineSize: string;
    justifyContent: string;
    justifyItems: string;
    justifySelf: string;
    kerning: string | null;
    layoutGrid: string | null;
    layoutGridChar: string | null;
    layoutGridLine: string | null;
    layoutGridMode: string | null;
    layoutGridType: string | null;
    left: string;
    readonly length: number;
    letterSpacing: string;
    lightingColor: string;
    lineBreak: string;
    lineHeight: string;
    listStyle: string;
    listStyleImage: string;
    listStylePosition: string;
    listStyleType: string;
    margin: string;
    marginBlockEnd: string;
    marginBlockStart: string;
    marginBottom: string;
    marginInlineEnd: string;
    marginInlineStart: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
    marker: string;
    markerEnd: string;
    markerMid: string;
    markerStart: string;
    mask: string;
    maskComposite: string;
    maskImage: string;
    maskPosition: string;
    maskRepeat: string;
    maskSize: string;
    maskType: string;
    maxBlockSize: string;
    maxHeight: string;
    maxInlineSize: string;
    maxWidth: string;
    minBlockSize: string;
    minHeight: string;
    minInlineSize: string;
    minWidth: string;
    msContentZoomChaining: string | null;
    msContentZoomLimit: string | null;
    msContentZoomLimitMax: any;
    msContentZoomLimitMin: any;
    msContentZoomSnap: string | null;
    msContentZoomSnapPoints: string | null;
    msContentZoomSnapType: string | null;
    msContentZooming: string | null;
    msFlowFrom: string | null;
    msFlowInto: string | null;
    msFontFeatureSettings: string | null;
    msGridColumn: any;
    msGridColumnAlign: string | null;
    msGridColumnSpan: any;
    msGridColumns: string | null;
    msGridRow: any;
    msGridRowAlign: string | null;
    msGridRowSpan: any;
    msGridRows: string | null;
    msHighContrastAdjust: string | null;
    msHyphenateLimitChars: string | null;
    msHyphenateLimitLines: any;
    msHyphenateLimitZone: any;
    msHyphens: string | null;
    msImeAlign: string | null;
    msOverflowStyle: string | null;
    msScrollChaining: string | null;
    msScrollLimit: string | null;
    msScrollLimitXMax: any;
    msScrollLimitXMin: any;
    msScrollLimitYMax: any;
    msScrollLimitYMin: any;
    msScrollRails: string | null;
    msScrollSnapPointsX: string | null;
    msScrollSnapPointsY: string | null;
    msScrollSnapType: string | null;
    msScrollSnapX: string | null;
    msScrollSnapY: string | null;
    msScrollTranslation: string | null;
    msTextCombineHorizontal: string | null;
    msTextSizeAdjust: any;
    msTouchAction: string | null;
    msTouchSelect: string | null;
    msUserSelect: string | null;
    msWrapFlow: string;
    msWrapMargin: any;
    msWrapThrough: string;
    objectFit: string;
    objectPosition: string;
    opacity: string;
    order: string;
    orphans: string;
    outline: string;
    outlineColor: string;
    outlineOffset: string;
    outlineStyle: string;
    outlineWidth: string;
    overflow: string;
    overflowAnchor: string;
    overflowWrap: string;
    overflowX: string;
    overflowY: string;
    padding: string;
    paddingBlockEnd: string;
    paddingBlockStart: string;
    paddingBottom: string;
    paddingInlineEnd: string;
    paddingInlineStart: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    pageBreakAfter: string;
    pageBreakBefore: string;
    pageBreakInside: string;
    paintOrder: string;
    readonly parentRule: CSSRule;
    penAction: string | null;
    perspective: string;
    perspectiveOrigin: string;
    placeContent: string;
    placeItems: string;
    placeSelf: string;
    pointerEvents: string | null;
    position: string;
    quotes: string;
    resize: string;
    right: string;
    rotate: string;
    rowGap: string;
    rubyAlign: string;
    rubyOverhang: string | null;
    rubyPosition: string;
    scale: string;
    scrollBehavior: string;
    shapeRendering: string;
    stopColor: string;
    stopOpacity: string;
    stroke: string;
    strokeDasharray: string;
    strokeDashoffset: string;
    strokeLinecap: string;
    strokeLinejoin: string;
    strokeMiterlimit: string;
    strokeOpacity: string;
    strokeWidth: string;
    tabSize: string;
    tableLayout: string;
    textAlign: string;
    textAlignLast: string;
    textAnchor: string;
    textCombineUpright: string;
    textDecoration: string;
    textDecorationColor: string;
    textDecorationLine: string;
    textDecorationStyle: string;
    textEmphasis: string;
    textEmphasisColor: string;
    textEmphasisPosition: string;
    textEmphasisStyle: string;
    textIndent: string;
    textJustify: string;
    textKashida: string | null;
    textKashidaSpace: string | null;
    textOrientation: string;
    textOverflow: string;
    textRendering: string;
    textShadow: string;
    textTransform: string;
    textUnderlinePosition: string;
    top: string;
    touchAction: string;
    transform: string;
    transformBox: string;
    transformOrigin: string;
    transformStyle: string;
    transition: string;
    transitionDelay: string;
    transitionDuration: string;
    transitionProperty: string;
    transitionTimingFunction: string;
    translate: string;
    unicodeBidi: string;
    userSelect: string;
    verticalAlign: string;
    visibility: string;
    /** @deprecated */
    webkitAlignContent: string;
    /** @deprecated */
    webkitAlignItems: string;
    /** @deprecated */
    webkitAlignSelf: string;
    /** @deprecated */
    webkitAnimation: string;
    /** @deprecated */
    webkitAnimationDelay: string;
    /** @deprecated */
    webkitAnimationDirection: string;
    /** @deprecated */
    webkitAnimationDuration: string;
    /** @deprecated */
    webkitAnimationFillMode: string;
    /** @deprecated */
    webkitAnimationIterationCount: string;
    /** @deprecated */
    webkitAnimationName: string;
    /** @deprecated */
    webkitAnimationPlayState: string;
    /** @deprecated */
    webkitAnimationTimingFunction: string;
    /** @deprecated */
    webkitAppearance: string;
    /** @deprecated */
    webkitBackfaceVisibility: string;
    /** @deprecated */
    webkitBackgroundClip: string;
    /** @deprecated */
    webkitBackgroundOrigin: string;
    /** @deprecated */
    webkitBackgroundSize: string;
    /** @deprecated */
    webkitBorderBottomLeftRadius: string;
    /** @deprecated */
    webkitBorderBottomRightRadius: string;
    webkitBorderImage: string | null;
    /** @deprecated */
    webkitBorderRadius: string;
    /** @deprecated */
    webkitBorderTopLeftRadius: string;
    /** @deprecated */
    webkitBorderTopRightRadius: string;
    /** @deprecated */
    webkitBoxAlign: string;
    webkitBoxDirection: string | null;
    /** @deprecated */
    webkitBoxFlex: string;
    /** @deprecated */
    webkitBoxOrdinalGroup: string;
    /** @deprecated */
    webkitBoxOrient: string;
    /** @deprecated */
    webkitBoxPack: string;
    /** @deprecated */
    webkitBoxShadow: string;
    /** @deprecated */
    webkitBoxSizing: string;
    webkitColumnBreakAfter: string | null;
    webkitColumnBreakBefore: string | null;
    webkitColumnBreakInside: string | null;
    webkitColumnCount: any;
    webkitColumnGap: any;
    webkitColumnRule: string | null;
    webkitColumnRuleColor: any;
    webkitColumnRuleStyle: string | null;
    webkitColumnRuleWidth: any;
    webkitColumnSpan: string | null;
    webkitColumnWidth: any;
    webkitColumns: string | null;
    /** @deprecated */
    webkitFilter: string;
    /** @deprecated */
    webkitFlex: string;
    /** @deprecated */
    webkitFlexBasis: string;
    /** @deprecated */
    webkitFlexDirection: string;
    /** @deprecated */
    webkitFlexFlow: string;
    /** @deprecated */
    webkitFlexGrow: string;
    /** @deprecated */
    webkitFlexShrink: string;
    /** @deprecated */
    webkitFlexWrap: string;
    /** @deprecated */
    webkitJustifyContent: string;
    webkitLineClamp: string;
    /** @deprecated */
    webkitMask: string;
    /** @deprecated */
    webkitMaskBoxImage: string;
    /** @deprecated */
    webkitMaskBoxImageOutset: string;
    /** @deprecated */
    webkitMaskBoxImageRepeat: string;
    /** @deprecated */
    webkitMaskBoxImageSlice: string;
    /** @deprecated */
    webkitMaskBoxImageSource: string;
    /** @deprecated */
    webkitMaskBoxImageWidth: string;
    /** @deprecated */
    webkitMaskClip: string;
    /** @deprecated */
    webkitMaskComposite: string;
    /** @deprecated */
    webkitMaskImage: string;
    /** @deprecated */
    webkitMaskOrigin: string;
    /** @deprecated */
    webkitMaskPosition: string;
    /** @deprecated */
    webkitMaskRepeat: string;
    /** @deprecated */
    webkitMaskSize: string;
    /** @deprecated */
    webkitOrder: string;
    /** @deprecated */
    webkitPerspective: string;
    /** @deprecated */
    webkitPerspectiveOrigin: string;
    webkitTapHighlightColor: string | null;
    /** @deprecated */
    webkitTextFillColor: string;
    /** @deprecated */
    webkitTextSizeAdjust: string;
    /** @deprecated */
    webkitTextStroke: string;
    /** @deprecated */
    webkitTextStrokeColor: string;
    /** @deprecated */
    webkitTextStrokeWidth: string;
    /** @deprecated */
    webkitTransform: string;
    /** @deprecated */
    webkitTransformOrigin: string;
    /** @deprecated */
    webkitTransformStyle: string;
    /** @deprecated */
    webkitTransition: string;
    /** @deprecated */
    webkitTransitionDelay: string;
    /** @deprecated */
    webkitTransitionDuration: string;
    /** @deprecated */
    webkitTransitionProperty: string;
    /** @deprecated */
    webkitTransitionTimingFunction: string;
    webkitUserModify: string | null;
    webkitUserSelect: string | null;
    webkitWritingMode: string | null;
    whiteSpace: string;
    widows: string;
    width: string;
    willChange: string;
    wordBreak: string;
    wordSpacing: string;
    wordWrap: string;
    writingMode: string;
    zIndex: string;
    zoom: string | null;
    getPropertyPriority(propertyName: string): string;
    getPropertyValue(propertyName: string): string;
    item(index: number): string;
    removeProperty(propertyName: string): string;
    setProperty(propertyName: string, value: string | null, priority?: string | null): void;
    [index: number]: string;
}
/** CSSStyleRule represents a single CSS style rule. It implements the CSSRule interface with a type value of 1 (CSSRule.STYLE_RULE). */
export interface CSSStyleRule extends CSSRule {
    selectorText: string;
    readonly style: CSSStyleDeclaration;
}
/** A single CSS style sheet. It inherits properties and methods from its parent, StyleSheet. */
export interface CSSStyleSheet extends StyleSheet {
    readonly cssRules: CSSRuleList;
    /** @deprecated */
    cssText: string;
    /** @deprecated */
    readonly id: string;
    /** @deprecated */
    readonly imports: StyleSheetList;
    /** @deprecated */
    readonly isAlternate: boolean;
    /** @deprecated */
    readonly isPrefAlternate: boolean;
    readonly ownerRule: CSSRule | null;
    /** @deprecated */
    readonly owningElement: Element;
    /** @deprecated */
    readonly pages: any;
    /** @deprecated */
    readonly readOnly: boolean;
    readonly rules: CSSRuleList;
    /** @deprecated */
    addImport(bstrURL: string, lIndex?: number): number;
    /** @deprecated */
    addPageRule(bstrSelector: string, bstrStyle: string, lIndex?: number): number;
    addRule(bstrSelector: string, bstrStyle?: string, lIndex?: number): number;
    deleteRule(index?: number): void;
    insertRule(rule: string, index?: number): number;
    /** @deprecated */
    removeImport(lIndex: number): void;
    removeRule(lIndex: number): void;
}
/** An object representing a single CSS @supports at-rule. It implements the CSSConditionRule interface, and therefore the CSSRule and CSSGroupingRule interfaces with a type value of 12 (CSSRule.SUPPORTS_RULE). */
export interface CSSSupportsRule extends CSSConditionRule {
}
/** Provides a storage mechanism for Request / Response object pairs that are cached, for example as part of the ServiceWorker life cycle. Note that the Cache interface is exposed to windowed scopes as well as workers. You don't have to use it in conjunction with service workers, even though it is defined in the service worker spec. */
export interface Cache {
    add(request: RequestInfo): Promise<void>;
    addAll(requests: RequestInfo[]): Promise<void>;
    delete(request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>;
    keys(request?: RequestInfo, options?: CacheQueryOptions): Promise<ReadonlyArray<Request>>;
    match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response | undefined>;
    matchAll(request?: RequestInfo, options?: CacheQueryOptions): Promise<ReadonlyArray<Response>>;
    put(request: RequestInfo, response: Response): Promise<void>;
}
/** The storage for Cache objects. */
export interface CacheStorage {
    delete(cacheName: string): Promise<boolean>;
    has(cacheName: string): Promise<boolean>;
    keys(): Promise<string[]>;
    match(request: RequestInfo, options?: MultiCacheQueryOptions): Promise<Response | undefined>;
    open(cacheName: string): Promise<Cache>;
}
export interface CanvasCompositing {
    globalAlpha: number;
    globalCompositeOperation: string;
}
export interface CanvasDrawImage {
    drawImage(image: CanvasImageSource, dx: number, dy: number): void;
    drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
    drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
}
export interface CanvasDrawPath {
    beginPath(): void;
    clip(fillRule?: CanvasFillRule): void;
    clip(path: Path2D, fillRule?: CanvasFillRule): void;
    fill(fillRule?: CanvasFillRule): void;
    fill(path: Path2D, fillRule?: CanvasFillRule): void;
    isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInStroke(x: number, y: number): boolean;
    isPointInStroke(path: Path2D, x: number, y: number): boolean;
    stroke(): void;
    stroke(path: Path2D): void;
}
export interface CanvasFillStrokeStyles {
    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
    createPattern(image: CanvasImageSource, repetition: string): CanvasPattern | null;
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
}
export interface CanvasFilters {
    filter: string;
}
/** An opaque object describing a gradient. It is returned by the methods CanvasRenderingContext2D.createLinearGradient() or CanvasRenderingContext2D.createRadialGradient(). */
export interface CanvasGradient {
    /**
     * Adds a color stop with the given color to the gradient at the given offset. 0.0 is the offset at one end of the gradient, 1.0 is the offset at the other end.
     *
     * Throws an "IndexSizeError" DOMException if the offset is out of range. Throws a "SyntaxError" DOMException if the color cannot be parsed.
     */
    addColorStop(offset: number, color: string): void;
}
export interface CanvasImageData {
    createImageData(sw: number, sh: number): ImageData;
    createImageData(imagedata: ImageData): ImageData;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    putImageData(imagedata: ImageData, dx: number, dy: number): void;
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void;
}
export interface CanvasImageSmoothing {
    imageSmoothingEnabled: boolean;
    imageSmoothingQuality: ImageSmoothingQuality;
}
export interface CanvasPath {
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    closePath(): void;
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    lineTo(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, w: number, h: number): void;
}
export interface CanvasPathDrawingStyles {
    lineCap: CanvasLineCap;
    lineDashOffset: number;
    lineJoin: CanvasLineJoin;
    lineWidth: number;
    miterLimit: number;
    getLineDash(): number[];
    setLineDash(segments: number[]): void;
}
/** An opaque object describing a pattern, based on an image, a canvas, or a video, created by the CanvasRenderingContext2D.createPattern() method. */
export interface CanvasPattern {
    /**
     * Sets the transformation matrix that will be used when rendering the pattern during a fill or stroke painting operation.
     */
    setTransform(transform?: DOMMatrix2DInit): void;
}
export interface CanvasRect {
    clearRect(x: number, y: number, w: number, h: number): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
}
/** The CanvasRenderingContext2D interface, part of the Canvas API, provides the 2D rendering context for the drawing surface of a <canvas> element. It is used for drawing shapes, text, images, and other objects. */
export interface CanvasRenderingContext2D extends CanvasCompositing, CanvasDrawImage, CanvasDrawPath, CanvasFillStrokeStyles, CanvasFilters, CanvasImageData, CanvasImageSmoothing, CanvasPath, CanvasPathDrawingStyles, CanvasRect, CanvasShadowStyles, CanvasState, CanvasText, CanvasTextDrawingStyles, CanvasTransform, CanvasUserInterface {
    readonly canvas: HTMLCanvasElement;
}
export interface CanvasShadowStyles {
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
}
export interface CanvasState {
    restore(): void;
    save(): void;
}
export interface CanvasText {
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    measureText(text: string): TextMetrics;
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
}
export interface CanvasTextDrawingStyles {
    direction: CanvasDirection;
    font: string;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
}
export interface CanvasTransform {
    getTransform(): DOMMatrix;
    resetTransform(): void;
    rotate(angle: number): void;
    scale(x: number, y: number): void;
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    setTransform(transform?: DOMMatrix2DInit): void;
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    translate(x: number, y: number): void;
}
export interface CanvasUserInterface {
    drawFocusIfNeeded(element: Element): void;
    drawFocusIfNeeded(path: Path2D, element: Element): void;
    scrollPathIntoView(): void;
    scrollPathIntoView(path: Path2D): void;
}
export interface CaretPosition {
    readonly offset: number;
    readonly offsetNode: Node;
    getClientRect(): DOMRect | null;
}
/** The ChannelMergerNode interface, often used in conjunction with its opposite, ChannelSplitterNode, reunites different mono inputs into a single output. Each input is used to fill a channel of the output. This is useful for accessing each channels separately, e.g. for performing channel mixing where gain must be separately controlled on each channel. */
export interface ChannelMergerNode extends AudioNode {
}
/** The ChannelSplitterNode interface, often used in conjunction with its opposite, ChannelMergerNode, separates the different channels of an audio source into a set of mono outputs. This is useful for accessing each channel separately, e.g. for performing channel mixing where gain must be separately controlled on each channel. */
export interface ChannelSplitterNode extends AudioNode {
}
/** The CharacterData abstract interface represents a Node object that contains characters. This is an abstract interface, meaning there aren't any object of type CharacterData: it is implemented by other interfaces, like Text, Comment, or ProcessingInstruction which aren't abstract. */
export interface CharacterData extends Node, ChildNode, NonDocumentTypeChildNode {
    data: string;
    readonly length: number;
    appendData(data: string): void;
    deleteData(offset: number, count: number): void;
    insertData(offset: number, data: string): void;
    replaceData(offset: number, count: number, data: string): void;
    substringData(offset: number, count: number): string;
}
export interface ChildNode extends Node {
    /**
     * Inserts nodes just after node, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    after(...nodes: (Node | string)[]): void;
    /**
     * Inserts nodes just before node, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    before(...nodes: (Node | string)[]): void;
    /**
     * Removes node.
     */
    remove(): void;
    /**
     * Replaces node with nodes, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    replaceWith(...nodes: (Node | string)[]): void;
}
export interface ClientRect {
    bottom: number;
    readonly height: number;
    left: number;
    right: number;
    top: number;
    readonly width: number;
}
export interface ClientRectList {
    readonly length: number;
    item(index: number): ClientRect;
    [index: number]: ClientRect;
}
export interface Clipboard extends EventTarget {
    readText(): Promise<string>;
    writeText(data: string): Promise<void>;
}
/** Events providing information related to modification of the clipboard, that is cut, copy, and paste events. */
export interface ClipboardEvent extends Event {
    readonly clipboardData: DataTransfer | null;
}
/** A CloseEvent is sent to clients using WebSockets when the connection is closed. This is delivered to the listener indicated by the WebSocket object's onclose attribute. */
export interface CloseEvent extends Event {
    /**
     * Returns the WebSocket connection close code provided by the server.
     */
    readonly code: number;
    /**
     * Returns the WebSocket connection close reason provided by the server.
     */
    readonly reason: string;
    /**
     * Returns true if the connection closed cleanly; false otherwise.
     */
    readonly wasClean: boolean;
}
/** Textual notations within markup; although it is generally not visually shown, such comments are available to be read in the source view. */
export interface Comment extends CharacterData {
}
/** The DOM CompositionEvent represents events that occur due to the user indirectly entering text. */
export interface CompositionEvent extends UIEvent {
    readonly data: string;
}
export interface ConcatParams extends Algorithm {
    algorithmId: Uint8Array;
    hash?: string | Algorithm;
    partyUInfo: Uint8Array;
    partyVInfo: Uint8Array;
    privateInfo?: Uint8Array;
    publicInfo?: Uint8Array;
}
/** Provides access to the browser's debugging console (e.g. the Web Console in Firefox). The specifics of how it works varies from browser to browser, but there is a de facto set of features that are typically provided. */
export interface Console {
    memory: any;
    assert(condition?: boolean, message?: string, ...data: any[]): void;
    clear(): void;
    count(label?: string): void;
    debug(message?: any, ...optionalParams: any[]): void;
    dir(value?: any, ...optionalParams: any[]): void;
    dirxml(value: any): void;
    error(message?: any, ...optionalParams: any[]): void;
    exception(message?: string, ...optionalParams: any[]): void;
    group(groupTitle?: string, ...optionalParams: any[]): void;
    groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void;
    groupEnd(): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    markTimeline(label?: string): void;
    profile(reportName?: string): void;
    profileEnd(reportName?: string): void;
    table(...tabularData: any[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeStamp(label?: string): void;
    timeline(label?: string): void;
    timelineEnd(label?: string): void;
    trace(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
}
export interface ConstantSourceNode extends AudioScheduledSourceNode {
    readonly offset: AudioParam;
    addEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: ConstantSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: ConstantSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** An AudioNode that performs a Linear Convolution on a given AudioBuffer, often used to achieve a reverb effect. A ConvolverNode always has exactly one input and one output. */
export interface ConvolverNode extends AudioNode {
    buffer: AudioBuffer | null;
    normalize: boolean;
}
/** The position and altitude of the device on Earth, as well as the accuracy with which these properties are calculated. */
export interface Coordinates {
    readonly accuracy: number;
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;
}
/** This Streams API interface provides a built-in byte length queuing strategy that can be used when constructing streams. */
export interface CountQueuingStrategy extends QueuingStrategy {
    highWaterMark: number;
    size(chunk: any): 1;
}
export interface Credential {
    readonly id: string;
    readonly type: string;
}
export interface CredentialsContainer {
    create(options?: CredentialCreationOptions): Promise<Credential | null>;
    get(options?: CredentialRequestOptions): Promise<Credential | null>;
    preventSilentAccess(): Promise<void>;
    store(credential: Credential): Promise<Credential>;
}
/** Basic cryptography features available in the current context. It allows access to a cryptographically strong random number generator and to cryptographic primitives. */
export interface Crypto {
    readonly subtle: SubtleCrypto;
    getRandomValues<T extends Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | null>(array: T): T;
}
/** The CryptoKey dictionary of the Web Crypto API represents a cryptographic key. */
export interface CryptoKey {
    readonly algorithm: KeyAlgorithm;
    readonly extractable: boolean;
    readonly type: KeyType;
    readonly usages: KeyUsage[];
}
/** The CryptoKeyPair dictionary of the Web Crypto API represents a key pair for an asymmetric cryptography algorithm, also known as a public-key algorithm. */
export interface CryptoKeyPair {
    privateKey: CryptoKey;
    publicKey: CryptoKey;
}
export interface CustomElementRegistry {
    define(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void;
    get(name: string): any;
    upgrade(root: Node): void;
    whenDefined(name: string): Promise<void>;
}
export interface CustomEvent<T = any> extends Event {
    /**
     * Returns any custom data event was created with. Typically used for synthetic events.
     */
    readonly detail: T;
    initCustomEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, detailArg: T): void;
}
/** An error object that contains an error name. */
export interface DOMError {
    readonly name: string;
    toString(): string;
}
/** An abnormal event (called an exception) which occurs as a result of calling a method or accessing a property of a web API. */
export interface DOMException {
    readonly code: number;
    readonly message: string;
    readonly name: string;
    readonly ABORT_ERR: number;
    readonly DATA_CLONE_ERR: number;
    readonly DOMSTRING_SIZE_ERR: number;
    readonly HIERARCHY_REQUEST_ERR: number;
    readonly INDEX_SIZE_ERR: number;
    readonly INUSE_ATTRIBUTE_ERR: number;
    readonly INVALID_ACCESS_ERR: number;
    readonly INVALID_CHARACTER_ERR: number;
    readonly INVALID_MODIFICATION_ERR: number;
    readonly INVALID_NODE_TYPE_ERR: number;
    readonly INVALID_STATE_ERR: number;
    readonly NAMESPACE_ERR: number;
    readonly NETWORK_ERR: number;
    readonly NOT_FOUND_ERR: number;
    readonly NOT_SUPPORTED_ERR: number;
    readonly NO_DATA_ALLOWED_ERR: number;
    readonly NO_MODIFICATION_ALLOWED_ERR: number;
    readonly QUOTA_EXCEEDED_ERR: number;
    readonly SECURITY_ERR: number;
    readonly SYNTAX_ERR: number;
    readonly TIMEOUT_ERR: number;
    readonly TYPE_MISMATCH_ERR: number;
    readonly URL_MISMATCH_ERR: number;
    readonly VALIDATION_ERR: number;
    readonly WRONG_DOCUMENT_ERR: number;
}
/** An object providing methods which are not dependent on any particular document. Such an object is returned by the Document.implementation property. */
export interface DOMImplementation {
    createDocument(namespaceURI: string | null, qualifiedName: string | null, doctype: DocumentType | null): Document;
    createDocumentType(qualifiedName: string, publicId: string, systemId: string): DocumentType;
    createHTMLDocument(title?: string): Document;
    /** @deprecated */
    hasFeature(...args: any[]): true;
}
export interface DOML2DeprecatedColorProperty {
    color: string;
}
export interface DOMMatrix extends DOMMatrixReadOnly {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m21: number;
    m22: number;
    m23: number;
    m24: number;
    m31: number;
    m32: number;
    m33: number;
    m34: number;
    m41: number;
    m42: number;
    m43: number;
    m44: number;
    invertSelf(): DOMMatrix;
    multiplySelf(other?: DOMMatrixInit): DOMMatrix;
    preMultiplySelf(other?: DOMMatrixInit): DOMMatrix;
    rotateAxisAngleSelf(x?: number, y?: number, z?: number, angle?: number): DOMMatrix;
    rotateFromVectorSelf(x?: number, y?: number): DOMMatrix;
    rotateSelf(rotX?: number, rotY?: number, rotZ?: number): DOMMatrix;
    scale3dSelf(scale?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    scaleSelf(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    setMatrixValue(transformList: string): DOMMatrix;
    skewXSelf(sx?: number): DOMMatrix;
    skewYSelf(sy?: number): DOMMatrix;
    translateSelf(tx?: number, ty?: number, tz?: number): DOMMatrix;
}
export declare type SVGMatrix = DOMMatrix;
export declare type WebKitCSSMatrix = DOMMatrix;
export interface DOMMatrixReadOnly {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly e: number;
    readonly f: number;
    readonly is2D: boolean;
    readonly isIdentity: boolean;
    readonly m11: number;
    readonly m12: number;
    readonly m13: number;
    readonly m14: number;
    readonly m21: number;
    readonly m22: number;
    readonly m23: number;
    readonly m24: number;
    readonly m31: number;
    readonly m32: number;
    readonly m33: number;
    readonly m34: number;
    readonly m41: number;
    readonly m42: number;
    readonly m43: number;
    readonly m44: number;
    flipX(): DOMMatrix;
    flipY(): DOMMatrix;
    inverse(): DOMMatrix;
    multiply(other?: DOMMatrixInit): DOMMatrix;
    rotate(rotX?: number, rotY?: number, rotZ?: number): DOMMatrix;
    rotateAxisAngle(x?: number, y?: number, z?: number, angle?: number): DOMMatrix;
    rotateFromVector(x?: number, y?: number): DOMMatrix;
    scale(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    scale3d(scale?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    /** @deprecated */
    scaleNonUniform(scaleX?: number, scaleY?: number): DOMMatrix;
    skewX(sx?: number): DOMMatrix;
    skewY(sy?: number): DOMMatrix;
    toFloat32Array(): Float32Array;
    toFloat64Array(): Float64Array;
    toJSON(): any;
    transformPoint(point?: DOMPointInit): DOMPoint;
    translate(tx?: number, ty?: number, tz?: number): DOMMatrix;
    toString(): string;
}
/** Provides the ability to parse XML or HTML source code from a string into a DOM Document. */
export interface DOMParser {
    parseFromString(str: string, type: SupportedType): Document;
}
export interface DOMPoint extends DOMPointReadOnly {
    w: number;
    x: number;
    y: number;
    z: number;
}
export declare type SVGPoint = DOMPoint;
export interface DOMPointReadOnly {
    readonly w: number;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    matrixTransform(matrix?: DOMMatrixInit): DOMPoint;
    toJSON(): any;
}
export interface DOMQuad {
    readonly p1: DOMPoint;
    readonly p2: DOMPoint;
    readonly p3: DOMPoint;
    readonly p4: DOMPoint;
    getBounds(): DOMRect;
    toJSON(): any;
}
export interface DOMRect extends DOMRectReadOnly {
    height: number;
    width: number;
    x: number;
    y: number;
}
export declare type SVGRect = DOMRect;
export interface DOMRectList {
    readonly length: number;
    item(index: number): DOMRect | null;
    [index: number]: DOMRect;
}
export interface DOMRectReadOnly {
    readonly bottom: number;
    readonly height: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
    toJSON(): any;
}
export interface DOMSettableTokenList extends DOMTokenList {
    value: string;
}
/** A type returned by some APIs which contains a list of DOMString (strings). */
export interface DOMStringList {
    /**
     * Returns the number of strings in strings.
     */
    readonly length: number;
    /**
     * Returns true if strings contains string, and false otherwise.
     */
    contains(string: string): boolean;
    /**
     * Returns the string with index index from strings.
     */
    item(index: number): string | null;
    [index: number]: string;
}
/** Used by the dataset HTML attribute to represent data for custom attributes added to elements. */
export interface DOMStringMap {
    [name: string]: string | undefined;
}
/** A set of space-separated tokens. Such a set is returned by Element.classList, HTMLLinkElement.relList, HTMLAnchorElement.relList, HTMLAreaElement.relList, HTMLIframeElement.sandbox, or HTMLOutputElement.htmlFor. It is indexed beginning with 0 as with JavaScript Array objects. DOMTokenList is always case-sensitive. */
export interface DOMTokenList {
    /**
     * Returns the number of tokens.
     */
    readonly length: number;
    /**
     * Returns the associated set as string.
     *
     * Can be set, to change the associated attribute.
     */
    value: string;
    toString(): string;
    /**
     * Adds all arguments passed, except those already present.
     *
     * Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
     *
     * Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
     */
    add(...tokens: string[]): void;
    /**
     * Returns true if token is present, and false otherwise.
     */
    contains(token: string): boolean;
    /**
     * Returns the token with index index.
     */
    item(index: number): string | null;
    /**
     * Removes arguments passed, if they are present.
     *
     * Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
     *
     * Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
     */
    remove(...tokens: string[]): void;
    /**
     * Replaces token with newToken.
     *
     * Returns true if token was replaced with newToken, and false otherwise.
     *
     * Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
     *
     * Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
     */
    replace(oldToken: string, newToken: string): void;
    /**
     * Returns true if token is in the associated attribute's supported tokens. Returns false otherwise.
     *
     * Throws a TypeError if the associated attribute has no supported tokens defined.
     */
    supports(token: string): boolean;
    /**
     * If force is not given, "toggles" token, removing it if it's present and adding it if it's not present. If force is true, adds token (same as add()). If force is false, removes token (same as remove()).
     *
     * Returns true if token is now present, and false otherwise.
     *
     * Throws a "SyntaxError" DOMException if token is empty.
     *
     * Throws an "InvalidCharacterError" DOMException if token contains any spaces.
     */
    toggle(token: string, force?: boolean): boolean;
    forEach(callbackfn: (value: string, key: number, parent: DOMTokenList) => void, thisArg?: any): void;
    [index: number]: string;
}
export interface DataCue extends TextTrackCue {
    data: ArrayBuffer;
    addEventListener<K extends keyof TextTrackCueEventMap>(type: K, listener: (this: DataCue, ev: TextTrackCueEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof TextTrackCueEventMap>(type: K, listener: (this: DataCue, ev: TextTrackCueEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Used to hold the data that is being dragged during a drag and drop operation. It may hold one or more data items, each of one or more data types. For more information about drag and drop, see HTML Drag and Drop API. */
export interface DataTransfer {
    /**
     * Returns the kind of operation that is currently selected. If the kind of operation isn't one of those that is allowed by the effectAllowed attribute, then the operation will fail.
     *
     * Can be set, to change the selected operation.
     *
     * The possible values are "none", "copy", "link", and "move".
     */
    dropEffect: string;
    /**
     * Returns the kinds of operations that are to be allowed.
     *
     * Can be set (during the dragstart event), to change the allowed operations.
     *
     * The possible values are "none", "copy", "copyLink", "copyMove", "link", "linkMove", "move", "all", and "uninitialized",
     */
    effectAllowed: string;
    /**
     * Returns a FileList of the files being dragged, if any.
     */
    readonly files: FileList;
    /**
     * Returns a DataTransferItemList object, with the drag data.
     */
    readonly items: DataTransferItemList;
    /**
     * Returns a frozen array listing the formats that were set in the dragstart event. In addition, if any files are being dragged, then one of the types will be the string "Files".
     */
    readonly types: ReadonlyArray<string>;
    /**
     * Removes the data of the specified formats. Removes all data if the argument is omitted.
     */
    clearData(format?: string): void;
    /**
     * Returns the specified data. If there is no such data, returns the empty string.
     */
    getData(format: string): string;
    /**
     * Adds the specified data.
     */
    setData(format: string, data: string): void;
    /**
     * Uses the given element to update the drag feedback, replacing any previously specified feedback.
     */
    setDragImage(image: Element, x: number, y: number): void;
}
/** One drag data item. During a drag operation, each drag event has a dataTransfer property which contains a list of drag data items. Each item in the list is a DataTransferItem object. */
export interface DataTransferItem {
    /**
     * Returns the drag data item kind, one of: "string", "file".
     */
    readonly kind: string;
    /**
     * Returns the drag data item type string.
     */
    readonly type: string;
    /**
     * Returns a File object, if the drag data item kind is File.
     */
    getAsFile(): File | null;
    /**
     * Invokes the callback with the string data as the argument, if the drag data item kind is text.
     */
    getAsString(callback: FunctionStringCallback | null): void;
    webkitGetAsEntry(): any;
}
/** A list of DataTransferItem objects representing items being dragged. During a drag operation, each DragEvent has a dataTransfer property and that property is a DataTransferItemList. */
export interface DataTransferItemList {
    /**
     * Returns the number of items in the drag data store.
     */
    readonly length: number;
    /**
     * Adds a new entry for the given data to the drag data store. If the data is plain text then a type string has to be provided also.
     */
    add(data: string, type: string): DataTransferItem | null;
    add(data: File): DataTransferItem | null;
    /**
     * Removes all the entries in the drag data store.
     */
    clear(): void;
    item(index: number): DataTransferItem;
    /**
     * Removes the indexth entry in the drag data store.
     */
    remove(index: number): void;
    [name: number]: DataTransferItem;
}
export interface DeferredPermissionRequest {
    readonly id: number;
    readonly type: MSWebViewPermissionType;
    readonly uri: string;
    allow(): void;
    deny(): void;
}
/** A delay-line; an AudioNode audio-processing module that causes a delay between the arrival of an input data and its propagation to the output. */
export interface DelayNode extends AudioNode {
    readonly delayTime: AudioParam;
}
/** Provides information about the amount of acceleration the device is experiencing along all three axes. */
export interface DeviceAcceleration {
    readonly x: number | null;
    readonly y: number | null;
    readonly z: number | null;
}
/** The DeviceLightEvent provides web developers with information from photo sensors or similiar detectors about ambient light levels near the device. For example this may be useful to adjust the screen's brightness based on the current ambient light level in order to save energy or provide better readability. */
export interface DeviceLightEvent extends Event {
    readonly value: number;
}
/** The DeviceMotionEvent provides web developers with information about the speed of changes for the device's position and orientation. */
export interface DeviceMotionEvent extends Event {
    readonly acceleration: DeviceMotionEventAcceleration | null;
    readonly accelerationIncludingGravity: DeviceMotionEventAcceleration | null;
    readonly interval: number;
    readonly rotationRate: DeviceMotionEventRotationRate | null;
}
export interface DeviceMotionEventAcceleration {
    readonly x: number | null;
    readonly y: number | null;
    readonly z: number | null;
}
export interface DeviceMotionEventRotationRate {
    readonly alpha: number | null;
    readonly beta: number | null;
    readonly gamma: number | null;
}
/** The DeviceOrientationEvent provides web developers with information from the physical orientation of the device running the web page. */
export interface DeviceOrientationEvent extends Event {
    readonly absolute: boolean;
    readonly alpha: number | null;
    readonly beta: number | null;
    readonly gamma: number | null;
}
/** Provides information about the rate at which the device is rotating around all three axes. */
export interface DeviceRotationRate {
    readonly alpha: number | null;
    readonly beta: number | null;
    readonly gamma: number | null;
}
export interface DhImportKeyParams extends Algorithm {
    generator: Uint8Array;
    prime: Uint8Array;
}
export interface DhKeyAlgorithm extends KeyAlgorithm {
    generator: Uint8Array;
    prime: Uint8Array;
}
export interface DhKeyDeriveParams extends Algorithm {
    public: CryptoKey;
}
export interface DhKeyGenParams extends Algorithm {
    generator: Uint8Array;
    prime: Uint8Array;
}
export interface DocumentEventMap extends GlobalEventHandlersEventMap, DocumentAndElementEventHandlersEventMap {
    "fullscreenchange": Event;
    "fullscreenerror": Event;
    "pointerlockchange": Event;
    "pointerlockerror": Event;
    "readystatechange": Event;
    "visibilitychange": Event;
}
/** Any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree. */
export interface Document extends Node, DocumentAndElementEventHandlers, DocumentOrShadowRoot, GlobalEventHandlers, NonElementParentNode, ParentNode, XPathEvaluatorBase {
    /**
     * Sets or gets the URL for the current document.
     */
    readonly URL: string;
    /**
     * Sets or gets the color of all active links in the document.
     */
    /** @deprecated */
    alinkColor: string;
    /**
     * Returns a reference to the collection of elements contained by the object.
     */
    /** @deprecated */
    readonly all: HTMLAllCollection;
    /**
     * Retrieves a collection of all a objects that have a name and/or id property. Objects in this collection are in HTML source order.
     */
    /** @deprecated */
    readonly anchors: HTMLCollectionOf<HTMLAnchorElement>;
    /**
     * Retrieves a collection of all applet objects in the document.
     */
    /** @deprecated */
    readonly applets: HTMLCollectionOf<HTMLAppletElement>;
    /**
     * Deprecated. Sets or retrieves a value that indicates the background color behind the object.
     */
    /** @deprecated */
    bgColor: string;
    /**
     * Specifies the beginning and end of the document body.
     */
    body: HTMLElement;
    /**
     * Returns document's encoding.
     */
    readonly characterSet: string;
    /**
     * Gets or sets the character set used to encode the object.
     */
    readonly charset: string;
    /**
     * Gets a value that indicates whether standards-compliant mode is switched on for the object.
     */
    readonly compatMode: string;
    /**
     * Returns document's content type.
     */
    readonly contentType: string;
    /**
     * Returns the HTTP cookies that apply to the Document. If there are no cookies or cookies can't be applied to this resource, the empty string will be returned.
     *
     * Can be set, to add a new cookie to the element's set of HTTP cookies.
     *
     * If the contents are sandboxed into a unique origin (e.g. in an iframe with the sandbox attribute), a "SecurityError" DOMException will be thrown on getting and setting.
     */
    cookie: string;
    /**
     * Returns the script element, or the SVG script element, that is currently executing, as long as the element represents a classic script. In the case of reentrant script execution, returns the one that most recently started executing amongst those that have not yet finished executing.
     *
     * Returns null if the Document is not currently executing a script or SVG script element (e.g., because the running script is an event handler, or a timeout), or if the currently executing script or SVG script element represents a module script.
     */
    readonly currentScript: HTMLOrSVGScriptElement | null;
    readonly defaultView: WindowProxy | null;
    /**
     * Sets or gets a value that indicates whether the document can be edited.
     */
    designMode: string;
    /**
     * Sets or retrieves a value that indicates the reading order of the object.
     */
    dir: string;
    /**
     * Gets an object representing the document type declaration associated with the current document.
     */
    readonly doctype: DocumentType | null;
    /**
     * Gets a reference to the root node of the document.
     */
    readonly documentElement: HTMLElement;
    /**
     * Returns document's URL.
     */
    readonly documentURI: string;
    /**
     * Sets or gets the security domain of the document.
     */
    domain: string;
    /**
     * Retrieves a collection of all embed objects in the document.
     */
    readonly embeds: HTMLCollectionOf<HTMLEmbedElement>;
    /**
     * Sets or gets the foreground (text) color of the document.
     */
    /** @deprecated */
    fgColor: string;
    /**
     * Retrieves a collection, in source order, of all form objects in the document.
     */
    readonly forms: HTMLCollectionOf<HTMLFormElement>;
    /** @deprecated */
    readonly fullscreen: boolean;
    /**
     * Returns true if document has the ability to display elements fullscreen and fullscreen is supported, or false otherwise.
     */
    readonly fullscreenEnabled: boolean;
    /**
     * Returns the head element.
     */
    readonly head: HTMLHeadElement;
    readonly hidden: boolean;
    /**
     * Retrieves a collection, in source order, of img objects in the document.
     */
    readonly images: HTMLCollectionOf<HTMLImageElement>;
    /**
     * Gets the implementation object of the current document.
     */
    readonly implementation: DOMImplementation;
    /**
     * Returns the character encoding used to create the webpage that is loaded into the document object.
     */
    readonly inputEncoding: string;
    /**
     * Gets the date that the page was last modified, if the page supplies one.
     */
    readonly lastModified: string;
    /**
     * Sets or gets the color of the document links.
     */
    /** @deprecated */
    linkColor: string;
    /**
     * Retrieves a collection of all a objects that specify the href property and all area objects in the document.
     */
    readonly links: HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement>;
    /**
     * Contains information about the current URL.
     */
    location: Location;
    onfullscreenchange: ((this: Document, ev: Event) => any) | null;
    onfullscreenerror: ((this: Document, ev: Event) => any) | null;
    onpointerlockchange: ((this: Document, ev: Event) => any) | null;
    onpointerlockerror: ((this: Document, ev: Event) => any) | null;
    /**
     * Fires when the state of the object has changed.
     * @param ev The event
     */
    onreadystatechange: ((this: Document, ev: Event) => any) | null;
    onvisibilitychange: ((this: Document, ev: Event) => any) | null;
    /**
     * Returns document's origin.
     */
    readonly origin: string;
    /**
     * Return an HTMLCollection of the embed elements in the Document.
     */
    readonly plugins: HTMLCollectionOf<HTMLEmbedElement>;
    /**
     * Retrieves a value that indicates the current state of the object.
     */
    readonly readyState: DocumentReadyState;
    /**
     * Gets the URL of the location that referred the user to the current page.
     */
    readonly referrer: string;
    /**
     * Retrieves a collection of all script objects in the document.
     */
    readonly scripts: HTMLCollectionOf<HTMLScriptElement>;
    readonly scrollingElement: Element | null;
    readonly timeline: DocumentTimeline;
    /**
     * Contains the title of the document.
     */
    title: string;
    readonly visibilityState: VisibilityState;
    /**
     * Sets or gets the color of the links that the user has visited.
     */
    /** @deprecated */
    vlinkColor: string;
    /**
     * Moves node from another document and returns it.
     *
     * If node is a document, throws a "NotSupportedError" DOMException or, if node is a shadow root, throws a "HierarchyRequestError" DOMException.
     */
    adoptNode<T extends Node>(source: T): T;
    /** @deprecated */
    captureEvents(): void;
    caretPositionFromPoint(x: number, y: number): CaretPosition | null;
    /** @deprecated */
    caretRangeFromPoint(x: number, y: number): Range;
    /** @deprecated */
    clear(): void;
    /**
     * Closes an output stream and forces the sent data to display.
     */
    close(): void;
    /**
     * Creates an attribute object with a specified name.
     * @param name String that sets the attribute object's name.
     */
    createAttribute(localName: string): Attr;
    createAttributeNS(namespace: string | null, qualifiedName: string): Attr;
    /**
     * Returns a CDATASection node whose data is data.
     */
    createCDATASection(data: string): CDATASection;
    /**
     * Creates a comment object with the specified data.
     * @param data Sets the comment object's data.
     */
    createComment(data: string): Comment;
    /**
     * Creates a new document.
     */
    createDocumentFragment(): DocumentFragment;
    /**
     * Creates an instance of the element for the specified tag.
     * @param tagName The name of an element.
     */
    createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
    /** @deprecated */
    createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementDeprecatedTagNameMap[K];
    createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
    /**
     * Returns an element with namespace namespace. Its namespace prefix will be everything before ":" (U+003E) in qualifiedName or null. Its local name will be everything after ":" (U+003E) in qualifiedName or qualifiedName.
     *
     * If localName does not match the Name production an "InvalidCharacterError" DOMException will be thrown.
     *
     * If one of the following conditions is true a "NamespaceError" DOMException will be thrown:
     *
     * localName does not match the QName production.
     * Namespace prefix is not null and namespace is the empty string.
     * Namespace prefix is "xml" and namespace is not the XML namespace.
     * qualifiedName or namespace prefix is "xmlns" and namespace is not the XMLNS namespace.
     * namespace is the XMLNS namespace and neither qualifiedName nor namespace prefix is "xmlns".
     *
     * When supplied, options's is can be used to create a customized built-in element.
     */
    createElementNS(namespaceURI: "http://www.w3.org/1999/xhtml", qualifiedName: string): HTMLElement;
    createElementNS<K extends keyof SVGElementTagNameMap>(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: K): SVGElementTagNameMap[K];
    createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: string): SVGElement;
    createElementNS(namespaceURI: string | null, qualifiedName: string, options?: ElementCreationOptions): Element;
    createElementNS(namespace: string | null, qualifiedName: string, options?: string | ElementCreationOptions): Element;
    createEvent(eventInterface: "AnimationEvent"): AnimationEvent;
    createEvent(eventInterface: "AnimationPlaybackEvent"): AnimationPlaybackEvent;
    createEvent(eventInterface: "AudioProcessingEvent"): AudioProcessingEvent;
    createEvent(eventInterface: "BeforeUnloadEvent"): BeforeUnloadEvent;
    createEvent(eventInterface: "ClipboardEvent"): ClipboardEvent;
    createEvent(eventInterface: "CloseEvent"): CloseEvent;
    createEvent(eventInterface: "CompositionEvent"): CompositionEvent;
    createEvent(eventInterface: "CustomEvent"): CustomEvent;
    createEvent(eventInterface: "DeviceLightEvent"): DeviceLightEvent;
    createEvent(eventInterface: "DeviceMotionEvent"): DeviceMotionEvent;
    createEvent(eventInterface: "DeviceOrientationEvent"): DeviceOrientationEvent;
    createEvent(eventInterface: "DragEvent"): DragEvent;
    createEvent(eventInterface: "ErrorEvent"): ErrorEvent;
    createEvent(eventInterface: "Event"): Event;
    createEvent(eventInterface: "Events"): Event;
    createEvent(eventInterface: "FocusEvent"): FocusEvent;
    createEvent(eventInterface: "FocusNavigationEvent"): FocusNavigationEvent;
    createEvent(eventInterface: "GamepadEvent"): GamepadEvent;
    createEvent(eventInterface: "HashChangeEvent"): HashChangeEvent;
    createEvent(eventInterface: "IDBVersionChangeEvent"): IDBVersionChangeEvent;
    createEvent(eventInterface: "InputEvent"): InputEvent;
    createEvent(eventInterface: "KeyboardEvent"): KeyboardEvent;
    createEvent(eventInterface: "ListeningStateChangedEvent"): ListeningStateChangedEvent;
    createEvent(eventInterface: "MSGestureEvent"): MSGestureEvent;
    createEvent(eventInterface: "MSMediaKeyMessageEvent"): MSMediaKeyMessageEvent;
    createEvent(eventInterface: "MSMediaKeyNeededEvent"): MSMediaKeyNeededEvent;
    createEvent(eventInterface: "MSPointerEvent"): MSPointerEvent;
    createEvent(eventInterface: "MediaEncryptedEvent"): MediaEncryptedEvent;
    createEvent(eventInterface: "MediaKeyMessageEvent"): MediaKeyMessageEvent;
    createEvent(eventInterface: "MediaQueryListEvent"): MediaQueryListEvent;
    createEvent(eventInterface: "MediaStreamErrorEvent"): MediaStreamErrorEvent;
    createEvent(eventInterface: "MediaStreamEvent"): MediaStreamEvent;
    createEvent(eventInterface: "MediaStreamTrackEvent"): MediaStreamTrackEvent;
    createEvent(eventInterface: "MessageEvent"): MessageEvent;
    createEvent(eventInterface: "MouseEvent"): MouseEvent;
    createEvent(eventInterface: "MouseEvents"): MouseEvent;
    createEvent(eventInterface: "MutationEvent"): MutationEvent;
    createEvent(eventInterface: "MutationEvents"): MutationEvent;
    createEvent(eventInterface: "OfflineAudioCompletionEvent"): OfflineAudioCompletionEvent;
    createEvent(eventInterface: "OverflowEvent"): OverflowEvent;
    createEvent(eventInterface: "PageTransitionEvent"): PageTransitionEvent;
    createEvent(eventInterface: "PaymentRequestUpdateEvent"): PaymentRequestUpdateEvent;
    createEvent(eventInterface: "PermissionRequestedEvent"): PermissionRequestedEvent;
    createEvent(eventInterface: "PointerEvent"): PointerEvent;
    createEvent(eventInterface: "PopStateEvent"): PopStateEvent;
    createEvent(eventInterface: "ProgressEvent"): ProgressEvent;
    createEvent(eventInterface: "PromiseRejectionEvent"): PromiseRejectionEvent;
    createEvent(eventInterface: "RTCDTMFToneChangeEvent"): RTCDTMFToneChangeEvent;
    createEvent(eventInterface: "RTCDataChannelEvent"): RTCDataChannelEvent;
    createEvent(eventInterface: "RTCDtlsTransportStateChangedEvent"): RTCDtlsTransportStateChangedEvent;
    createEvent(eventInterface: "RTCErrorEvent"): RTCErrorEvent;
    createEvent(eventInterface: "RTCIceCandidatePairChangedEvent"): RTCIceCandidatePairChangedEvent;
    createEvent(eventInterface: "RTCIceGathererEvent"): RTCIceGathererEvent;
    createEvent(eventInterface: "RTCIceTransportStateChangedEvent"): RTCIceTransportStateChangedEvent;
    createEvent(eventInterface: "RTCPeerConnectionIceErrorEvent"): RTCPeerConnectionIceErrorEvent;
    createEvent(eventInterface: "RTCPeerConnectionIceEvent"): RTCPeerConnectionIceEvent;
    createEvent(eventInterface: "RTCSsrcConflictEvent"): RTCSsrcConflictEvent;
    createEvent(eventInterface: "RTCStatsEvent"): RTCStatsEvent;
    createEvent(eventInterface: "RTCTrackEvent"): RTCTrackEvent;
    createEvent(eventInterface: "SVGZoomEvent"): SVGZoomEvent;
    createEvent(eventInterface: "SVGZoomEvents"): SVGZoomEvent;
    createEvent(eventInterface: "SecurityPolicyViolationEvent"): SecurityPolicyViolationEvent;
    createEvent(eventInterface: "ServiceWorkerMessageEvent"): ServiceWorkerMessageEvent;
    createEvent(eventInterface: "SpeechRecognitionEvent"): SpeechRecognitionEvent;
    createEvent(eventInterface: "SpeechSynthesisErrorEvent"): SpeechSynthesisErrorEvent;
    createEvent(eventInterface: "SpeechSynthesisEvent"): SpeechSynthesisEvent;
    createEvent(eventInterface: "StorageEvent"): StorageEvent;
    createEvent(eventInterface: "TextEvent"): TextEvent;
    createEvent(eventInterface: "TouchEvent"): TouchEvent;
    createEvent(eventInterface: "TrackEvent"): TrackEvent;
    createEvent(eventInterface: "TransitionEvent"): TransitionEvent;
    createEvent(eventInterface: "UIEvent"): UIEvent;
    createEvent(eventInterface: "UIEvents"): UIEvent;
    createEvent(eventInterface: "VRDisplayEvent"): VRDisplayEvent;
    createEvent(eventInterface: "VRDisplayEvent "): VRDisplayEvent;
    createEvent(eventInterface: "WebGLContextEvent"): WebGLContextEvent;
    createEvent(eventInterface: "WheelEvent"): WheelEvent;
    createEvent(eventInterface: string): Event;
    /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     * @param root The root element or node to start traversing on.
     * @param whatToShow The type of nodes or elements to appear in the node list
     * @param filter A custom NodeFilter function to use. For more information, see filter. Use null for no filter.
     * @param entityReferenceExpansion A flag that specifies whether entity reference nodes are expanded.
     */
    createNodeIterator(root: Node, whatToShow?: number, filter?: NodeFilter | null): NodeIterator;
    /**
     * Returns a ProcessingInstruction node whose target is target and data is data. If target does not match the Name production an "InvalidCharacterError" DOMException will be thrown. If data contains "?>" an "InvalidCharacterError" DOMException will be thrown.
     */
    createProcessingInstruction(target: string, data: string): ProcessingInstruction;
    /**
     *  Returns an empty range object that has both of its boundary points positioned at the beginning of the document.
     */
    createRange(): Range;
    /**
     * Creates a text string from the specified value.
     * @param data String that specifies the nodeValue property of the text node.
     */
    createTextNode(data: string): Text;
    /**
     * Creates a TreeWalker object that you can use to traverse filtered lists of nodes or elements in a document.
     * @param root The root element or node to start traversing on.
     * @param whatToShow The type of nodes or elements to appear in the node list. For more information, see whatToShow.
     * @param filter A custom NodeFilter function to use.
     * @param entityReferenceExpansion A flag that specifies whether entity reference nodes are expanded.
     */
    createTreeWalker(root: Node, whatToShow?: number, filter?: NodeFilter | null): TreeWalker;
    /** @deprecated */
    createTreeWalker(root: Node, whatToShow: number, filter: NodeFilter | null, entityReferenceExpansion?: boolean): TreeWalker;
    /**
     * Returns the element for the specified x coordinate and the specified y coordinate.
     * @param x The x-offset
     * @param y The y-offset
     */
    elementFromPoint(x: number, y: number): Element | null;
    elementsFromPoint(x: number, y: number): Element[];
    /**
     * Executes a command on the current document, current selection, or the given range.
     * @param commandId String that specifies the command to execute. This command can be any of the command identifiers that can be executed in script.
     * @param showUI Display the user interface, defaults to false.
     * @param value Value to assign.
     */
    execCommand(commandId: string, showUI?: boolean, value?: string): boolean;
    /**
     * Stops document's fullscreen element from being displayed fullscreen and resolves promise when done.
     */
    exitFullscreen(): Promise<void>;
    exitPointerLock(): void;
    getAnimations(): Animation[];
    /**
     * Returns a reference to the first object with the specified value of the ID or NAME attribute.
     * @param elementId String that specifies the ID value. Case-insensitive.
     */
    getElementById(elementId: string): HTMLElement | null;
    /**
     * Returns a HTMLCollection of the elements in the object on which the method was invoked (a document or an element) that have all the classes given by classNames. The classNames argument is interpreted as a space-separated list of classes.
     */
    getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
    /**
     * Gets a collection of objects based on the value of the NAME or ID attribute.
     * @param elementName Gets a collection of objects based on the value of the NAME or ID attribute.
     */
    getElementsByName(elementName: string): NodeListOf<HTMLElement>;
    /**
     * Retrieves a collection of objects based on the specified element name.
     * @param name Specifies the name of an element.
     */
    getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
    getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
    getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
    /**
     * If namespace and localName are "*" returns a HTMLCollection of all descendant elements.
     *
     * If only namespace is "*" returns a HTMLCollection of all descendant elements whose local name is localName.
     *
     * If only localName is "*" returns a HTMLCollection of all descendant elements whose namespace is namespace.
     *
     * Otherwise, returns a HTMLCollection of all descendant elements whose namespace is namespace and local name is localName.
     */
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): HTMLCollectionOf<Element>;
    /**
     * Returns an object representing the current selection of the document that is loaded into the object displaying a webpage.
     */
    getSelection(): Selection | null;
    /**
     * Gets a value indicating whether the object currently has focus.
     */
    hasFocus(): boolean;
    /**
     * Returns a copy of node. If deep is true, the copy also includes the node's descendants.
     *
     * If node is a document or a shadow root, throws a "NotSupportedError" DOMException.
     */
    importNode<T extends Node>(importedNode: T, deep: boolean): T;
    /**
     * Opens a new window and loads a document specified by a given URL. Also, opens a new window that uses the url parameter and the name parameter to collect the output of the write method and the writeln method.
     * @param url Specifies a MIME type for the document.
     * @param name Specifies the name of the window. This name is used as the value for the TARGET attribute on a form or an anchor element.
     * @param features Contains a list of items separated by commas. Each item consists of an option and a value, separated by an equals sign (for example, "fullscreen=yes, toolbar=yes"). The following values are supported.
     * @param replace Specifies whether the existing entry for the document is replaced in the history list.
     */
    open(url?: string, name?: string, features?: string, replace?: boolean): Document;
    /**
     * Returns a Boolean value that indicates whether a specified command can be successfully executed using execCommand, given the current state of the document.
     * @param commandId Specifies a command identifier.
     */
    queryCommandEnabled(commandId: string): boolean;
    /**
     * Returns a Boolean value that indicates whether the specified command is in the indeterminate state.
     * @param commandId String that specifies a command identifier.
     */
    queryCommandIndeterm(commandId: string): boolean;
    /**
     * Returns a Boolean value that indicates the current state of the command.
     * @param commandId String that specifies a command identifier.
     */
    queryCommandState(commandId: string): boolean;
    /**
     * Returns a Boolean value that indicates whether the current command is supported on the current range.
     * @param commandId Specifies a command identifier.
     */
    queryCommandSupported(commandId: string): boolean;
    /**
     * Returns the current value of the document, range, or current selection for the given command.
     * @param commandId String that specifies a command identifier.
     */
    queryCommandValue(commandId: string): string;
    /** @deprecated */
    releaseEvents(): void;
    /**
     * Writes one or more HTML expressions to a document in the specified window.
     * @param content Specifies the text and HTML tags to write.
     */
    write(...text: string[]): void;
    /**
     * Writes one or more HTML expressions, followed by a carriage return, to a document in the specified window.
     * @param content The text and HTML tags to write.
     */
    writeln(...text: string[]): void;
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface DocumentAndElementEventHandlersEventMap {
    "copy": ClipboardEvent;
    "cut": ClipboardEvent;
    "paste": ClipboardEvent;
}
export interface DocumentAndElementEventHandlers {
    oncopy: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;
    oncut: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;
    onpaste: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;
    addEventListener<K extends keyof DocumentAndElementEventHandlersEventMap>(type: K, listener: (this: DocumentAndElementEventHandlers, ev: DocumentAndElementEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof DocumentAndElementEventHandlersEventMap>(type: K, listener: (this: DocumentAndElementEventHandlers, ev: DocumentAndElementEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface DocumentEvent {
    createEvent(eventInterface: "AnimationEvent"): AnimationEvent;
    createEvent(eventInterface: "AnimationPlaybackEvent"): AnimationPlaybackEvent;
    createEvent(eventInterface: "AudioProcessingEvent"): AudioProcessingEvent;
    createEvent(eventInterface: "BeforeUnloadEvent"): BeforeUnloadEvent;
    createEvent(eventInterface: "ClipboardEvent"): ClipboardEvent;
    createEvent(eventInterface: "CloseEvent"): CloseEvent;
    createEvent(eventInterface: "CompositionEvent"): CompositionEvent;
    createEvent(eventInterface: "CustomEvent"): CustomEvent;
    createEvent(eventInterface: "DeviceLightEvent"): DeviceLightEvent;
    createEvent(eventInterface: "DeviceMotionEvent"): DeviceMotionEvent;
    createEvent(eventInterface: "DeviceOrientationEvent"): DeviceOrientationEvent;
    createEvent(eventInterface: "DragEvent"): DragEvent;
    createEvent(eventInterface: "ErrorEvent"): ErrorEvent;
    createEvent(eventInterface: "Event"): Event;
    createEvent(eventInterface: "Events"): Event;
    createEvent(eventInterface: "FocusEvent"): FocusEvent;
    createEvent(eventInterface: "FocusNavigationEvent"): FocusNavigationEvent;
    createEvent(eventInterface: "GamepadEvent"): GamepadEvent;
    createEvent(eventInterface: "HashChangeEvent"): HashChangeEvent;
    createEvent(eventInterface: "IDBVersionChangeEvent"): IDBVersionChangeEvent;
    createEvent(eventInterface: "InputEvent"): InputEvent;
    createEvent(eventInterface: "KeyboardEvent"): KeyboardEvent;
    createEvent(eventInterface: "ListeningStateChangedEvent"): ListeningStateChangedEvent;
    createEvent(eventInterface: "MSGestureEvent"): MSGestureEvent;
    createEvent(eventInterface: "MSMediaKeyMessageEvent"): MSMediaKeyMessageEvent;
    createEvent(eventInterface: "MSMediaKeyNeededEvent"): MSMediaKeyNeededEvent;
    createEvent(eventInterface: "MSPointerEvent"): MSPointerEvent;
    createEvent(eventInterface: "MediaEncryptedEvent"): MediaEncryptedEvent;
    createEvent(eventInterface: "MediaKeyMessageEvent"): MediaKeyMessageEvent;
    createEvent(eventInterface: "MediaQueryListEvent"): MediaQueryListEvent;
    createEvent(eventInterface: "MediaStreamErrorEvent"): MediaStreamErrorEvent;
    createEvent(eventInterface: "MediaStreamEvent"): MediaStreamEvent;
    createEvent(eventInterface: "MediaStreamTrackEvent"): MediaStreamTrackEvent;
    createEvent(eventInterface: "MessageEvent"): MessageEvent;
    createEvent(eventInterface: "MouseEvent"): MouseEvent;
    createEvent(eventInterface: "MouseEvents"): MouseEvent;
    createEvent(eventInterface: "MutationEvent"): MutationEvent;
    createEvent(eventInterface: "MutationEvents"): MutationEvent;
    createEvent(eventInterface: "OfflineAudioCompletionEvent"): OfflineAudioCompletionEvent;
    createEvent(eventInterface: "OverflowEvent"): OverflowEvent;
    createEvent(eventInterface: "PageTransitionEvent"): PageTransitionEvent;
    createEvent(eventInterface: "PaymentRequestUpdateEvent"): PaymentRequestUpdateEvent;
    createEvent(eventInterface: "PermissionRequestedEvent"): PermissionRequestedEvent;
    createEvent(eventInterface: "PointerEvent"): PointerEvent;
    createEvent(eventInterface: "PopStateEvent"): PopStateEvent;
    createEvent(eventInterface: "ProgressEvent"): ProgressEvent;
    createEvent(eventInterface: "PromiseRejectionEvent"): PromiseRejectionEvent;
    createEvent(eventInterface: "RTCDTMFToneChangeEvent"): RTCDTMFToneChangeEvent;
    createEvent(eventInterface: "RTCDataChannelEvent"): RTCDataChannelEvent;
    createEvent(eventInterface: "RTCDtlsTransportStateChangedEvent"): RTCDtlsTransportStateChangedEvent;
    createEvent(eventInterface: "RTCErrorEvent"): RTCErrorEvent;
    createEvent(eventInterface: "RTCIceCandidatePairChangedEvent"): RTCIceCandidatePairChangedEvent;
    createEvent(eventInterface: "RTCIceGathererEvent"): RTCIceGathererEvent;
    createEvent(eventInterface: "RTCIceTransportStateChangedEvent"): RTCIceTransportStateChangedEvent;
    createEvent(eventInterface: "RTCPeerConnectionIceErrorEvent"): RTCPeerConnectionIceErrorEvent;
    createEvent(eventInterface: "RTCPeerConnectionIceEvent"): RTCPeerConnectionIceEvent;
    createEvent(eventInterface: "RTCSsrcConflictEvent"): RTCSsrcConflictEvent;
    createEvent(eventInterface: "RTCStatsEvent"): RTCStatsEvent;
    createEvent(eventInterface: "RTCTrackEvent"): RTCTrackEvent;
    createEvent(eventInterface: "SVGZoomEvent"): SVGZoomEvent;
    createEvent(eventInterface: "SVGZoomEvents"): SVGZoomEvent;
    createEvent(eventInterface: "SecurityPolicyViolationEvent"): SecurityPolicyViolationEvent;
    createEvent(eventInterface: "ServiceWorkerMessageEvent"): ServiceWorkerMessageEvent;
    createEvent(eventInterface: "SpeechRecognitionEvent"): SpeechRecognitionEvent;
    createEvent(eventInterface: "SpeechSynthesisErrorEvent"): SpeechSynthesisErrorEvent;
    createEvent(eventInterface: "SpeechSynthesisEvent"): SpeechSynthesisEvent;
    createEvent(eventInterface: "StorageEvent"): StorageEvent;
    createEvent(eventInterface: "TextEvent"): TextEvent;
    createEvent(eventInterface: "TouchEvent"): TouchEvent;
    createEvent(eventInterface: "TrackEvent"): TrackEvent;
    createEvent(eventInterface: "TransitionEvent"): TransitionEvent;
    createEvent(eventInterface: "UIEvent"): UIEvent;
    createEvent(eventInterface: "UIEvents"): UIEvent;
    createEvent(eventInterface: "VRDisplayEvent"): VRDisplayEvent;
    createEvent(eventInterface: "VRDisplayEvent "): VRDisplayEvent;
    createEvent(eventInterface: "WebGLContextEvent"): WebGLContextEvent;
    createEvent(eventInterface: "WheelEvent"): WheelEvent;
    createEvent(eventInterface: string): Event;
}
/** A minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document. The key difference is that because the document fragment isn't part of the active document tree structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made. */
export interface DocumentFragment extends Node, NonElementParentNode, ParentNode {
    getElementById(elementId: string): HTMLElement | null;
}
export interface DocumentOrShadowRoot {
    readonly activeElement: Element | null;
    /**
     * Returns document's fullscreen element.
     */
    readonly fullscreenElement: Element | null;
    readonly pointerLockElement: Element | null;
    /**
     * Retrieves a collection of styleSheet objects representing the style sheets that correspond to each instance of a link or style object in the document.
     */
    readonly styleSheets: StyleSheetList;
    caretPositionFromPoint(x: number, y: number): CaretPosition | null;
    /** @deprecated */
    caretRangeFromPoint(x: number, y: number): Range;
    elementFromPoint(x: number, y: number): Element | null;
    elementsFromPoint(x: number, y: number): Element[];
    getSelection(): Selection | null;
}
export interface DocumentTimeline extends AnimationTimeline {
}
/** A Node containing a doctype. */
export interface DocumentType extends Node, ChildNode {
    readonly name: string;
    readonly publicId: string;
    readonly systemId: string;
}
/** A DOM event that represents a drag and drop interaction. The user initiates a drag by placing a pointer device (such as a mouse) on the touch surface and then dragging the pointer to a new location (such as another DOM element). Applications are free to interpret a drag and drop interaction in an application-specific way. */
export interface DragEvent extends MouseEvent {
    /**
     * Returns the DataTransfer object for the event.
     */
    readonly dataTransfer: DataTransfer | null;
}
/** Inherits properties from its parent, AudioNode. */
export interface DynamicsCompressorNode extends AudioNode {
    readonly attack: AudioParam;
    readonly knee: AudioParam;
    readonly ratio: AudioParam;
    readonly reduction: number;
    readonly release: AudioParam;
    readonly threshold: AudioParam;
}
export interface EXT_blend_minmax {
    readonly MAX_EXT: GLenum;
    readonly MIN_EXT: GLenum;
}
/** The EXT_frag_depth extension is part of the WebGL API and enables to set a depth value of a fragment from within the fragment shader. */
export interface EXT_frag_depth {
}
export interface EXT_sRGB {
    readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT: GLenum;
    readonly SRGB8_ALPHA8_EXT: GLenum;
    readonly SRGB_ALPHA_EXT: GLenum;
    readonly SRGB_EXT: GLenum;
}
export interface EXT_shader_texture_lod {
}
/** The EXT_texture_filter_anisotropic extension is part of the WebGL API and exposes two constants for anisotropic filtering (AF). */
export interface EXT_texture_filter_anisotropic {
    readonly MAX_TEXTURE_MAX_ANISOTROPY_EXT: GLenum;
    readonly TEXTURE_MAX_ANISOTROPY_EXT: GLenum;
}
export interface ElementEventMap {
    "fullscreenchange": Event;
    "fullscreenerror": Event;
}
/** Element is the most general base class from which all objects in a Document inherit. It only has methods and properties common to all kinds of elements. More specific classes inherit from Element. */
export interface Element extends Node, Animatable, ChildNode, InnerHTML, NonDocumentTypeChildNode, ParentNode, Slotable {
    readonly assignedSlot: HTMLSlotElement | null;
    readonly attributes: NamedNodeMap;
    /**
     * Allows for manipulation of element's class content attribute as a set of whitespace-separated tokens through a DOMTokenList object.
     */
    readonly classList: DOMTokenList;
    /**
     * Returns the value of element's class content attribute. Can be set to change it.
     */
    className: string;
    readonly clientHeight: number;
    readonly clientLeft: number;
    readonly clientTop: number;
    readonly clientWidth: number;
    /**
     * Returns the value of element's id content attribute. Can be set to change it.
     */
    id: string;
    /**
     * Returns the local name.
     */
    readonly localName: string;
    /**
     * Returns the namespace.
     */
    readonly namespaceURI: string | null;
    onfullscreenchange: ((this: Element, ev: Event) => any) | null;
    onfullscreenerror: ((this: Element, ev: Event) => any) | null;
    outerHTML: string;
    /**
     * Returns the namespace prefix.
     */
    readonly prefix: string | null;
    readonly scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    readonly scrollWidth: number;
    /**
     * Returns element's shadow root, if any, and if shadow root's mode is "open", and null otherwise.
     */
    readonly shadowRoot: ShadowRoot | null;
    /**
     * Returns the value of element's slot content attribute. Can be set to change it.
     */
    slot: string;
    /**
     * Returns the HTML-uppercased qualified name.
     */
    readonly tagName: string;
    /**
     * Creates a shadow root for element and returns it.
     */
    attachShadow(init: ShadowRootInit): ShadowRoot;
    /**
     * Returns the first (starting at element) inclusive ancestor that matches selectors, and null otherwise.
     */
    closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
    closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
    closest<E extends Element = Element>(selector: string): E | null;
    /**
     * Returns element's first attribute whose qualified name is qualifiedName, and null if there is no such attribute otherwise.
     */
    getAttribute(qualifiedName: string): string | null;
    /**
     * Returns element's attribute whose namespace is namespace and local name is localName, and null if there is no such attribute otherwise.
     */
    getAttributeNS(namespace: string | null, localName: string): string | null;
    /**
     * Returns the qualified names of all element's attributes. Can contain duplicates.
     */
    getAttributeNames(): string[];
    getAttributeNode(name: string): Attr | null;
    getAttributeNodeNS(namespaceURI: string, localName: string): Attr | null;
    getBoundingClientRect(): DOMRect;
    getClientRects(): DOMRectList;
    /**
     * Returns a HTMLCollection of the elements in the object on which the method was invoked (a document or an element) that have all the classes given by classNames. The classNames argument is interpreted as a space-separated list of classes.
     */
    getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
    getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
    getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
    getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): HTMLCollectionOf<Element>;
    /**
     * Returns true if element has an attribute whose qualified name is qualifiedName, and false otherwise.
     */
    hasAttribute(qualifiedName: string): boolean;
    /**
     * Returns true if element has an attribute whose namespace is namespace and local name is localName.
     */
    hasAttributeNS(namespace: string | null, localName: string): boolean;
    /**
     * Returns true if element has attributes, and false otherwise.
     */
    hasAttributes(): boolean;
    hasPointerCapture(pointerId: number): boolean;
    insertAdjacentElement(position: InsertPosition, insertedElement: Element): Element | null;
    insertAdjacentHTML(where: InsertPosition, html: string): void;
    insertAdjacentText(where: InsertPosition, text: string): void;
    /**
     * Returns true if matching selectors against element's root yields element, and false otherwise.
     */
    matches(selectors: string): boolean;
    msGetRegionContent(): any;
    releasePointerCapture(pointerId: number): void;
    /**
     * Removes element's first attribute whose qualified name is qualifiedName.
     */
    removeAttribute(qualifiedName: string): void;
    /**
     * Removes element's attribute whose namespace is namespace and local name is localName.
     */
    removeAttributeNS(namespace: string | null, localName: string): void;
    removeAttributeNode(attr: Attr): Attr;
    /**
     * Displays element fullscreen and resolves promise when done.
     *
     * When supplied, options's navigationUI member indicates whether showing navigation UI while in fullscreen is preferred or not. If set to "show", navigation simplicity is preferred over screen space, and if set to "hide", more screen space is preferred. User agents are always free to honor user preference over the application's. The default value "auto" indicates no application preference.
     */
    requestFullscreen(options?: FullscreenOptions): Promise<void>;
    requestPointerLock(): void;
    scroll(options?: ScrollToOptions): void;
    scroll(x: number, y: number): void;
    scrollBy(options?: ScrollToOptions): void;
    scrollBy(x: number, y: number): void;
    scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
    /**
     * Sets the value of element's first attribute whose qualified name is qualifiedName to value.
     */
    setAttribute(qualifiedName: string, value: string): void;
    /**
     * Sets the value of element's attribute whose namespace is namespace and local name is localName to value.
     */
    setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void;
    setAttributeNode(attr: Attr): Attr | null;
    setAttributeNodeNS(attr: Attr): Attr | null;
    setPointerCapture(pointerId: number): void;
    /**
     * If force is not given, "toggles" qualifiedName, removing it if it is present and adding it if it is not present. If force is true, adds qualifiedName. If force is false, removes qualifiedName.
     *
     * Returns true if qualifiedName is now present, and false otherwise.
     */
    toggleAttribute(qualifiedName: string, force?: boolean): boolean;
    webkitMatchesSelector(selectors: string): boolean;
    addEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: Element, ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: Element, ev: ElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface ElementCSSInlineStyle {
    readonly style: CSSStyleDeclaration;
}
export interface ElementContentEditable {
    contentEditable: string;
    inputMode: string;
    readonly isContentEditable: boolean;
}
/** Events providing information related to errors in scripts or in files. */
export interface ErrorEvent extends Event {
    readonly colno: number;
    readonly error: any;
    readonly filename: string;
    readonly lineno: number;
    readonly message: string;
}
/** An event which takes place in the DOM. */
export interface Event {
    /**
     * Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.
     */
    readonly bubbles: boolean;
    cancelBubble: boolean;
    /**
     * Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.
     */
    readonly cancelable: boolean;
    /**
     * Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.
     */
    readonly composed: boolean;
    /**
     * Returns the object whose event listener's callback is currently being invoked.
     */
    readonly currentTarget: EventTarget | null;
    /**
     * Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.
     */
    readonly defaultPrevented: boolean;
    /**
     * Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE.
     */
    readonly eventPhase: number;
    /**
     * Returns true if event was dispatched by the user agent, and false otherwise.
     */
    readonly isTrusted: boolean;
    returnValue: boolean;
    /** @deprecated */
    readonly srcElement: EventTarget | null;
    /**
     * Returns the object to which event is dispatched (its target).
     */
    readonly target: EventTarget | null;
    /**
     * Returns the event's timestamp as the number of milliseconds measured relative to the time origin.
     */
    readonly timeStamp: number;
    /**
     * Returns the type of event, e.g. "click", "hashchange", or "submit".
     */
    readonly type: string;
    /**
     * Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.
     */
    composedPath(): EventTarget[];
    initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
    /**
     * If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.
     */
    preventDefault(): void;
    /**
     * Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.
     */
    stopImmediatePropagation(): void;
    /**
     * When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.
     */
    stopPropagation(): void;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
}
export interface EventListenerObject {
    handleEvent(evt: Event): void;
}
export interface EventSourceEventMap {
    "error": Event;
    "message": MessageEvent;
    "open": Event;
}
export interface EventSource extends EventTarget {
    onerror: ((this: EventSource, ev: Event) => any) | null;
    onmessage: ((this: EventSource, ev: MessageEvent) => any) | null;
    onopen: ((this: EventSource, ev: Event) => any) | null;
    /**
     * Returns the state of this EventSource object's connection. It can have the values described below.
     */
    readonly readyState: number;
    /**
     * Returns the URL providing the event stream.
     */
    readonly url: string;
    /**
     * Returns true if the credentials mode for connection requests to the URL providing the event stream is set to "include", and false otherwise.
     */
    readonly withCredentials: boolean;
    /**
     * Aborts any instances of the fetch algorithm started for this EventSource object, and sets the readyState attribute to CLOSED.
     */
    close(): void;
    readonly CLOSED: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    addEventListener<K extends keyof EventSourceEventMap>(type: K, listener: (this: EventSource, ev: EventSourceEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof EventSourceEventMap>(type: K, listener: (this: EventSource, ev: EventSourceEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** EventTarget is a DOM interface implemented by objects that can receive events and may have listeners for them. */
export interface EventTarget {
    /**
     * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
     *
     * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
     *
     * When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
     *
     * When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
     *
     * When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
     *
     * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
    /**
     * Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
     */
    dispatchEvent(event: Event): boolean;
    /**
     * Removes the event listener in target's event listener list with the same type, callback, and options.
     */
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}
export interface ExtensionScriptApis {
    extensionIdToShortId(extensionId: string): number;
    fireExtensionApiTelemetry(functionName: string, isSucceeded: boolean, isSupported: boolean, errorString: string): void;
    genericFunction(routerAddress: any, parameters?: string, callbackId?: number): void;
    genericSynchronousFunction(functionId: number, parameters?: string): string;
    genericWebRuntimeCallout(to: any, from: any, payload: string): void;
    getExtensionId(): string;
    registerGenericFunctionCallbackHandler(callbackHandler: Function): void;
    registerGenericPersistentCallbackHandler(callbackHandler: Function): void;
    registerWebRuntimeCallbackHandler(handler: Function): any;
}
export interface External {
    /** @deprecated */
    AddSearchProvider(): void;
    /** @deprecated */
    IsSearchProviderInstalled(): void;
}
/** Provides information about files and allows JavaScript in a web page to access their content. */
export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
/** An object of this type is returned by the files property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element. It's also used for a list of files dropped into web content when using the drag and drop API; see the DataTransfer object for details on this usage. */
export interface FileList {
    readonly length: number;
    item(index: number): File | null;
    [index: number]: File;
}
export interface FileReaderEventMap {
    "abort": ProgressEvent<FileReader>;
    "error": ProgressEvent<FileReader>;
    "load": ProgressEvent<FileReader>;
    "loadend": ProgressEvent<FileReader>;
    "loadstart": ProgressEvent<FileReader>;
    "progress": ProgressEvent<FileReader>;
}
/** Lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read. */
export interface FileReader extends EventTarget {
    readonly error: DOMException | null;
    onabort: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onloadstart: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onprogress: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    readonly readyState: number;
    readonly result: string | ArrayBuffer | null;
    abort(): void;
    readAsArrayBuffer(blob: Blob): void;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): void;
    readAsText(blob: Blob, encoding?: string): void;
    readonly DONE: number;
    readonly EMPTY: number;
    readonly LOADING: number;
    addEventListener<K extends keyof FileReaderEventMap>(type: K, listener: (this: FileReader, ev: FileReaderEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof FileReaderEventMap>(type: K, listener: (this: FileReader, ev: FileReaderEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Focus-related events like focus, blur, focusin, or focusout. */
export interface FocusEvent extends UIEvent {
    readonly relatedTarget: EventTarget | null;
}
export interface FocusNavigationEvent extends Event {
    readonly navigationReason: NavigationReason;
    readonly originHeight: number;
    readonly originLeft: number;
    readonly originTop: number;
    readonly originWidth: number;
    requestFocus(): void;
}
/** Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". */
export interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
    forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}
/** A change in volume. It is an AudioNode audio-processing module that causes a given gain to be applied to the input data before its propagation to the output. A GainNode always has exactly one input and one output, both with the same number of channels. */
export interface GainNode extends AudioNode {
    readonly gain: AudioParam;
}
/** This Gamepad API interface defines an individual gamepad or other controller, allowing access to information such as button presses, axis positions, and id. */
export interface Gamepad {
    readonly axes: ReadonlyArray<number>;
    readonly buttons: ReadonlyArray<GamepadButton>;
    readonly connected: boolean;
    readonly hand: GamepadHand;
    readonly hapticActuators: ReadonlyArray<GamepadHapticActuator>;
    readonly id: string;
    readonly index: number;
    readonly mapping: GamepadMappingType;
    readonly pose: GamepadPose | null;
    readonly timestamp: number;
}
/** An individual button of a gamepad or other controller, allowing access to the current state of different types of buttons available on the control device. */
export interface GamepadButton {
    readonly pressed: boolean;
    readonly touched: boolean;
    readonly value: number;
}
/** This Gamepad API interface contains references to gamepads connected to the system, which is what the gamepad events Window.gamepadconnected and Window.gamepaddisconnected are fired in response to. */
export interface GamepadEvent extends Event {
    readonly gamepad: Gamepad;
}
/** This Gamepad API interface represents hardware in the controller designed to provide haptic feedback to the user (if available), most commonly vibration hardware. */
export interface GamepadHapticActuator {
    readonly type: GamepadHapticActuatorType;
    pulse(value: number, duration: number): Promise<boolean>;
}
/** This Gamepad API interface represents the pose of a WebVR controller at a given timestamp (which includes orientation, position, velocity, and acceleration information.) */
export interface GamepadPose {
    readonly angularAcceleration: Float32Array | null;
    readonly angularVelocity: Float32Array | null;
    readonly hasOrientation: boolean;
    readonly hasPosition: boolean;
    readonly linearAcceleration: Float32Array | null;
    readonly linearVelocity: Float32Array | null;
    readonly orientation: Float32Array | null;
    readonly position: Float32Array | null;
}
export interface GenericTransformStream {
    /**
     * Returns a readable stream whose chunks are strings resulting from running encoding's decoder on the chunks written to writable.
     */
    readonly readable: ReadableStream;
    /**
     * Returns a writable stream which accepts [AllowShared] BufferSource chunks and runs them through encoding's decoder before making them available to readable.
     *
     * Typically this will be used via the pipeThrough() method on a ReadableStream source.
     *
     * ```
     * var decoder = new TextDecoderStream(encoding);
     * byteReadable
     *   .pipeThrough(decoder)
     *   .pipeTo(textWritable);
     * ```
     *
     * If the error mode is "fatal" and encoding's decoder returns error, both readable and writable will be errored with a TypeError.
     */
    readonly writable: WritableStream;
}
/** An object able to programmatically obtain the position of the device. It gives Web content access to the location of the device. This allows a Web site or app to offer customized results based on the user's location. */
export interface Geolocation {
    clearWatch(watchId: number): void;
    getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): void;
    watchPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): number;
}
export interface GlobalEventHandlersEventMap {
    "abort": UIEvent;
    "animationcancel": AnimationEvent;
    "animationend": AnimationEvent;
    "animationiteration": AnimationEvent;
    "animationstart": AnimationEvent;
    "auxclick": MouseEvent;
    "blur": FocusEvent;
    "cancel": Event;
    "canplay": Event;
    "canplaythrough": Event;
    "change": Event;
    "click": MouseEvent;
    "close": Event;
    "contextmenu": MouseEvent;
    "cuechange": Event;
    "dblclick": MouseEvent;
    "drag": DragEvent;
    "dragend": DragEvent;
    "dragenter": DragEvent;
    "dragexit": Event;
    "dragleave": DragEvent;
    "dragover": DragEvent;
    "dragstart": DragEvent;
    "drop": DragEvent;
    "durationchange": Event;
    "emptied": Event;
    "ended": Event;
    "error": ErrorEvent;
    "focus": FocusEvent;
    "focusin": FocusEvent;
    "focusout": FocusEvent;
    "gotpointercapture": PointerEvent;
    "input": Event;
    "invalid": Event;
    "keydown": KeyboardEvent;
    "keypress": KeyboardEvent;
    "keyup": KeyboardEvent;
    "load": Event;
    "loadeddata": Event;
    "loadedmetadata": Event;
    "loadstart": Event;
    "lostpointercapture": PointerEvent;
    "mousedown": MouseEvent;
    "mouseenter": MouseEvent;
    "mouseleave": MouseEvent;
    "mousemove": MouseEvent;
    "mouseout": MouseEvent;
    "mouseover": MouseEvent;
    "mouseup": MouseEvent;
    "pause": Event;
    "play": Event;
    "playing": Event;
    "pointercancel": PointerEvent;
    "pointerdown": PointerEvent;
    "pointerenter": PointerEvent;
    "pointerleave": PointerEvent;
    "pointermove": PointerEvent;
    "pointerout": PointerEvent;
    "pointerover": PointerEvent;
    "pointerup": PointerEvent;
    "progress": ProgressEvent;
    "ratechange": Event;
    "reset": Event;
    "resize": UIEvent;
    "scroll": Event;
    "securitypolicyviolation": SecurityPolicyViolationEvent;
    "seeked": Event;
    "seeking": Event;
    "select": Event;
    "selectionchange": Event;
    "selectstart": Event;
    "stalled": Event;
    "submit": Event;
    "suspend": Event;
    "timeupdate": Event;
    "toggle": Event;
    "touchcancel": TouchEvent;
    "touchend": TouchEvent;
    "touchmove": TouchEvent;
    "touchstart": TouchEvent;
    "transitioncancel": TransitionEvent;
    "transitionend": TransitionEvent;
    "transitionrun": TransitionEvent;
    "transitionstart": TransitionEvent;
    "volumechange": Event;
    "waiting": Event;
    "wheel": WheelEvent;
}
export interface GlobalEventHandlers {
    /**
     * Fires when the user aborts the download.
     * @param ev The event.
     */
    onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    onanimationcancel: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationend: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationiteration: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationstart: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onauxclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the object loses the input focus.
     * @param ev The focus event.
     */
    onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
    oncancel: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when playback is possible, but would require further buffering.
     * @param ev The event.
     */
    oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the contents of the object or selection have changed.
     * @param ev The event.
     */
    onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user clicks the left mouse button on the object
     * @param ev The mouse event.
     */
    onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user clicks the right mouse button in the client area, opening the context menu.
     * @param ev The mouse event.
     */
    oncontextmenu: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user double-clicks the object.
     * @param ev The mouse event.
     */
    ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires on the source object continuously during a drag operation.
     * @param ev The event.
     */
    ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the source object when the user releases the mouse at the close of a drag operation.
     * @param ev The event.
     */
    ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the target element when the user drags the object to a valid drop target.
     * @param ev The drag event.
     */
    ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondragexit: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
     * @param ev The drag event.
     */
    ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the target element continuously while the user drags the object over a valid drop target.
     * @param ev The event.
     */
    ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the source object when the user starts to drag a text selection or selected object.
     * @param ev The event.
     */
    ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Occurs when the duration attribute is updated.
     * @param ev The event.
     */
    ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the media element is reset to its initial state.
     * @param ev The event.
     */
    onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the end of playback is reached.
     * @param ev The event
     */
    onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when an error occurs during object loading.
     * @param ev The event.
     */
    onerror: OnErrorEventHandler;
    /**
     * Fires when the object receives focus.
     * @param ev The event.
     */
    onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
    ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user presses a key.
     * @param ev The keyboard event
     */
    onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires when the user presses an alphanumeric key.
     * @param ev The event.
     */
    onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires when the user releases a key.
     * @param ev The keyboard event
     */
    onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires immediately after the browser loads the object.
     * @param ev The event.
     */
    onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when media data is loaded at the current playback position.
     * @param ev The event.
     */
    onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the duration and dimensions of the media have been determined.
     * @param ev The event.
     */
    onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when Internet Explorer begins looking for media data.
     * @param ev The event.
     */
    onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    /**
     * Fires when the user clicks the object with either mouse button.
     * @param ev The mouse event.
     */
    onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse over the object.
     * @param ev The mouse event.
     */
    onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse pointer outside the boundaries of the object.
     * @param ev The mouse event.
     */
    onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse pointer into the object.
     * @param ev The mouse event.
     */
    onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user releases a mouse button while the mouse is over the object.
     * @param ev The mouse event.
     */
    onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Occurs when playback is paused.
     * @param ev The event.
     */
    onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the play method is requested.
     * @param ev The event.
     */
    onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the audio or video has started playing.
     * @param ev The event.
     */
    onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    /**
     * Occurs to indicate progress while downloading media data.
     * @param ev The event.
     */
    onprogress: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
    /**
     * Occurs when the playback rate is increased or decreased.
     * @param ev The event.
     */
    onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user resets a form.
     * @param ev The event.
     */
    onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    /**
     * Fires when the user repositions the scroll box in the scroll bar on the object.
     * @param ev The event.
     */
    onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onsecuritypolicyviolation: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
    /**
     * Occurs when the seek operation ends.
     * @param ev The event.
     */
    onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the current playback position is moved.
     * @param ev The event.
     */
    onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the current selection changes.
     * @param ev The event.
     */
    onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the download has stopped.
     * @param ev The event.
     */
    onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onsubmit: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs if the load operation has been intentionally halted.
     * @param ev The event.
     */
    onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs to indicate the current playback position.
     * @param ev The event.
     */
    ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    ontoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
    ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
    ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
    ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
    ontransitioncancel: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionend: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionrun: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionstart: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    /**
     * Occurs when the volume is changed, or playback is muted or unmuted.
     * @param ev The event.
     */
    onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when playback stops because the next frame of a video resource is not available.
     * @param ev The event.
     */
    onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
    addEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLAllCollection {
    /**
     * Returns the number of elements in the collection.
     */
    readonly length: number;
    /**
     * Returns the item with index index from the collection (determined by tree order).
     */
    item(nameOrIndex?: string): HTMLCollection | Element | null;
    /**
     * Returns the item with ID or name name from the collection.
     *
     * If there are multiple matching items, then an HTMLCollection object containing all those elements is returned.
     *
     * Only button, form, iframe, input, map, meta, object, select, and textarea elements can have a name for the purpose of this method; their name is given by the value of their name attribute.
     */
    namedItem(name: string): HTMLCollection | Element | null;
    [index: number]: Element;
}
/** Hyperlink elements and provides special properties and methods (beyond those of the regular HTMLElement object interface that they inherit from) for manipulating the layout and presentation of such elements. */
export interface HTMLAnchorElement extends HTMLElement, HTMLHyperlinkElementUtils {
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    /** @deprecated */
    charset: string;
    /**
     * Sets or retrieves the coordinates of the object.
     */
    /** @deprecated */
    coords: string;
    download: string;
    /**
     * Sets or retrieves the language code of the object.
     */
    hreflang: string;
    /**
     * Sets or retrieves the shape of the object.
     */
    /** @deprecated */
    name: string;
    ping: string;
    referrerPolicy: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    rel: string;
    readonly relList: DOMTokenList;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    /** @deprecated */
    rev: string;
    /**
     * Sets or retrieves the shape of the object.
     */
    /** @deprecated */
    shape: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target: string;
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text: string;
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAnchorElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAnchorElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLAppletElement extends HTMLElement {
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    /** @deprecated */
    alt: string;
    /**
     * Sets or retrieves a character string that can be used to implement your own archive functionality for the object.
     */
    /** @deprecated */
    archive: string;
    /** @deprecated */
    code: string;
    /**
     * Sets or retrieves the URL of the component.
     */
    /** @deprecated */
    codeBase: string;
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the height of the object.
     */
    /** @deprecated */
    height: string;
    /** @deprecated */
    hspace: number;
    /**
     * Sets or retrieves the shape of the object.
     */
    /** @deprecated */
    name: string;
    /** @deprecated */
    object: string;
    /** @deprecated */
    vspace: number;
    /** @deprecated */
    width: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAppletElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAppletElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond those of the regular object HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <area> elements. */
export interface HTMLAreaElement extends HTMLElement, HTMLHyperlinkElementUtils {
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt: string;
    /**
     * Sets or retrieves the coordinates of the object.
     */
    coords: string;
    download: string;
    /**
     * Sets or gets whether clicks in this region cause action.
     */
    /** @deprecated */
    noHref: boolean;
    ping: string;
    referrerPolicy: string;
    rel: string;
    readonly relList: DOMTokenList;
    /**
     * Sets or retrieves the shape of the object.
     */
    shape: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides access to the properties of <audio> elements, as well as methods to manipulate them. It derives from the HTMLMediaElement interface. */
export interface HTMLAudioElement extends HTMLMediaElement {
    addEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A HTML line break element (<br>). It inherits from HTMLElement. */
export interface HTMLBRElement extends HTMLElement {
    /**
     * Sets or retrieves the side on which floating objects are not to be positioned when any IHTMLBlockElement is inserted into the document.
     */
    /** @deprecated */
    clear: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBRElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBRElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Contains the base URI for a document. This object inherits all of the properties and methods as described in the HTMLElement interface. */
export interface HTMLBaseElement extends HTMLElement {
    /**
     * Gets or sets the baseline URL on which relative links are based.
     */
    href: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBaseElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBaseElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <basefont> elements. */
export interface HTMLBaseFontElement extends HTMLElement, DOML2DeprecatedColorProperty {
    /**
     * Sets or retrieves the current typeface family.
     */
    /** @deprecated */
    face: string;
    /**
     * Sets or retrieves the font size of the object.
     */
    /** @deprecated */
    size: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBaseFontElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLBaseFontElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLBodyElementEventMap extends HTMLElementEventMap, WindowEventHandlersEventMap {
    "orientationchange": Event;
}
/** Provides special properties (beyond those inherited from the regular HTMLElement interface) for manipulating <body> elements. */
export interface HTMLBodyElement extends HTMLElement, WindowEventHandlers {
    /** @deprecated */
    aLink: string;
    /** @deprecated */
    background: string;
    /** @deprecated */
    bgColor: string;
    /** @deprecated */
    link: string;
    /** @deprecated */
    onorientationchange: ((this: HTMLBodyElement, ev: Event) => any) | null;
    /** @deprecated */
    text: string;
    /** @deprecated */
    vLink: string;
    addEventListener<K extends keyof HTMLBodyElementEventMap>(type: K, listener: (this: HTMLBodyElement, ev: HTMLBodyElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLBodyElementEventMap>(type: K, listener: (this: HTMLBodyElement, ev: HTMLBodyElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <button> elements. */
export interface HTMLButtonElement extends HTMLElement {
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Overrides the action attribute (where the data on a form is sent) on the parent form element.
     */
    formAction: string;
    /**
     * Used to override the encoding (formEnctype attribute) specified on the form element.
     */
    formEnctype: string;
    /**
     * Overrides the submit method attribute previously specified on a form element.
     */
    formMethod: string;
    /**
     * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option.
     */
    formNoValidate: boolean;
    /**
     * Overrides the target attribute on a form element.
     */
    formTarget: string;
    readonly labels: NodeListOf<HTMLLabelElement>;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    /**
     * Gets the classification and default behavior of the button.
     */
    type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Sets or retrieves the default or selected value of the control.
     */
    value: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLButtonElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLButtonElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides properties and methods for manipulating the layout and presentation of <canvas> elements. The HTMLCanvasElement interface also inherits the properties and methods of the HTMLElement interface. */
export interface HTMLCanvasElement extends HTMLElement {
    /**
     * Gets or sets the height of a canvas element on a document.
     */
    height: number;
    /**
     * Gets or sets the width of a canvas element on a document.
     */
    width: number;
    /**
     * Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document. A context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.
     * @param contextId The identifier (ID) of the type of canvas to create. Internet Explorer 9 and Internet Explorer 10 support only a 2-D context using canvas.getContext("2d"); IE11 Preview also supports 3-D or WebGL context using canvas.getContext("experimental-webgl");
     */
    getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
    getContext(contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    getContext(contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
    getContext(contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;
    getContext(contextId: string, options?: any): RenderingContext | null;
    toBlob(callback: BlobCallback, type?: string, quality?: any): void;
    /**
     * Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
     * @param type The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
     */
    toDataURL(type?: string, quality?: any): string;
    transferControlToOffscreen(): OffscreenCanvas;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A generic collection (array-like object similar to arguments) of elements (in document order) and offers methods and properties for selecting from the list. */
export interface HTMLCollectionBase {
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    readonly length: number;
    /**
     * Retrieves an object from various collections.
     */
    item(index: number): Element | null;
    [index: number]: Element;
}
export interface HTMLCollection extends HTMLCollectionBase {
    /**
     * Retrieves a select object or an object from an options collection.
     */
    namedItem(name: string): Element | null;
}
export interface HTMLCollectionOf<T extends Element> extends HTMLCollectionBase {
    item(index: number): T | null;
    namedItem(name: string): T | null;
    [index: number]: T;
}
/** Provides special properties (beyond those of the regular HTMLElement interface it also has available to it by inheritance) for manipulating definition list (<dl>) elements. */
export interface HTMLDListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <data> elements. */
export interface HTMLDataElement extends HTMLElement {
    value: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDataElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDataElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the HTMLElement object interface it also has available to it by inheritance) to manipulate <datalist> elements and their content. */
export interface HTMLDataListElement extends HTMLElement {
    readonly options: HTMLCollectionOf<HTMLOptionElement>;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDataListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDataListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLDetailsElement extends HTMLElement {
    open: boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDetailsElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDetailsElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLDialogElement extends HTMLElement {
    open: boolean;
    returnValue: string;
    close(returnValue?: string): void;
    show(): void;
    showModal(): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDialogElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDialogElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLDirectoryElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDirectoryElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDirectoryElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <div> elements. */
export interface HTMLDivElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The HTMLDocument property of Window objects is an alias that browsers expose for the Document interface object. */
export interface HTMLDocument extends Document {
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: HTMLDocument, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: HTMLDocument, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLElementEventMap extends ElementEventMap, GlobalEventHandlersEventMap, DocumentAndElementEventHandlersEventMap {
}
/** Any HTML element. Some elements directly implement this interface, while others implement it via an interface that inherits it. */
export interface HTMLElement extends Element, DocumentAndElementEventHandlers, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
    accessKey: string;
    readonly accessKeyLabel: string;
    autocapitalize: string;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    innerText: string;
    lang: string;
    readonly offsetHeight: number;
    readonly offsetLeft: number;
    readonly offsetParent: Element | null;
    readonly offsetTop: number;
    readonly offsetWidth: number;
    spellcheck: boolean;
    title: string;
    translate: boolean;
    click(): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <embed> elements. */
export interface HTMLEmbedElement extends HTMLElement {
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height: string;
    /**
     * Sets or retrieves the name of the object.
     */
    /** @deprecated */
    name: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    src: string;
    type: string;
    /**
     * Sets or retrieves the width of the object.
     */
    width: string;
    getSVGDocument(): Document | null;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLEmbedElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLEmbedElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <fieldset> elements. */
export interface HTMLFieldSetElement extends HTMLElement {
    disabled: boolean;
    readonly elements: HTMLCollection;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    name: string;
    readonly type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFieldSetElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFieldSetElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Implements the document object model (DOM) representation of the font element. The HTML Font Element <font> defines the font size, font face and color of text. */
export interface HTMLFontElement extends HTMLElement {
    /** @deprecated */
    color: string;
    /**
     * Sets or retrieves the current typeface family.
     */
    /** @deprecated */
    face: string;
    /** @deprecated */
    size: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFontElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFontElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A collection of HTML form control elements.  */
export interface HTMLFormControlsCollection extends HTMLCollectionBase {
    /**
     * Returns the item with ID or name name from the collection.
     *
     * If there are multiple matching items, then a RadioNodeList object containing all those elements is returned.
     */
    namedItem(name: string): RadioNodeList | Element | null;
}
/** A <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements. */
export interface HTMLFormElement extends HTMLElement {
    /**
     * Sets or retrieves a list of character encodings for input data that must be accepted by the server processing the form.
     */
    acceptCharset: string;
    /**
     * Sets or retrieves the URL to which the form content is sent for processing.
     */
    action: string;
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     */
    autocomplete: string;
    /**
     * Retrieves a collection, in source order, of all controls in a given form.
     */
    readonly elements: HTMLFormControlsCollection;
    /**
     * Sets or retrieves the MIME encoding for the form.
     */
    encoding: string;
    /**
     * Sets or retrieves the encoding type for the form.
     */
    enctype: string;
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    readonly length: number;
    /**
     * Sets or retrieves how to send the form data to the server.
     */
    method: string;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    /**
     * Designates a form that is not validated when submitted.
     */
    noValidate: boolean;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target: string;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /**
     * Fires when the user resets a form.
     */
    reset(): void;
    /**
     * Fires when a FORM is about to be submitted.
     */
    submit(): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFormElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFormElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    [index: number]: Element;
    [name: string]: any;
}
export interface HTMLFrameElement extends HTMLElement {
    /**
     * Retrieves the document object of the page or frame.
     */
    /** @deprecated */
    readonly contentDocument: Document | null;
    /**
     * Retrieves the object of the specified.
     */
    /** @deprecated */
    readonly contentWindow: WindowProxy | null;
    /**
     * Sets or retrieves whether to display a border for the frame.
     */
    /** @deprecated */
    frameBorder: string;
    /**
     * Sets or retrieves a URI to a long description of the object.
     */
    /** @deprecated */
    longDesc: string;
    /**
     * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
     */
    /** @deprecated */
    marginHeight: string;
    /**
     * Sets or retrieves the left and right margin widths before displaying the text in a frame.
     */
    /** @deprecated */
    marginWidth: string;
    /**
     * Sets or retrieves the frame name.
     */
    /** @deprecated */
    name: string;
    /**
     * Sets or retrieves whether the user can resize the frame.
     */
    /** @deprecated */
    noResize: boolean;
    /**
     * Sets or retrieves whether the frame can be scrolled.
     */
    /** @deprecated */
    scrolling: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    /** @deprecated */
    src: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFrameElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLFrameElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLFrameSetElementEventMap extends HTMLElementEventMap, WindowEventHandlersEventMap {
}
/** Provides special properties (beyond those of the regular HTMLElement interface they also inherit) for manipulating <frameset> elements. */
export interface HTMLFrameSetElement extends HTMLElement, WindowEventHandlers {
    /**
     * Sets or retrieves the frame widths of the object.
     */
    /** @deprecated */
    cols: string;
    /**
     * Sets or retrieves the frame heights of the object.
     */
    /** @deprecated */
    rows: string;
    addEventListener<K extends keyof HTMLFrameSetElementEventMap>(type: K, listener: (this: HTMLFrameSetElement, ev: HTMLFrameSetElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLFrameSetElementEventMap>(type: K, listener: (this: HTMLFrameSetElement, ev: HTMLFrameSetElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond those of the HTMLElement interface it also has available to it by inheritance) for manipulating <hr> elements. */
export interface HTMLHRElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    color: string;
    /**
     * Sets or retrieves whether the horizontal rule is drawn with 3-D shading.
     */
    /** @deprecated */
    noShade: boolean;
    /** @deprecated */
    size: string;
    /**
     * Sets or retrieves the width of the object.
     */
    /** @deprecated */
    width: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHRElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHRElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Contains the descriptive information, or metadata, for a document. This object inherits all of the properties and methods described in the HTMLElement interface. */
export interface HTMLHeadElement extends HTMLElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The different heading elements. It inherits methods and properties from the HTMLElement interface. */
export interface HTMLHeadingElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    /** @deprecated */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Serves as the root node for a given HTML document. This object inherits the properties and methods described in the HTMLElement interface. */
export interface HTMLHtmlElement extends HTMLElement {
    /**
     * Sets or retrieves the DTD version that governs the current document.
     */
    /** @deprecated */
    version: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHtmlElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHtmlElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLHyperlinkElementUtils {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    toString(): string;
    readonly origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    username: string;
}
/** Provides special properties and methods (beyond those of the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of inline frame elements. */
export interface HTMLIFrameElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    allow: string;
    allowFullscreen: boolean;
    allowPaymentRequest: boolean;
    /**
     * Retrieves the document object of the page or frame.
     */
    readonly contentDocument: Document | null;
    /**
     * Retrieves the object of the specified.
     */
    readonly contentWindow: WindowProxy | null;
    /**
     * Sets or retrieves whether to display a border for the frame.
     */
    /** @deprecated */
    frameBorder: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height: string;
    /**
     * Sets or retrieves a URI to a long description of the object.
     */
    /** @deprecated */
    longDesc: string;
    /**
     * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
     */
    /** @deprecated */
    marginHeight: string;
    /**
     * Sets or retrieves the left and right margin widths before displaying the text in a frame.
     */
    /** @deprecated */
    marginWidth: string;
    /**
     * Sets or retrieves the frame name.
     */
    name: string;
    referrerPolicy: ReferrerPolicy;
    readonly sandbox: DOMTokenList;
    /**
     * Sets or retrieves whether the frame can be scrolled.
     */
    /** @deprecated */
    scrolling: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    src: string;
    /**
     * Sets or retrives the content of the page that is to contain.
     */
    srcdoc: string;
    /**
     * Sets or retrieves the width of the object.
     */
    width: string;
    getSVGDocument(): Document | null;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLIFrameElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLIFrameElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods for manipulating <img> elements. */
export interface HTMLImageElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt: string;
    /**
     * Specifies the properties of a border drawn around an object.
     */
    /** @deprecated */
    border: string;
    /**
     * Retrieves whether the object is fully loaded.
     */
    readonly complete: boolean;
    crossOrigin: string | null;
    readonly currentSrc: string;
    decoding: "async" | "sync" | "auto";
    /**
     * Sets or retrieves the height of the object.
     */
    height: number;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     */
    /** @deprecated */
    hspace: number;
    /**
     * Sets or retrieves whether the image is a server-side image map.
     */
    isMap: boolean;
    /**
     * Sets or retrieves a Uniform Resource Identifier (URI) to a long description of the object.
     */
    /** @deprecated */
    longDesc: string;
    /** @deprecated */
    lowsrc: string;
    /**
     * Sets or retrieves the name of the object.
     */
    /** @deprecated */
    name: string;
    /**
     * The original height of the image resource before sizing.
     */
    readonly naturalHeight: number;
    /**
     * The original width of the image resource before sizing.
     */
    readonly naturalWidth: number;
    referrerPolicy: string;
    sizes: string;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src: string;
    srcset: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    useMap: string;
    /**
     * Sets or retrieves the vertical margin for the object.
     */
    /** @deprecated */
    vspace: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width: number;
    readonly x: number;
    readonly y: number;
    decode(): Promise<void>;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods for manipulating the options, layout, and presentation of <input> elements. */
export interface HTMLInputElement extends HTMLElement {
    /**
     * Sets or retrieves a comma-separated list of content types.
     */
    accept: string;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt: string;
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     */
    autocomplete: string;
    /**
     * Sets or retrieves the state of the check box or radio button.
     */
    checked: boolean;
    /**
     * Sets or retrieves the state of the check box or radio button.
     */
    defaultChecked: boolean;
    /**
     * Sets or retrieves the initial contents of the object.
     */
    defaultValue: string;
    dirName: string;
    disabled: boolean;
    /**
     * Returns a FileList object on a file type input object.
     */
    files: FileList | null;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Overrides the action attribute (where the data on a form is sent) on the parent form element.
     */
    formAction: string;
    /**
     * Used to override the encoding (formEnctype attribute) specified on the form element.
     */
    formEnctype: string;
    /**
     * Overrides the submit method attribute previously specified on a form element.
     */
    formMethod: string;
    /**
     * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option.
     */
    formNoValidate: boolean;
    /**
     * Overrides the target attribute on a form element.
     */
    formTarget: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height: number;
    indeterminate: boolean;
    readonly labels: NodeListOf<HTMLLabelElement> | null;
    /**
     * Specifies the ID of a pre-defined datalist of options for an input element.
     */
    readonly list: HTMLElement | null;
    /**
     * Defines the maximum acceptable value for an input element with type="number".When used with the min and step attributes, lets you control the range and increment (such as only even numbers) that the user can enter into an input field.
     */
    max: string;
    /**
     * Sets or retrieves the maximum number of characters that the user can enter in a text control.
     */
    maxLength: number;
    /**
     * Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field.
     */
    min: string;
    minLength: number;
    /**
     * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
     */
    multiple: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    /**
     * Gets or sets a string containing a regular expression that the user's input must match.
     */
    pattern: string;
    /**
     * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
     */
    placeholder: string;
    readOnly: boolean;
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required: boolean;
    selectionDirection: "forward" | "backward" | "none" | null;
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    selectionEnd: number | null;
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    selectionStart: number | null;
    size: number;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src: string;
    /**
     * Defines an increment or jump between values that you want to allow the user to enter. When used with the max and min attributes, lets you control the range and increment (for example, allow only even numbers) that the user can enter into an input field.
     */
    step: string;
    /**
     * Returns the content type of the object.
     */
    type: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    /** @deprecated */
    useMap: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Returns the value of the data at the cursor's current position.
     */
    value: string;
    /**
     * Returns a Date object representing the form control's value, if applicable; otherwise, returns null. Can be set, to change the value. Throws an "InvalidStateError" DOMException if the control isn't date- or time-based.
     */
    valueAsDate: Date | null;
    /**
     * Returns the input field value as a number.
     */
    valueAsNumber: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width: number;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /**
     * Makes the selection equal to the current object.
     */
    select(): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    setRangeText(replacement: string): void;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start: number, end: number, direction?: "forward" | "backward" | "none"): void;
    /**
     * Decrements a range input control's value by the value given by the Step attribute. If the optional parameter is used, it will decrement the input control's step value multiplied by the parameter's value.
     * @param n Value to decrement the value by.
     */
    stepDown(n?: number): void;
    /**
     * Increments a range input control's value by the value given by the Step attribute. If the optional parameter is used, will increment the input control's value by that value.
     * @param n Value to increment the value by.
     */
    stepUp(n?: number): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Exposes specific properties and methods (beyond those defined by regular HTMLElement interface it also has available to it by inheritance) for manipulating list elements. */
export interface HTMLLIElement extends HTMLElement {
    /** @deprecated */
    type: string;
    /**
     * Sets or retrieves the value of a list item.
     */
    value: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLIElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLIElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Gives access to properties specific to <label> elements. It inherits methods and properties from the base HTMLElement interface. */
export interface HTMLLabelElement extends HTMLElement {
    readonly control: HTMLElement | null;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the object to which the given label object is assigned.
     */
    htmlFor: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLabelElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLabelElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The HTMLLegendElement is an interface allowing to access properties of the <legend> elements. It inherits properties and methods from the HTMLElement interface. */
export interface HTMLLegendElement extends HTMLElement {
    /** @deprecated */
    align: string;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLegendElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLegendElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Reference information for external resources and the relationship of those resources to a document and vice-versa. This object inherits all of the properties and methods of the HTMLElement interface. */
export interface HTMLLinkElement extends HTMLElement, LinkStyle {
    as: string;
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    /** @deprecated */
    charset: string;
    crossOrigin: string | null;
    disabled: boolean;
    /**
     * Sets or retrieves a destination URL or an anchor point.
     */
    href: string;
    /**
     * Sets or retrieves the language code of the object.
     */
    hreflang: string;
    imageSizes: string;
    imageSrcset: string;
    integrity: string;
    /**
     * Sets or retrieves the media type.
     */
    media: string;
    referrerPolicy: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    rel: string;
    readonly relList: DOMTokenList;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    /** @deprecated */
    rev: string;
    readonly sizes: DOMTokenList;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    /** @deprecated */
    target: string;
    /**
     * Sets or retrieves the MIME type of the object.
     */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLinkElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLinkElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond those of the regular object HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of map elements. */
export interface HTMLMapElement extends HTMLElement {
    /**
     * Retrieves a collection of the area objects defined for the given map object.
     */
    readonly areas: HTMLCollection;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMapElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMapElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLMarqueeElementEventMap extends HTMLElementEventMap {
    "bounce": Event;
    "finish": Event;
    "start": Event;
}
/** Provides methods to manipulate <marquee> elements. */
export interface HTMLMarqueeElement extends HTMLElement {
    /** @deprecated */
    behavior: string;
    /** @deprecated */
    bgColor: string;
    /** @deprecated */
    direction: string;
    /** @deprecated */
    height: string;
    /** @deprecated */
    hspace: number;
    /** @deprecated */
    loop: number;
    /** @deprecated */
    onbounce: ((this: HTMLMarqueeElement, ev: Event) => any) | null;
    /** @deprecated */
    onfinish: ((this: HTMLMarqueeElement, ev: Event) => any) | null;
    /** @deprecated */
    onstart: ((this: HTMLMarqueeElement, ev: Event) => any) | null;
    /** @deprecated */
    scrollAmount: number;
    /** @deprecated */
    scrollDelay: number;
    /** @deprecated */
    trueSpeed: boolean;
    /** @deprecated */
    vspace: number;
    /** @deprecated */
    width: string;
    /** @deprecated */
    start(): void;
    /** @deprecated */
    stop(): void;
    addEventListener<K extends keyof HTMLMarqueeElementEventMap>(type: K, listener: (this: HTMLMarqueeElement, ev: HTMLMarqueeElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLMarqueeElementEventMap>(type: K, listener: (this: HTMLMarqueeElement, ev: HTMLMarqueeElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLMediaElementEventMap extends HTMLElementEventMap {
    "encrypted": MediaEncryptedEvent;
    "msneedkey": MSMediaKeyNeededEvent;
    "waitingforkey": Event;
}
/** Adds to HTMLElement the properties and methods needed to support basic media-related capabilities that are common to audio and video. */
export interface HTMLMediaElement extends HTMLElement {
    /**
     * Returns an AudioTrackList object with the audio tracks for a given video element.
     */
    readonly audioTracks: AudioTrackList;
    /**
     * Gets or sets a value that indicates whether to start playing the media automatically.
     */
    autoplay: boolean;
    /**
     * Gets a collection of buffered time ranges.
     */
    readonly buffered: TimeRanges;
    /**
     * Gets or sets a flag that indicates whether the client provides a set of controls for the media (in case the developer does not include controls for the player).
     */
    controls: boolean;
    crossOrigin: string | null;
    /**
     * Gets the address or URL of the current media resource that is selected by IHTMLMediaElement.
     */
    readonly currentSrc: string;
    /**
     * Gets or sets the current playback position, in seconds.
     */
    currentTime: number;
    defaultMuted: boolean;
    /**
     * Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio resource.
     */
    defaultPlaybackRate: number;
    /**
     * Returns the duration in seconds of the current media resource. A NaN value is returned if duration is not available, or Infinity if the media resource is streaming.
     */
    readonly duration: number;
    /**
     * Gets information about whether the playback has ended or not.
     */
    readonly ended: boolean;
    /**
     * Returns an object representing the current error state of the audio or video element.
     */
    readonly error: MediaError | null;
    /**
     * Gets or sets a flag to specify whether playback should restart after it completes.
     */
    loop: boolean;
    readonly mediaKeys: MediaKeys | null;
    /**
     * Specifies the purpose of the audio or video media, such as background audio or alerts.
     */
    msAudioCategory: string;
    /**
     * Specifies the output device id that the audio will be sent to.
     */
    msAudioDeviceType: string;
    readonly msGraphicsTrustStatus: MSGraphicsTrust;
    /**
     * Gets the MSMediaKeys object, which is used for decrypting media data, that is associated with this media element.
     */
    /** @deprecated */
    readonly msKeys: MSMediaKeys;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled: boolean;
    /**
     * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media content, which can be DRM protected, from a different location, such as a cloud media server.
     */
    msPlayToPreferredSourceUri: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary: boolean;
    /**
     * Gets the source associated with the media element for use by the PlayToManager.
     */
    readonly msPlayToSource: any;
    /**
     * Specifies whether or not to enable low-latency playback on the media element.
     */
    msRealTime: boolean;
    /**
     * Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted.
     */
    muted: boolean;
    /**
     * Gets the current network activity for the element.
     */
    readonly networkState: number;
    onencrypted: ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null;
    /** @deprecated */
    onmsneedkey: ((this: HTMLMediaElement, ev: MSMediaKeyNeededEvent) => any) | null;
    onwaitingforkey: ((this: HTMLMediaElement, ev: Event) => any) | null;
    /**
     * Gets a flag that specifies whether playback is paused.
     */
    readonly paused: boolean;
    /**
     * Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple of the normal speed of the media resource.
     */
    playbackRate: number;
    /**
     * Gets TimeRanges for the current media resource that has been played.
     */
    readonly played: TimeRanges;
    /**
     * Gets or sets the current playback position, in seconds.
     */
    preload: string;
    readonly readyState: number;
    /**
     * Returns a TimeRanges object that represents the ranges of the current media resource that can be seeked.
     */
    readonly seekable: TimeRanges;
    /**
     * Gets a flag that indicates whether the client is currently moving to a new playback position in the media resource.
     */
    readonly seeking: boolean;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src: string;
    srcObject: MediaStream | MediaSource | Blob | null;
    readonly textTracks: TextTrackList;
    readonly videoTracks: VideoTrackList;
    /**
     * Gets or sets the volume level for audio portions of the media element.
     */
    volume: number;
    addTextTrack(kind: TextTrackKind, label?: string, language?: string): TextTrack;
    /**
     * Returns a string that specifies whether the client can play a given media resource type.
     */
    canPlayType(type: string): CanPlayTypeResult;
    /**
     * Resets the audio or video object and loads a new media resource.
     */
    load(): void;
    /**
     * Clears all effects from the media pipeline.
     */
    msClearEffects(): void;
    msGetAsCastingSource(): any;
    /**
     * Inserts the specified audio effect into media pipeline.
     */
    msInsertAudioEffect(activatableClassId: string, effectRequired: boolean, config?: any): void;
    /** @deprecated */
    msSetMediaKeys(mediaKeys: MSMediaKeys): void;
    /**
     * Specifies the media protection manager for a given media pipeline.
     */
    msSetMediaProtectionManager(mediaProtectionManager?: any): void;
    /**
     * Pauses the current playback and sets paused to TRUE. This can be used to test whether the media is playing or paused. You can also use the pause or play events to tell whether the media is playing or not.
     */
    pause(): void;
    /**
     * Loads and starts playback of a media resource.
     */
    play(): Promise<void>;
    setMediaKeys(mediaKeys: MediaKeys | null): Promise<void>;
    readonly HAVE_CURRENT_DATA: number;
    readonly HAVE_ENOUGH_DATA: number;
    readonly HAVE_FUTURE_DATA: number;
    readonly HAVE_METADATA: number;
    readonly HAVE_NOTHING: number;
    readonly NETWORK_EMPTY: number;
    readonly NETWORK_IDLE: number;
    readonly NETWORK_LOADING: number;
    readonly NETWORK_NO_SOURCE: number;
    addEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLMenuElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMenuElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMenuElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Contains descriptive metadata about a document. It inherits all of the properties and methods described in the HTMLElement interface. */
export interface HTMLMetaElement extends HTMLElement {
    /**
     * Gets or sets meta-information to associate with httpEquiv or name.
     */
    content: string;
    /**
     * Gets or sets information used to bind the value of a content attribute of a meta element to an HTTP response header.
     */
    httpEquiv: string;
    /**
     * Sets or retrieves the value specified in the content attribute of the meta object.
     */
    name: string;
    /**
     * Sets or retrieves a scheme to be used in interpreting the value of a property specified for the object.
     */
    /** @deprecated */
    scheme: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMetaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMetaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The HTML <meter> elements expose the HTMLMeterElement interface, which provides special properties and methods (beyond the HTMLElement object interface they also have available to them by inheritance) for manipulating the layout and presentation of <meter> elements. */
export interface HTMLMeterElement extends HTMLElement {
    high: number;
    readonly labels: NodeListOf<HTMLLabelElement>;
    low: number;
    max: number;
    min: number;
    optimum: number;
    value: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMeterElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLMeterElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the regular methods and properties available through the HTMLElement interface they also have available to them by inheritance) for manipulating modification elements, that is <del> and <ins>. */
export interface HTMLModElement extends HTMLElement {
    /**
     * Sets or retrieves reference information about the object.
     */
    cite: string;
    /**
     * Sets or retrieves the date and time of a modification to the object.
     */
    dateTime: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLModElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLModElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond those defined on the regular HTMLElement interface it also has available to it by inheritance) for manipulating ordered list elements. */
export interface HTMLOListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    reversed: boolean;
    /**
     * The starting number.
     */
    start: number;
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond those on the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <object> element, representing external resources. */
export interface HTMLObjectElement extends HTMLElement {
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a character string that can be used to implement your own archive functionality for the object.
     */
    /** @deprecated */
    archive: string;
    /** @deprecated */
    border: string;
    /**
     * Sets or retrieves the URL of the file containing the compiled Java class.
     */
    /** @deprecated */
    code: string;
    /**
     * Sets or retrieves the URL of the component.
     */
    /** @deprecated */
    codeBase: string;
    /**
     * Sets or retrieves the Internet media type for the code associated with the object.
     */
    /** @deprecated */
    codeType: string;
    /**
     * Retrieves the document object of the page or frame.
     */
    readonly contentDocument: Document | null;
    readonly contentWindow: WindowProxy | null;
    /**
     * Sets or retrieves the URL that references the data of the object.
     */
    data: string;
    /** @deprecated */
    declare: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the height of the object.
     */
    height: string;
    /** @deprecated */
    hspace: number;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    /**
     * Sets or retrieves a message to be displayed while an object is loading.
     */
    /** @deprecated */
    standby: string;
    /**
     * Sets or retrieves the MIME type of the object.
     */
    type: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    useMap: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /** @deprecated */
    vspace: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    getSVGDocument(): Document | null;
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLObjectElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLObjectElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond the regular HTMLElement object interface they also have available to them by inheritance) for manipulating the layout and presentation of <optgroup> elements. */
export interface HTMLOptGroupElement extends HTMLElement {
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     */
    label: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOptGroupElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOptGroupElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** <option> elements and inherits all classes and methods of the HTMLElement interface. */
export interface HTMLOptionElement extends HTMLElement {
    /**
     * Sets or retrieves the status of an option.
     */
    defaultSelected: boolean;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the ordinal position of an option in a list box.
     */
    readonly index: number;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     */
    label: string;
    /**
     * Sets or retrieves whether the option in the list box is the default item.
     */
    selected: boolean;
    /**
     * Sets or retrieves the text string specified by the option tag.
     */
    text: string;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    value: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOptionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOptionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** HTMLOptionsCollection is an interface representing a collection of HTML option elements (in document order) and offers methods and properties for traversing the list as well as optionally altering its items. This type is returned solely by the "options" property of select. */
export interface HTMLOptionsCollection extends HTMLCollectionOf<HTMLOptionElement> {
    /**
     * Returns the number of elements in the collection.
     *
     * When set to a smaller number, truncates the number of option elements in the corresponding container.
     *
     * When set to a greater number, adds new blank option elements to that container.
     */
    length: number;
    /**
     * Returns the index of the first selected item, if any, or −1 if there is no selected item.
     *
     * Can be set, to change the selection.
     */
    selectedIndex: number;
    /**
     * Inserts element before the node given by before.
     *
     * The before argument can be a number, in which case element is inserted before the item with that number, or an element from the collection, in which case element is inserted before that element.
     *
     * If before is omitted, null, or a number out of range, then element will be added at the end of the list.
     *
     * This method will throw a "HierarchyRequestError" DOMException if element is an ancestor of the element into which it is to be inserted.
     */
    add(element: HTMLOptionElement | HTMLOptGroupElement, before?: HTMLElement | number | null): void;
    /**
     * Removes the item with index index from the collection.
     */
    remove(index: number): void;
}
export interface HTMLOrSVGElement {
    autofocus: boolean;
    readonly dataset: DOMStringMap;
    nonce?: string;
    tabIndex: number;
    blur(): void;
    focus(options?: FocusOptions): void;
}
/** Provides properties and methods (beyond those inherited from HTMLElement) for manipulating the layout and presentation of <output> elements. */
export interface HTMLOutputElement extends HTMLElement {
    defaultValue: string;
    readonly form: HTMLFormElement | null;
    readonly htmlFor: DOMTokenList;
    readonly labels: NodeListOf<HTMLLabelElement>;
    name: string;
    readonly type: string;
    readonly validationMessage: string;
    readonly validity: ValidityState;
    value: string;
    readonly willValidate: boolean;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOutputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLOutputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond those of the regular HTMLElement object interface it inherits) for manipulating <p> elements. */
export interface HTMLParagraphElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParagraphElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParagraphElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond those of the regular HTMLElement object interface it inherits) for manipulating <param> elements, representing a pair of a key and a value that acts as a parameter for an <object> element. */
export interface HTMLParamElement extends HTMLElement {
    /**
     * Sets or retrieves the name of an input parameter for an element.
     */
    name: string;
    /**
     * Sets or retrieves the content type of the resource designated by the value attribute.
     */
    /** @deprecated */
    type: string;
    /**
     * Sets or retrieves the value of an input parameter for an element.
     */
    value: string;
    /**
     * Sets or retrieves the data type of the value attribute.
     */
    /** @deprecated */
    valueType: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParamElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParamElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A <picture> HTML element. It doesn't implement specific properties or methods. */
export interface HTMLPictureElement extends HTMLElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLPictureElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLPictureElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Exposes specific properties and methods (beyond those of the HTMLElement interface it also has available to it by inheritance) for manipulating a block of preformatted text (<pre>). */
export interface HTMLPreElement extends HTMLElement {
    /**
     * Sets or gets a value that you can use to implement your own width functionality for the object.
     */
    /** @deprecated */
    width: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLPreElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLPreElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <progress> elements. */
export interface HTMLProgressElement extends HTMLElement {
    readonly labels: NodeListOf<HTMLLabelElement>;
    /**
     * Defines the maximum, or "done" value for a progress element.
     */
    max: number;
    /**
     * Returns the quotient of value/max when the value attribute is set (determinate progress bar), or -1 when the value attribute is missing (indeterminate progress bar).
     */
    readonly position: number;
    /**
     * Sets or gets the current value of a progress element. The value must be a non-negative number between 0 and the max value.
     */
    value: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLProgressElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLProgressElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating quoting elements, like <blockquote> and <q>, but not the <cite> element. */
export interface HTMLQuoteElement extends HTMLElement {
    /**
     * Sets or retrieves reference information about the object.
     */
    cite: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLQuoteElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLQuoteElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** HTML <script> elements expose the HTMLScriptElement interface, which provides special properties and methods for manipulating the behavior and execution of <script> elements (beyond the inherited HTMLElement interface). */
export interface HTMLScriptElement extends HTMLElement {
    async: boolean;
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    /** @deprecated */
    charset: string;
    crossOrigin: string | null;
    /**
     * Sets or retrieves the status of the script.
     */
    defer: boolean;
    /**
     * Sets or retrieves the event for which the script is written.
     */
    /** @deprecated */
    event: string;
    /**
     * Sets or retrieves the object that is bound to the event script.
     */
    /** @deprecated */
    htmlFor: string;
    integrity: string;
    noModule: boolean;
    referrerPolicy: string;
    /**
     * Retrieves the URL to an external file that contains the source code or data.
     */
    src: string;
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text: string;
    /**
     * Sets or retrieves the MIME type for the associated scripting engine.
     */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLScriptElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLScriptElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A <select> HTML Element. These elements also share all of the properties and methods of other HTML elements via the HTMLElement interface. */
export interface HTMLSelectElement extends HTMLElement {
    autocomplete: string;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    readonly labels: NodeListOf<HTMLLabelElement>;
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    length: number;
    /**
     * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
     */
    multiple: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    readonly options: HTMLOptionsCollection;
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required: boolean;
    /**
     * Sets or retrieves the index of the selected option in a select object.
     */
    selectedIndex: number;
    readonly selectedOptions: HTMLCollectionOf<HTMLOptionElement>;
    /**
     * Sets or retrieves the number of rows in the list box.
     */
    size: number;
    /**
     * Retrieves the type of select control based on the value of the MULTIPLE attribute.
     */
    readonly type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    value: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Adds an element to the areas, controlRange, or options collection.
     * @param element Variant of type Number that specifies the index position in the collection where the element is placed. If no value is given, the method places the element at the end of the collection.
     * @param before Variant of type Object that specifies an element to insert before, or null to append the object to the collection.
     */
    add(element: HTMLOptionElement | HTMLOptGroupElement, before?: HTMLElement | number | null): void;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    /**
     * Retrieves a select object or an object from an options collection.
     * @param name Variant of type Number or String that specifies the object or collection to retrieve. If this parameter is an integer, it is the zero-based index of the object. If this parameter is a string, all objects with matching name or id properties are retrieved, and a collection is returned if more than one match is made.
     * @param index Variant of type Number that specifies the zero-based index of the object to retrieve when a collection is returned.
     */
    item(index: number): Element | null;
    /**
     * Retrieves a select object or an object from an options collection.
     * @param namedItem A String that specifies the name or id property of the object to retrieve. A collection is returned if more than one match is made.
     */
    namedItem(name: string): HTMLOptionElement | null;
    /**
     * Removes an element from the collection.
     * @param index Number that specifies the zero-based index of the element to remove from the collection.
     */
    remove(): void;
    remove(index: number): void;
    reportValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSelectElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSelectElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    [name: number]: HTMLOptionElement | HTMLOptGroupElement;
}
export interface HTMLSlotElement extends HTMLElement {
    name: string;
    assignedElements(options?: AssignedNodesOptions): Element[];
    assignedNodes(options?: AssignedNodesOptions): Node[];
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSlotElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSlotElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the regular HTMLElement object interface it also has available to it by inheritance) for manipulating <source> elements. */
export interface HTMLSourceElement extends HTMLElement {
    /**
     * Gets or sets the intended media type of the media source.
     */
    media: string;
    sizes: string;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src: string;
    srcset: string;
    /**
     * Gets or sets the MIME type of a media resource.
     */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSourceElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSourceElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A <span> element and derives from the HTMLElement interface, but without implementing any additional properties or methods. */
export interface HTMLSpanElement extends HTMLElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSpanElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLSpanElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A <style> element. It inherits properties and methods from its parent, HTMLElement, and from LinkStyle. */
export interface HTMLStyleElement extends HTMLElement, LinkStyle {
    /**
     * Sets or retrieves the media type.
     */
    media: string;
    /**
     * Retrieves the CSS language in which the style sheet is written.
     */
    /** @deprecated */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLStyleElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLStyleElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating table caption elements. */
export interface HTMLTableCaptionElement extends HTMLElement {
    /**
     * Sets or retrieves the alignment of the caption or legend.
     */
    /** @deprecated */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableCaptionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableCaptionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of table cells, either header or data cells, in an HTML document. */
export interface HTMLTableCellElement extends HTMLElement {
    /**
     * Sets or retrieves abbreviated text for the object.
     */
    abbr: string;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a comma-delimited list of conceptual categories associated with the object.
     */
    /** @deprecated */
    axis: string;
    /** @deprecated */
    bgColor: string;
    /**
     * Retrieves the position of the object in the cells collection of a row.
     */
    readonly cellIndex: number;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /**
     * Sets or retrieves the number columns in the table that the object should span.
     */
    colSpan: number;
    /**
     * Sets or retrieves a list of header cells that provide information for the object.
     */
    headers: string;
    /**
     * Sets or retrieves the height of the object.
     */
    /** @deprecated */
    height: string;
    /**
     * Sets or retrieves whether the browser automatically performs wordwrap.
     */
    /** @deprecated */
    noWrap: boolean;
    /**
     * Sets or retrieves how many rows in a table the cell should span.
     */
    rowSpan: number;
    /**
     * Sets or retrieves the group of cells in a table to which the object's information applies.
     */
    scope: string;
    /** @deprecated */
    vAlign: string;
    /**
     * Sets or retrieves the width of the object.
     */
    /** @deprecated */
    width: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableCellElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableCellElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the HTMLElement interface it also has available to it inheritance) for manipulating single or grouped table column elements. */
export interface HTMLTableColElement extends HTMLElement {
    /**
     * Sets or retrieves the alignment of the object relative to the display or table.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /**
     * Sets or retrieves the number of columns in the group.
     */
    span: number;
    /** @deprecated */
    vAlign: string;
    /**
     * Sets or retrieves the width of the object.
     */
    /** @deprecated */
    width: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableColElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableColElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLTableDataCellElement extends HTMLTableCellElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableDataCellElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableDataCellElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond the regular HTMLElement object interface it also has available to it by inheritance) for manipulating the layout and presentation of tables in an HTML document. */
export interface HTMLTableElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    bgColor: string;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     */
    /** @deprecated */
    border: string;
    /**
     * Retrieves the caption object of a table.
     */
    caption: HTMLTableCaptionElement | null;
    /**
     * Sets or retrieves the amount of space between the border of the cell and the content of the cell.
     */
    /** @deprecated */
    cellPadding: string;
    /**
     * Sets or retrieves the amount of space between cells in a table.
     */
    /** @deprecated */
    cellSpacing: string;
    /**
     * Sets or retrieves the way the border frame around the table is displayed.
     */
    /** @deprecated */
    frame: string;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    readonly rows: HTMLCollectionOf<HTMLTableRowElement>;
    /**
     * Sets or retrieves which dividing lines (inner borders) are displayed.
     */
    /** @deprecated */
    rules: string;
    /**
     * Sets or retrieves a description and/or structure of the object.
     */
    /** @deprecated */
    summary: string;
    /**
     * Retrieves a collection of all tBody objects in the table. Objects in this collection are in source order.
     */
    readonly tBodies: HTMLCollectionOf<HTMLTableSectionElement>;
    /**
     * Retrieves the tFoot object of the table.
     */
    tFoot: HTMLTableSectionElement | null;
    /**
     * Retrieves the tHead object of the table.
     */
    tHead: HTMLTableSectionElement | null;
    /**
     * Sets or retrieves the width of the object.
     */
    /** @deprecated */
    width: string;
    /**
     * Creates an empty caption element in the table.
     */
    createCaption(): HTMLTableCaptionElement;
    /**
     * Creates an empty tBody element in the table.
     */
    createTBody(): HTMLTableSectionElement;
    /**
     * Creates an empty tFoot element in the table.
     */
    createTFoot(): HTMLTableSectionElement;
    /**
     * Returns the tHead element object if successful, or null otherwise.
     */
    createTHead(): HTMLTableSectionElement;
    /**
     * Deletes the caption element and its contents from the table.
     */
    deleteCaption(): void;
    /**
     * Removes the specified row (tr) from the element and from the rows collection.
     * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
     */
    deleteRow(index: number): void;
    /**
     * Deletes the tFoot element and its contents from the table.
     */
    deleteTFoot(): void;
    /**
     * Deletes the tHead element and its contents from the table.
     */
    deleteTHead(): void;
    /**
     * Creates a new row (tr) in the table, and adds the row to the rows collection.
     * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
     */
    insertRow(index?: number): HTMLTableRowElement;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLTableHeaderCellElement extends HTMLTableCellElement {
    scope: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableHeaderCellElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableHeaderCellElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of rows in an HTML table. */
export interface HTMLTableRowElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    bgColor: string;
    /**
     * Retrieves a collection of all cells in the table row.
     */
    readonly cells: HTMLCollectionOf<HTMLTableDataCellElement | HTMLTableHeaderCellElement>;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /**
     * Retrieves the position of the object in the rows collection for the table.
     */
    readonly rowIndex: number;
    /**
     * Retrieves the position of the object in the collection.
     */
    readonly sectionRowIndex: number;
    /** @deprecated */
    vAlign: string;
    /**
     * Removes the specified cell from the table row, as well as from the cells collection.
     * @param index Number that specifies the zero-based position of the cell to remove from the table row. If no value is provided, the last cell in the cells collection is deleted.
     */
    deleteCell(index: number): void;
    /**
     * Creates a new cell in the table row, and adds the cell to the cells collection.
     * @param index Number that specifies where to insert the cell in the tr. The default value is -1, which appends the new cell to the end of the cells collection.
     */
    insertCell(index?: number): HTMLTableDataCellElement;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableRowElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableRowElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods (beyond the HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of sections, that is headers, footers and bodies, in an HTML table. */
export interface HTMLTableSectionElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    readonly rows: HTMLCollectionOf<HTMLTableRowElement>;
    /** @deprecated */
    vAlign: string;
    /**
     * Removes the specified row (tr) from the element and from the rows collection.
     * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
     */
    deleteRow(index: number): void;
    /**
     * Creates a new row (tr) in the table, and adds the row to the rows collection.
     * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
     */
    insertRow(index?: number): HTMLTableRowElement;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableSectionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTableSectionElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Enables access to the contents of an HTML <template> element. */
export interface HTMLTemplateElement extends HTMLElement {
    readonly content: DocumentFragment;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTemplateElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTemplateElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties and methods for manipulating the layout and presentation of <textarea> elements. */
export interface HTMLTextAreaElement extends HTMLElement {
    autocomplete: string;
    /**
     * Sets or retrieves the width of the object.
     */
    cols: number;
    /**
     * Sets or retrieves the initial contents of the object.
     */
    defaultValue: string;
    dirName: string;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    readonly labels: NodeListOf<HTMLLabelElement>;
    /**
     * Sets or retrieves the maximum number of characters that the user can enter in a text control.
     */
    maxLength: number;
    minLength: number;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    /**
     * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
     */
    placeholder: string;
    /**
     * Sets or retrieves the value indicated whether the content of the object is read-only.
     */
    readOnly: boolean;
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required: boolean;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    rows: number;
    selectionDirection: "forward" | "backward" | "none";
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    selectionEnd: number;
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    selectionStart: number;
    readonly textLength: number;
    /**
     * Retrieves the type of control.
     */
    readonly type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Retrieves or sets the text in the entry field of the textArea element.
     */
    value: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Sets or retrieves how to handle wordwrapping in the object.
     */
    wrap: string;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    reportValidity(): boolean;
    /**
     * Highlights the input area of a form element.
     */
    select(): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    setRangeText(replacement: string): void;
    setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start: number, end: number, direction?: "forward" | "backward" | "none"): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTextAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTextAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <time> elements. */
export interface HTMLTimeElement extends HTMLElement {
    dateTime: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTimeElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTimeElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Contains the title for a document. This element inherits all of the properties and methods of the HTMLElement interface. */
export interface HTMLTitleElement extends HTMLElement {
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTitleElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTitleElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The HTMLTrackElement */
export interface HTMLTrackElement extends HTMLElement {
    default: boolean;
    kind: string;
    label: string;
    readonly readyState: number;
    src: string;
    srclang: string;
    readonly track: TextTrack;
    readonly ERROR: number;
    readonly LOADED: number;
    readonly LOADING: number;
    readonly NONE: number;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTrackElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTrackElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides special properties (beyond those defined on the regular HTMLElement interface it also has available to it by inheritance) for manipulating unordered list elements. */
export interface HTMLUListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    /** @deprecated */
    type: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLUListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLUListElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** An invalid HTML element and derives from the HTMLElement interface, but without implementing any additional properties or methods. */
export interface HTMLUnknownElement extends HTMLElement {
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLUnknownElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLUnknownElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface HTMLVideoElementEventMap extends HTMLMediaElementEventMap {
    "MSVideoFormatChanged": Event;
    "MSVideoFrameStepCompleted": Event;
    "MSVideoOptimalLayoutChanged": Event;
}
/** Provides special properties and methods for manipulating video objects. It also inherits properties and methods of HTMLMediaElement and HTMLElement. */
export interface HTMLVideoElement extends HTMLMediaElement {
    /**
     * Gets or sets the height of the video element.
     */
    height: number;
    msHorizontalMirror: boolean;
    readonly msIsLayoutOptimalForPlayback: boolean;
    readonly msIsStereo3D: boolean;
    msStereo3DPackingMode: string;
    msStereo3DRenderMode: string;
    msZoom: boolean;
    onMSVideoFormatChanged: ((this: HTMLVideoElement, ev: Event) => any) | null;
    onMSVideoFrameStepCompleted: ((this: HTMLVideoElement, ev: Event) => any) | null;
    onMSVideoOptimalLayoutChanged: ((this: HTMLVideoElement, ev: Event) => any) | null;
    /**
     * Gets or sets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
     */
    poster: string;
    /**
     * Gets the intrinsic height of a video in CSS pixels, or zero if the dimensions are not known.
     */
    readonly videoHeight: number;
    /**
     * Gets the intrinsic width of a video in CSS pixels, or zero if the dimensions are not known.
     */
    readonly videoWidth: number;
    readonly webkitDisplayingFullscreen: boolean;
    readonly webkitSupportsFullscreen: boolean;
    /**
     * Gets or sets the width of the video element.
     */
    width: number;
    getVideoPlaybackQuality(): VideoPlaybackQuality;
    msFrameStep(forward: boolean): void;
    msInsertVideoEffect(activatableClassId: string, effectRequired: boolean, config?: any): void;
    msSetVideoRectangle(left: number, top: number, right: number, bottom: number): void;
    webkitEnterFullScreen(): void;
    webkitEnterFullscreen(): void;
    webkitExitFullScreen(): void;
    webkitExitFullscreen(): void;
    addEventListener<K extends keyof HTMLVideoElementEventMap>(type: K, listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLVideoElementEventMap>(type: K, listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Events that fire when the fragment identifier of the URL has changed. */
export interface HashChangeEvent extends Event {
    /**
     * Returns the URL of the session history entry that is now current.
     */
    readonly newURL: string;
    /**
     * Returns the URL of the session history entry that was previously current.
     */
    readonly oldURL: string;
}
/** This Fetch API interface allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.  You can add to this using methods like append() (see Examples.) In all methods of this interface, header names are matched by case-insensitive byte sequence. */
export interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
}
/** Allows manipulation of the browser session history, that is the pages visited in the tab or frame that the current page is loaded in. */
export interface History {
    readonly length: number;
    scrollRestoration: ScrollRestoration;
    readonly state: any;
    back(): void;
    forward(): void;
    go(delta?: number): void;
    pushState(data: any, title: string, url?: string | null): void;
    replaceState(data: any, title: string, url?: string | null): void;
}
export interface HkdfCtrParams extends Algorithm {
    context: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
    hash: string | Algorithm;
    label: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;
}
export interface IDBArrayKey extends Array<IDBValidKey> {
}
/** This IndexedDB API interface represents a cursor for traversing or iterating over multiple records in a database. */
export interface IDBCursor {
    /**
     * Returns the direction ("next", "nextunique", "prev" or "prevunique") of the cursor.
     */
    readonly direction: IDBCursorDirection;
    /**
     * Returns the key of the cursor. Throws a "InvalidStateError" DOMException if the cursor is advancing or is finished.
     */
    readonly key: IDBValidKey;
    /**
     * Returns the effective key of the cursor. Throws a "InvalidStateError" DOMException if the cursor is advancing or is finished.
     */
    readonly primaryKey: IDBValidKey;
    /**
     * Returns the IDBObjectStore or IDBIndex the cursor was opened from.
     */
    readonly source: IDBObjectStore | IDBIndex;
    /**
     * Advances the cursor through the next count records in range.
     */
    advance(count: number): void;
    /**
     * Advances the cursor to the next record in range.
     */
    continue(key?: IDBValidKey): void;
    /**
     * Advances the cursor to the next record in range matching or after key and primaryKey. Throws an "InvalidAccessError" DOMException if the source is not an index.
     */
    continuePrimaryKey(key: IDBValidKey, primaryKey: IDBValidKey): void;
    /**
     * Delete the record pointed at by the cursor with a new value.
     *
     * If successful, request's result will be undefined.
     */
    delete(): IDBRequest<undefined>;
    /**
     * Updated the record pointed at by the cursor with a new value.
     *
     * Throws a "DataError" DOMException if the effective object store uses in-line keys and the key would have changed.
     *
     * If successful, request's result will be the record's key.
     */
    update(value: any): IDBRequest<IDBValidKey>;
}
/** This IndexedDB API interface represents a cursor for traversing or iterating over multiple records in a database. It is the same as the IDBCursor, except that it includes the value property. */
export interface IDBCursorWithValue extends IDBCursor {
    /**
     * Returns the cursor's current value.
     */
    readonly value: any;
}
export interface IDBDatabaseEventMap {
    "abort": Event;
    "close": Event;
    "error": Event;
    "versionchange": IDBVersionChangeEvent;
}
/** This IndexedDB API interface provides a connection to a database; you can use an IDBDatabase object to open a transaction on your database then create, manipulate, and delete objects (data) in that database. The interface provides the only way to get and manage versions of the database. */
export interface IDBDatabase extends EventTarget {
    /**
     * Returns the name of the database.
     */
    readonly name: string;
    /**
     * Returns a list of the names of object stores in the database.
     */
    readonly objectStoreNames: DOMStringList;
    onabort: ((this: IDBDatabase, ev: Event) => any) | null;
    onclose: ((this: IDBDatabase, ev: Event) => any) | null;
    onerror: ((this: IDBDatabase, ev: Event) => any) | null;
    onversionchange: ((this: IDBDatabase, ev: IDBVersionChangeEvent) => any) | null;
    /**
     * Returns the version of the database.
     */
    readonly version: number;
    /**
     * Closes the connection once all running transactions have finished.
     */
    close(): void;
    /**
     * Creates a new object store with the given name and options and returns a new IDBObjectStore.
     *
     * Throws a "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    createObjectStore(name: string, optionalParameters?: IDBObjectStoreParameters): IDBObjectStore;
    /**
     * Deletes the object store with the given name.
     *
     * Throws a "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    deleteObjectStore(name: string): void;
    /**
     * Returns a new transaction with the given mode ("readonly" or "readwrite") and scope which can be a single object store name or an array of names.
     */
    transaction(storeNames: string | string[], mode?: IDBTransactionMode): IDBTransaction;
    addEventListener<K extends keyof IDBDatabaseEventMap>(type: K, listener: (this: IDBDatabase, ev: IDBDatabaseEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof IDBDatabaseEventMap>(type: K, listener: (this: IDBDatabase, ev: IDBDatabaseEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** In the following code snippet, we make a request to open a database, and include handlers for the success and error cases. For a full working example, see our To-do Notifications app (view example live.) */
export interface IDBFactory {
    /**
     * Compares two values as keys. Returns -1 if key1 precedes key2, 1 if key2 precedes key1, and 0 if the keys are equal.
     *
     * Throws a "DataError" DOMException if either input is not a valid key.
     */
    cmp(first: any, second: any): number;
    /**
     * Attempts to delete the named database. If the database already exists and there are open connections that don't close in response to a versionchange event, the request will be blocked until all they close. If the request is successful request's result will be null.
     */
    deleteDatabase(name: string): IDBOpenDBRequest;
    /**
     * Attempts to open a connection to the named database with the current version, or 1 if it does not already exist. If the request is successful request's result will be the connection.
     */
    open(name: string, version?: number): IDBOpenDBRequest;
}
/** IDBIndex interface of the IndexedDB API provides asynchronous access to an index in a database. An index is a kind of object store for looking up records in another object store, called the referenced object store. You use this interface to retrieve data. */
export interface IDBIndex {
    readonly keyPath: string | string[];
    readonly multiEntry: boolean;
    /**
     * Returns the name of the index.
     */
    name: string;
    /**
     * Returns the IDBObjectStore the index belongs to.
     */
    readonly objectStore: IDBObjectStore;
    readonly unique: boolean;
    /**
     * Retrieves the number of records matching the given key or key range in query.
     *
     * If successful, request's result will be the count.
     */
    count(key?: IDBValidKey | IDBKeyRange): IDBRequest<number>;
    /**
     * Retrieves the value of the first record matching the given key or key range in query.
     *
     * If successful, request's result will be the value, or undefined if there was no matching record.
     */
    get(key: IDBValidKey | IDBKeyRange): IDBRequest<any | undefined>;
    /**
     * Retrieves the values of the records matching the given key or key range in query (up to count if given).
     *
     * If successful, request's result will be an Array of the values.
     */
    getAll(query?: IDBValidKey | IDBKeyRange | null, count?: number): IDBRequest<any[]>;
    /**
     * Retrieves the keys of records matching the given key or key range in query (up to count if given).
     *
     * If successful, request's result will be an Array of the keys.
     */
    getAllKeys(query?: IDBValidKey | IDBKeyRange | null, count?: number): IDBRequest<IDBValidKey[]>;
    /**
     * Retrieves the key of the first record matching the given key or key range in query.
     *
     * If successful, request's result will be the key, or undefined if there was no matching record.
     */
    getKey(key: IDBValidKey | IDBKeyRange): IDBRequest<IDBValidKey | undefined>;
    /**
     * Opens a cursor over the records matching query, ordered by direction. If query is null, all records in index are matched.
     *
     * If successful, request's result will be an IDBCursorWithValue, or null if there were no matching records.
     */
    openCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): IDBRequest<IDBCursorWithValue | null>;
    /**
     * Opens a cursor with key only flag set over the records matching query, ordered by direction. If query is null, all records in index are matched.
     *
     * If successful, request's result will be an IDBCursor, or null if there were no matching records.
     */
    openKeyCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): IDBRequest<IDBCursor | null>;
}
/** A key range can be a single value or a range with upper and lower bounds or endpoints. If the key range has both upper and lower bounds, then it is bounded; if it has no bounds, it is unbounded. A bounded key range can either be open (the endpoints are excluded) or closed (the endpoints are included). To retrieve all keys within a certain range, you can use the following code constructs: */
export interface IDBKeyRange {
    /**
     * Returns lower bound, or undefined if none.
     */
    readonly lower: any;
    /**
     * Returns true if the lower open flag is set, and false otherwise.
     */
    readonly lowerOpen: boolean;
    /**
     * Returns upper bound, or undefined if none.
     */
    readonly upper: any;
    /**
     * Returns true if the upper open flag is set, and false otherwise.
     */
    readonly upperOpen: boolean;
    /**
     * Returns true if key is included in the range, and false otherwise.
     */
    includes(key: any): boolean;
}
/** This example shows a variety of different uses of object stores, from updating the data structure with IDBObjectStore.createIndex inside an onupgradeneeded function, to adding a new item to our object store with IDBObjectStore.add. For a full working example, see our To-do Notifications app (view example live.) */
export interface IDBObjectStore {
    /**
     * Returns true if the store has a key generator, and false otherwise.
     */
    readonly autoIncrement: boolean;
    /**
     * Returns a list of the names of indexes in the store.
     */
    readonly indexNames: DOMStringList;
    /**
     * Returns the key path of the store, or null if none.
     */
    readonly keyPath: string | string[];
    /**
     * Returns the name of the store.
     */
    name: string;
    /**
     * Returns the associated transaction.
     */
    readonly transaction: IDBTransaction;
    /**
     * Adds or updates a record in store with the given value and key.
     *
     * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
     *
     * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
     *
     * If successful, request's result will be the record's key.
     */
    add(value: any, key?: IDBValidKey): IDBRequest<IDBValidKey>;
    /**
     * Deletes all records in store.
     *
     * If successful, request's result will be undefined.
     */
    clear(): IDBRequest<undefined>;
    /**
     * Retrieves the number of records matching the given key or key range in query.
     *
     * If successful, request's result will be the count.
     */
    count(key?: IDBValidKey | IDBKeyRange): IDBRequest<number>;
    /**
     * Creates a new index in store with the given name, keyPath and options and returns a new IDBIndex. If the keyPath and options define constraints that cannot be satisfied with the data already in store the upgrade transaction will abort with a "ConstraintError" DOMException.
     *
     * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    createIndex(name: string, keyPath: string | string[], options?: IDBIndexParameters): IDBIndex;
    /**
     * Deletes records in store with the given key or in the given key range in query.
     *
     * If successful, request's result will be undefined.
     */
    delete(key: IDBValidKey | IDBKeyRange): IDBRequest<undefined>;
    /**
     * Deletes the index in store with the given name.
     *
     * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    deleteIndex(name: string): void;
    /**
     * Retrieves the value of the first record matching the given key or key range in query.
     *
     * If successful, request's result will be the value, or undefined if there was no matching record.
     */
    get(query: IDBValidKey | IDBKeyRange): IDBRequest<any | undefined>;
    /**
     * Retrieves the values of the records matching the given key or key range in query (up to count if given).
     *
     * If successful, request's result will be an Array of the values.
     */
    getAll(query?: IDBValidKey | IDBKeyRange | null, count?: number): IDBRequest<any[]>;
    /**
     * Retrieves the keys of records matching the given key or key range in query (up to count if given).
     *
     * If successful, request's result will be an Array of the keys.
     */
    getAllKeys(query?: IDBValidKey | IDBKeyRange | null, count?: number): IDBRequest<IDBValidKey[]>;
    /**
     * Retrieves the key of the first record matching the given key or key range in query.
     *
     * If successful, request's result will be the key, or undefined if there was no matching record.
     */
    getKey(query: IDBValidKey | IDBKeyRange): IDBRequest<IDBValidKey | undefined>;
    index(name: string): IDBIndex;
    /**
     * Opens a cursor over the records matching query, ordered by direction. If query is null, all records in store are matched.
     *
     * If successful, request's result will be an IDBCursorWithValue pointing at the first matching record, or null if there were no matching records.
     */
    openCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): IDBRequest<IDBCursorWithValue | null>;
    /**
     * Opens a cursor with key only flag set over the records matching query, ordered by direction. If query is null, all records in store are matched.
     *
     * If successful, request's result will be an IDBCursor pointing at the first matching record, or null if there were no matching records.
     */
    openKeyCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection): IDBRequest<IDBCursor | null>;
    /**
     * Adds or updates a record in store with the given value and key.
     *
     * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
     *
     * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
     *
     * If successful, request's result will be the record's key.
     */
    put(value: any, key?: IDBValidKey): IDBRequest<IDBValidKey>;
}
export interface IDBOpenDBRequestEventMap extends IDBRequestEventMap {
    "blocked": Event;
    "upgradeneeded": IDBVersionChangeEvent;
}
/** Also inherits methods from its parents IDBRequest and EventTarget. */
export interface IDBOpenDBRequest extends IDBRequest<IDBDatabase> {
    onblocked: ((this: IDBOpenDBRequest, ev: Event) => any) | null;
    onupgradeneeded: ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any) | null;
    addEventListener<K extends keyof IDBOpenDBRequestEventMap>(type: K, listener: (this: IDBOpenDBRequest, ev: IDBOpenDBRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof IDBOpenDBRequestEventMap>(type: K, listener: (this: IDBOpenDBRequest, ev: IDBOpenDBRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface IDBRequestEventMap {
    "error": Event;
    "success": Event;
}
/** The request object does not initially contain any information about the result of the operation, but once information becomes available, an event is fired on the request, and the information becomes available through the properties of the IDBRequest instance. */
export interface IDBRequest<T = any> extends EventTarget {
    /**
     * When a request is completed, returns the error (a DOMException), or null if the request succeeded. Throws a "InvalidStateError" DOMException if the request is still pending.
     */
    readonly error: DOMException | null;
    onerror: ((this: IDBRequest<T>, ev: Event) => any) | null;
    onsuccess: ((this: IDBRequest<T>, ev: Event) => any) | null;
    /**
     * Returns "pending" until a request is complete, then returns "done".
     */
    readonly readyState: IDBRequestReadyState;
    /**
     * When a request is completed, returns the result, or undefined if the request failed. Throws a "InvalidStateError" DOMException if the request is still pending.
     */
    readonly result: T;
    /**
     * Returns the IDBObjectStore, IDBIndex, or IDBCursor the request was made against, or null if is was an open request.
     */
    readonly source: IDBObjectStore | IDBIndex | IDBCursor;
    /**
     * Returns the IDBTransaction the request was made within. If this as an open request, then it returns an upgrade transaction while it is running, or null otherwise.
     */
    readonly transaction: IDBTransaction | null;
    addEventListener<K extends keyof IDBRequestEventMap>(type: K, listener: (this: IDBRequest<T>, ev: IDBRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof IDBRequestEventMap>(type: K, listener: (this: IDBRequest<T>, ev: IDBRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface IDBTransactionEventMap {
    "abort": Event;
    "complete": Event;
    "error": Event;
}
export interface IDBTransaction extends EventTarget {
    /**
     * Returns the transaction's connection.
     */
    readonly db: IDBDatabase;
    /**
     * If the transaction was aborted, returns the error (a DOMException) providing the reason.
     */
    readonly error: DOMException;
    /**
     * Returns the mode the transaction was created with ("readonly" or "readwrite"), or "versionchange" for an upgrade transaction.
     */
    readonly mode: IDBTransactionMode;
    /**
     * Returns a list of the names of object stores in the transaction's scope. For an upgrade transaction this is all object stores in the database.
     */
    readonly objectStoreNames: DOMStringList;
    onabort: ((this: IDBTransaction, ev: Event) => any) | null;
    oncomplete: ((this: IDBTransaction, ev: Event) => any) | null;
    onerror: ((this: IDBTransaction, ev: Event) => any) | null;
    /**
     * Aborts the transaction. All pending requests will fail with a "AbortError" DOMException and all changes made to the database will be reverted.
     */
    abort(): void;
    /**
     * Returns an IDBObjectStore in the transaction's scope.
     */
    objectStore(name: string): IDBObjectStore;
    addEventListener<K extends keyof IDBTransactionEventMap>(type: K, listener: (this: IDBTransaction, ev: IDBTransactionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof IDBTransactionEventMap>(type: K, listener: (this: IDBTransaction, ev: IDBTransactionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** This IndexedDB API interface indicates that the version of the database has changed, as the result of an IDBOpenDBRequest.onupgradeneeded event handler function. */
export interface IDBVersionChangeEvent extends Event {
    readonly newVersion: number | null;
    readonly oldVersion: number;
}
/** The IIRFilterNode interface of the Web Audio API is a AudioNode processor which implements a general infinite impulse response (IIR)  filter; this type of filter can be used to implement tone control devices and graphic equalizers as well. It lets the parameters of the filter response be specified, so that it can be tuned as needed. */
export interface IIRFilterNode extends AudioNode {
    getFrequencyResponse(frequencyHz: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void;
}
export interface ImageBitmap {
    /**
     * Returns the intrinsic height of the image, in CSS pixels.
     */
    readonly height: number;
    /**
     * Returns the intrinsic width of the image, in CSS pixels.
     */
    readonly width: number;
    /**
     * Releases imageBitmap's underlying bitmap data.
     */
    close(): void;
}
export interface ImageBitmapOptions {
    colorSpaceConversion?: "none" | "default";
    imageOrientation?: "none" | "flipY";
    premultiplyAlpha?: "none" | "premultiply" | "default";
    resizeHeight?: number;
    resizeQuality?: "pixelated" | "low" | "medium" | "high";
    resizeWidth?: number;
}
export interface ImageBitmapRenderingContext {
    /**
     * Returns the canvas element that the context is bound to.
     */
    readonly canvas: HTMLCanvasElement | OffscreenCanvas;
    /**
     * Transfers the underlying bitmap data from imageBitmap to context, and the bitmap becomes the contents of the canvas element to which context is bound.
     */
    transferFromImageBitmap(bitmap: ImageBitmap | null): void;
}
/** The underlying pixel data of an area of a <canvas> element. It is created using the ImageData() constructor or creator methods on the CanvasRenderingContext2D object associated with a canvas: createImageData() and getImageData(). It can also be used to set a part of the canvas by using putImageData(). */
export interface ImageData {
    /**
     * Returns the one-dimensional array containing the data in RGBA order, as integers in the range 0 to 255.
     */
    readonly data: Uint8ClampedArray;
    /**
     * Returns the actual dimensions of the data in the ImageData object, in pixels.
     */
    readonly height: number;
    /**
     * Returns the actual dimensions of the data in the ImageData object, in pixels.
     */
    readonly width: number;
}
export interface InnerHTML {
    innerHTML: string;
}
export interface InputDeviceInfo extends MediaDeviceInfo {
    getCapabilities(): MediaTrackCapabilities;
}
export interface InputEvent extends UIEvent {
    readonly data: string | null;
    readonly inputType: string;
    readonly isComposing: boolean;
}
/** provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport. */
export interface IntersectionObserver {
    readonly root: Element | null;
    readonly rootMargin: string;
    readonly thresholds: ReadonlyArray<number>;
    disconnect(): void;
    observe(target: Element): void;
    takeRecords(): IntersectionObserverEntry[];
    unobserve(target: Element): void;
}
/** This Intersection Observer API interface describes the intersection between the target element and its root container at a specific moment of transition. */
export interface IntersectionObserverEntry {
    readonly boundingClientRect: DOMRectReadOnly;
    readonly intersectionRatio: number;
    readonly intersectionRect: DOMRectReadOnly;
    readonly isIntersecting: boolean;
    readonly rootBounds: DOMRectReadOnly | null;
    readonly target: Element;
    readonly time: number;
}
/** KeyboardEvent objects describe a user interaction with the keyboard; each event describes a single interaction between the user and a key (or combination of a key with modifier keys) on the keyboard. */
export interface KeyboardEvent extends UIEvent {
    readonly altKey: boolean;
    /** @deprecated */
    char: string;
    /** @deprecated */
    readonly charCode: number;
    readonly code: string;
    readonly ctrlKey: boolean;
    readonly isComposing: boolean;
    readonly key: string;
    /** @deprecated */
    readonly keyCode: number;
    readonly location: number;
    readonly metaKey: boolean;
    readonly repeat: boolean;
    readonly shiftKey: boolean;
    getModifierState(keyArg: string): boolean;
    readonly DOM_KEY_LOCATION_LEFT: number;
    readonly DOM_KEY_LOCATION_NUMPAD: number;
    readonly DOM_KEY_LOCATION_RIGHT: number;
    readonly DOM_KEY_LOCATION_STANDARD: number;
}
export interface KeyframeEffect extends AnimationEffect {
    composite: CompositeOperation;
    iterationComposite: IterationCompositeOperation;
    target: Element | null;
    getKeyframes(): ComputedKeyframe[];
    setKeyframes(keyframes: Keyframe[] | PropertyIndexedKeyframes | null): void;
}
export interface LinkStyle {
    readonly sheet: StyleSheet | null;
}
export interface ListeningStateChangedEvent extends Event {
    readonly label: string;
    readonly state: ListeningState;
}
/** The location (URL) of the object it is linked to. Changes done on it are reflected on the object it relates to. Both the Document and Window interface have such a linked Location, accessible via Document.location and Window.location respectively. */
export interface Location {
    /**
     * Returns a DOMStringList object listing the origins of the ancestor browsing contexts, from the parent browsing context to the top-level browsing context.
     */
    readonly ancestorOrigins: DOMStringList;
    /**
     * Returns the Location object's URL's fragment (includes leading "#" if non-empty).
     *
     * Can be set, to navigate to the same URL with a changed fragment (ignores leading "#").
     */
    hash: string;
    /**
     * Returns the Location object's URL's host and port (if different from the default port for the scheme).
     *
     * Can be set, to navigate to the same URL with a changed host and port.
     */
    host: string;
    /**
     * Returns the Location object's URL's host.
     *
     * Can be set, to navigate to the same URL with a changed host.
     */
    hostname: string;
    /**
     * Returns the Location object's URL.
     *
     * Can be set, to navigate to the given URL.
     */
    href: string;
    toString(): string;
    /**
     * Returns the Location object's URL's origin.
     */
    readonly origin: string;
    /**
     * Returns the Location object's URL's path.
     *
     * Can be set, to navigate to the same URL with a changed path.
     */
    pathname: string;
    /**
     * Returns the Location object's URL's port.
     *
     * Can be set, to navigate to the same URL with a changed port.
     */
    port: string;
    /**
     * Returns the Location object's URL's scheme.
     *
     * Can be set, to navigate to the same URL with a changed scheme.
     */
    protocol: string;
    /**
     * Returns the Location object's URL's query (includes leading "?" if non-empty).
     *
     * Can be set, to navigate to the same URL with a changed query (ignores leading "?").
     */
    search: string;
    /**
     * Navigates to the given URL.
     */
    assign(url: string): void;
    /**
     * Reloads the current page.
     */
    reload(): void;
    /** @deprecated */
    reload(forcedReload: boolean): void;
    /**
     * Removes the current page from the session history and navigates to the given URL.
     */
    replace(url: string): void;
}
export interface MSAssertion {
    readonly id: string;
    readonly type: MSCredentialType;
}
export interface MSBlobBuilder {
    append(data: any, endings?: string): void;
    getBlob(contentType?: string): Blob;
}
export interface MSFIDOCredentialAssertion extends MSAssertion {
    readonly algorithm: string | Algorithm;
    readonly attestation: any;
    readonly publicKey: string;
    readonly transportHints: MSTransportType[];
}
export interface MSFIDOSignature {
    readonly authnrData: string;
    readonly clientData: string;
    readonly signature: string;
}
export interface MSFIDOSignatureAssertion extends MSAssertion {
    readonly signature: MSFIDOSignature;
}
export interface MSFileSaver {
    msSaveBlob(blob: any, defaultName?: string): boolean;
    msSaveOrOpenBlob(blob: any, defaultName?: string): boolean;
}
export interface MSGesture {
    target: Element;
    addPointer(pointerId: number): void;
    stop(): void;
}
/** The MSGestureEvent is a proprietary interface specific to Internet Explorer and Microsoft Edge which represents events that occur due to touch gestures. Events using this interface include MSGestureStart, MSGestureEnd, MSGestureTap, MSGestureHold, MSGestureChange, and MSInertiaStart. */
export interface MSGestureEvent extends UIEvent {
    readonly clientX: number;
    readonly clientY: number;
    readonly expansion: number;
    readonly gestureObject: any;
    readonly hwTimestamp: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly rotation: number;
    readonly scale: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly translationX: number;
    readonly translationY: number;
    readonly velocityAngular: number;
    readonly velocityExpansion: number;
    readonly velocityX: number;
    readonly velocityY: number;
    initGestureEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, offsetXArg: number, offsetYArg: number, translationXArg: number, translationYArg: number, scaleArg: number, expansionArg: number, rotationArg: number, velocityXArg: number, velocityYArg: number, velocityExpansionArg: number, velocityAngularArg: number, hwTimestampArg: number): void;
    readonly MSGESTURE_FLAG_BEGIN: number;
    readonly MSGESTURE_FLAG_CANCEL: number;
    readonly MSGESTURE_FLAG_END: number;
    readonly MSGESTURE_FLAG_INERTIA: number;
    readonly MSGESTURE_FLAG_NONE: number;
}
/** The msGraphicsTrust() constructor returns an object that provides properties for info on protected video playback. */
export interface MSGraphicsTrust {
    readonly constrictionActive: boolean;
    readonly status: string;
}
export interface MSInputMethodContextEventMap {
    "MSCandidateWindowHide": Event;
    "MSCandidateWindowShow": Event;
    "MSCandidateWindowUpdate": Event;
}
export interface MSInputMethodContext extends EventTarget {
    readonly compositionEndOffset: number;
    readonly compositionStartOffset: number;
    oncandidatewindowhide: ((this: MSInputMethodContext, ev: Event) => any) | null;
    oncandidatewindowshow: ((this: MSInputMethodContext, ev: Event) => any) | null;
    oncandidatewindowupdate: ((this: MSInputMethodContext, ev: Event) => any) | null;
    readonly target: HTMLElement;
    getCandidateWindowClientRect(): ClientRect;
    getCompositionAlternatives(): string[];
    hasComposition(): boolean;
    isCandidateWindowVisible(): boolean;
    addEventListener<K extends keyof MSInputMethodContextEventMap>(type: K, listener: (this: MSInputMethodContext, ev: MSInputMethodContextEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MSInputMethodContextEventMap>(type: K, listener: (this: MSInputMethodContext, ev: MSInputMethodContextEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface MSMediaKeyError {
    readonly code: number;
    readonly systemCode: number;
    readonly MS_MEDIA_KEYERR_CLIENT: number;
    readonly MS_MEDIA_KEYERR_DOMAIN: number;
    readonly MS_MEDIA_KEYERR_HARDWARECHANGE: number;
    readonly MS_MEDIA_KEYERR_OUTPUT: number;
    readonly MS_MEDIA_KEYERR_SERVICE: number;
    readonly MS_MEDIA_KEYERR_UNKNOWN: number;
}
export interface MSMediaKeyMessageEvent extends Event {
    readonly destinationURL: string | null;
    readonly message: Uint8Array;
}
export interface MSMediaKeyNeededEvent extends Event {
    readonly initData: Uint8Array | null;
}
export interface MSMediaKeySession extends EventTarget {
    readonly error: MSMediaKeyError | null;
    readonly keySystem: string;
    readonly sessionId: string;
    close(): void;
    update(key: Uint8Array): void;
}
export interface MSMediaKeys {
    readonly keySystem: string;
    createSession(type: string, initData: Uint8Array, cdmData?: Uint8Array | null): MSMediaKeySession;
}
export interface MSNavigatorDoNotTrack {
    confirmSiteSpecificTrackingException(args: ConfirmSiteSpecificExceptionsInformation): boolean;
    confirmWebWideTrackingException(args: ExceptionInformation): boolean;
    removeSiteSpecificTrackingException(args: ExceptionInformation): void;
    removeWebWideTrackingException(args: ExceptionInformation): void;
    storeSiteSpecificTrackingException(args: StoreSiteSpecificExceptionsInformation): void;
    storeWebWideTrackingException(args: StoreExceptionsInformation): void;
}
export interface MSPointerEvent extends MouseEvent {
    readonly currentPoint: any;
    readonly height: number;
    readonly hwTimestamp: number;
    readonly intermediatePoints: any;
    readonly isPrimary: boolean;
    readonly pointerId: number;
    readonly pointerType: any;
    readonly pressure: number;
    readonly rotation: number;
    readonly tiltX: number;
    readonly tiltY: number;
    readonly width: number;
    getCurrentPoint(element: Element): void;
    getIntermediatePoints(element: Element): void;
    initPointerEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, offsetXArg: number, offsetYArg: number, widthArg: number, heightArg: number, pressure: number, rotation: number, tiltX: number, tiltY: number, pointerIdArg: number, pointerType: any, hwTimestampArg: number, isPrimary: boolean): void;
}
export interface MSStream {
    readonly type: string;
    msClose(): void;
    msDetachStream(): any;
}
/** The MediaDevicesInfo interface contains information that describes a single media input or output device. */
export interface MediaDeviceInfo {
    readonly deviceId: string;
    readonly groupId: string;
    readonly kind: MediaDeviceKind;
    readonly label: string;
    toJSON(): any;
}
export interface MediaDevicesEventMap {
    "devicechange": Event;
}
/** Provides access to connected media input devices like cameras and microphones, as well as screen sharing. In essence, it lets you obtain access to any hardware source of media data. */
export interface MediaDevices extends EventTarget {
    ondevicechange: ((this: MediaDevices, ev: Event) => any) | null;
    enumerateDevices(): Promise<MediaDeviceInfo[]>;
    getSupportedConstraints(): MediaTrackSupportedConstraints;
    getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
    addEventListener<K extends keyof MediaDevicesEventMap>(type: K, listener: (this: MediaDevices, ev: MediaDevicesEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaDevicesEventMap>(type: K, listener: (this: MediaDevices, ev: MediaDevicesEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A MediaElementSourceNode has no inputs and exactly one output, and is created using the AudioContext.createMediaElementSource method. The amount of channels in the output equals the number of channels of the audio referenced by the HTMLMediaElement used in the creation of the node, or is 1 if the HTMLMediaElement has no audio. */
export interface MediaElementAudioSourceNode extends AudioNode {
    readonly mediaElement: HTMLMediaElement;
}
export interface MediaEncryptedEvent extends Event {
    readonly initData: ArrayBuffer | null;
    readonly initDataType: string;
}
/** An error which occurred while handling media in an HTML media element based on HTMLMediaElement, such as <audio> or <video>. */
export interface MediaError {
    readonly code: number;
    readonly message: string;
    readonly msExtendedCode: number;
    readonly MEDIA_ERR_ABORTED: number;
    readonly MEDIA_ERR_DECODE: number;
    readonly MEDIA_ERR_NETWORK: number;
    readonly MEDIA_ERR_SRC_NOT_SUPPORTED: number;
    readonly MS_MEDIA_ERR_ENCRYPTED: number;
}
/** This EncryptedMediaExtensions API interface contains the content and related data when the content decryption module generates a message for the session. */
export interface MediaKeyMessageEvent extends Event {
    readonly message: ArrayBuffer;
    readonly messageType: MediaKeyMessageType;
}
export interface MediaKeySessionEventMap {
    "keystatuseschange": Event;
    "message": MediaKeyMessageEvent;
}
/** This EncryptedMediaExtensions API interface represents a context for message exchange with a content decryption module (CDM). */
export interface MediaKeySession extends EventTarget {
    readonly closed: Promise<void>;
    readonly expiration: number;
    readonly keyStatuses: MediaKeyStatusMap;
    onkeystatuseschange: ((this: MediaKeySession, ev: Event) => any) | null;
    onmessage: ((this: MediaKeySession, ev: MediaKeyMessageEvent) => any) | null;
    readonly sessionId: string;
    close(): Promise<void>;
    generateRequest(initDataType: string, initData: BufferSource): Promise<void>;
    load(sessionId: string): Promise<boolean>;
    remove(): Promise<void>;
    update(response: BufferSource): Promise<void>;
    addEventListener<K extends keyof MediaKeySessionEventMap>(type: K, listener: (this: MediaKeySession, ev: MediaKeySessionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaKeySessionEventMap>(type: K, listener: (this: MediaKeySession, ev: MediaKeySessionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** This EncryptedMediaExtensions API interface is a read-only map of media key statuses by key IDs. */
export interface MediaKeyStatusMap {
    readonly size: number;
    get(keyId: BufferSource): MediaKeyStatus | undefined;
    has(keyId: BufferSource): boolean;
    forEach(callbackfn: (value: MediaKeyStatus, key: BufferSource, parent: MediaKeyStatusMap) => void, thisArg?: any): void;
}
/** This EncryptedMediaExtensions API interface provides access to a Key System for decryption and/or a content protection provider. You can request an instance of this object using the Navigator.requestMediaKeySystemAccess method. */
export interface MediaKeySystemAccess {
    readonly keySystem: string;
    createMediaKeys(): Promise<MediaKeys>;
    getConfiguration(): MediaKeySystemConfiguration;
}
/** This EncryptedMediaExtensions API interface the represents a set of keys that an associated HTMLMediaElement can use for decryption of media data during playback. */
export interface MediaKeys {
    createSession(sessionType?: MediaKeySessionType): MediaKeySession;
    setServerCertificate(serverCertificate: BufferSource): Promise<boolean>;
}
export interface MediaList {
    readonly length: number;
    mediaText: string;
    toString(): string;
    appendMedium(medium: string): void;
    deleteMedium(medium: string): void;
    item(index: number): string | null;
    [index: number]: string;
}
export interface MediaQueryListEventMap {
    "change": MediaQueryListEvent;
}
/** Stores information on a media query applied to a document, and handles sending notifications to listeners when the media query state change (i.e. when the media query test starts or stops evaluating to true). */
export interface MediaQueryList extends EventTarget {
    readonly matches: boolean;
    readonly media: string;
    onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
    /** @deprecated */
    addListener(listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null): void;
    /** @deprecated */
    removeListener(listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null): void;
    addEventListener<K extends keyof MediaQueryListEventMap>(type: K, listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaQueryListEventMap>(type: K, listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface MediaQueryListEvent extends Event {
    readonly matches: boolean;
    readonly media: string;
}
export interface MediaSourceEventMap {
    "sourceclose": Event;
    "sourceended": Event;
    "sourceopen": Event;
}
/** This Media Source Extensions API interface represents a source of media data for an HTMLMediaElement object. A MediaSource object can be attached to a HTMLMediaElement to be played in the user agent. */
export interface MediaSource extends EventTarget {
    readonly activeSourceBuffers: SourceBufferList;
    duration: number;
    onsourceclose: ((this: MediaSource, ev: Event) => any) | null;
    onsourceended: ((this: MediaSource, ev: Event) => any) | null;
    onsourceopen: ((this: MediaSource, ev: Event) => any) | null;
    readonly readyState: ReadyState;
    readonly sourceBuffers: SourceBufferList;
    addSourceBuffer(type: string): SourceBuffer;
    clearLiveSeekableRange(): void;
    endOfStream(error?: EndOfStreamError): void;
    removeSourceBuffer(sourceBuffer: SourceBuffer): void;
    setLiveSeekableRange(start: number, end: number): void;
    addEventListener<K extends keyof MediaSourceEventMap>(type: K, listener: (this: MediaSource, ev: MediaSourceEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaSourceEventMap>(type: K, listener: (this: MediaSource, ev: MediaSourceEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface MediaStreamEventMap {
    "addtrack": MediaStreamTrackEvent;
    "removetrack": MediaStreamTrackEvent;
}
/** A stream of media content. A stream consists of several tracks such as video or audio tracks. Each track is specified as an instance of MediaStreamTrack. */
export interface MediaStream extends EventTarget {
    readonly active: boolean;
    readonly id: string;
    onaddtrack: ((this: MediaStream, ev: MediaStreamTrackEvent) => any) | null;
    onremovetrack: ((this: MediaStream, ev: MediaStreamTrackEvent) => any) | null;
    addTrack(track: MediaStreamTrack): void;
    clone(): MediaStream;
    getAudioTracks(): MediaStreamTrack[];
    getTrackById(trackId: string): MediaStreamTrack | null;
    getTracks(): MediaStreamTrack[];
    getVideoTracks(): MediaStreamTrack[];
    removeTrack(track: MediaStreamTrack): void;
    addEventListener<K extends keyof MediaStreamEventMap>(type: K, listener: (this: MediaStream, ev: MediaStreamEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaStreamEventMap>(type: K, listener: (this: MediaStream, ev: MediaStreamEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface MediaStreamAudioDestinationNode extends AudioNode {
    readonly stream: MediaStream;
}
/** A type of AudioNode which operates as an audio source whose media is received from a MediaStream obtained using the WebRTC or Media Capture and Streams APIs. */
export interface MediaStreamAudioSourceNode extends AudioNode {
    readonly mediaStream: MediaStream;
}
export interface MediaStreamError {
    readonly constraintName: string | null;
    readonly message: string | null;
    readonly name: string;
}
export interface MediaStreamErrorEvent extends Event {
    readonly error: MediaStreamError | null;
}
/** Events that occurs in relation to a MediaStream. Two events of this type can be thrown: addstream and removestream. */
export interface MediaStreamEvent extends Event {
    readonly stream: MediaStream | null;
}
export interface MediaStreamTrackEventMap {
    "ended": Event;
    "isolationchange": Event;
    "mute": Event;
    "unmute": Event;
}
/** A single media track within a stream; typically, these are audio or video tracks, but other track types may exist as well. */
export interface MediaStreamTrack extends EventTarget {
    enabled: boolean;
    readonly id: string;
    readonly isolated: boolean;
    readonly kind: string;
    readonly label: string;
    readonly muted: boolean;
    onended: ((this: MediaStreamTrack, ev: Event) => any) | null;
    onisolationchange: ((this: MediaStreamTrack, ev: Event) => any) | null;
    onmute: ((this: MediaStreamTrack, ev: Event) => any) | null;
    onunmute: ((this: MediaStreamTrack, ev: Event) => any) | null;
    readonly readyState: MediaStreamTrackState;
    applyConstraints(constraints?: MediaTrackConstraints): Promise<void>;
    clone(): MediaStreamTrack;
    getCapabilities(): MediaTrackCapabilities;
    getConstraints(): MediaTrackConstraints;
    getSettings(): MediaTrackSettings;
    stop(): void;
    addEventListener<K extends keyof MediaStreamTrackEventMap>(type: K, listener: (this: MediaStreamTrack, ev: MediaStreamTrackEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MediaStreamTrackEventMap>(type: K, listener: (this: MediaStreamTrack, ev: MediaStreamTrackEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface MediaStreamTrackAudioSourceNode extends AudioNode {
}
/** Events which indicate that a MediaStream has had tracks added to or removed from the stream through calls to Media Stream API methods. These events are sent to the stream when these changes occur. */
export interface MediaStreamTrackEvent extends Event {
    readonly track: MediaStreamTrack;
}
/** This Channel Messaging API interface allows us to create a new message channel and send data through it via its two MessagePort properties. */
export interface MessageChannel {
    /**
     * Returns the first MessagePort object.
     */
    readonly port1: MessagePort;
    /**
     * Returns the second MessagePort object.
     */
    readonly port2: MessagePort;
}
/** A message received by a target object. */
export interface MessageEvent extends Event {
    /**
     * Returns the data of the message.
     */
    readonly data: any;
    /**
     * Returns the last event ID string, for server-sent events.
     */
    readonly lastEventId: string;
    /**
     * Returns the origin of the message, for server-sent events and cross-document messaging.
     */
    readonly origin: string;
    /**
     * Returns the MessagePort array sent with the message, for cross-document messaging and channel messaging.
     */
    readonly ports: ReadonlyArray<MessagePort>;
    /**
     * Returns the WindowProxy of the source window, for cross-document messaging, and the MessagePort being attached, in the connect event fired at SharedWorkerGlobalScope objects.
     */
    readonly source: MessageEventSource | null;
}
export interface MessagePortEventMap {
    "message": MessageEvent;
    "messageerror": MessageEvent;
}
/** This Channel Messaging API interface represents one of the two ports of a MessageChannel, allowing messages to be sent from one port and listening out for them arriving at the other. */
export interface MessagePort extends EventTarget {
    onmessage: ((this: MessagePort, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: MessagePort, ev: MessageEvent) => any) | null;
    /**
     * Disconnects the port, so that it is no longer active.
     */
    close(): void;
    /**
     * Posts a message through the channel. Objects listed in transfer are transferred, not just cloned, meaning that they are no longer usable on the sending side.
     *
     * Throws a "DataCloneError" DOMException if transfer contains duplicate objects or port, or if message could not be cloned.
     */
    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: PostMessageOptions): void;
    /**
     * Begins dispatching messages received on the port.
     */
    start(): void;
    addEventListener<K extends keyof MessagePortEventMap>(type: K, listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MessagePortEventMap>(type: K, listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides contains information about a MIME type associated with a particular plugin. NavigatorPlugins.mimeTypes returns an array of this object. */
export interface MimeType {
    /**
     * Returns the MIME type's description.
     */
    readonly description: string;
    /**
     * Returns the Plugin object that implements this MIME type.
     */
    readonly enabledPlugin: Plugin;
    /**
     * Returns the MIME type's typical file extensions, in a comma-separated list.
     */
    readonly suffixes: string;
    /**
     * Returns the MIME type.
     */
    readonly type: string;
}
/** Returns an array of MimeType instances, each of which contains information about a supported browser plugins. This object is returned by NavigatorPlugins.mimeTypes. */
export interface MimeTypeArray {
    readonly length: number;
    item(index: number): MimeType | null;
    namedItem(name: string): MimeType | null;
    [index: number]: MimeType;
}
/** Events that occur due to the user interacting with a pointing device (such as a mouse). Common events using this interface include click, dblclick, mouseup, mousedown. */
export interface MouseEvent extends UIEvent {
    readonly altKey: boolean;
    readonly button: number;
    readonly buttons: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly movementX: number;
    readonly movementY: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly relatedTarget: EventTarget | null;
    readonly screenX: number;
    readonly screenY: number;
    readonly shiftKey: boolean;
    readonly x: number;
    readonly y: number;
    getModifierState(keyArg: string): boolean;
    initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void;
}
/** Provides event properties that are specific to modifications to the Document Object Model (DOM) hierarchy and nodes. */
export interface MutationEvent extends Event {
    readonly attrChange: number;
    readonly attrName: string;
    readonly newValue: string;
    readonly prevValue: string;
    readonly relatedNode: Node;
    initMutationEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, relatedNodeArg: Node, prevValueArg: string, newValueArg: string, attrNameArg: string, attrChangeArg: number): void;
    readonly ADDITION: number;
    readonly MODIFICATION: number;
    readonly REMOVAL: number;
}
/** Provides the ability to watch for changes being made to the DOM tree. It is designed as a replacement for the older Mutation Events feature which was part of the DOM3 Events specification. */
export interface MutationObserver {
    /**
     * Stops observer from observing any mutations. Until the observe() method is used again, observer's callback will not be invoked.
     */
    disconnect(): void;
    /**
     * Instructs the user agent to observe a given target (a node) and report any mutations based on the criteria given by options (an object).
     *
     * The options argument allows for setting mutation observation options via object members.
     */
    observe(target: Node, options?: MutationObserverInit): void;
    /**
     * Empties the record queue and returns what was in there.
     */
    takeRecords(): MutationRecord[];
}
/** A MutationRecord represents an individual DOM mutation. It is the object that is passed to MutationObserver's callback. */
export interface MutationRecord {
    /**
     * Return the nodes added and removed respectively.
     */
    readonly addedNodes: NodeList;
    /**
     * Returns the local name of the changed attribute, and null otherwise.
     */
    readonly attributeName: string | null;
    /**
     * Returns the namespace of the changed attribute, and null otherwise.
     */
    readonly attributeNamespace: string | null;
    /**
     * Return the previous and next sibling respectively of the added or removed nodes, and null otherwise.
     */
    readonly nextSibling: Node | null;
    /**
     * The return value depends on type. For "attributes", it is the value of the changed attribute before the change. For "characterData", it is the data of the changed node before the change. For "childList", it is null.
     */
    readonly oldValue: string | null;
    /**
     * Return the previous and next sibling respectively of the added or removed nodes, and null otherwise.
     */
    readonly previousSibling: Node | null;
    /**
     * Return the nodes added and removed respectively.
     */
    readonly removedNodes: NodeList;
    /**
     * Returns the node the mutation affected, depending on the type. For "attributes", it is the element whose attribute changed. For "characterData", it is the CharacterData node. For "childList", it is the node whose children changed.
     */
    readonly target: Node;
    /**
     * Returns "attributes" if it was an attribute mutation. "characterData" if it was a mutation to a CharacterData node. And "childList" if it was a mutation to the tree of nodes.
     */
    readonly type: MutationRecordType;
}
/** A collection of Attr objects. Objects inside a NamedNodeMap are not in any particular order, unlike NodeList, although they may be accessed by an index as in an array. */
export interface NamedNodeMap {
    readonly length: number;
    getNamedItem(qualifiedName: string): Attr | null;
    getNamedItemNS(namespace: string | null, localName: string): Attr | null;
    item(index: number): Attr | null;
    removeNamedItem(qualifiedName: string): Attr;
    removeNamedItemNS(namespace: string | null, localName: string): Attr;
    setNamedItem(attr: Attr): Attr | null;
    setNamedItemNS(attr: Attr): Attr | null;
    [index: number]: Attr;
}
export interface NavigationPreloadManager {
    disable(): Promise<void>;
    enable(): Promise<void>;
    getState(): Promise<NavigationPreloadState>;
    setHeaderValue(value: string): Promise<void>;
}
/** The state and the identity of the user agent. It allows scripts to query it and to register themselves to carry on some activities. */
export interface Navigator extends MSFileSaver, MSNavigatorDoNotTrack, NavigatorAutomationInformation, NavigatorBeacon, NavigatorConcurrentHardware, NavigatorContentUtils, NavigatorCookies, NavigatorID, NavigatorLanguage, NavigatorOnLine, NavigatorPlugins, NavigatorStorage {
    readonly activeVRDisplays: ReadonlyArray<VRDisplay>;
    readonly clipboard: Clipboard;
    readonly credentials: CredentialsContainer;
    readonly doNotTrack: string | null;
    readonly geolocation: Geolocation;
    readonly maxTouchPoints: number;
    readonly mediaDevices: MediaDevices;
    readonly msManipulationViewsEnabled: boolean;
    readonly msMaxTouchPoints: number;
    readonly msPointerEnabled: boolean;
    readonly permissions: Permissions;
    readonly pointerEnabled: boolean;
    readonly serviceWorker: ServiceWorkerContainer;
    getGamepads(): (Gamepad | null)[];
    getUserMedia(constraints: MediaStreamConstraints, successCallback: NavigatorUserMediaSuccessCallback, errorCallback: NavigatorUserMediaErrorCallback): void;
    getVRDisplays(): Promise<VRDisplay[]>;
    msLaunchUri(uri: string, successCallback?: MSLaunchUriCallback, noHandlerCallback?: MSLaunchUriCallback): void;
    requestMediaKeySystemAccess(keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
    vibrate(pattern: number | number[]): boolean;
}
export interface NavigatorAutomationInformation {
    readonly webdriver: boolean;
}
export interface NavigatorBeacon {
    sendBeacon(url: string, data?: Blob | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | FormData | string | null): boolean;
}
export interface NavigatorConcurrentHardware {
    readonly hardwareConcurrency: number;
}
export interface NavigatorContentUtils {
    registerProtocolHandler(scheme: string, url: string, title: string): void;
    unregisterProtocolHandler(scheme: string, url: string): void;
}
export interface NavigatorCookies {
    readonly cookieEnabled: boolean;
}
export interface NavigatorID {
    readonly appCodeName: string;
    readonly appName: string;
    readonly appVersion: string;
    readonly oscpu: string;
    readonly platform: string;
    readonly product: string;
    readonly productSub: string;
    readonly userAgent: string;
    readonly vendor: string;
    readonly vendorSub: string;
    taintEnabled(): boolean;
}
export interface NavigatorLanguage {
    readonly language: string;
    readonly languages: ReadonlyArray<string>;
}
export interface NavigatorOnLine {
    readonly onLine: boolean;
}
export interface NavigatorPlugins {
    readonly mimeTypes: MimeTypeArray;
    readonly plugins: PluginArray;
    javaEnabled(): boolean;
}
export interface NavigatorStorage {
    readonly storage: StorageManager;
}
/** Node is an interface from which a number of DOM API object types inherit. It allows those types to be treated similarly; for example, inheriting the same set of methods, or being tested in the same way. */
export interface Node extends EventTarget {
    /**
     * Returns node's node document's document base URL.
     */
    readonly baseURI: string;
    /**
     * Returns the children.
     */
    readonly childNodes: NodeListOf<ChildNode>;
    /**
     * Returns the first child.
     */
    readonly firstChild: ChildNode | null;
    /**
     * Returns true if node is connected and false otherwise.
     */
    readonly isConnected: boolean;
    /**
     * Returns the last child.
     */
    readonly lastChild: ChildNode | null;
    /** @deprecated */
    readonly namespaceURI: string | null;
    /**
     * Returns the next sibling.
     */
    readonly nextSibling: ChildNode | null;
    /**
     * Returns a string appropriate for the type of node.
     */
    readonly nodeName: string;
    /**
     * Returns the type of node.
     */
    readonly nodeType: number;
    nodeValue: string | null;
    /**
     * Returns the node document. Returns null for documents.
     */
    readonly ownerDocument: Document | null;
    /**
     * Returns the parent element.
     */
    readonly parentElement: HTMLElement | null;
    /**
     * Returns the parent.
     */
    readonly parentNode: Node & ParentNode | null;
    /**
     * Returns the previous sibling.
     */
    readonly previousSibling: ChildNode | null;
    textContent: string | null;
    appendChild<T extends Node>(newChild: T): T;
    /**
     * Returns a copy of node. If deep is true, the copy also includes the node's descendants.
     */
    cloneNode(deep?: boolean): Node;
    /**
     * Returns a bitmask indicating the position of other relative to node.
     */
    compareDocumentPosition(other: Node): number;
    /**
     * Returns true if other is an inclusive descendant of node, and false otherwise.
     */
    contains(other: Node | null): boolean;
    /**
     * Returns node's root.
     */
    getRootNode(options?: GetRootNodeOptions): Node;
    /**
     * Returns whether node has children.
     */
    hasChildNodes(): boolean;
    insertBefore<T extends Node>(newChild: T, refChild: Node | null): T;
    isDefaultNamespace(namespace: string | null): boolean;
    /**
     * Returns whether node and otherNode have the same properties.
     */
    isEqualNode(otherNode: Node | null): boolean;
    isSameNode(otherNode: Node | null): boolean;
    lookupNamespaceURI(prefix: string | null): string | null;
    lookupPrefix(namespace: string | null): string | null;
    /**
     * Removes empty exclusive Text nodes and concatenates the data of remaining contiguous exclusive Text nodes into the first of their nodes.
     */
    normalize(): void;
    removeChild<T extends Node>(oldChild: T): T;
    replaceChild<T extends Node>(newChild: Node, oldChild: T): T;
    readonly ATTRIBUTE_NODE: number;
    /**
     * node is a CDATASection node.
     */
    readonly CDATA_SECTION_NODE: number;
    /**
     * node is a Comment node.
     */
    readonly COMMENT_NODE: number;
    /**
     * node is a DocumentFragment node.
     */
    readonly DOCUMENT_FRAGMENT_NODE: number;
    /**
     * node is a document.
     */
    readonly DOCUMENT_NODE: number;
    /**
     * Set when other is a descendant of node.
     */
    readonly DOCUMENT_POSITION_CONTAINED_BY: number;
    /**
     * Set when other is an ancestor of node.
     */
    readonly DOCUMENT_POSITION_CONTAINS: number;
    /**
     * Set when node and other are not in the same tree.
     */
    readonly DOCUMENT_POSITION_DISCONNECTED: number;
    /**
     * Set when other is following node.
     */
    readonly DOCUMENT_POSITION_FOLLOWING: number;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    /**
     * Set when other is preceding node.
     */
    readonly DOCUMENT_POSITION_PRECEDING: number;
    /**
     * node is a doctype.
     */
    readonly DOCUMENT_TYPE_NODE: number;
    /**
     * node is an element.
     */
    readonly ELEMENT_NODE: number;
    readonly ENTITY_NODE: number;
    readonly ENTITY_REFERENCE_NODE: number;
    readonly NOTATION_NODE: number;
    /**
     * node is a ProcessingInstruction node.
     */
    readonly PROCESSING_INSTRUCTION_NODE: number;
    /**
     * node is a Text node.
     */
    readonly TEXT_NODE: number;
}
/** An object used to filter the nodes in a NodeIterator or TreeWalker. They don't know anything about the DOM or how to traverse nodes; they just know how to evaluate a single node against the provided filter. */
export interface NodeFilter {
    acceptNode(node: Node): number;
}
/** An iterator over the members of a list of the nodes in a subtree of the DOM. The nodes will be returned in document order. */
export interface NodeIterator {
    readonly filter: NodeFilter | null;
    readonly pointerBeforeReferenceNode: boolean;
    readonly referenceNode: Node;
    readonly root: Node;
    readonly whatToShow: number;
    detach(): void;
    nextNode(): Node | null;
    previousNode(): Node | null;
}
/** NodeList objects are collections of nodes, usually returned by properties such as Node.childNodes and methods such as document.querySelectorAll(). */
export interface NodeList {
    /**
     * Returns the number of nodes in the collection.
     */
    readonly length: number;
    /**
     * Returns the node with index index from the collection. The nodes are sorted in tree order.
     */
    item(index: number): Node | null;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: Node, key: number, parent: NodeList) => void, thisArg?: any): void;
    [index: number]: Node;
}
export interface NodeListOf<TNode extends Node> extends NodeList {
    length: number;
    item(index: number): TNode;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: TNode, key: number, parent: NodeListOf<TNode>) => void, thisArg?: any): void;
    [index: number]: TNode;
}
export interface NonDocumentTypeChildNode {
    /**
     * Returns the first following sibling that is an element, and null otherwise.
     */
    readonly nextElementSibling: Element | null;
    /**
     * Returns the first preceding sibling that is an element, and null otherwise.
     */
    readonly previousElementSibling: Element | null;
}
export interface NonElementParentNode {
    /**
     * Returns the first element within node's descendants whose ID is elementId.
     */
    getElementById(elementId: string): Element | null;
}
export interface NotificationEventMap {
    "click": Event;
    "close": Event;
    "error": Event;
    "show": Event;
}
/** This Notifications API interface is used to configure and display desktop notifications to the user. */
export interface Notification extends EventTarget {
    readonly actions: ReadonlyArray<NotificationAction>;
    readonly badge: string;
    readonly body: string;
    readonly data: any;
    readonly dir: NotificationDirection;
    readonly icon: string;
    readonly image: string;
    readonly lang: string;
    onclick: ((this: Notification, ev: Event) => any) | null;
    onclose: ((this: Notification, ev: Event) => any) | null;
    onerror: ((this: Notification, ev: Event) => any) | null;
    onshow: ((this: Notification, ev: Event) => any) | null;
    readonly renotify: boolean;
    readonly requireInteraction: boolean;
    readonly silent: boolean;
    readonly tag: string;
    readonly timestamp: number;
    readonly title: string;
    readonly vibrate: ReadonlyArray<number>;
    close(): void;
    addEventListener<K extends keyof NotificationEventMap>(type: K, listener: (this: Notification, ev: NotificationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof NotificationEventMap>(type: K, listener: (this: Notification, ev: NotificationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The OES_element_index_uint extension is part of the WebGL API and adds support for gl.UNSIGNED_INT types to WebGLRenderingContext.drawElements(). */
export interface OES_element_index_uint {
}
/** The OES_standard_derivatives extension is part of the WebGL API and adds the GLSL derivative functions dFdx, dFdy, and fwidth. */
export interface OES_standard_derivatives {
    readonly FRAGMENT_SHADER_DERIVATIVE_HINT_OES: GLenum;
}
/** The OES_texture_float extension is part of the WebGL API and exposes floating-point pixel types for textures. */
export interface OES_texture_float {
}
/** The OES_texture_float_linear extension is part of the WebGL API and allows linear filtering with floating-point pixel types for textures. */
export interface OES_texture_float_linear {
}
/** The OES_texture_half_float extension is part of the WebGL API and adds texture formats with 16- (aka half float) and 32-bit floating-point components. */
export interface OES_texture_half_float {
    readonly HALF_FLOAT_OES: GLenum;
}
/** The OES_texture_half_float_linear extension is part of the WebGL API and allows linear filtering with half floating-point pixel types for textures. */
export interface OES_texture_half_float_linear {
}
export interface OES_vertex_array_object {
    bindVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES | null): void;
    createVertexArrayOES(): WebGLVertexArrayObjectOES | null;
    deleteVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES | null): void;
    isVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES | null): GLboolean;
    readonly VERTEX_ARRAY_BINDING_OES: GLenum;
}
/** The Web Audio API OfflineAudioCompletionEvent interface represents events that occur when the processing of an OfflineAudioContext is terminated. The complete event implements this interface. */
export interface OfflineAudioCompletionEvent extends Event {
    readonly renderedBuffer: AudioBuffer;
}
export interface OfflineAudioContextEventMap extends BaseAudioContextEventMap {
    "complete": OfflineAudioCompletionEvent;
}
/** An AudioContext interface representing an audio-processing graph built from linked together AudioNodes. In contrast with a standard AudioContext, an OfflineAudioContext doesn't render the audio to the device hardware; instead, it generates it, as fast as it can, and outputs the result to an AudioBuffer. */
export interface OfflineAudioContext extends BaseAudioContext {
    readonly length: number;
    oncomplete: ((this: OfflineAudioContext, ev: OfflineAudioCompletionEvent) => any) | null;
    resume(): Promise<void>;
    startRendering(): Promise<AudioBuffer>;
    suspend(suspendTime: number): Promise<void>;
    addEventListener<K extends keyof OfflineAudioContextEventMap>(type: K, listener: (this: OfflineAudioContext, ev: OfflineAudioContextEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof OfflineAudioContextEventMap>(type: K, listener: (this: OfflineAudioContext, ev: OfflineAudioContextEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface OffscreenCanvas extends EventTarget {
    /**
     * These attributes return the dimensions of the OffscreenCanvas object's bitmap.
     *
     * They can be set, to replace the bitmap with a new, transparent black bitmap of the specified dimensions (effectively resizing it).
     */
    height: number;
    /**
     * These attributes return the dimensions of the OffscreenCanvas object's bitmap.
     *
     * They can be set, to replace the bitmap with a new, transparent black bitmap of the specified dimensions (effectively resizing it).
     */
    width: number;
    /**
     * Returns a promise that will fulfill with a new Blob object representing a file containing the image in the OffscreenCanvas object.
     *
     * The argument, if provided, is a dictionary that controls the encoding options of the image file to be created. The type field specifies the file format and has a default value of "image/png"; that type is also used if the requested type isn't supported. If the image format supports variable quality (such as "image/jpeg"), then the quality field is a number in the range 0.0 to 1.0 inclusive indicating the desired quality level for the resulting image.
     */
    convertToBlob(options?: ImageEncodeOptions): Promise<Blob>;
    /**
     * Returns an object that exposes an API for drawing on the OffscreenCanvas object. contextId specifies the desired API: "2d", "bitmaprenderer", "webgl", or "webgl2". options is handled by that API.
     *
     * This specification defines the "2d" context below, which is similar but distinct from the "2d" context that is created from a canvas element. The WebGL specifications define the "webgl" and "webgl2" contexts. [WEBGL]
     *
     * Returns null if the canvas has already been initialized with another context type (e.g., trying to get a "2d" context after getting a "webgl" context).
     */
    getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): OffscreenCanvasRenderingContext2D | null;
    getContext(contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    getContext(contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
    getContext(contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;
    getContext(contextId: OffscreenRenderingContextId, options?: any): OffscreenRenderingContext | null;
    /**
     * Returns a newly created ImageBitmap object with the image in the OffscreenCanvas object. The image in the OffscreenCanvas object is replaced with a new blank image.
     */
    transferToImageBitmap(): ImageBitmap;
}
export interface OffscreenCanvasRenderingContext2D extends CanvasCompositing, CanvasDrawImage, CanvasDrawPath, CanvasFillStrokeStyles, CanvasFilters, CanvasImageData, CanvasImageSmoothing, CanvasPath, CanvasPathDrawingStyles, CanvasRect, CanvasShadowStyles, CanvasState, CanvasText, CanvasTextDrawingStyles, CanvasTransform {
    readonly canvas: OffscreenCanvas;
    commit(): void;
}
/** The OscillatorNode interface represents a periodic waveform, such as a sine wave. It is an AudioScheduledSourceNode audio-processing module that causes a specified frequency of a given wave to be created—in effect, a constant tone. */
export interface OscillatorNode extends AudioScheduledSourceNode {
    readonly detune: AudioParam;
    readonly frequency: AudioParam;
    type: OscillatorType;
    setPeriodicWave(periodicWave: PeriodicWave): void;
    addEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: OscillatorNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: (this: OscillatorNode, ev: AudioScheduledSourceNodeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface OverconstrainedError extends Error {
    constraint: string;
}
export interface OverflowEvent extends UIEvent {
    readonly horizontalOverflow: boolean;
    readonly orient: number;
    readonly verticalOverflow: boolean;
    readonly BOTH: number;
    readonly HORIZONTAL: number;
    readonly VERTICAL: number;
}
/** The PageTransitionEvent is fired when a document is being loaded or unloaded. */
export interface PageTransitionEvent extends Event {
    /**
     * For the pageshow event, returns false if the page is newly being loaded (and the load event will fire). Otherwise, returns true.
     *
     * For the pagehide event, returns false if the page is going away for the last time. Otherwise, returns true, meaning that (if nothing conspires to make the page unsalvageable) the page might be reused if the user navigates back to this page.
     *
     * Things that can cause the page to be unsalvageable include:
     *
     * Listening for beforeunload events
     * Listening for unload events
     * Having iframes that are not salvageable
     * Active WebSocket objects
     * Aborting a Document
     */
    readonly persisted: boolean;
}
/** A PannerNode always has exactly one input and one output: the input can be mono or stereo but the output is always stereo (2 channels); you can't have panning effects without at least two audio channels! */
export interface PannerNode extends AudioNode {
    coneInnerAngle: number;
    coneOuterAngle: number;
    coneOuterGain: number;
    distanceModel: DistanceModelType;
    maxDistance: number;
    readonly orientationX: AudioParam;
    readonly orientationY: AudioParam;
    readonly orientationZ: AudioParam;
    panningModel: PanningModelType;
    readonly positionX: AudioParam;
    readonly positionY: AudioParam;
    readonly positionZ: AudioParam;
    refDistance: number;
    rolloffFactor: number;
    /** @deprecated */
    setOrientation(x: number, y: number, z: number): void;
    /** @deprecated */
    setPosition(x: number, y: number, z: number): void;
}
export interface ParentNode {
    readonly childElementCount: number;
    /**
     * Returns the child elements.
     */
    readonly children: HTMLCollection;
    /**
     * Returns the first child that is an element, and null otherwise.
     */
    readonly firstElementChild: Element | null;
    /**
     * Returns the last child that is an element, and null otherwise.
     */
    readonly lastElementChild: Element | null;
    /**
     * Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    append(...nodes: (Node | string)[]): void;
    /**
     * Inserts nodes before the first child of node, while replacing strings in nodes with equivalent Text nodes.
     *
     * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
     */
    prepend(...nodes: (Node | string)[]): void;
    /**
     * Returns the first element that is a descendant of node that matches selectors.
     */
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector<E extends Element = Element>(selectors: string): E | null;
    /**
     * Returns all element descendants of node that match selectors.
     */
    querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
    querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
}
/** This Canvas 2D API interface is used to declare a path that can then be used on a CanvasRenderingContext2D object. The path methods of the CanvasRenderingContext2D interface are also present on this interface, which gives you the convenience of being able to retain and replay your path whenever desired. */
export interface Path2D extends CanvasPath {
    /**
     * Adds to the path the path given by the argument.
     */
    addPath(path: Path2D, transform?: DOMMatrix2DInit): void;
}
/** This Payment Request API interface is used to store shipping or payment address information. */
export interface PaymentAddress {
    readonly addressLine: string[];
    readonly city: string;
    readonly country: string;
    readonly dependentLocality: string;
    readonly languageCode: string;
    readonly organization: string;
    readonly phone: string;
    readonly postalCode: string;
    readonly recipient: string;
    readonly region: string;
    readonly sortingCode: string;
    toJSON(): any;
}
export interface PaymentRequestEventMap {
    "shippingaddresschange": Event;
    "shippingoptionchange": Event;
}
/** This Payment Request API interface is the primary access point into the API, and lets web content and apps accept payments from the end user. */
export interface PaymentRequest extends EventTarget {
    readonly id: string;
    onshippingaddresschange: ((this: PaymentRequest, ev: Event) => any) | null;
    onshippingoptionchange: ((this: PaymentRequest, ev: Event) => any) | null;
    readonly shippingAddress: PaymentAddress | null;
    readonly shippingOption: string | null;
    readonly shippingType: PaymentShippingType | null;
    abort(): Promise<void>;
    canMakePayment(): Promise<boolean>;
    show(): Promise<PaymentResponse>;
    addEventListener<K extends keyof PaymentRequestEventMap>(type: K, listener: (this: PaymentRequest, ev: PaymentRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof PaymentRequestEventMap>(type: K, listener: (this: PaymentRequest, ev: PaymentRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** This Payment Request API interface enables a web page to update the details of a PaymentRequest in response to a user action. */
export interface PaymentRequestUpdateEvent extends Event {
    updateWith(detailsPromise: PaymentDetailsUpdate | Promise<PaymentDetailsUpdate>): void;
}
/** This Payment Request API interface is returned after a user selects a payment method and approves a payment request. */
export interface PaymentResponse {
    readonly details: any;
    readonly methodName: string;
    readonly payerEmail: string | null;
    readonly payerName: string | null;
    readonly payerPhone: string | null;
    readonly requestId: string;
    readonly shippingAddress: PaymentAddress | null;
    readonly shippingOption: string | null;
    complete(result?: PaymentComplete): Promise<void>;
    toJSON(): any;
}
export interface PerfWidgetExternal {
    readonly activeNetworkRequestCount: number;
    readonly averageFrameTime: number;
    readonly averagePaintTime: number;
    readonly extraInformationEnabled: boolean;
    readonly independentRenderingEnabled: boolean;
    readonly irDisablingContentString: string;
    readonly irStatusAvailable: boolean;
    readonly maxCpuSpeed: number;
    readonly paintRequestsPerSecond: number;
    readonly performanceCounter: number;
    readonly performanceCounterFrequency: number;
    addEventListener(eventType: string, callback: Function): void;
    getMemoryUsage(): number;
    getProcessCpuUsage(): number;
    getRecentCpuUsage(last: number | null): any;
    getRecentFrames(last: number | null): any;
    getRecentMemoryUsage(last: number | null): any;
    getRecentPaintRequests(last: number | null): any;
    removeEventListener(eventType: string, callback: Function): void;
    repositionWindow(x: number, y: number): void;
    resizeWindow(width: number, height: number): void;
}
export interface PerformanceEventMap {
    "resourcetimingbufferfull": Event;
}
/** Provides access to performance-related information for the current page. It's part of the High Resolution Time API, but is enhanced by the Performance Timeline API, the Navigation Timing API, the User Timing API, and the Resource Timing API. */
export interface Performance extends EventTarget {
    /** @deprecated */
    readonly navigation: PerformanceNavigation;
    onresourcetimingbufferfull: ((this: Performance, ev: Event) => any) | null;
    readonly timeOrigin: number;
    /** @deprecated */
    readonly timing: PerformanceTiming;
    clearMarks(markName?: string): void;
    clearMeasures(measureName?: string): void;
    clearResourceTimings(): void;
    getEntries(): PerformanceEntryList;
    getEntriesByName(name: string, type?: string): PerformanceEntryList;
    getEntriesByType(type: string): PerformanceEntryList;
    mark(markName: string): void;
    measure(measureName: string, startMark?: string, endMark?: string): void;
    now(): number;
    setResourceTimingBufferSize(maxSize: number): void;
    toJSON(): any;
    addEventListener<K extends keyof PerformanceEventMap>(type: K, listener: (this: Performance, ev: PerformanceEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof PerformanceEventMap>(type: K, listener: (this: Performance, ev: PerformanceEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Encapsulates a single performance metric that is part of the performance timeline. A performance entry can be directly created by making a performance mark or measure (for example by calling the mark() method) at an explicit point in an application. Performance entries are also created in indirect ways such as loading a resource (such as an image). */
export interface PerformanceEntry {
    readonly duration: number;
    readonly entryType: string;
    readonly name: string;
    readonly startTime: number;
    toJSON(): any;
}
/** PerformanceMark is an abstract interface for PerformanceEntry objects with an entryType of "mark". Entries of this type are created by calling performance.mark() to add a named DOMHighResTimeStamp (the mark) to the browser's performance timeline. */
export interface PerformanceMark extends PerformanceEntry {
}
/** PerformanceMeasure is an abstract interface for PerformanceEntry objects with an entryType of "measure". Entries of this type are created by calling performance.measure() to add a named DOMHighResTimeStamp (the measure) between two marks to the browser's performance timeline. */
export interface PerformanceMeasure extends PerformanceEntry {
}
/** The legacy PerformanceNavigation interface represents information about how the navigation to the current document was done. */
export interface PerformanceNavigation {
    readonly redirectCount: number;
    readonly type: number;
    toJSON(): any;
    readonly TYPE_BACK_FORWARD: number;
    readonly TYPE_NAVIGATE: number;
    readonly TYPE_RELOAD: number;
    readonly TYPE_RESERVED: number;
}
/** Provides methods and properties to store and retrieve metrics regarding the browser's document navigation events. For example, this interface can be used to determine how much time it takes to load or unload a document. */
export interface PerformanceNavigationTiming extends PerformanceResourceTiming {
    readonly domComplete: number;
    readonly domContentLoadedEventEnd: number;
    readonly domContentLoadedEventStart: number;
    readonly domInteractive: number;
    readonly loadEventEnd: number;
    readonly loadEventStart: number;
    readonly redirectCount: number;
    readonly type: NavigationType;
    readonly unloadEventEnd: number;
    readonly unloadEventStart: number;
    toJSON(): any;
}
export interface PerformanceObserver {
    disconnect(): void;
    observe(options?: PerformanceObserverInit): void;
    takeRecords(): PerformanceEntryList;
}
export interface PerformanceObserverEntryList {
    getEntries(): PerformanceEntryList;
    getEntriesByName(name: string, type?: string): PerformanceEntryList;
    getEntriesByType(type: string): PerformanceEntryList;
}
/** Enables retrieval and analysis of detailed network timing data regarding the loading of an application's resources. An application can use the timing metrics to determine, for example, the length of time it takes to fetch a specific resource, such as an XMLHttpRequest, <SVG>, image, or script. */
export interface PerformanceResourceTiming extends PerformanceEntry {
    readonly connectEnd: number;
    readonly connectStart: number;
    readonly decodedBodySize: number;
    readonly domainLookupEnd: number;
    readonly domainLookupStart: number;
    readonly encodedBodySize: number;
    readonly fetchStart: number;
    readonly initiatorType: string;
    readonly nextHopProtocol: string;
    readonly redirectEnd: number;
    readonly redirectStart: number;
    readonly requestStart: number;
    readonly responseEnd: number;
    readonly responseStart: number;
    readonly secureConnectionStart: number;
    readonly transferSize: number;
    readonly workerStart: number;
    toJSON(): any;
}
/** A legacy interface kept for backwards compatibility and contains properties that offer performance timing information for various events which occur during the loading and use of the current page. You get a PerformanceTiming object describing your page using the window.performance.timing property. */
export interface PerformanceTiming {
    readonly connectEnd: number;
    readonly connectStart: number;
    readonly domComplete: number;
    readonly domContentLoadedEventEnd: number;
    readonly domContentLoadedEventStart: number;
    readonly domInteractive: number;
    readonly domLoading: number;
    readonly domainLookupEnd: number;
    readonly domainLookupStart: number;
    readonly fetchStart: number;
    readonly loadEventEnd: number;
    readonly loadEventStart: number;
    readonly navigationStart: number;
    readonly redirectEnd: number;
    readonly redirectStart: number;
    readonly requestStart: number;
    readonly responseEnd: number;
    readonly responseStart: number;
    readonly secureConnectionStart: number;
    readonly unloadEventEnd: number;
    readonly unloadEventStart: number;
    toJSON(): any;
}
/** PeriodicWave has no inputs or outputs; it is used to define custom oscillators when calling OscillatorNode.setPeriodicWave(). The PeriodicWave itself is created/returned by AudioContext.createPeriodicWave(). */
export interface PeriodicWave {
}
export interface PermissionRequest extends DeferredPermissionRequest {
    readonly state: MSWebViewPermissionState;
    defer(): void;
}
export interface PermissionRequestedEvent extends Event {
    readonly permissionRequest: PermissionRequest;
}
export interface PermissionStatusEventMap {
    "change": Event;
}
export interface PermissionStatus extends EventTarget {
    onchange: ((this: PermissionStatus, ev: Event) => any) | null;
    readonly state: PermissionState;
    addEventListener<K extends keyof PermissionStatusEventMap>(type: K, listener: (this: PermissionStatus, ev: PermissionStatusEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof PermissionStatusEventMap>(type: K, listener: (this: PermissionStatus, ev: PermissionStatusEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface Permissions {
    query(permissionDesc: PermissionDescriptor | DevicePermissionDescriptor | MidiPermissionDescriptor | PushPermissionDescriptor): Promise<PermissionStatus>;
}
/** Provides information about a browser plugin. */
export interface Plugin {
    /**
     * Returns the plugin's description.
     */
    readonly description: string;
    /**
     * Returns the plugin library's filename, if applicable on the current platform.
     */
    readonly filename: string;
    /**
     * Returns the number of MIME types, represented by MimeType objects, supported by the plugin.
     */
    readonly length: number;
    /**
     * Returns the plugin's name.
     */
    readonly name: string;
    /**
     * Returns the specified MimeType object.
     */
    item(index: number): MimeType | null;
    namedItem(name: string): MimeType | null;
    [index: number]: MimeType;
}
/** Used to store a list of Plugin objects describing the available plugins; it's returned by the window.navigator.plugins property. The PluginArray is not a JavaScript array, but has the length property and supports accessing individual items using bracket notation (plugins[2]), as well as via item(index) and namedItem("name") methods. */
export interface PluginArray {
    readonly length: number;
    item(index: number): Plugin | null;
    namedItem(name: string): Plugin | null;
    refresh(reload?: boolean): void;
    [index: number]: Plugin;
}
/** The state of a DOM event produced by a pointer such as the geometry of the contact point, the device type that generated the event, the amount of pressure that was applied on the contact surface, etc. */
export interface PointerEvent extends MouseEvent {
    readonly height: number;
    readonly isPrimary: boolean;
    readonly pointerId: number;
    readonly pointerType: string;
    readonly pressure: number;
    readonly tangentialPressure: number;
    readonly tiltX: number;
    readonly tiltY: number;
    readonly twist: number;
    readonly width: number;
}
/** PopStateEvent is an event handler for the popstate event on the window. */
export interface PopStateEvent extends Event {
    /**
     * Returns a copy of the information that was provided to pushState() or replaceState().
     */
    readonly state: any;
}
/** The position of the concerned device at a given time. The position, represented by a Coordinates object, comprehends the 2D position of the device, on a spheroid representing the Earth, but also its altitude and its speed. */
export interface Position {
    readonly coords: Coordinates;
    readonly timestamp: number;
}
/** The reason of an error occurring when using the geolocating device. */
export interface PositionError {
    readonly code: number;
    readonly message: string;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
}
/** A processing instruction embeds application-specific instructions in XML which can be ignored by other applications that don't recognize them. */
export interface ProcessingInstruction extends CharacterData {
    readonly target: string;
}
/** Events measuring progress of an underlying process, like an HTTP request (for an XMLHttpRequest, or the loading of the underlying resource of an <img>, <audio>, <video>, <style> or <link>). */
export interface ProgressEvent<T extends EventTarget = EventTarget> extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly target: T | null;
    readonly total: number;
}
export interface PromiseRejectionEvent extends Event {
    readonly promise: Promise<any>;
    readonly reason: any;
}
export interface PublicKeyCredential extends Credential {
    readonly rawId: ArrayBuffer;
    readonly response: AuthenticatorResponse;
    getClientExtensionResults(): AuthenticationExtensionsClientOutputs;
}
/** This Push API interface provides a way to receive notifications from third-party servers as well as request URLs for push notifications. */
export interface PushManager {
    getSubscription(): Promise<PushSubscription | null>;
    permissionState(options?: PushSubscriptionOptionsInit): Promise<PushPermissionState>;
    subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
}
/** This Push API interface provides a subcription's URL endpoint and allows unsubscription from a push service. */
export interface PushSubscription {
    readonly endpoint: string;
    readonly expirationTime: number | null;
    readonly options: PushSubscriptionOptions;
    getKey(name: PushEncryptionKeyName): ArrayBuffer | null;
    toJSON(): PushSubscriptionJSON;
    unsubscribe(): Promise<boolean>;
}
export interface PushSubscriptionOptions {
    readonly applicationServerKey: ArrayBuffer | null;
    readonly userVisibleOnly: boolean;
}
export interface RTCCertificate {
    readonly expires: number;
    getFingerprints(): RTCDtlsFingerprint[];
}
export interface RTCDTMFSenderEventMap {
    "tonechange": RTCDTMFToneChangeEvent;
}
export interface RTCDTMFSender extends EventTarget {
    readonly canInsertDTMF: boolean;
    ontonechange: ((this: RTCDTMFSender, ev: RTCDTMFToneChangeEvent) => any) | null;
    readonly toneBuffer: string;
    insertDTMF(tones: string, duration?: number, interToneGap?: number): void;
    addEventListener<K extends keyof RTCDTMFSenderEventMap>(type: K, listener: (this: RTCDTMFSender, ev: RTCDTMFSenderEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCDTMFSenderEventMap>(type: K, listener: (this: RTCDTMFSender, ev: RTCDTMFSenderEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Events sent to indicate that DTMF tones have started or finished playing. This interface is used by the tonechange event. */
export interface RTCDTMFToneChangeEvent extends Event {
    readonly tone: string;
}
export interface RTCDataChannelEventMap {
    "bufferedamountlow": Event;
    "close": Event;
    "error": RTCErrorEvent;
    "message": MessageEvent;
    "open": Event;
}
export interface RTCDataChannel extends EventTarget {
    binaryType: string;
    readonly bufferedAmount: number;
    bufferedAmountLowThreshold: number;
    readonly id: number | null;
    readonly label: string;
    readonly maxPacketLifeTime: number | null;
    readonly maxRetransmits: number | null;
    readonly negotiated: boolean;
    onbufferedamountlow: ((this: RTCDataChannel, ev: Event) => any) | null;
    onclose: ((this: RTCDataChannel, ev: Event) => any) | null;
    onerror: ((this: RTCDataChannel, ev: RTCErrorEvent) => any) | null;
    onmessage: ((this: RTCDataChannel, ev: MessageEvent) => any) | null;
    onopen: ((this: RTCDataChannel, ev: Event) => any) | null;
    readonly ordered: boolean;
    readonly priority: RTCPriorityType;
    readonly protocol: string;
    readonly readyState: RTCDataChannelState;
    close(): void;
    send(data: string): void;
    send(data: Blob): void;
    send(data: ArrayBuffer): void;
    send(data: ArrayBufferView): void;
    addEventListener<K extends keyof RTCDataChannelEventMap>(type: K, listener: (this: RTCDataChannel, ev: RTCDataChannelEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCDataChannelEventMap>(type: K, listener: (this: RTCDataChannel, ev: RTCDataChannelEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface RTCDataChannelEvent extends Event {
    readonly channel: RTCDataChannel;
}
export interface RTCDtlsTransportEventMap {
    "error": RTCErrorEvent;
    "statechange": Event;
}
export interface RTCDtlsTransport extends EventTarget {
    readonly iceTransport: RTCIceTransport;
    onerror: ((this: RTCDtlsTransport, ev: RTCErrorEvent) => any) | null;
    onstatechange: ((this: RTCDtlsTransport, ev: Event) => any) | null;
    readonly state: RTCDtlsTransportState;
    getRemoteCertificates(): ArrayBuffer[];
    addEventListener<K extends keyof RTCDtlsTransportEventMap>(type: K, listener: (this: RTCDtlsTransport, ev: RTCDtlsTransportEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCDtlsTransportEventMap>(type: K, listener: (this: RTCDtlsTransport, ev: RTCDtlsTransportEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface RTCDtlsTransportStateChangedEvent extends Event {
    readonly state: RTCDtlsTransportState;
}
export interface RTCDtmfSenderEventMap {
    "tonechange": RTCDTMFToneChangeEvent;
}
export interface RTCDtmfSender extends EventTarget {
    readonly canInsertDTMF: boolean;
    readonly duration: number;
    readonly interToneGap: number;
    ontonechange: ((this: RTCDtmfSender, ev: RTCDTMFToneChangeEvent) => any) | null;
    readonly sender: RTCRtpSender;
    readonly toneBuffer: string;
    insertDTMF(tones: string, duration?: number, interToneGap?: number): void;
    addEventListener<K extends keyof RTCDtmfSenderEventMap>(type: K, listener: (this: RTCDtmfSender, ev: RTCDtmfSenderEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCDtmfSenderEventMap>(type: K, listener: (this: RTCDtmfSender, ev: RTCDtmfSenderEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface RTCError extends DOMException {
    readonly errorDetail: RTCErrorDetailType;
    readonly httpRequestStatusCode: number | null;
    readonly receivedAlert: number | null;
    readonly sctpCauseCode: number | null;
    readonly sdpLineNumber: number | null;
    readonly sentAlert: number | null;
}
export interface RTCErrorEvent extends Event {
    readonly error: RTCError;
}
/** The RTCIceCandidate interface—part of the WebRTC API—represents a candidate Internet Connectivity Establishment (ICE) configuration which may be used to establish an RTCPeerConnection. */
export interface RTCIceCandidate {
    readonly candidate: string;
    readonly component: RTCIceComponent | null;
    readonly foundation: string | null;
    readonly port: number | null;
    readonly priority: number | null;
    readonly protocol: RTCIceProtocol | null;
    readonly relatedAddress: string | null;
    readonly relatedPort: number | null;
    readonly sdpMLineIndex: number | null;
    readonly sdpMid: string | null;
    readonly tcpType: RTCIceTcpCandidateType | null;
    readonly type: RTCIceCandidateType | null;
    readonly usernameFragment: string | null;
    toJSON(): RTCIceCandidateInit;
}
export interface RTCIceCandidatePairChangedEvent extends Event {
    readonly pair: RTCIceCandidatePair;
}
export interface RTCIceGathererEventMap {
    "error": Event;
    "localcandidate": RTCIceGathererEvent;
}
export interface RTCIceGatherer extends RTCStatsProvider {
    readonly component: RTCIceComponent;
    onerror: ((this: RTCIceGatherer, ev: Event) => any) | null;
    onlocalcandidate: ((this: RTCIceGatherer, ev: RTCIceGathererEvent) => any) | null;
    createAssociatedGatherer(): RTCIceGatherer;
    getLocalCandidates(): RTCIceCandidateDictionary[];
    getLocalParameters(): RTCIceParameters;
    addEventListener<K extends keyof RTCIceGathererEventMap>(type: K, listener: (this: RTCIceGatherer, ev: RTCIceGathererEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCIceGathererEventMap>(type: K, listener: (this: RTCIceGatherer, ev: RTCIceGathererEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface RTCIceGathererEvent extends Event {
    readonly candidate: RTCIceCandidateDictionary | RTCIceCandidateComplete;
}
export interface RTCIceTransportEventMap {
    "gatheringstatechange": Event;
    "selectedcandidatepairchange": Event;
    "statechange": Event;
}
/** Provides access to information about the ICE transport layer over which the data is being sent and received. */
export interface RTCIceTransport extends EventTarget {
    readonly component: RTCIceComponent;
    readonly gatheringState: RTCIceGathererState;
    ongatheringstatechange: ((this: RTCIceTransport, ev: Event) => any) | null;
    onselectedcandidatepairchange: ((this: RTCIceTransport, ev: Event) => any) | null;
    onstatechange: ((this: RTCIceTransport, ev: Event) => any) | null;
    readonly role: RTCIceRole;
    readonly state: RTCIceTransportState;
    getLocalCandidates(): RTCIceCandidate[];
    getLocalParameters(): RTCIceParameters | null;
    getRemoteCandidates(): RTCIceCandidate[];
    getRemoteParameters(): RTCIceParameters | null;
    getSelectedCandidatePair(): RTCIceCandidatePair | null;
    addEventListener<K extends keyof RTCIceTransportEventMap>(type: K, listener: (this: RTCIceTransport, ev: RTCIceTransportEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCIceTransportEventMap>(type: K, listener: (this: RTCIceTransport, ev: RTCIceTransportEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface RTCIceTransportStateChangedEvent extends Event {
    readonly state: RTCIceTransportState;
}
export interface RTCIdentityAssertion {
    idp: string;
    name: string;
}
export interface RTCPeerConnectionEventMap {
    "connectionstatechange": Event;
    "datachannel": RTCDataChannelEvent;
    "icecandidate": RTCPeerConnectionIceEvent;
    "icecandidateerror": RTCPeerConnectionIceErrorEvent;
    "iceconnectionstatechange": Event;
    "icegatheringstatechange": Event;
    "negotiationneeded": Event;
    "signalingstatechange": Event;
    "statsended": RTCStatsEvent;
    "track": RTCTrackEvent;
}
/** A WebRTC connection between the local computer and a remote peer. It provides methods to connect to a remote peer, maintain and monitor the connection, and close the connection once it's no longer needed. */
export interface RTCPeerConnection extends EventTarget {
    readonly canTrickleIceCandidates: boolean | null;
    readonly connectionState: RTCPeerConnectionState;
    readonly currentLocalDescription: RTCSessionDescription | null;
    readonly currentRemoteDescription: RTCSessionDescription | null;
    readonly iceConnectionState: RTCIceConnectionState;
    readonly iceGatheringState: RTCIceGatheringState;
    readonly idpErrorInfo: string | null;
    readonly idpLoginUrl: string | null;
    readonly localDescription: RTCSessionDescription | null;
    onconnectionstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;
    ondatachannel: ((this: RTCPeerConnection, ev: RTCDataChannelEvent) => any) | null;
    onicecandidate: ((this: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) => any) | null;
    onicecandidateerror: ((this: RTCPeerConnection, ev: RTCPeerConnectionIceErrorEvent) => any) | null;
    oniceconnectionstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;
    onicegatheringstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;
    onnegotiationneeded: ((this: RTCPeerConnection, ev: Event) => any) | null;
    onsignalingstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;
    onstatsended: ((this: RTCPeerConnection, ev: RTCStatsEvent) => any) | null;
    ontrack: ((this: RTCPeerConnection, ev: RTCTrackEvent) => any) | null;
    readonly peerIdentity: Promise<RTCIdentityAssertion>;
    readonly pendingLocalDescription: RTCSessionDescription | null;
    readonly pendingRemoteDescription: RTCSessionDescription | null;
    readonly remoteDescription: RTCSessionDescription | null;
    readonly sctp: RTCSctpTransport | null;
    readonly signalingState: RTCSignalingState;
    addIceCandidate(candidate: RTCIceCandidateInit | RTCIceCandidate): Promise<void>;
    addTrack(track: MediaStreamTrack, ...streams: MediaStream[]): RTCRtpSender;
    addTransceiver(trackOrKind: MediaStreamTrack | string, init?: RTCRtpTransceiverInit): RTCRtpTransceiver;
    close(): void;
    createAnswer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit>;
    createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit): RTCDataChannel;
    createOffer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit>;
    getConfiguration(): RTCConfiguration;
    getIdentityAssertion(): Promise<string>;
    getReceivers(): RTCRtpReceiver[];
    getSenders(): RTCRtpSender[];
    getStats(selector?: MediaStreamTrack | null): Promise<RTCStatsReport>;
    getTransceivers(): RTCRtpTransceiver[];
    removeTrack(sender: RTCRtpSender): void;
    setConfiguration(configuration: RTCConfiguration): void;
    setIdentityProvider(provider: string, options?: RTCIdentityProviderOptions): void;
    setLocalDescription(description: RTCSessionDescriptionInit): Promise<void>;
    setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void>;
    addEventListener<K extends keyof RTCPeerConnectionEventMap>(type: K, listener: (this: RTCPeerConnection, ev: RTCPeerConnectionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCPeerConnectionEventMap>(type: K, listener: (this: RTCPeerConnection, ev: RTCPeerConnectionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface RTCPeerConnectionIceErrorEvent extends Event {
    readonly errorCode: number;
    readonly errorText: string;
    readonly hostCandidate: string;
    readonly url: string;
}
/** Events that occurs in relation to ICE candidates with the target, usually an RTCPeerConnection. Only one event is of this type: icecandidate. */
export interface RTCPeerConnectionIceEvent extends Event {
    readonly candidate: RTCIceCandidate | null;
    readonly url: string | null;
}
/** This WebRTC API interface manages the reception and decoding of data for a MediaStreamTrack on an RTCPeerConnection. */
export interface RTCRtpReceiver {
    readonly rtcpTransport: RTCDtlsTransport | null;
    readonly track: MediaStreamTrack;
    readonly transport: RTCDtlsTransport | null;
    getContributingSources(): RTCRtpContributingSource[];
    getParameters(): RTCRtpReceiveParameters;
    getStats(): Promise<RTCStatsReport>;
    getSynchronizationSources(): RTCRtpSynchronizationSource[];
}
/** Provides the ability to control and obtain details about how a particular MediaStreamTrack is encoded and sent to a remote peer. */
export interface RTCRtpSender {
    readonly dtmf: RTCDTMFSender | null;
    readonly rtcpTransport: RTCDtlsTransport | null;
    readonly track: MediaStreamTrack | null;
    readonly transport: RTCDtlsTransport | null;
    getParameters(): RTCRtpSendParameters;
    getStats(): Promise<RTCStatsReport>;
    replaceTrack(withTrack: MediaStreamTrack | null): Promise<void>;
    setParameters(parameters: RTCRtpSendParameters): Promise<void>;
    setStreams(...streams: MediaStream[]): void;
}
export interface RTCRtpTransceiver {
    readonly currentDirection: RTCRtpTransceiverDirection | null;
    direction: RTCRtpTransceiverDirection;
    readonly mid: string | null;
    readonly receiver: RTCRtpReceiver;
    readonly sender: RTCRtpSender;
    setCodecPreferences(codecs: RTCRtpCodecCapability[]): void;
    stop(): void;
}
export interface RTCSctpTransportEventMap {
    "statechange": Event;
}
export interface RTCSctpTransport extends EventTarget {
    readonly maxChannels: number | null;
    readonly maxMessageSize: number;
    onstatechange: ((this: RTCSctpTransport, ev: Event) => any) | null;
    readonly state: RTCSctpTransportState;
    readonly transport: RTCDtlsTransport;
    addEventListener<K extends keyof RTCSctpTransportEventMap>(type: K, listener: (this: RTCSctpTransport, ev: RTCSctpTransportEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCSctpTransportEventMap>(type: K, listener: (this: RTCSctpTransport, ev: RTCSctpTransportEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** One end of a connection—or potential connection—and how it's configured. Each RTCSessionDescription consists of a description type indicating which part of the offer/answer negotiation process it describes and of the SDP descriptor of the session. */
export interface RTCSessionDescription {
    readonly sdp: string;
    readonly type: RTCSdpType;
    toJSON(): any;
}
export interface RTCSrtpSdesTransportEventMap {
    "error": Event;
}
export interface RTCSrtpSdesTransport extends EventTarget {
    onerror: ((this: RTCSrtpSdesTransport, ev: Event) => any) | null;
    readonly transport: RTCIceTransport;
    addEventListener<K extends keyof RTCSrtpSdesTransportEventMap>(type: K, listener: (this: RTCSrtpSdesTransport, ev: RTCSrtpSdesTransportEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCSrtpSdesTransportEventMap>(type: K, listener: (this: RTCSrtpSdesTransport, ev: RTCSrtpSdesTransportEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface RTCSsrcConflictEvent extends Event {
    readonly ssrc: number;
}
export interface RTCStatsEvent extends Event {
    readonly report: RTCStatsReport;
}
export interface RTCStatsProvider extends EventTarget {
    getStats(): Promise<RTCStatsReport>;
    msGetStats(): Promise<RTCStatsReport>;
}
export interface RTCStatsReport {
    forEach(callbackfn: (value: any, key: string, parent: RTCStatsReport) => void, thisArg?: any): void;
}
export interface RTCTrackEvent extends Event {
    readonly receiver: RTCRtpReceiver;
    readonly streams: ReadonlyArray<MediaStream>;
    readonly track: MediaStreamTrack;
    readonly transceiver: RTCRtpTransceiver;
}
export interface RadioNodeList extends NodeList {
    value: string;
}
export interface RandomSource {
    getRandomValues<T extends Int8Array | Uint8ClampedArray | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array>(array: T): T;
}
/** A fragment of a document that can contain nodes and parts of text nodes. */
export interface Range extends AbstractRange {
    /**
     * Returns the node, furthest away from the document, that is an ancestor of both range's start node and end node.
     */
    readonly commonAncestorContainer: Node;
    cloneContents(): DocumentFragment;
    cloneRange(): Range;
    collapse(toStart?: boolean): void;
    compareBoundaryPoints(how: number, sourceRange: Range): number;
    /**
     * Returns −1 if the point is before the range, 0 if the point is in the range, and 1 if the point is after the range.
     */
    comparePoint(node: Node, offset: number): number;
    createContextualFragment(fragment: string): DocumentFragment;
    deleteContents(): void;
    detach(): void;
    extractContents(): DocumentFragment;
    getBoundingClientRect(): DOMRect;
    getClientRects(): DOMRectList;
    insertNode(node: Node): void;
    /**
     * Returns whether range intersects node.
     */
    intersectsNode(node: Node): boolean;
    isPointInRange(node: Node, offset: number): boolean;
    selectNode(node: Node): void;
    selectNodeContents(node: Node): void;
    setEnd(node: Node, offset: number): void;
    setEndAfter(node: Node): void;
    setEndBefore(node: Node): void;
    setStart(node: Node, offset: number): void;
    setStartAfter(node: Node): void;
    setStartBefore(node: Node): void;
    surroundContents(newParent: Node): void;
    toString(): string;
    readonly END_TO_END: number;
    readonly END_TO_START: number;
    readonly START_TO_END: number;
    readonly START_TO_START: number;
}
export interface ReadableByteStreamController {
    readonly byobRequest: ReadableStreamBYOBRequest | undefined;
    readonly desiredSize: number | null;
    close(): void;
    enqueue(chunk: ArrayBufferView): void;
    error(error?: any): void;
}
/** This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object. */
export interface ReadableStream<R = any> {
    readonly locked: boolean;
    cancel(reason?: any): Promise<void>;
    getReader(options: {
        mode: "byob";
    }): ReadableStreamBYOBReader;
    getReader(): ReadableStreamDefaultReader<R>;
    pipeThrough<T>({ writable, readable }: {
        writable: WritableStream<R>;
        readable: ReadableStream<T>;
    }, options?: PipeOptions): ReadableStream<T>;
    pipeTo(dest: WritableStream<R>, options?: PipeOptions): Promise<void>;
    tee(): [ReadableStream<R>, ReadableStream<R>];
}
export interface ReadableStreamBYOBReader {
    readonly closed: Promise<void>;
    cancel(reason?: any): Promise<void>;
    read<T extends ArrayBufferView>(view: T): Promise<ReadableStreamReadResult<T>>;
    releaseLock(): void;
}
export interface ReadableStreamBYOBRequest {
    readonly view: ArrayBufferView;
    respond(bytesWritten: number): void;
    respondWithNewView(view: ArrayBufferView): void;
}
export interface ReadableStreamDefaultController<R = any> {
    readonly desiredSize: number | null;
    close(): void;
    enqueue(chunk: R): void;
    error(error?: any): void;
}
export interface ReadableStreamDefaultReader<R = any> {
    readonly closed: Promise<void>;
    cancel(reason?: any): Promise<void>;
    read(): Promise<ReadableStreamReadResult<R>>;
    releaseLock(): void;
}
export interface ReadableStreamReader<R = any> {
    cancel(): Promise<void>;
    read(): Promise<ReadableStreamReadResult<R>>;
    releaseLock(): void;
}
/** This Fetch API interface represents a resource request. */
export interface Request extends Body {
    /**
     * Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching.
     */
    readonly cache: RequestCache;
    /**
     * Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL.
     */
    readonly credentials: RequestCredentials;
    /**
     * Returns the kind of resource requested by request, e.g., "document" or "script".
     */
    readonly destination: RequestDestination;
    /**
     * Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header.
     */
    readonly headers: Headers;
    /**
     * Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI]
     */
    readonly integrity: string;
    /**
     * Returns a boolean indicating whether or not request is for a history navigation (a.k.a. back-foward navigation).
     */
    readonly isHistoryNavigation: boolean;
    /**
     * Returns a boolean indicating whether or not request is for a reload navigation.
     */
    readonly isReloadNavigation: boolean;
    /**
     * Returns a boolean indicating whether or not request can outlive the global in which it was created.
     */
    readonly keepalive: boolean;
    /**
     * Returns request's HTTP method, which is "GET" by default.
     */
    readonly method: string;
    /**
     * Returns the mode associated with request, which is a string indicating whether the request will use CORS, or will be restricted to same-origin URLs.
     */
    readonly mode: RequestMode;
    /**
     * Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default.
     */
    readonly redirect: RequestRedirect;
    /**
     * Returns the referrer of request. Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made.
     */
    readonly referrer: string;
    /**
     * Returns the referrer policy associated with request. This is used during fetching to compute the value of the request's referrer.
     */
    readonly referrerPolicy: ReferrerPolicy;
    /**
     * Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler.
     */
    readonly signal: AbortSignal;
    /**
     * Returns the URL of request as a string.
     */
    readonly url: string;
    clone(): Request;
}
/** This Fetch API interface represents the response to a request. */
export interface Response extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}
/** Provides access to the properties of <a> element, as well as methods to manipulate them. */
export interface SVGAElement extends SVGGraphicsElement, SVGURIReference {
    readonly target: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Used to represent a value that can be an <angle> or <number> value. An SVGAngle reflected through the animVal attribute is always read only. */
export interface SVGAngle {
    readonly unitType: number;
    value: number;
    valueAsString: string;
    valueInSpecifiedUnits: number;
    convertToSpecifiedUnits(unitType: number): void;
    newValueSpecifiedUnits(unitType: number, valueInSpecifiedUnits: number): void;
    readonly SVG_ANGLETYPE_DEG: number;
    readonly SVG_ANGLETYPE_GRAD: number;
    readonly SVG_ANGLETYPE_RAD: number;
    readonly SVG_ANGLETYPE_UNKNOWN: number;
    readonly SVG_ANGLETYPE_UNSPECIFIED: number;
}
export interface SVGAnimateElement extends SVGAnimationElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGAnimateMotionElement extends SVGAnimationElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateMotionElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateMotionElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGAnimateTransformElement extends SVGAnimationElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateTransformElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimateTransformElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Used for attributes of basic type <angle> which can be animated. */
export interface SVGAnimatedAngle {
    readonly animVal: SVGAngle;
    readonly baseVal: SVGAngle;
}
/** Used for attributes of type boolean which can be animated. */
export interface SVGAnimatedBoolean {
    readonly animVal: boolean;
    baseVal: boolean;
}
/** Used for attributes whose value must be a constant from a particular enumeration and which can be animated. */
export interface SVGAnimatedEnumeration {
    readonly animVal: number;
    baseVal: number;
}
/** Used for attributes of basic type <integer> which can be animated. */
export interface SVGAnimatedInteger {
    readonly animVal: number;
    baseVal: number;
}
/** Used for attributes of basic type <length> which can be animated. */
export interface SVGAnimatedLength {
    readonly animVal: SVGLength;
    readonly baseVal: SVGLength;
}
/** Used for attributes of type SVGLengthList which can be animated. */
export interface SVGAnimatedLengthList {
    readonly animVal: SVGLengthList;
    readonly baseVal: SVGLengthList;
}
/** Used for attributes of basic type <Number> which can be animated. */
export interface SVGAnimatedNumber {
    readonly animVal: number;
    baseVal: number;
}
/** The SVGAnimatedNumber interface is used for attributes which take a list of numbers and which can be animated. */
export interface SVGAnimatedNumberList {
    readonly animVal: SVGNumberList;
    readonly baseVal: SVGNumberList;
}
export interface SVGAnimatedPoints {
    readonly animatedPoints: SVGPointList;
    readonly points: SVGPointList;
}
/** Used for attributes of type SVGPreserveAspectRatio which can be animated. */
export interface SVGAnimatedPreserveAspectRatio {
    readonly animVal: SVGPreserveAspectRatio;
    readonly baseVal: SVGPreserveAspectRatio;
}
/** Used for attributes of basic SVGRect which can be animated. */
export interface SVGAnimatedRect {
    readonly animVal: DOMRectReadOnly;
    readonly baseVal: DOMRect;
}
/** The SVGAnimatedString interface represents string attributes which can be animated from each SVG declaration. You need to create SVG attribute before doing anything else, everything should be declared inside this. */
export interface SVGAnimatedString {
    readonly animVal: string;
    baseVal: string;
}
/** Used for attributes which take a list of numbers and which can be animated. */
export interface SVGAnimatedTransformList {
    readonly animVal: SVGTransformList;
    readonly baseVal: SVGTransformList;
}
export interface SVGAnimationElement extends SVGElement {
    readonly targetElement: SVGElement;
    getCurrentTime(): number;
    getSimpleDuration(): number;
    getStartTime(): number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimationElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGAnimationElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** An interface for the <circle> element. The circle element is defined by the cx and cy attributes that denote the coordinates of the centre of the circle. */
export interface SVGCircleElement extends SVGGeometryElement {
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly r: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGCircleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGCircleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides access to the properties of <clipPath> elements, as well as methods to manipulate them. */
export interface SVGClipPathElement extends SVGElement {
    readonly clipPathUnits: SVGAnimatedEnumeration;
    readonly transform: SVGAnimatedTransformList;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGClipPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGClipPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A base interface used by the component transfer function interfaces. */
export interface SVGComponentTransferFunctionElement extends SVGElement {
    readonly amplitude: SVGAnimatedNumber;
    readonly exponent: SVGAnimatedNumber;
    readonly intercept: SVGAnimatedNumber;
    readonly offset: SVGAnimatedNumber;
    readonly slope: SVGAnimatedNumber;
    readonly tableValues: SVGAnimatedNumberList;
    readonly type: SVGAnimatedEnumeration;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_GAMMA: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_LINEAR: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_TABLE: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGComponentTransferFunctionElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGComponentTransferFunctionElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGCursorElement extends SVGElement {
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGCursorElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGCursorElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <defs> element. */
export interface SVGDefsElement extends SVGGraphicsElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGDefsElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGDefsElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <desc> element. */
export interface SVGDescElement extends SVGElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGDescElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGDescElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGElementEventMap extends ElementEventMap, GlobalEventHandlersEventMap, DocumentAndElementEventHandlersEventMap {
}
/** All of the SVG DOM interfaces that correspond directly to elements in the SVG language derive from the SVGElement interface. */
export interface SVGElement extends Element, DocumentAndElementEventHandlers, ElementCSSInlineStyle, GlobalEventHandlers, HTMLOrSVGElement, SVGElementInstance {
    /** @deprecated */
    readonly className: any;
    readonly ownerSVGElement: SVGSVGElement | null;
    readonly viewportElement: SVGElement | null;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGElementInstance extends EventTarget {
    readonly correspondingElement: SVGElement;
    readonly correspondingUseElement: SVGUseElement;
}
export interface SVGElementInstanceList {
    /** @deprecated */
    readonly length: number;
    /** @deprecated */
    item(index: number): SVGElementInstance;
}
/** Provides access to the properties of <ellipse> elements. */
export interface SVGEllipseElement extends SVGGeometryElement {
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly rx: SVGAnimatedLength;
    readonly ry: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGEllipseElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGEllipseElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feBlend> element. */
export interface SVGFEBlendElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly mode: SVGAnimatedEnumeration;
    readonly SVG_FEBLEND_MODE_COLOR: number;
    readonly SVG_FEBLEND_MODE_COLOR_BURN: number;
    readonly SVG_FEBLEND_MODE_COLOR_DODGE: number;
    readonly SVG_FEBLEND_MODE_DARKEN: number;
    readonly SVG_FEBLEND_MODE_DIFFERENCE: number;
    readonly SVG_FEBLEND_MODE_EXCLUSION: number;
    readonly SVG_FEBLEND_MODE_HARD_LIGHT: number;
    readonly SVG_FEBLEND_MODE_HUE: number;
    readonly SVG_FEBLEND_MODE_LIGHTEN: number;
    readonly SVG_FEBLEND_MODE_LUMINOSITY: number;
    readonly SVG_FEBLEND_MODE_MULTIPLY: number;
    readonly SVG_FEBLEND_MODE_NORMAL: number;
    readonly SVG_FEBLEND_MODE_OVERLAY: number;
    readonly SVG_FEBLEND_MODE_SATURATION: number;
    readonly SVG_FEBLEND_MODE_SCREEN: number;
    readonly SVG_FEBLEND_MODE_SOFT_LIGHT: number;
    readonly SVG_FEBLEND_MODE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEBlendElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEBlendElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feColorMatrix> element. */
export interface SVGFEColorMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly type: SVGAnimatedEnumeration;
    readonly values: SVGAnimatedNumberList;
    readonly SVG_FECOLORMATRIX_TYPE_HUEROTATE: number;
    readonly SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA: number;
    readonly SVG_FECOLORMATRIX_TYPE_MATRIX: number;
    readonly SVG_FECOLORMATRIX_TYPE_SATURATE: number;
    readonly SVG_FECOLORMATRIX_TYPE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEColorMatrixElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEColorMatrixElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feComponentTransfer> element. */
export interface SVGFEComponentTransferElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEComponentTransferElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEComponentTransferElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feComposite> element. */
export interface SVGFECompositeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly k1: SVGAnimatedNumber;
    readonly k2: SVGAnimatedNumber;
    readonly k3: SVGAnimatedNumber;
    readonly k4: SVGAnimatedNumber;
    readonly operator: SVGAnimatedEnumeration;
    readonly SVG_FECOMPOSITE_OPERATOR_ARITHMETIC: number;
    readonly SVG_FECOMPOSITE_OPERATOR_ATOP: number;
    readonly SVG_FECOMPOSITE_OPERATOR_IN: number;
    readonly SVG_FECOMPOSITE_OPERATOR_OUT: number;
    readonly SVG_FECOMPOSITE_OPERATOR_OVER: number;
    readonly SVG_FECOMPOSITE_OPERATOR_UNKNOWN: number;
    readonly SVG_FECOMPOSITE_OPERATOR_XOR: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFECompositeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFECompositeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feConvolveMatrix> element. */
export interface SVGFEConvolveMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly bias: SVGAnimatedNumber;
    readonly divisor: SVGAnimatedNumber;
    readonly edgeMode: SVGAnimatedEnumeration;
    readonly in1: SVGAnimatedString;
    readonly kernelMatrix: SVGAnimatedNumberList;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly orderX: SVGAnimatedInteger;
    readonly orderY: SVGAnimatedInteger;
    readonly preserveAlpha: SVGAnimatedBoolean;
    readonly targetX: SVGAnimatedInteger;
    readonly targetY: SVGAnimatedInteger;
    readonly SVG_EDGEMODE_DUPLICATE: number;
    readonly SVG_EDGEMODE_NONE: number;
    readonly SVG_EDGEMODE_UNKNOWN: number;
    readonly SVG_EDGEMODE_WRAP: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEConvolveMatrixElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEConvolveMatrixElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feDiffuseLighting> element. */
export interface SVGFEDiffuseLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly diffuseConstant: SVGAnimatedNumber;
    readonly in1: SVGAnimatedString;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly surfaceScale: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDiffuseLightingElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDiffuseLightingElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feDisplacementMap> element. */
export interface SVGFEDisplacementMapElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly scale: SVGAnimatedNumber;
    readonly xChannelSelector: SVGAnimatedEnumeration;
    readonly yChannelSelector: SVGAnimatedEnumeration;
    readonly SVG_CHANNEL_A: number;
    readonly SVG_CHANNEL_B: number;
    readonly SVG_CHANNEL_G: number;
    readonly SVG_CHANNEL_R: number;
    readonly SVG_CHANNEL_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDisplacementMapElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDisplacementMapElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feDistantLight> element. */
export interface SVGFEDistantLightElement extends SVGElement {
    readonly azimuth: SVGAnimatedNumber;
    readonly elevation: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDistantLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDistantLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGFEDropShadowElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly dx: SVGAnimatedNumber;
    readonly dy: SVGAnimatedNumber;
    readonly in1: SVGAnimatedString;
    readonly stdDeviationX: SVGAnimatedNumber;
    readonly stdDeviationY: SVGAnimatedNumber;
    setStdDeviation(stdDeviationX: number, stdDeviationY: number): void;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDropShadowElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEDropShadowElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feFlood> element. */
export interface SVGFEFloodElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFloodElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFloodElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feFuncA> element. */
export interface SVGFEFuncAElement extends SVGComponentTransferFunctionElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncAElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncAElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feFuncB> element. */
export interface SVGFEFuncBElement extends SVGComponentTransferFunctionElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncBElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncBElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feFuncG> element. */
export interface SVGFEFuncGElement extends SVGComponentTransferFunctionElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feFuncR> element. */
export interface SVGFEFuncRElement extends SVGComponentTransferFunctionElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncRElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEFuncRElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feGaussianBlur> element. */
export interface SVGFEGaussianBlurElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly stdDeviationX: SVGAnimatedNumber;
    readonly stdDeviationY: SVGAnimatedNumber;
    setStdDeviation(stdDeviationX: number, stdDeviationY: number): void;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEGaussianBlurElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEGaussianBlurElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feImage> element. */
export interface SVGFEImageElement extends SVGElement, SVGFilterPrimitiveStandardAttributes, SVGURIReference {
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEImageElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEImageElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feMerge> element. */
export interface SVGFEMergeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMergeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMergeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feMergeNode> element. */
export interface SVGFEMergeNodeElement extends SVGElement {
    readonly in1: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMergeNodeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMergeNodeElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feMorphology> element. */
export interface SVGFEMorphologyElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly operator: SVGAnimatedEnumeration;
    readonly radiusX: SVGAnimatedNumber;
    readonly radiusY: SVGAnimatedNumber;
    readonly SVG_MORPHOLOGY_OPERATOR_DILATE: number;
    readonly SVG_MORPHOLOGY_OPERATOR_ERODE: number;
    readonly SVG_MORPHOLOGY_OPERATOR_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMorphologyElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEMorphologyElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feOffset> element. */
export interface SVGFEOffsetElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly dx: SVGAnimatedNumber;
    readonly dy: SVGAnimatedNumber;
    readonly in1: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEOffsetElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEOffsetElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <fePointLight> element. */
export interface SVGFEPointLightElement extends SVGElement {
    readonly x: SVGAnimatedNumber;
    readonly y: SVGAnimatedNumber;
    readonly z: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEPointLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFEPointLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feSpecularLighting> element. */
export interface SVGFESpecularLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly specularConstant: SVGAnimatedNumber;
    readonly specularExponent: SVGAnimatedNumber;
    readonly surfaceScale: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFESpecularLightingElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFESpecularLightingElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feSpotLight> element. */
export interface SVGFESpotLightElement extends SVGElement {
    readonly limitingConeAngle: SVGAnimatedNumber;
    readonly pointsAtX: SVGAnimatedNumber;
    readonly pointsAtY: SVGAnimatedNumber;
    readonly pointsAtZ: SVGAnimatedNumber;
    readonly specularExponent: SVGAnimatedNumber;
    readonly x: SVGAnimatedNumber;
    readonly y: SVGAnimatedNumber;
    readonly z: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFESpotLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFESpotLightElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feTile> element. */
export interface SVGFETileElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly in1: SVGAnimatedString;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFETileElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFETileElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <feTurbulence> element. */
export interface SVGFETurbulenceElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    readonly baseFrequencyX: SVGAnimatedNumber;
    readonly baseFrequencyY: SVGAnimatedNumber;
    readonly numOctaves: SVGAnimatedInteger;
    readonly seed: SVGAnimatedNumber;
    readonly stitchTiles: SVGAnimatedEnumeration;
    readonly type: SVGAnimatedEnumeration;
    readonly SVG_STITCHTYPE_NOSTITCH: number;
    readonly SVG_STITCHTYPE_STITCH: number;
    readonly SVG_STITCHTYPE_UNKNOWN: number;
    readonly SVG_TURBULENCE_TYPE_FRACTALNOISE: number;
    readonly SVG_TURBULENCE_TYPE_TURBULENCE: number;
    readonly SVG_TURBULENCE_TYPE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFETurbulenceElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFETurbulenceElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides access to the properties of <filter> elements, as well as methods to manipulate them. */
export interface SVGFilterElement extends SVGElement, SVGURIReference {
    readonly filterUnits: SVGAnimatedEnumeration;
    readonly height: SVGAnimatedLength;
    readonly primitiveUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFilterElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGFilterElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGFilterPrimitiveStandardAttributes {
    readonly height: SVGAnimatedLength;
    readonly result: SVGAnimatedString;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}
export interface SVGFitToViewBox {
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    readonly viewBox: SVGAnimatedRect;
}
/** Provides access to the properties of <foreignObject> elements, as well as methods to manipulate them. */
export interface SVGForeignObjectElement extends SVGGraphicsElement {
    readonly height: SVGAnimatedLength;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGForeignObjectElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGForeignObjectElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <g> element. */
export interface SVGGElement extends SVGGraphicsElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGGeometryElement extends SVGGraphicsElement {
    readonly pathLength: SVGAnimatedNumber;
    getPointAtLength(distance: number): DOMPoint;
    getTotalLength(): number;
    isPointInFill(point?: DOMPointInit): boolean;
    isPointInStroke(point?: DOMPointInit): boolean;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGeometryElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGeometryElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The SVGGradient interface is a base interface used by SVGLinearGradientElement and SVGRadialGradientElement. */
export interface SVGGradientElement extends SVGElement, SVGURIReference {
    readonly gradientTransform: SVGAnimatedTransformList;
    readonly gradientUnits: SVGAnimatedEnumeration;
    readonly spreadMethod: SVGAnimatedEnumeration;
    readonly SVG_SPREADMETHOD_PAD: number;
    readonly SVG_SPREADMETHOD_REFLECT: number;
    readonly SVG_SPREADMETHOD_REPEAT: number;
    readonly SVG_SPREADMETHOD_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** SVG elements whose primary purpose is to directly render graphics into a group. */
export interface SVGGraphicsElement extends SVGElement, SVGTests {
    readonly transform: SVGAnimatedTransformList;
    getBBox(options?: SVGBoundingBoxOptions): DOMRect;
    getCTM(): DOMMatrix | null;
    getScreenCTM(): DOMMatrix | null;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGraphicsElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGGraphicsElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <image> element. */
export interface SVGImageElement extends SVGGraphicsElement, SVGURIReference {
    readonly height: SVGAnimatedLength;
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGImageElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGImageElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Correspond to the <length> basic data type. */
export interface SVGLength {
    readonly unitType: number;
    value: number;
    valueAsString: string;
    valueInSpecifiedUnits: number;
    convertToSpecifiedUnits(unitType: number): void;
    newValueSpecifiedUnits(unitType: number, valueInSpecifiedUnits: number): void;
    readonly SVG_LENGTHTYPE_CM: number;
    readonly SVG_LENGTHTYPE_EMS: number;
    readonly SVG_LENGTHTYPE_EXS: number;
    readonly SVG_LENGTHTYPE_IN: number;
    readonly SVG_LENGTHTYPE_MM: number;
    readonly SVG_LENGTHTYPE_NUMBER: number;
    readonly SVG_LENGTHTYPE_PC: number;
    readonly SVG_LENGTHTYPE_PERCENTAGE: number;
    readonly SVG_LENGTHTYPE_PT: number;
    readonly SVG_LENGTHTYPE_PX: number;
    readonly SVG_LENGTHTYPE_UNKNOWN: number;
}
/** The SVGLengthList defines a list of SVGLength objects. */
export interface SVGLengthList {
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: SVGLength): SVGLength;
    clear(): void;
    getItem(index: number): SVGLength;
    initialize(newItem: SVGLength): SVGLength;
    insertItemBefore(newItem: SVGLength, index: number): SVGLength;
    removeItem(index: number): SVGLength;
    replaceItem(newItem: SVGLength, index: number): SVGLength;
    [index: number]: SVGLength;
}
/** Provides access to the properties of <line> elements, as well as methods to manipulate them. */
export interface SVGLineElement extends SVGGeometryElement {
    readonly x1: SVGAnimatedLength;
    readonly x2: SVGAnimatedLength;
    readonly y1: SVGAnimatedLength;
    readonly y2: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGLineElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGLineElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <linearGradient> element. */
export interface SVGLinearGradientElement extends SVGGradientElement {
    readonly x1: SVGAnimatedLength;
    readonly x2: SVGAnimatedLength;
    readonly y1: SVGAnimatedLength;
    readonly y2: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGLinearGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGLinearGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGMarkerElement extends SVGElement, SVGFitToViewBox {
    readonly markerHeight: SVGAnimatedLength;
    readonly markerUnits: SVGAnimatedEnumeration;
    readonly markerWidth: SVGAnimatedLength;
    readonly orientAngle: SVGAnimatedAngle;
    readonly orientType: SVGAnimatedEnumeration;
    readonly refX: SVGAnimatedLength;
    readonly refY: SVGAnimatedLength;
    setOrientToAngle(angle: SVGAngle): void;
    setOrientToAuto(): void;
    readonly SVG_MARKERUNITS_STROKEWIDTH: number;
    readonly SVG_MARKERUNITS_UNKNOWN: number;
    readonly SVG_MARKERUNITS_USERSPACEONUSE: number;
    readonly SVG_MARKER_ORIENT_ANGLE: number;
    readonly SVG_MARKER_ORIENT_AUTO: number;
    readonly SVG_MARKER_ORIENT_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMarkerElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMarkerElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides access to the properties of <mask> elements, as well as methods to manipulate them. */
export interface SVGMaskElement extends SVGElement {
    readonly height: SVGAnimatedLength;
    readonly maskContentUnits: SVGAnimatedEnumeration;
    readonly maskUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMaskElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMaskElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <metadata> element. */
export interface SVGMetadataElement extends SVGElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMetadataElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGMetadataElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <number> basic data type. */
export interface SVGNumber {
    value: number;
}
/** The SVGNumberList defines a list of SVGNumber objects. */
export interface SVGNumberList {
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: SVGNumber): SVGNumber;
    clear(): void;
    getItem(index: number): SVGNumber;
    initialize(newItem: SVGNumber): SVGNumber;
    insertItemBefore(newItem: SVGNumber, index: number): SVGNumber;
    removeItem(index: number): SVGNumber;
    replaceItem(newItem: SVGNumber, index: number): SVGNumber;
    [index: number]: SVGNumber;
}
/** Corresponds to the <path> element. */
export interface SVGPathElement extends SVGGraphicsElement {
    /** @deprecated */
    readonly pathSegList: SVGPathSegList;
    /** @deprecated */
    createSVGPathSegArcAbs(x: number, y: number, r1: number, r2: number, angle: number, largeArcFlag: boolean, sweepFlag: boolean): SVGPathSegArcAbs;
    /** @deprecated */
    createSVGPathSegArcRel(x: number, y: number, r1: number, r2: number, angle: number, largeArcFlag: boolean, sweepFlag: boolean): SVGPathSegArcRel;
    /** @deprecated */
    createSVGPathSegClosePath(): SVGPathSegClosePath;
    /** @deprecated */
    createSVGPathSegCurvetoCubicAbs(x: number, y: number, x1: number, y1: number, x2: number, y2: number): SVGPathSegCurvetoCubicAbs;
    /** @deprecated */
    createSVGPathSegCurvetoCubicRel(x: number, y: number, x1: number, y1: number, x2: number, y2: number): SVGPathSegCurvetoCubicRel;
    /** @deprecated */
    createSVGPathSegCurvetoCubicSmoothAbs(x: number, y: number, x2: number, y2: number): SVGPathSegCurvetoCubicSmoothAbs;
    /** @deprecated */
    createSVGPathSegCurvetoCubicSmoothRel(x: number, y: number, x2: number, y2: number): SVGPathSegCurvetoCubicSmoothRel;
    /** @deprecated */
    createSVGPathSegCurvetoQuadraticAbs(x: number, y: number, x1: number, y1: number): SVGPathSegCurvetoQuadraticAbs;
    /** @deprecated */
    createSVGPathSegCurvetoQuadraticRel(x: number, y: number, x1: number, y1: number): SVGPathSegCurvetoQuadraticRel;
    /** @deprecated */
    createSVGPathSegCurvetoQuadraticSmoothAbs(x: number, y: number): SVGPathSegCurvetoQuadraticSmoothAbs;
    /** @deprecated */
    createSVGPathSegCurvetoQuadraticSmoothRel(x: number, y: number): SVGPathSegCurvetoQuadraticSmoothRel;
    /** @deprecated */
    createSVGPathSegLinetoAbs(x: number, y: number): SVGPathSegLinetoAbs;
    /** @deprecated */
    createSVGPathSegLinetoHorizontalAbs(x: number): SVGPathSegLinetoHorizontalAbs;
    /** @deprecated */
    createSVGPathSegLinetoHorizontalRel(x: number): SVGPathSegLinetoHorizontalRel;
    /** @deprecated */
    createSVGPathSegLinetoRel(x: number, y: number): SVGPathSegLinetoRel;
    /** @deprecated */
    createSVGPathSegLinetoVerticalAbs(y: number): SVGPathSegLinetoVerticalAbs;
    /** @deprecated */
    createSVGPathSegLinetoVerticalRel(y: number): SVGPathSegLinetoVerticalRel;
    /** @deprecated */
    createSVGPathSegMovetoAbs(x: number, y: number): SVGPathSegMovetoAbs;
    /** @deprecated */
    createSVGPathSegMovetoRel(x: number, y: number): SVGPathSegMovetoRel;
    /** @deprecated */
    getPathSegAtLength(distance: number): number;
    getPointAtLength(distance: number): SVGPoint;
    getTotalLength(): number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGPathSeg {
    readonly pathSegType: number;
    readonly pathSegTypeAsLetter: string;
    readonly PATHSEG_ARC_ABS: number;
    readonly PATHSEG_ARC_REL: number;
    readonly PATHSEG_CLOSEPATH: number;
    readonly PATHSEG_CURVETO_CUBIC_ABS: number;
    readonly PATHSEG_CURVETO_CUBIC_REL: number;
    readonly PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: number;
    readonly PATHSEG_CURVETO_CUBIC_SMOOTH_REL: number;
    readonly PATHSEG_CURVETO_QUADRATIC_ABS: number;
    readonly PATHSEG_CURVETO_QUADRATIC_REL: number;
    readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: number;
    readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: number;
    readonly PATHSEG_LINETO_ABS: number;
    readonly PATHSEG_LINETO_HORIZONTAL_ABS: number;
    readonly PATHSEG_LINETO_HORIZONTAL_REL: number;
    readonly PATHSEG_LINETO_REL: number;
    readonly PATHSEG_LINETO_VERTICAL_ABS: number;
    readonly PATHSEG_LINETO_VERTICAL_REL: number;
    readonly PATHSEG_MOVETO_ABS: number;
    readonly PATHSEG_MOVETO_REL: number;
    readonly PATHSEG_UNKNOWN: number;
}
export interface SVGPathSegArcAbs extends SVGPathSeg {
    angle: number;
    largeArcFlag: boolean;
    r1: number;
    r2: number;
    sweepFlag: boolean;
    x: number;
    y: number;
}
export interface SVGPathSegArcRel extends SVGPathSeg {
    angle: number;
    largeArcFlag: boolean;
    r1: number;
    r2: number;
    sweepFlag: boolean;
    x: number;
    y: number;
}
export interface SVGPathSegClosePath extends SVGPathSeg {
}
export interface SVGPathSegCurvetoCubicAbs extends SVGPathSeg {
    x: number;
    x1: number;
    x2: number;
    y: number;
    y1: number;
    y2: number;
}
export interface SVGPathSegCurvetoCubicRel extends SVGPathSeg {
    x: number;
    x1: number;
    x2: number;
    y: number;
    y1: number;
    y2: number;
}
export interface SVGPathSegCurvetoCubicSmoothAbs extends SVGPathSeg {
    x: number;
    x2: number;
    y: number;
    y2: number;
}
export interface SVGPathSegCurvetoCubicSmoothRel extends SVGPathSeg {
    x: number;
    x2: number;
    y: number;
    y2: number;
}
export interface SVGPathSegCurvetoQuadraticAbs extends SVGPathSeg {
    x: number;
    x1: number;
    y: number;
    y1: number;
}
export interface SVGPathSegCurvetoQuadraticRel extends SVGPathSeg {
    x: number;
    x1: number;
    y: number;
    y1: number;
}
export interface SVGPathSegCurvetoQuadraticSmoothAbs extends SVGPathSeg {
    x: number;
    y: number;
}
export interface SVGPathSegCurvetoQuadraticSmoothRel extends SVGPathSeg {
    x: number;
    y: number;
}
export interface SVGPathSegLinetoAbs extends SVGPathSeg {
    x: number;
    y: number;
}
export interface SVGPathSegLinetoHorizontalAbs extends SVGPathSeg {
    x: number;
}
export interface SVGPathSegLinetoHorizontalRel extends SVGPathSeg {
    x: number;
}
export interface SVGPathSegLinetoRel extends SVGPathSeg {
    x: number;
    y: number;
}
export interface SVGPathSegLinetoVerticalAbs extends SVGPathSeg {
    y: number;
}
export interface SVGPathSegLinetoVerticalRel extends SVGPathSeg {
    y: number;
}
export interface SVGPathSegList {
    readonly numberOfItems: number;
    appendItem(newItem: SVGPathSeg): SVGPathSeg;
    clear(): void;
    getItem(index: number): SVGPathSeg;
    initialize(newItem: SVGPathSeg): SVGPathSeg;
    insertItemBefore(newItem: SVGPathSeg, index: number): SVGPathSeg;
    removeItem(index: number): SVGPathSeg;
    replaceItem(newItem: SVGPathSeg, index: number): SVGPathSeg;
}
export interface SVGPathSegMovetoAbs extends SVGPathSeg {
    x: number;
    y: number;
}
export interface SVGPathSegMovetoRel extends SVGPathSeg {
    x: number;
    y: number;
}
/** Corresponds to the <pattern> element. */
export interface SVGPatternElement extends SVGElement, SVGFitToViewBox, SVGURIReference {
    readonly height: SVGAnimatedLength;
    readonly patternContentUnits: SVGAnimatedEnumeration;
    readonly patternTransform: SVGAnimatedTransformList;
    readonly patternUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPatternElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPatternElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGPointList {
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: DOMPoint): DOMPoint;
    clear(): void;
    getItem(index: number): DOMPoint;
    initialize(newItem: DOMPoint): DOMPoint;
    insertItemBefore(newItem: DOMPoint, index: number): DOMPoint;
    removeItem(index: number): DOMPoint;
    replaceItem(newItem: DOMPoint, index: number): DOMPoint;
    [index: number]: DOMPoint;
}
/** Provides access to the properties of <polygon> elements, as well as methods to manipulate them. */
export interface SVGPolygonElement extends SVGGeometryElement, SVGAnimatedPoints {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPolygonElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPolygonElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides access to the properties of <polyline> elements, as well as methods to manipulate them. */
export interface SVGPolylineElement extends SVGGeometryElement, SVGAnimatedPoints {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPolylineElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGPolylineElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the preserveAspectRatio attribute, which is available for some of SVG's elements. */
export interface SVGPreserveAspectRatio {
    align: number;
    meetOrSlice: number;
    readonly SVG_MEETORSLICE_MEET: number;
    readonly SVG_MEETORSLICE_SLICE: number;
    readonly SVG_MEETORSLICE_UNKNOWN: number;
    readonly SVG_PRESERVEASPECTRATIO_NONE: number;
    readonly SVG_PRESERVEASPECTRATIO_UNKNOWN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMIN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMIN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMIN: number;
}
/** Corresponds to the <RadialGradient> element. */
export interface SVGRadialGradientElement extends SVGGradientElement {
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly fr: SVGAnimatedLength;
    readonly fx: SVGAnimatedLength;
    readonly fy: SVGAnimatedLength;
    readonly r: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGRadialGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGRadialGradientElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides access to the properties of <rect> elements, as well as methods to manipulate them. */
export interface SVGRectElement extends SVGGeometryElement {
    readonly height: SVGAnimatedLength;
    readonly rx: SVGAnimatedLength;
    readonly ry: SVGAnimatedLength;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGRectElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGRectElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGSVGElementEventMap extends SVGElementEventMap {
    "SVGUnload": Event;
    "SVGZoom": SVGZoomEvent;
}
/** Provides access to the properties of <svg> elements, as well as methods to manipulate them. This interface contains also various miscellaneous commonly-used utility methods, such as matrix operations and the ability to control the time of redraw on visual rendering devices. */
export interface SVGSVGElement extends SVGGraphicsElement, DocumentEvent, SVGFitToViewBox, SVGZoomAndPan {
    /** @deprecated */
    contentScriptType: string;
    /** @deprecated */
    contentStyleType: string;
    currentScale: number;
    readonly currentTranslate: SVGPoint;
    readonly height: SVGAnimatedLength;
    onunload: ((this: SVGSVGElement, ev: Event) => any) | null;
    onzoom: ((this: SVGSVGElement, ev: SVGZoomEvent) => any) | null;
    /** @deprecated */
    readonly pixelUnitToMillimeterX: number;
    /** @deprecated */
    readonly pixelUnitToMillimeterY: number;
    /** @deprecated */
    readonly screenPixelToMillimeterX: number;
    /** @deprecated */
    readonly screenPixelToMillimeterY: number;
    /** @deprecated */
    readonly viewport: SVGRect;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    animationsPaused(): boolean;
    checkEnclosure(element: SVGElement, rect: SVGRect): boolean;
    checkIntersection(element: SVGElement, rect: SVGRect): boolean;
    createSVGAngle(): SVGAngle;
    createSVGLength(): SVGLength;
    createSVGMatrix(): SVGMatrix;
    createSVGNumber(): SVGNumber;
    createSVGPoint(): SVGPoint;
    createSVGRect(): SVGRect;
    createSVGTransform(): SVGTransform;
    createSVGTransformFromMatrix(matrix: SVGMatrix): SVGTransform;
    deselectAll(): void;
    /** @deprecated */
    forceRedraw(): void;
    getComputedStyle(elt: Element, pseudoElt?: string | null): CSSStyleDeclaration;
    getCurrentTime(): number;
    getElementById(elementId: string): Element;
    getEnclosureList(rect: SVGRect, referenceElement: SVGElement): NodeListOf<SVGCircleElement | SVGEllipseElement | SVGImageElement | SVGLineElement | SVGPathElement | SVGPolygonElement | SVGPolylineElement | SVGRectElement | SVGTextElement | SVGUseElement>;
    getIntersectionList(rect: SVGRect, referenceElement: SVGElement): NodeListOf<SVGCircleElement | SVGEllipseElement | SVGImageElement | SVGLineElement | SVGPathElement | SVGPolygonElement | SVGPolylineElement | SVGRectElement | SVGTextElement | SVGUseElement>;
    pauseAnimations(): void;
    setCurrentTime(seconds: number): void;
    /** @deprecated */
    suspendRedraw(maxWaitMilliseconds: number): number;
    unpauseAnimations(): void;
    /** @deprecated */
    unsuspendRedraw(suspendHandleID: number): void;
    /** @deprecated */
    unsuspendRedrawAll(): void;
    addEventListener<K extends keyof SVGSVGElementEventMap>(type: K, listener: (this: SVGSVGElement, ev: SVGSVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGSVGElementEventMap>(type: K, listener: (this: SVGSVGElement, ev: SVGSVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the SVG <script> element. */
export interface SVGScriptElement extends SVGElement, SVGURIReference {
    type: string;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGScriptElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGScriptElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <stop> element. */
export interface SVGStopElement extends SVGElement {
    readonly offset: SVGAnimatedNumber;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGStopElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGStopElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** The SVGStringList defines a list of DOMString objects. */
export interface SVGStringList {
    readonly length: number;
    readonly numberOfItems: number;
    appendItem(newItem: string): string;
    clear(): void;
    getItem(index: number): string;
    initialize(newItem: string): string;
    insertItemBefore(newItem: string, index: number): string;
    removeItem(index: number): string;
    replaceItem(newItem: string, index: number): string;
    [index: number]: string;
}
/** Corresponds to the SVG <style> element. */
export interface SVGStyleElement extends SVGElement {
    disabled: boolean;
    media: string;
    title: string;
    type: string;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGStyleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGStyleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <switch> element. */
export interface SVGSwitchElement extends SVGGraphicsElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSwitchElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSwitchElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <symbol> element. */
export interface SVGSymbolElement extends SVGElement, SVGFitToViewBox {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSymbolElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGSymbolElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** A <tspan> element. */
export interface SVGTSpanElement extends SVGTextPositioningElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTSpanElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTSpanElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SVGTests {
    readonly requiredExtensions: SVGStringList;
    readonly systemLanguage: SVGStringList;
}
/** Implemented by elements that support rendering child text content. It is inherited by various text-related interfaces, such as SVGTextElement, SVGTSpanElement, SVGTRefElement, SVGAltGlyphElement and SVGTextPathElement. */
export interface SVGTextContentElement extends SVGGraphicsElement {
    readonly lengthAdjust: SVGAnimatedEnumeration;
    readonly textLength: SVGAnimatedLength;
    getCharNumAtPosition(point?: DOMPointInit): number;
    getComputedTextLength(): number;
    getEndPositionOfChar(charnum: number): DOMPoint;
    getExtentOfChar(charnum: number): DOMRect;
    getNumberOfChars(): number;
    getRotationOfChar(charnum: number): number;
    getStartPositionOfChar(charnum: number): DOMPoint;
    getSubStringLength(charnum: number, nchars: number): number;
    selectSubString(charnum: number, nchars: number): void;
    readonly LENGTHADJUST_SPACING: number;
    readonly LENGTHADJUST_SPACINGANDGLYPHS: number;
    readonly LENGTHADJUST_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextContentElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextContentElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <text> elements. */
export interface SVGTextElement extends SVGTextPositioningElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <textPath> element. */
export interface SVGTextPathElement extends SVGTextContentElement, SVGURIReference {
    readonly method: SVGAnimatedEnumeration;
    readonly spacing: SVGAnimatedEnumeration;
    readonly startOffset: SVGAnimatedLength;
    readonly TEXTPATH_METHODTYPE_ALIGN: number;
    readonly TEXTPATH_METHODTYPE_STRETCH: number;
    readonly TEXTPATH_METHODTYPE_UNKNOWN: number;
    readonly TEXTPATH_SPACINGTYPE_AUTO: number;
    readonly TEXTPATH_SPACINGTYPE_EXACT: number;
    readonly TEXTPATH_SPACINGTYPE_UNKNOWN: number;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextPathElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Implemented by elements that support attributes that position individual text glyphs. It is inherited by SVGTextElement, SVGTSpanElement, SVGTRefElement and SVGAltGlyphElement. */
export interface SVGTextPositioningElement extends SVGTextContentElement {
    readonly dx: SVGAnimatedLengthList;
    readonly dy: SVGAnimatedLengthList;
    readonly rotate: SVGAnimatedNumberList;
    readonly x: SVGAnimatedLengthList;
    readonly y: SVGAnimatedLengthList;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextPositioningElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTextPositioningElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Corresponds to the <title> element. */
export interface SVGTitleElement extends SVGElement {
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTitleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGTitleElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** SVGTransform is the interface for one of the component transformations within an SVGTransformList; thus, an SVGTransform object corresponds to a single component (e.g., scale(…) or matrix(…)) within a transform attribute. */
export interface SVGTransform {
    readonly angle: number;
    readonly matrix: SVGMatrix;
    readonly type: number;
    setMatrix(matrix: SVGMatrix): void;
    setRotate(angle: number, cx: number, cy: number): void;
    setScale(sx: number, sy: number): void;
    setSkewX(angle: number): void;
    setSkewY(angle: number): void;
    setTranslate(tx: number, ty: number): void;
    readonly SVG_TRANSFORM_MATRIX: number;
    readonly SVG_TRANSFORM_ROTATE: number;
    readonly SVG_TRANSFORM_SCALE: number;
    readonly SVG_TRANSFORM_SKEWX: number;
    readonly SVG_TRANSFORM_SKEWY: number;
    readonly SVG_TRANSFORM_TRANSLATE: number;
    readonly SVG_TRANSFORM_UNKNOWN: number;
}
/** The SVGTransformList defines a list of SVGTransform objects. */
export interface SVGTransformList {
    readonly numberOfItems: number;
    appendItem(newItem: SVGTransform): SVGTransform;
    clear(): void;
    consolidate(): SVGTransform;
    createSVGTransformFromMatrix(matrix: SVGMatrix): SVGTransform;
    getItem(index: number): SVGTransform;
    initialize(newItem: SVGTransform): SVGTransform;
    insertItemBefore(newItem: SVGTransform, index: number): SVGTransform;
    removeItem(index: number): SVGTransform;
    replaceItem(newItem: SVGTransform, index: number): SVGTransform;
}
export interface SVGURIReference {
    readonly href: SVGAnimatedString;
}
/** A commonly used set of constants used for reflecting gradientUnits, patternContentUnits and other similar attributes. */
export interface SVGUnitTypes {
    readonly SVG_UNIT_TYPE_OBJECTBOUNDINGBOX: number;
    readonly SVG_UNIT_TYPE_UNKNOWN: number;
    readonly SVG_UNIT_TYPE_USERSPACEONUSE: number;
}
/** Corresponds to the <use> element. */
export interface SVGUseElement extends SVGGraphicsElement, SVGURIReference {
    readonly animatedInstanceRoot: SVGElementInstance | null;
    readonly height: SVGAnimatedLength;
    readonly instanceRoot: SVGElementInstance | null;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGUseElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGUseElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides access to the properties of <view> elements, as well as methods to manipulate them. */
export interface SVGViewElement extends SVGElement, SVGFitToViewBox, SVGZoomAndPan {
    /** @deprecated */
    readonly viewTarget: SVGStringList;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGViewElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: SVGViewElement, ev: SVGElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Used to reflect the zoomAndPan attribute, and is mixed in to other interfaces for elements that support this attribute. */
export interface SVGZoomAndPan {
    readonly zoomAndPan: number;
}
export interface SVGZoomEvent extends UIEvent {
    readonly newScale: number;
    readonly newTranslate: SVGPoint;
    readonly previousScale: number;
    readonly previousTranslate: SVGPoint;
    readonly zoomRectScreen: SVGRect;
}
export interface ScopedCredential {
    readonly id: ArrayBuffer;
    readonly type: ScopedCredentialType;
}
export interface ScopedCredentialInfo {
    readonly credential: ScopedCredential;
    readonly publicKey: CryptoKey;
}
/** A screen, usually the one on which the current window is being rendered, and is obtained using window.screen. */
export interface Screen {
    readonly availHeight: number;
    readonly availWidth: number;
    readonly colorDepth: number;
    readonly height: number;
    readonly orientation: ScreenOrientation;
    readonly pixelDepth: number;
    readonly width: number;
}
export interface ScreenOrientationEventMap {
    "change": Event;
}
export interface ScreenOrientation extends EventTarget {
    readonly angle: number;
    onchange: ((this: ScreenOrientation, ev: Event) => any) | null;
    readonly type: OrientationType;
    lock(orientation: OrientationLockType): Promise<void>;
    unlock(): void;
    addEventListener<K extends keyof ScreenOrientationEventMap>(type: K, listener: (this: ScreenOrientation, ev: ScreenOrientationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ScreenOrientationEventMap>(type: K, listener: (this: ScreenOrientation, ev: ScreenOrientationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface ScriptProcessorNodeEventMap {
    "audioprocess": AudioProcessingEvent;
}
/** Allows the generation, processing, or analyzing of audio using JavaScript. */
export interface ScriptProcessorNode extends AudioNode {
    /** @deprecated */
    readonly bufferSize: number;
    /** @deprecated */
    onaudioprocess: ((this: ScriptProcessorNode, ev: AudioProcessingEvent) => any) | null;
    addEventListener<K extends keyof ScriptProcessorNodeEventMap>(type: K, listener: (this: ScriptProcessorNode, ev: ScriptProcessorNodeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ScriptProcessorNodeEventMap>(type: K, listener: (this: ScriptProcessorNode, ev: ScriptProcessorNodeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Inherits from Event, and represents the event object of an event sent on a document or worker when its content security policy is violated. */
export interface SecurityPolicyViolationEvent extends Event {
    readonly blockedURI: string;
    readonly columnNumber: number;
    readonly documentURI: string;
    readonly effectiveDirective: string;
    readonly lineNumber: number;
    readonly originalPolicy: string;
    readonly referrer: string;
    readonly sourceFile: string;
    readonly statusCode: number;
    readonly violatedDirective: string;
}
/** A Selection object represents the range of text selected by the user or the current position of the caret. To obtain a Selection object for examination or modification, call Window.getSelection(). */
export interface Selection {
    readonly anchorNode: Node | null;
    readonly anchorOffset: number;
    readonly focusNode: Node | null;
    readonly focusOffset: number;
    readonly isCollapsed: boolean;
    readonly rangeCount: number;
    readonly type: string;
    addRange(range: Range): void;
    collapse(node: Node | null, offset?: number): void;
    collapseToEnd(): void;
    collapseToStart(): void;
    containsNode(node: Node, allowPartialContainment?: boolean): boolean;
    deleteFromDocument(): void;
    empty(): void;
    extend(node: Node, offset?: number): void;
    getRangeAt(index: number): Range;
    removeAllRanges(): void;
    removeRange(range: Range): void;
    selectAllChildren(node: Node): void;
    setBaseAndExtent(anchorNode: Node, anchorOffset: number, focusNode: Node, focusOffset: number): void;
    setPosition(node: Node | null, offset?: number): void;
    toString(): string;
}
export interface ServiceUIFrameContext {
    getCachedFrameMessage(key: string): string;
    postFrameMessage(key: string, data: string): void;
}
export interface ServiceWorkerEventMap extends AbstractWorkerEventMap {
    "statechange": Event;
}
/** This ServiceWorker API interface provides a reference to a service worker. Multiple browsing contexts (e.g. pages, workers, etc.) can be associated with the same service worker, each through a unique ServiceWorker object. */
export interface ServiceWorker extends EventTarget, AbstractWorker {
    onstatechange: ((this: ServiceWorker, ev: Event) => any) | null;
    readonly scriptURL: string;
    readonly state: ServiceWorkerState;
    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: PostMessageOptions): void;
    addEventListener<K extends keyof ServiceWorkerEventMap>(type: K, listener: (this: ServiceWorker, ev: ServiceWorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerEventMap>(type: K, listener: (this: ServiceWorker, ev: ServiceWorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface ServiceWorkerContainerEventMap {
    "controllerchange": Event;
    "message": MessageEvent;
    "messageerror": MessageEvent;
}
/** The ServiceWorkerContainer interface of the ServiceWorker API provides an object representing the service worker as an overall unit in the network ecosystem, including facilities to register, unregister and update service workers, and access the state of service workers and their registrations. */
export interface ServiceWorkerContainer extends EventTarget {
    readonly controller: ServiceWorker | null;
    oncontrollerchange: ((this: ServiceWorkerContainer, ev: Event) => any) | null;
    onmessage: ((this: ServiceWorkerContainer, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: ServiceWorkerContainer, ev: MessageEvent) => any) | null;
    readonly ready: Promise<ServiceWorkerRegistration>;
    getRegistration(clientURL?: string): Promise<ServiceWorkerRegistration | undefined>;
    getRegistrations(): Promise<ReadonlyArray<ServiceWorkerRegistration>>;
    register(scriptURL: string, options?: RegistrationOptions): Promise<ServiceWorkerRegistration>;
    startMessages(): void;
    addEventListener<K extends keyof ServiceWorkerContainerEventMap>(type: K, listener: (this: ServiceWorkerContainer, ev: ServiceWorkerContainerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerContainerEventMap>(type: K, listener: (this: ServiceWorkerContainer, ev: ServiceWorkerContainerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** This ServiceWorker API interface contains information about an event sent to a ServiceWorkerContainer target. This extends the default message event to allow setting a ServiceWorker object as the source of a message. The event object is accessed via the handler function of a message event, when fired by a message received from a service worker. */
export interface ServiceWorkerMessageEvent extends Event {
    readonly data: any;
    readonly lastEventId: string;
    readonly origin: string;
    readonly ports: ReadonlyArray<MessagePort> | null;
    readonly source: ServiceWorker | MessagePort | null;
}
export interface ServiceWorkerRegistrationEventMap {
    "updatefound": Event;
}
/** This ServiceWorker API interface represents the service worker registration. You register a service worker to control one or more pages that share the same origin. */
export interface ServiceWorkerRegistration extends EventTarget {
    readonly active: ServiceWorker | null;
    readonly installing: ServiceWorker | null;
    readonly navigationPreload: NavigationPreloadManager;
    onupdatefound: ((this: ServiceWorkerRegistration, ev: Event) => any) | null;
    readonly pushManager: PushManager;
    readonly scope: string;
    readonly sync: SyncManager;
    readonly updateViaCache: ServiceWorkerUpdateViaCache;
    readonly waiting: ServiceWorker | null;
    getNotifications(filter?: GetNotificationOptions): Promise<Notification[]>;
    showNotification(title: string, options?: NotificationOptions): Promise<void>;
    unregister(): Promise<boolean>;
    update(): Promise<void>;
    addEventListener<K extends keyof ServiceWorkerRegistrationEventMap>(type: K, listener: (this: ServiceWorkerRegistration, ev: ServiceWorkerRegistrationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerRegistrationEventMap>(type: K, listener: (this: ServiceWorkerRegistration, ev: ServiceWorkerRegistrationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface ShadowRoot extends DocumentFragment, DocumentOrShadowRoot, InnerHTML {
    readonly host: Element;
    readonly mode: ShadowRootMode;
}
export interface Slotable {
    readonly assignedSlot: HTMLSlotElement | null;
}
export interface SourceBufferEventMap {
    "abort": Event;
    "error": Event;
    "update": Event;
    "updateend": Event;
    "updatestart": Event;
}
/** A chunk of media to be passed into an HTMLMediaElement and played, via a MediaSource object. This can be made up of one or several media segments. */
export interface SourceBuffer extends EventTarget {
    appendWindowEnd: number;
    appendWindowStart: number;
    readonly audioTracks: AudioTrackList;
    readonly buffered: TimeRanges;
    mode: AppendMode;
    onabort: ((this: SourceBuffer, ev: Event) => any) | null;
    onerror: ((this: SourceBuffer, ev: Event) => any) | null;
    onupdate: ((this: SourceBuffer, ev: Event) => any) | null;
    onupdateend: ((this: SourceBuffer, ev: Event) => any) | null;
    onupdatestart: ((this: SourceBuffer, ev: Event) => any) | null;
    readonly textTracks: TextTrackList;
    timestampOffset: number;
    readonly updating: boolean;
    readonly videoTracks: VideoTrackList;
    abort(): void;
    appendBuffer(data: BufferSource): void;
    remove(start: number, end: number): void;
    addEventListener<K extends keyof SourceBufferEventMap>(type: K, listener: (this: SourceBuffer, ev: SourceBufferEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SourceBufferEventMap>(type: K, listener: (this: SourceBuffer, ev: SourceBufferEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SourceBufferListEventMap {
    "addsourcebuffer": Event;
    "removesourcebuffer": Event;
}
/** A simple container list for multiple SourceBuffer objects. */
export interface SourceBufferList extends EventTarget {
    readonly length: number;
    onaddsourcebuffer: ((this: SourceBufferList, ev: Event) => any) | null;
    onremovesourcebuffer: ((this: SourceBufferList, ev: Event) => any) | null;
    addEventListener<K extends keyof SourceBufferListEventMap>(type: K, listener: (this: SourceBufferList, ev: SourceBufferListEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SourceBufferListEventMap>(type: K, listener: (this: SourceBufferList, ev: SourceBufferListEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    [index: number]: SourceBuffer;
}
export interface SpeechGrammar {
    src: string;
    weight: number;
}
export interface SpeechGrammarList {
    readonly length: number;
    addFromString(string: string, weight?: number): void;
    addFromURI(src: string, weight?: number): void;
    item(index: number): SpeechGrammar;
    [index: number]: SpeechGrammar;
}
export interface SpeechRecognitionEventMap {
    "audioend": Event;
    "audiostart": Event;
    "end": Event;
    "error": Event;
    "nomatch": SpeechRecognitionEvent;
    "result": SpeechRecognitionEvent;
    "soundend": Event;
    "soundstart": Event;
    "speechend": Event;
    "speechstart": Event;
    "start": Event;
}
export interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    grammars: SpeechGrammarList;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    abort(): void;
    start(): void;
    stop(): void;
    addEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SpeechRecognitionAlternative {
    readonly confidence: number;
    readonly transcript: string;
}
export interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}
export interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}
export interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}
export interface SpeechSynthesisEventMap {
    "voiceschanged": Event;
}
/** This Web Speech API interface is the controller interface for the speech service; this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides. */
export interface SpeechSynthesis extends EventTarget {
    onvoiceschanged: ((this: SpeechSynthesis, ev: Event) => any) | null;
    readonly paused: boolean;
    readonly pending: boolean;
    readonly speaking: boolean;
    cancel(): void;
    getVoices(): SpeechSynthesisVoice[];
    pause(): void;
    resume(): void;
    speak(utterance: SpeechSynthesisUtterance): void;
    addEventListener<K extends keyof SpeechSynthesisEventMap>(type: K, listener: (this: SpeechSynthesis, ev: SpeechSynthesisEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SpeechSynthesisEventMap>(type: K, listener: (this: SpeechSynthesis, ev: SpeechSynthesisEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface SpeechSynthesisErrorEvent extends SpeechSynthesisEvent {
    readonly error: SpeechSynthesisErrorCode;
}
/** This Web Speech API interface contains information about the current state of SpeechSynthesisUtterance objects that have been processed in the speech service. */
export interface SpeechSynthesisEvent extends Event {
    readonly charIndex: number;
    readonly charLength: number;
    readonly elapsedTime: number;
    readonly name: string;
    readonly utterance: SpeechSynthesisUtterance;
}
export interface SpeechSynthesisUtteranceEventMap {
    "boundary": SpeechSynthesisEvent;
    "end": SpeechSynthesisEvent;
    "error": SpeechSynthesisErrorEvent;
    "mark": SpeechSynthesisEvent;
    "pause": SpeechSynthesisEvent;
    "resume": SpeechSynthesisEvent;
    "start": SpeechSynthesisEvent;
}
/** This Web Speech API interface represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.) */
export interface SpeechSynthesisUtterance extends EventTarget {
    lang: string;
    onboundary: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;
    onend: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;
    onerror: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisErrorEvent) => any) | null;
    onmark: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;
    onpause: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;
    onresume: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;
    onstart: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;
    pitch: number;
    rate: number;
    text: string;
    voice: SpeechSynthesisVoice | null;
    volume: number;
    addEventListener<K extends keyof SpeechSynthesisUtteranceEventMap>(type: K, listener: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisUtteranceEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SpeechSynthesisUtteranceEventMap>(type: K, listener: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisUtteranceEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** This Web Speech API interface represents a voice that the system supports. Every SpeechSynthesisVoice has its own relative speech service including information about language, name and URI. */
export interface SpeechSynthesisVoice {
    readonly default: boolean;
    readonly lang: string;
    readonly localService: boolean;
    readonly name: string;
    readonly voiceURI: string;
}
export interface StaticRange extends AbstractRange {
}
/** The pan property takes a unitless value between -1 (full left pan) and 1 (full right pan). This interface was introduced as a much simpler way to apply a simple panning effect than having to use a full PannerNode. */
export interface StereoPannerNode extends AudioNode {
    readonly pan: AudioParam;
}
/** This Web Storage API interface provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items. */
export interface Storage {
    /**
     * Returns the number of key/value pairs currently present in the list associated with the object.
     */
    readonly length: number;
    /**
     * Empties the list associated with the object of all key/value pairs, if there are any.
     */
    clear(): void;
    /**
     * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
     */
    getItem(key: string): string | null;
    /**
     * Returns the name of the nth key in the list, or null if n is greater than or equal to the number of key/value pairs in the object.
     */
    key(index: number): string | null;
    /**
     * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
     */
    removeItem(key: string): void;
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     *
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     */
    setItem(key: string, value: string): void;
    [name: string]: any;
}
/** A StorageEvent is sent to a window when a storage area it has access to is changed within the context of another document. */
export interface StorageEvent extends Event {
    /**
     * Returns the key of the storage item being changed.
     */
    readonly key: string | null;
    /**
     * Returns the new value of the key of the storage item whose value is being changed.
     */
    readonly newValue: string | null;
    /**
     * Returns the old value of the key of the storage item whose value is being changed.
     */
    readonly oldValue: string | null;
    /**
     * Returns the Storage object that was affected.
     */
    readonly storageArea: Storage | null;
    /**
     * Returns the URL of the document whose storage item changed.
     */
    readonly url: string;
}
export interface StorageManager {
    estimate(): Promise<StorageEstimate>;
    persist(): Promise<boolean>;
    persisted(): Promise<boolean>;
}
export interface StyleMedia {
    readonly type: string;
    matchMedium(mediaquery: string): boolean;
}
/** A single style sheet. CSS style sheets will further implement the more specialized CSSStyleSheet interface. */
export interface StyleSheet {
    disabled: boolean;
    readonly href: string | null;
    readonly media: MediaList;
    readonly ownerNode: Node;
    readonly parentStyleSheet: StyleSheet | null;
    readonly title: string | null;
    readonly type: string;
}
/** A list of StyleSheet. */
export interface StyleSheetList {
    readonly length: number;
    item(index: number): StyleSheet | null;
    [index: number]: StyleSheet;
}
/** This Web Crypto API interface provides a number of low-level cryptographic functions. It is accessed via the Crypto.subtle properties available in a window context (via Window.crypto). */
export interface SubtleCrypto {
    decrypt(algorithm: string | RsaOaepParams | AesCtrParams | AesCbcParams | AesCmacParams | AesGcmParams | AesCfbParams, key: CryptoKey, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer): PromiseLike<ArrayBuffer>;
    deriveBits(algorithm: string | EcdhKeyDeriveParams | DhKeyDeriveParams | ConcatParams | HkdfCtrParams | Pbkdf2Params, baseKey: CryptoKey, length: number): PromiseLike<ArrayBuffer>;
    deriveKey(algorithm: string | EcdhKeyDeriveParams | DhKeyDeriveParams | ConcatParams | HkdfCtrParams | Pbkdf2Params, baseKey: CryptoKey, derivedKeyType: string | AesDerivedKeyParams | HmacImportParams | ConcatParams | HkdfCtrParams | Pbkdf2Params, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey>;
    digest(algorithm: string | Algorithm, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer): PromiseLike<ArrayBuffer>;
    encrypt(algorithm: string | RsaOaepParams | AesCtrParams | AesCbcParams | AesCmacParams | AesGcmParams | AesCfbParams, key: CryptoKey, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer): PromiseLike<ArrayBuffer>;
    exportKey(format: "jwk", key: CryptoKey): PromiseLike<JsonWebKey>;
    exportKey(format: "raw" | "pkcs8" | "spki", key: CryptoKey): PromiseLike<ArrayBuffer>;
    exportKey(format: string, key: CryptoKey): PromiseLike<JsonWebKey | ArrayBuffer>;
    generateKey(algorithm: string, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKeyPair | CryptoKey>;
    generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams | DhKeyGenParams, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKeyPair>;
    generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey>;
    importKey(format: "jwk", keyData: JsonWebKey, algorithm: string | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | DhImportKeyParams | AesKeyAlgorithm, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey>;
    importKey(format: "raw" | "pkcs8" | "spki", keyData: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer, algorithm: string | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | DhImportKeyParams | AesKeyAlgorithm, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey>;
    importKey(format: string, keyData: JsonWebKey | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer, algorithm: string | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | DhImportKeyParams | AesKeyAlgorithm, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey>;
    sign(algorithm: string | RsaPssParams | EcdsaParams | AesCmacParams, key: CryptoKey, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer): PromiseLike<ArrayBuffer>;
    unwrapKey(format: string, wrappedKey: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer, unwrappingKey: CryptoKey, unwrapAlgorithm: string | Algorithm, unwrappedKeyAlgorithm: string | Algorithm, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey>;
    verify(algorithm: string | RsaPssParams | EcdsaParams | AesCmacParams, key: CryptoKey, signature: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer, data: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer): PromiseLike<boolean>;
    wrapKey(format: string, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: string | Algorithm): PromiseLike<ArrayBuffer>;
}
/** This ServiceWorker API interface provides an interface for registering and listing sync registrations. */
export interface SyncManager {
    getTags(): Promise<string[]>;
    register(tag: string): Promise<void>;
}
/** The textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children. */
export interface Text extends CharacterData, Slotable {
    readonly assignedSlot: HTMLSlotElement | null;
    /**
     * Returns the combined data of all direct Text node siblings.
     */
    readonly wholeText: string;
    /**
     * Splits data at the given offset and returns the remainder as Text node.
     */
    splitText(offset: number): Text;
}
/** A decoder for a specific method, that is a specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc. A decoder takes a stream of bytes as input and emits a stream of code points. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays. */
export interface TextDecoder extends TextDecoderCommon {
    /**
     * Returns the result of running encoding's decoder. The method can be invoked zero or more times with options's stream set to true, and then once without options's stream (or set to false), to process a fragmented stream. If the invocation without options's stream (or set to false) has no input, it's clearest to omit both arguments.
     *
     * ```
     * var string = "", decoder = new TextDecoder(encoding), buffer;
     * while(buffer = next_chunk()) {
     *   string += decoder.decode(buffer, {stream:true});
     * }
     * string += decoder.decode(); // end-of-stream
     * ```
     *
     * If the error mode is "fatal" and encoding's decoder returns error, throws a TypeError.
     */
    decode(input?: BufferSource, options?: TextDecodeOptions): string;
}
export interface TextDecoderCommon {
    /**
     * Returns encoding's name, lowercased.
     */
    readonly encoding: string;
    /**
     * Returns true if error mode is "fatal", and false otherwise.
     */
    readonly fatal: boolean;
    /**
     * Returns true if ignore BOM flag is set, and false otherwise.
     */
    readonly ignoreBOM: boolean;
}
export interface TextDecoderStream extends GenericTransformStream, TextDecoderCommon {
    readonly readable: ReadableStream<string>;
    readonly writable: WritableStream<BufferSource>;
}
/** TextEncoder takes a stream of code points as input and emits a stream of bytes. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays. */
export interface TextEncoder extends TextEncoderCommon {
    /**
     * Returns the result of running UTF-8's encoder.
     */
    encode(input?: string): Uint8Array;
    /**
     * Runs the UTF-8 encoder on source, stores the result of that operation into destination, and returns the progress made as a dictionary whereby read is the number of converted code units of source and written is the number of bytes modified in destination.
     */
    encodeInto(source: string, destination: Uint8Array): TextEncoderEncodeIntoResult;
}
export interface TextEncoderCommon {
    /**
     * Returns "utf-8".
     */
    readonly encoding: string;
}
export interface TextEncoderStream extends GenericTransformStream, TextEncoderCommon {
    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<string>;
}
export interface TextEvent extends UIEvent {
    readonly data: string;
    initTextEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, dataArg: string, inputMethod: number, locale: string): void;
    readonly DOM_INPUT_METHOD_DROP: number;
    readonly DOM_INPUT_METHOD_HANDWRITING: number;
    readonly DOM_INPUT_METHOD_IME: number;
    readonly DOM_INPUT_METHOD_KEYBOARD: number;
    readonly DOM_INPUT_METHOD_MULTIMODAL: number;
    readonly DOM_INPUT_METHOD_OPTION: number;
    readonly DOM_INPUT_METHOD_PASTE: number;
    readonly DOM_INPUT_METHOD_SCRIPT: number;
    readonly DOM_INPUT_METHOD_UNKNOWN: number;
    readonly DOM_INPUT_METHOD_VOICE: number;
}
/** The dimensions of a piece of text in the canvas, as created by the CanvasRenderingContext2D.measureText() method. */
export interface TextMetrics {
    /**
     * Returns the measurement described below.
     */
    readonly actualBoundingBoxAscent: number;
    /**
     * Returns the measurement described below.
     */
    readonly actualBoundingBoxDescent: number;
    /**
     * Returns the measurement described below.
     */
    readonly actualBoundingBoxLeft: number;
    /**
     * Returns the measurement described below.
     */
    readonly actualBoundingBoxRight: number;
    /**
     * Returns the measurement described below.
     */
    readonly alphabeticBaseline: number;
    /**
     * Returns the measurement described below.
     */
    readonly emHeightAscent: number;
    /**
     * Returns the measurement described below.
     */
    readonly emHeightDescent: number;
    /**
     * Returns the measurement described below.
     */
    readonly fontBoundingBoxAscent: number;
    /**
     * Returns the measurement described below.
     */
    readonly fontBoundingBoxDescent: number;
    /**
     * Returns the measurement described below.
     */
    readonly hangingBaseline: number;
    /**
     * Returns the measurement described below.
     */
    readonly ideographicBaseline: number;
    /**
     * Returns the measurement described below.
     */
    readonly width: number;
}
export interface TextTrackEventMap {
    "cuechange": Event;
    "error": Event;
    "load": Event;
}
/** This interface also inherits properties from EventTarget. */
export interface TextTrack extends EventTarget {
    readonly activeCues: TextTrackCueList;
    readonly cues: TextTrackCueList;
    readonly inBandMetadataTrackDispatchType: string;
    readonly kind: string;
    readonly label: string;
    readonly language: string;
    mode: TextTrackMode | number;
    oncuechange: ((this: TextTrack, ev: Event) => any) | null;
    onerror: ((this: TextTrack, ev: Event) => any) | null;
    onload: ((this: TextTrack, ev: Event) => any) | null;
    readonly readyState: number;
    readonly sourceBuffer: SourceBuffer | null;
    addCue(cue: TextTrackCue): void;
    removeCue(cue: TextTrackCue): void;
    readonly DISABLED: number;
    readonly ERROR: number;
    readonly HIDDEN: number;
    readonly LOADED: number;
    readonly LOADING: number;
    readonly NONE: number;
    readonly SHOWING: number;
    addEventListener<K extends keyof TextTrackEventMap>(type: K, listener: (this: TextTrack, ev: TextTrackEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof TextTrackEventMap>(type: K, listener: (this: TextTrack, ev: TextTrackEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface TextTrackCueEventMap {
    "enter": Event;
    "exit": Event;
}
/** TextTrackCues represent a string of text that will be displayed for some duration of time on a TextTrack. This includes the start and end times that the cue will be displayed. A TextTrackCue cannot be used directly, instead one of the derived types (e.g. VTTCue) must be used. */
export interface TextTrackCue extends EventTarget {
    endTime: number;
    id: string;
    onenter: ((this: TextTrackCue, ev: Event) => any) | null;
    onexit: ((this: TextTrackCue, ev: Event) => any) | null;
    pauseOnExit: boolean;
    startTime: number;
    text: string;
    readonly track: TextTrack;
    getCueAsHTML(): DocumentFragment;
    addEventListener<K extends keyof TextTrackCueEventMap>(type: K, listener: (this: TextTrackCue, ev: TextTrackCueEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof TextTrackCueEventMap>(type: K, listener: (this: TextTrackCue, ev: TextTrackCueEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface TextTrackCueList {
    readonly length: number;
    getCueById(id: string): TextTrackCue;
    item(index: number): TextTrackCue;
    [index: number]: TextTrackCue;
}
export interface TextTrackListEventMap {
    "addtrack": TrackEvent;
    "change": Event;
    "removetrack": TrackEvent;
}
export interface TextTrackList extends EventTarget {
    readonly length: number;
    onaddtrack: ((this: TextTrackList, ev: TrackEvent) => any) | null;
    onchange: ((this: TextTrackList, ev: Event) => any) | null;
    onremovetrack: ((this: TextTrackList, ev: TrackEvent) => any) | null;
    item(index: number): TextTrack;
    addEventListener<K extends keyof TextTrackListEventMap>(type: K, listener: (this: TextTrackList, ev: TextTrackListEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof TextTrackListEventMap>(type: K, listener: (this: TextTrackList, ev: TextTrackListEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    [index: number]: TextTrack;
}
/** Used to represent a set of time ranges, primarily for the purpose of tracking which portions of media have been buffered when loading it for use by the <audio> and <video> elements. */
export interface TimeRanges {
    readonly length: number;
    end(index: number): number;
    start(index: number): number;
}
/** A single contact point on a touch-sensitive device. The contact point is commonly a finger or stylus and the device may be a touchscreen or trackpad. */
export interface Touch {
    readonly altitudeAngle: number;
    readonly azimuthAngle: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly force: number;
    readonly identifier: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly radiusX: number;
    readonly radiusY: number;
    readonly rotationAngle: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly target: EventTarget;
    readonly touchType: TouchType;
}
/** An event sent when the state of contacts with a touch-sensitive surface changes. This surface can be a touch screen or trackpad, for example. The event can describe one or more points of contact with the screen and includes support for detecting movement, addition and removal of contact points, and so forth. */
export interface TouchEvent extends UIEvent {
    readonly altKey: boolean;
    readonly changedTouches: TouchList;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
    readonly targetTouches: TouchList;
    readonly touches: TouchList;
}
/** A list of contact points on a touch surface. For example, if the user has three fingers on the touch surface (such as a screen or trackpad), the corresponding TouchList object would have one Touch object for each finger, for a total of three entries. */
export interface TouchList {
    readonly length: number;
    item(index: number): Touch | null;
    [index: number]: Touch;
}
/** The TrackEvent interface, part of the HTML DOM specification, is used for events which represent changes to the set of available tracks on an HTML media element; these events are addtrack and removetrack. */
export interface TrackEvent extends Event {
    readonly track: VideoTrack | AudioTrack | TextTrack | null;
}
export interface TransformStream<I = any, O = any> {
    readonly readable: ReadableStream<O>;
    readonly writable: WritableStream<I>;
}
export interface TransformStreamDefaultController<O = any> {
    readonly desiredSize: number | null;
    enqueue(chunk: O): void;
    error(reason?: any): void;
    terminate(): void;
}
/** Events providing information related to transitions. */
export interface TransitionEvent extends Event {
    readonly elapsedTime: number;
    readonly propertyName: string;
    readonly pseudoElement: string;
}
/** The nodes of a document subtree and a position within them. */
export interface TreeWalker {
    currentNode: Node;
    readonly filter: NodeFilter | null;
    readonly root: Node;
    readonly whatToShow: number;
    firstChild(): Node | null;
    lastChild(): Node | null;
    nextNode(): Node | null;
    nextSibling(): Node | null;
    parentNode(): Node | null;
    previousNode(): Node | null;
    previousSibling(): Node | null;
}
/** Simple user interface events. */
export interface UIEvent extends Event {
    readonly detail: number;
    readonly view: Window | null;
    /** @deprecated */
    readonly which: number;
}
/** The URL interface represents an object providing static methods used for creating object URLs. */
export interface URL {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    toString(): string;
    readonly origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    readonly searchParams: URLSearchParams;
    username: string;
    toJSON(): string;
}
export declare type webkitURL = URL;
export interface URLSearchParams {
    /**
     * Appends a specified key/value pair as a new search parameter.
     */
    append(name: string, value: string): void;
    /**
     * Deletes the given search parameter, and its associated value, from the list of all search parameters.
     */
    delete(name: string): void;
    /**
     * Returns the first value associated to the given search parameter.
     */
    get(name: string): string | null;
    /**
     * Returns all the values association with a given search parameter.
     */
    getAll(name: string): string[];
    /**
     * Returns a Boolean indicating if such a search parameter exists.
     */
    has(name: string): boolean;
    /**
     * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
     */
    set(name: string, value: string): void;
    sort(): void;
    /**
     * Returns a string containing a query string suitable for use in a URL. Does not include the question mark.
     */
    toString(): string;
    forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
}
/** This WebVR API interface represents any VR device supported by this API. It includes generic information such as device IDs and descriptions, as well as methods for starting to present a VR scene, retrieving eye parameters and display capabilities, and other important functionality. */
export interface VRDisplay extends EventTarget {
    readonly capabilities: VRDisplayCapabilities;
    depthFar: number;
    depthNear: number;
    readonly displayId: number;
    readonly displayName: string;
    readonly isConnected: boolean;
    readonly isPresenting: boolean;
    readonly stageParameters: VRStageParameters | null;
    cancelAnimationFrame(handle: number): void;
    exitPresent(): Promise<void>;
    getEyeParameters(whichEye: string): VREyeParameters;
    getFrameData(frameData: VRFrameData): boolean;
    getLayers(): VRLayer[];
    /** @deprecated */
    getPose(): VRPose;
    requestAnimationFrame(callback: FrameRequestCallback): number;
    requestPresent(layers: VRLayer[]): Promise<void>;
    resetPose(): void;
    submitFrame(pose?: VRPose): void;
}
/** This WebVR API interface describes the capabilities of a VRDisplay — its features can be used to perform VR device capability tests, for example can it return position information. */
export interface VRDisplayCapabilities {
    readonly canPresent: boolean;
    readonly hasExternalDisplay: boolean;
    readonly hasOrientation: boolean;
    readonly hasPosition: boolean;
    readonly maxLayers: number;
}
/** This WebVR API interface represents represents the event object of WebVR-related events (see the list of WebVR window extensions). */
export interface VRDisplayEvent extends Event {
    readonly display: VRDisplay;
    readonly reason: VRDisplayEventReason | null;
}
/** This WebVR API interface represents all the information required to correctly render a scene for a given eye, including field of view information. */
export interface VREyeParameters {
    /** @deprecated */
    readonly fieldOfView: VRFieldOfView;
    readonly offset: Float32Array;
    readonly renderHeight: number;
    readonly renderWidth: number;
}
/** This WebVR API interface represents a field of view defined by 4 different degree values describing the view from a center point. */
export interface VRFieldOfView {
    readonly downDegrees: number;
    readonly leftDegrees: number;
    readonly rightDegrees: number;
    readonly upDegrees: number;
}
/** This WebVR API interface represents all the information needed to render a single frame of a VR scene; constructed by VRDisplay.getFrameData(). */
export interface VRFrameData {
    readonly leftProjectionMatrix: Float32Array;
    readonly leftViewMatrix: Float32Array;
    readonly pose: VRPose;
    readonly rightProjectionMatrix: Float32Array;
    readonly rightViewMatrix: Float32Array;
    readonly timestamp: number;
}
/** This WebVR API interface represents the state of a VR sensor at a given timestamp (which includes orientation, position, velocity, and acceleration information.) */
export interface VRPose {
    readonly angularAcceleration: Float32Array | null;
    readonly angularVelocity: Float32Array | null;
    readonly linearAcceleration: Float32Array | null;
    readonly linearVelocity: Float32Array | null;
    readonly orientation: Float32Array | null;
    readonly position: Float32Array | null;
    readonly timestamp: number;
}
export interface VTTCue extends TextTrackCue {
    align: AlignSetting;
    line: LineAndPositionSetting;
    lineAlign: LineAlignSetting;
    position: LineAndPositionSetting;
    positionAlign: PositionAlignSetting;
    region: VTTRegion | null;
    size: number;
    snapToLines: boolean;
    text: string;
    vertical: DirectionSetting;
    getCueAsHTML(): DocumentFragment;
    addEventListener<K extends keyof TextTrackCueEventMap>(type: K, listener: (this: VTTCue, ev: TextTrackCueEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof TextTrackCueEventMap>(type: K, listener: (this: VTTCue, ev: TextTrackCueEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface VTTRegion {
    id: string;
    lines: number;
    regionAnchorX: number;
    regionAnchorY: number;
    scroll: ScrollSetting;
    viewportAnchorX: number;
    viewportAnchorY: number;
    width: number;
}
/** The validity states that an element can be in, with respect to constraint validation. Together, they help explain why an element's value fails to validate, if it's not valid. */
export interface ValidityState {
    readonly badInput: boolean;
    readonly customError: boolean;
    readonly patternMismatch: boolean;
    readonly rangeOverflow: boolean;
    readonly rangeUnderflow: boolean;
    readonly stepMismatch: boolean;
    readonly tooLong: boolean;
    readonly tooShort: boolean;
    readonly typeMismatch: boolean;
    readonly valid: boolean;
    readonly valueMissing: boolean;
}
/** Returned by the HTMLVideoElement.getVideoPlaybackQuality() method and contains metrics that can be used to determine the playback quality of a video. */
export interface VideoPlaybackQuality {
    readonly corruptedVideoFrames: number;
    readonly creationTime: number;
    readonly droppedVideoFrames: number;
    readonly totalFrameDelay: number;
    readonly totalVideoFrames: number;
}
/** A single video track from a <video> element. */
export interface VideoTrack {
    readonly id: string;
    kind: string;
    readonly label: string;
    language: string;
    selected: boolean;
    readonly sourceBuffer: SourceBuffer | null;
}
export interface VideoTrackListEventMap {
    "addtrack": TrackEvent;
    "change": Event;
    "removetrack": TrackEvent;
}
/** Used to represent a list of the video tracks contained within a <video> element, with each track represented by a separate VideoTrack object in the list. */
export interface VideoTrackList extends EventTarget {
    readonly length: number;
    onaddtrack: ((this: VideoTrackList, ev: TrackEvent) => any) | null;
    onchange: ((this: VideoTrackList, ev: Event) => any) | null;
    onremovetrack: ((this: VideoTrackList, ev: TrackEvent) => any) | null;
    readonly selectedIndex: number;
    getTrackById(id: string): VideoTrack | null;
    item(index: number): VideoTrack;
    addEventListener<K extends keyof VideoTrackListEventMap>(type: K, listener: (this: VideoTrackList, ev: VideoTrackListEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof VideoTrackListEventMap>(type: K, listener: (this: VideoTrackList, ev: VideoTrackListEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    [index: number]: VideoTrack;
}
export interface WEBGL_color_buffer_float {
    readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: GLenum;
    readonly RGBA32F_EXT: GLenum;
    readonly UNSIGNED_NORMALIZED_EXT: GLenum;
}
export interface WEBGL_compressed_texture_astc {
    getSupportedProfiles(): string[];
    readonly COMPRESSED_RGBA_ASTC_10x10_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_10x5_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_10x6_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_10x8_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_12x10_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_12x12_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_4x4_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_5x4_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_5x5_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_6x5_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_6x6_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_8x5_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_8x6_KHR: GLenum;
    readonly COMPRESSED_RGBA_ASTC_8x8_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR: GLenum;
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR: GLenum;
}
/** The WEBGL_compressed_texture_s3tc extension is part of the WebGL API and exposes four S3TC compressed texture formats. */
export interface WEBGL_compressed_texture_s3tc {
    readonly COMPRESSED_RGBA_S3TC_DXT1_EXT: GLenum;
    readonly COMPRESSED_RGBA_S3TC_DXT3_EXT: GLenum;
    readonly COMPRESSED_RGBA_S3TC_DXT5_EXT: GLenum;
    readonly COMPRESSED_RGB_S3TC_DXT1_EXT: GLenum;
}
export interface WEBGL_compressed_texture_s3tc_srgb {
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: GLenum;
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: GLenum;
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: GLenum;
    readonly COMPRESSED_SRGB_S3TC_DXT1_EXT: GLenum;
}
/** The WEBGL_debug_renderer_info extension is part of the WebGL API and exposes two constants with information about the graphics driver for debugging purposes. */
export interface WEBGL_debug_renderer_info {
    readonly UNMASKED_RENDERER_WEBGL: GLenum;
    readonly UNMASKED_VENDOR_WEBGL: GLenum;
}
export interface WEBGL_debug_shaders {
    getTranslatedShaderSource(shader: WebGLShader): string;
}
/** The WEBGL_depth_texture extension is part of the WebGL API and defines 2D depth and depth-stencil textures. */
export interface WEBGL_depth_texture {
    readonly UNSIGNED_INT_24_8_WEBGL: GLenum;
}
export interface WEBGL_draw_buffers {
    drawBuffersWEBGL(buffers: GLenum[]): void;
    readonly COLOR_ATTACHMENT0_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT10_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT11_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT12_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT13_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT14_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT15_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT1_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT2_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT3_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT4_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT5_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT6_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT7_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT8_WEBGL: GLenum;
    readonly COLOR_ATTACHMENT9_WEBGL: GLenum;
    readonly DRAW_BUFFER0_WEBGL: GLenum;
    readonly DRAW_BUFFER10_WEBGL: GLenum;
    readonly DRAW_BUFFER11_WEBGL: GLenum;
    readonly DRAW_BUFFER12_WEBGL: GLenum;
    readonly DRAW_BUFFER13_WEBGL: GLenum;
    readonly DRAW_BUFFER14_WEBGL: GLenum;
    readonly DRAW_BUFFER15_WEBGL: GLenum;
    readonly DRAW_BUFFER1_WEBGL: GLenum;
    readonly DRAW_BUFFER2_WEBGL: GLenum;
    readonly DRAW_BUFFER3_WEBGL: GLenum;
    readonly DRAW_BUFFER4_WEBGL: GLenum;
    readonly DRAW_BUFFER5_WEBGL: GLenum;
    readonly DRAW_BUFFER6_WEBGL: GLenum;
    readonly DRAW_BUFFER7_WEBGL: GLenum;
    readonly DRAW_BUFFER8_WEBGL: GLenum;
    readonly DRAW_BUFFER9_WEBGL: GLenum;
    readonly MAX_COLOR_ATTACHMENTS_WEBGL: GLenum;
    readonly MAX_DRAW_BUFFERS_WEBGL: GLenum;
}
export interface WEBGL_lose_context {
    loseContext(): void;
    restoreContext(): void;
}
/** A WaveShaperNode always has exactly one input and one output. */
export interface WaveShaperNode extends AudioNode {
    curve: Float32Array | null;
    oversample: OverSampleType;
}
export interface WebAuthentication {
    getAssertion(assertionChallenge: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | null, options?: AssertionOptions): Promise<WebAuthnAssertion>;
    makeCredential(accountInformation: Account, cryptoParameters: ScopedCredentialParameters[], attestationChallenge: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | null, options?: ScopedCredentialOptions): Promise<ScopedCredentialInfo>;
}
export interface WebAuthnAssertion {
    readonly authenticatorData: ArrayBuffer;
    readonly clientData: ArrayBuffer;
    readonly credential: ScopedCredential;
    readonly signature: ArrayBuffer;
}
export interface WebGL2RenderingContext extends WebGL2RenderingContextBase, WebGL2RenderingContextOverloads, WebGLRenderingContextBase {
}
export interface WebGL2RenderingContextBase {
    beginQuery(target: GLenum, query: WebGLQuery): void;
    beginTransformFeedback(primitiveMode: GLenum): void;
    bindBufferBase(target: GLenum, index: GLuint, buffer: WebGLBuffer | null): void;
    bindBufferRange(target: GLenum, index: GLuint, buffer: WebGLBuffer | null, offset: GLintptr, size: GLsizeiptr): void;
    bindSampler(unit: GLuint, sampler: WebGLSampler | null): void;
    bindTransformFeedback(target: GLenum, tf: WebGLTransformFeedback | null): void;
    bindVertexArray(array: WebGLVertexArrayObject | null): void;
    blitFramebuffer(srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint, dstX0: GLint, dstY0: GLint, dstX1: GLint, dstY1: GLint, mask: GLbitfield, filter: GLenum): void;
    clearBufferfi(buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void;
    clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Float32List, srcOffset?: GLuint): void;
    clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Int32List, srcOffset?: GLuint): void;
    clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Uint32List, srcOffset?: GLuint): void;
    clientWaitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum;
    compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;
    compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
    compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void;
    compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
    copyBufferSubData(readTarget: GLenum, writeTarget: GLenum, readOffset: GLintptr, writeOffset: GLintptr, size: GLsizeiptr): void;
    copyTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    createQuery(): WebGLQuery | null;
    createSampler(): WebGLSampler | null;
    createTransformFeedback(): WebGLTransformFeedback | null;
    createVertexArray(): WebGLVertexArrayObject | null;
    deleteQuery(query: WebGLQuery | null): void;
    deleteSampler(sampler: WebGLSampler | null): void;
    deleteSync(sync: WebGLSync | null): void;
    deleteTransformFeedback(tf: WebGLTransformFeedback | null): void;
    deleteVertexArray(vertexArray: WebGLVertexArrayObject | null): void;
    drawArraysInstanced(mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void;
    drawBuffers(buffers: GLenum[]): void;
    drawElementsInstanced(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, instanceCount: GLsizei): void;
    drawRangeElements(mode: GLenum, start: GLuint, end: GLuint, count: GLsizei, type: GLenum, offset: GLintptr): void;
    endQuery(target: GLenum): void;
    endTransformFeedback(): void;
    fenceSync(condition: GLenum, flags: GLbitfield): WebGLSync | null;
    framebufferTextureLayer(target: GLenum, attachment: GLenum, texture: WebGLTexture | null, level: GLint, layer: GLint): void;
    getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): string | null;
    getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): any;
    getActiveUniforms(program: WebGLProgram, uniformIndices: GLuint[], pname: GLenum): any;
    getBufferSubData(target: GLenum, srcByteOffset: GLintptr, dstBuffer: ArrayBufferView, dstOffset?: GLuint, length?: GLuint): void;
    getFragDataLocation(program: WebGLProgram, name: string): GLint;
    getIndexedParameter(target: GLenum, index: GLuint): any;
    getInternalformatParameter(target: GLenum, internalformat: GLenum, pname: GLenum): any;
    getQuery(target: GLenum, pname: GLenum): WebGLQuery | null;
    getQueryParameter(query: WebGLQuery, pname: GLenum): any;
    getSamplerParameter(sampler: WebGLSampler, pname: GLenum): any;
    getSyncParameter(sync: WebGLSync, pname: GLenum): any;
    getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
    getUniformBlockIndex(program: WebGLProgram, uniformBlockName: string): GLuint;
    getUniformIndices(program: WebGLProgram, uniformNames: string[]): GLuint[] | null;
    invalidateFramebuffer(target: GLenum, attachments: GLenum[]): void;
    invalidateSubFramebuffer(target: GLenum, attachments: GLenum[], x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    isQuery(query: WebGLQuery | null): GLboolean;
    isSampler(sampler: WebGLSampler | null): GLboolean;
    isSync(sync: WebGLSync | null): GLboolean;
    isTransformFeedback(tf: WebGLTransformFeedback | null): GLboolean;
    isVertexArray(vertexArray: WebGLVertexArrayObject | null): GLboolean;
    pauseTransformFeedback(): void;
    readBuffer(src: GLenum): void;
    renderbufferStorageMultisample(target: GLenum, samples: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
    resumeTransformFeedback(): void;
    samplerParameterf(sampler: WebGLSampler, pname: GLenum, param: GLfloat): void;
    samplerParameteri(sampler: WebGLSampler, pname: GLenum, param: GLint): void;
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView | null): void;
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
    texStorage2D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
    texStorage3D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei): void;
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void;
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView | null, srcOffset?: GLuint): void;
    transformFeedbackVaryings(program: WebGLProgram, varyings: string[], bufferMode: GLenum): void;
    uniform1ui(location: WebGLUniformLocation | null, v0: GLuint): void;
    uniform1uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint): void;
    uniform2uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint): void;
    uniform3uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void;
    uniform4uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void;
    uniformMatrix2x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix2x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    vertexAttribDivisor(index: GLuint, divisor: GLuint): void;
    vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void;
    vertexAttribI4iv(index: GLuint, values: Int32List): void;
    vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void;
    vertexAttribI4uiv(index: GLuint, values: Uint32List): void;
    vertexAttribIPointer(index: GLuint, size: GLint, type: GLenum, stride: GLsizei, offset: GLintptr): void;
    waitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void;
    readonly ACTIVE_UNIFORM_BLOCKS: GLenum;
    readonly ALREADY_SIGNALED: GLenum;
    readonly ANY_SAMPLES_PASSED: GLenum;
    readonly ANY_SAMPLES_PASSED_CONSERVATIVE: GLenum;
    readonly COLOR: GLenum;
    readonly COLOR_ATTACHMENT1: GLenum;
    readonly COLOR_ATTACHMENT10: GLenum;
    readonly COLOR_ATTACHMENT11: GLenum;
    readonly COLOR_ATTACHMENT12: GLenum;
    readonly COLOR_ATTACHMENT13: GLenum;
    readonly COLOR_ATTACHMENT14: GLenum;
    readonly COLOR_ATTACHMENT15: GLenum;
    readonly COLOR_ATTACHMENT2: GLenum;
    readonly COLOR_ATTACHMENT3: GLenum;
    readonly COLOR_ATTACHMENT4: GLenum;
    readonly COLOR_ATTACHMENT5: GLenum;
    readonly COLOR_ATTACHMENT6: GLenum;
    readonly COLOR_ATTACHMENT7: GLenum;
    readonly COLOR_ATTACHMENT8: GLenum;
    readonly COLOR_ATTACHMENT9: GLenum;
    readonly COMPARE_REF_TO_TEXTURE: GLenum;
    readonly CONDITION_SATISFIED: GLenum;
    readonly COPY_READ_BUFFER: GLenum;
    readonly COPY_READ_BUFFER_BINDING: GLenum;
    readonly COPY_WRITE_BUFFER: GLenum;
    readonly COPY_WRITE_BUFFER_BINDING: GLenum;
    readonly CURRENT_QUERY: GLenum;
    readonly DEPTH: GLenum;
    readonly DEPTH24_STENCIL8: GLenum;
    readonly DEPTH32F_STENCIL8: GLenum;
    readonly DEPTH_COMPONENT24: GLenum;
    readonly DEPTH_COMPONENT32F: GLenum;
    readonly DRAW_BUFFER0: GLenum;
    readonly DRAW_BUFFER1: GLenum;
    readonly DRAW_BUFFER10: GLenum;
    readonly DRAW_BUFFER11: GLenum;
    readonly DRAW_BUFFER12: GLenum;
    readonly DRAW_BUFFER13: GLenum;
    readonly DRAW_BUFFER14: GLenum;
    readonly DRAW_BUFFER15: GLenum;
    readonly DRAW_BUFFER2: GLenum;
    readonly DRAW_BUFFER3: GLenum;
    readonly DRAW_BUFFER4: GLenum;
    readonly DRAW_BUFFER5: GLenum;
    readonly DRAW_BUFFER6: GLenum;
    readonly DRAW_BUFFER7: GLenum;
    readonly DRAW_BUFFER8: GLenum;
    readonly DRAW_BUFFER9: GLenum;
    readonly DRAW_FRAMEBUFFER: GLenum;
    readonly DRAW_FRAMEBUFFER_BINDING: GLenum;
    readonly DYNAMIC_COPY: GLenum;
    readonly DYNAMIC_READ: GLenum;
    readonly FLOAT_32_UNSIGNED_INT_24_8_REV: GLenum;
    readonly FLOAT_MAT2x3: GLenum;
    readonly FLOAT_MAT2x4: GLenum;
    readonly FLOAT_MAT3x2: GLenum;
    readonly FLOAT_MAT3x4: GLenum;
    readonly FLOAT_MAT4x2: GLenum;
    readonly FLOAT_MAT4x3: GLenum;
    readonly FRAGMENT_SHADER_DERIVATIVE_HINT: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_RED_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: GLenum;
    readonly FRAMEBUFFER_DEFAULT: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: GLenum;
    readonly HALF_FLOAT: GLenum;
    readonly INTERLEAVED_ATTRIBS: GLenum;
    readonly INT_2_10_10_10_REV: GLenum;
    readonly INT_SAMPLER_2D: GLenum;
    readonly INT_SAMPLER_2D_ARRAY: GLenum;
    readonly INT_SAMPLER_3D: GLenum;
    readonly INT_SAMPLER_CUBE: GLenum;
    readonly INVALID_INDEX: GLenum;
    readonly MAX: GLenum;
    readonly MAX_3D_TEXTURE_SIZE: GLenum;
    readonly MAX_ARRAY_TEXTURE_LAYERS: GLenum;
    readonly MAX_CLIENT_WAIT_TIMEOUT_WEBGL: GLenum;
    readonly MAX_COLOR_ATTACHMENTS: GLenum;
    readonly MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
    readonly MAX_COMBINED_UNIFORM_BLOCKS: GLenum;
    readonly MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: GLenum;
    readonly MAX_DRAW_BUFFERS: GLenum;
    readonly MAX_ELEMENTS_INDICES: GLenum;
    readonly MAX_ELEMENTS_VERTICES: GLenum;
    readonly MAX_ELEMENT_INDEX: GLenum;
    readonly MAX_FRAGMENT_INPUT_COMPONENTS: GLenum;
    readonly MAX_FRAGMENT_UNIFORM_BLOCKS: GLenum;
    readonly MAX_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
    readonly MAX_PROGRAM_TEXEL_OFFSET: GLenum;
    readonly MAX_SAMPLES: GLenum;
    readonly MAX_SERVER_WAIT_TIMEOUT: GLenum;
    readonly MAX_TEXTURE_LOD_BIAS: GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: GLenum;
    readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: GLenum;
    readonly MAX_UNIFORM_BLOCK_SIZE: GLenum;
    readonly MAX_UNIFORM_BUFFER_BINDINGS: GLenum;
    readonly MAX_VARYING_COMPONENTS: GLenum;
    readonly MAX_VERTEX_OUTPUT_COMPONENTS: GLenum;
    readonly MAX_VERTEX_UNIFORM_BLOCKS: GLenum;
    readonly MAX_VERTEX_UNIFORM_COMPONENTS: GLenum;
    readonly MIN: GLenum;
    readonly MIN_PROGRAM_TEXEL_OFFSET: GLenum;
    readonly OBJECT_TYPE: GLenum;
    readonly PACK_ROW_LENGTH: GLenum;
    readonly PACK_SKIP_PIXELS: GLenum;
    readonly PACK_SKIP_ROWS: GLenum;
    readonly PIXEL_PACK_BUFFER: GLenum;
    readonly PIXEL_PACK_BUFFER_BINDING: GLenum;
    readonly PIXEL_UNPACK_BUFFER: GLenum;
    readonly PIXEL_UNPACK_BUFFER_BINDING: GLenum;
    readonly QUERY_RESULT: GLenum;
    readonly QUERY_RESULT_AVAILABLE: GLenum;
    readonly R11F_G11F_B10F: GLenum;
    readonly R16F: GLenum;
    readonly R16I: GLenum;
    readonly R16UI: GLenum;
    readonly R32F: GLenum;
    readonly R32I: GLenum;
    readonly R32UI: GLenum;
    readonly R8: GLenum;
    readonly R8I: GLenum;
    readonly R8UI: GLenum;
    readonly R8_SNORM: GLenum;
    readonly RASTERIZER_DISCARD: GLenum;
    readonly READ_BUFFER: GLenum;
    readonly READ_FRAMEBUFFER: GLenum;
    readonly READ_FRAMEBUFFER_BINDING: GLenum;
    readonly RED: GLenum;
    readonly RED_INTEGER: GLenum;
    readonly RENDERBUFFER_SAMPLES: GLenum;
    readonly RG: GLenum;
    readonly RG16F: GLenum;
    readonly RG16I: GLenum;
    readonly RG16UI: GLenum;
    readonly RG32F: GLenum;
    readonly RG32I: GLenum;
    readonly RG32UI: GLenum;
    readonly RG8: GLenum;
    readonly RG8I: GLenum;
    readonly RG8UI: GLenum;
    readonly RG8_SNORM: GLenum;
    readonly RGB10_A2: GLenum;
    readonly RGB10_A2UI: GLenum;
    readonly RGB16F: GLenum;
    readonly RGB16I: GLenum;
    readonly RGB16UI: GLenum;
    readonly RGB32F: GLenum;
    readonly RGB32I: GLenum;
    readonly RGB32UI: GLenum;
    readonly RGB8: GLenum;
    readonly RGB8I: GLenum;
    readonly RGB8UI: GLenum;
    readonly RGB8_SNORM: GLenum;
    readonly RGB9_E5: GLenum;
    readonly RGBA16F: GLenum;
    readonly RGBA16I: GLenum;
    readonly RGBA16UI: GLenum;
    readonly RGBA32F: GLenum;
    readonly RGBA32I: GLenum;
    readonly RGBA32UI: GLenum;
    readonly RGBA8: GLenum;
    readonly RGBA8I: GLenum;
    readonly RGBA8UI: GLenum;
    readonly RGBA8_SNORM: GLenum;
    readonly RGBA_INTEGER: GLenum;
    readonly RGB_INTEGER: GLenum;
    readonly RG_INTEGER: GLenum;
    readonly SAMPLER_2D_ARRAY: GLenum;
    readonly SAMPLER_2D_ARRAY_SHADOW: GLenum;
    readonly SAMPLER_2D_SHADOW: GLenum;
    readonly SAMPLER_3D: GLenum;
    readonly SAMPLER_BINDING: GLenum;
    readonly SAMPLER_CUBE_SHADOW: GLenum;
    readonly SEPARATE_ATTRIBS: GLenum;
    readonly SIGNALED: GLenum;
    readonly SIGNED_NORMALIZED: GLenum;
    readonly SRGB: GLenum;
    readonly SRGB8: GLenum;
    readonly SRGB8_ALPHA8: GLenum;
    readonly STATIC_COPY: GLenum;
    readonly STATIC_READ: GLenum;
    readonly STENCIL: GLenum;
    readonly STREAM_COPY: GLenum;
    readonly STREAM_READ: GLenum;
    readonly SYNC_CONDITION: GLenum;
    readonly SYNC_FENCE: GLenum;
    readonly SYNC_FLAGS: GLenum;
    readonly SYNC_FLUSH_COMMANDS_BIT: GLenum;
    readonly SYNC_GPU_COMMANDS_COMPLETE: GLenum;
    readonly SYNC_STATUS: GLenum;
    readonly TEXTURE_2D_ARRAY: GLenum;
    readonly TEXTURE_3D: GLenum;
    readonly TEXTURE_BASE_LEVEL: GLenum;
    readonly TEXTURE_BINDING_2D_ARRAY: GLenum;
    readonly TEXTURE_BINDING_3D: GLenum;
    readonly TEXTURE_COMPARE_FUNC: GLenum;
    readonly TEXTURE_COMPARE_MODE: GLenum;
    readonly TEXTURE_IMMUTABLE_FORMAT: GLenum;
    readonly TEXTURE_IMMUTABLE_LEVELS: GLenum;
    readonly TEXTURE_MAX_LEVEL: GLenum;
    readonly TEXTURE_MAX_LOD: GLenum;
    readonly TEXTURE_MIN_LOD: GLenum;
    readonly TEXTURE_WRAP_R: GLenum;
    readonly TIMEOUT_EXPIRED: GLenum;
    readonly TIMEOUT_IGNORED: GLint64;
    readonly TRANSFORM_FEEDBACK: GLenum;
    readonly TRANSFORM_FEEDBACK_ACTIVE: GLenum;
    readonly TRANSFORM_FEEDBACK_BINDING: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_BINDING: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_MODE: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_SIZE: GLenum;
    readonly TRANSFORM_FEEDBACK_BUFFER_START: GLenum;
    readonly TRANSFORM_FEEDBACK_PAUSED: GLenum;
    readonly TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: GLenum;
    readonly TRANSFORM_FEEDBACK_VARYINGS: GLenum;
    readonly UNIFORM_ARRAY_STRIDE: GLenum;
    readonly UNIFORM_BLOCK_ACTIVE_UNIFORMS: GLenum;
    readonly UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: GLenum;
    readonly UNIFORM_BLOCK_BINDING: GLenum;
    readonly UNIFORM_BLOCK_DATA_SIZE: GLenum;
    readonly UNIFORM_BLOCK_INDEX: GLenum;
    readonly UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: GLenum;
    readonly UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: GLenum;
    readonly UNIFORM_BUFFER: GLenum;
    readonly UNIFORM_BUFFER_BINDING: GLenum;
    readonly UNIFORM_BUFFER_OFFSET_ALIGNMENT: GLenum;
    readonly UNIFORM_BUFFER_SIZE: GLenum;
    readonly UNIFORM_BUFFER_START: GLenum;
    readonly UNIFORM_IS_ROW_MAJOR: GLenum;
    readonly UNIFORM_MATRIX_STRIDE: GLenum;
    readonly UNIFORM_OFFSET: GLenum;
    readonly UNIFORM_SIZE: GLenum;
    readonly UNIFORM_TYPE: GLenum;
    readonly UNPACK_IMAGE_HEIGHT: GLenum;
    readonly UNPACK_ROW_LENGTH: GLenum;
    readonly UNPACK_SKIP_IMAGES: GLenum;
    readonly UNPACK_SKIP_PIXELS: GLenum;
    readonly UNPACK_SKIP_ROWS: GLenum;
    readonly UNSIGNALED: GLenum;
    readonly UNSIGNED_INT_10F_11F_11F_REV: GLenum;
    readonly UNSIGNED_INT_24_8: GLenum;
    readonly UNSIGNED_INT_2_10_10_10_REV: GLenum;
    readonly UNSIGNED_INT_5_9_9_9_REV: GLenum;
    readonly UNSIGNED_INT_SAMPLER_2D: GLenum;
    readonly UNSIGNED_INT_SAMPLER_2D_ARRAY: GLenum;
    readonly UNSIGNED_INT_SAMPLER_3D: GLenum;
    readonly UNSIGNED_INT_SAMPLER_CUBE: GLenum;
    readonly UNSIGNED_INT_VEC2: GLenum;
    readonly UNSIGNED_INT_VEC3: GLenum;
    readonly UNSIGNED_INT_VEC4: GLenum;
    readonly UNSIGNED_NORMALIZED: GLenum;
    readonly VERTEX_ARRAY_BINDING: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_DIVISOR: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_INTEGER: GLenum;
    readonly WAIT_FAILED: GLenum;
}
export interface WebGL2RenderingContextOverloads {
    bufferData(target: GLenum, size: GLsizeiptr, usage: GLenum): void;
    bufferData(target: GLenum, srcData: BufferSource | null, usage: GLenum): void;
    bufferData(target: GLenum, srcData: ArrayBufferView, usage: GLenum, srcOffset: GLuint, length?: GLuint): void;
    bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: BufferSource): void;
    bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: ArrayBufferView, srcOffset: GLuint, length?: GLuint): void;
    compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;
    compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
    compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void;
    compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView | null): void;
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, offset: GLintptr): void;
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView, dstOffset: GLuint): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;
    uniform1fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform1iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
}
/** Part of the WebGL API and represents the information returned by calling the WebGLRenderingContext.getActiveAttrib() and WebGLRenderingContext.getActiveUniform() methods. */
export interface WebGLActiveInfo {
    readonly name: string;
    readonly size: GLint;
    readonly type: GLenum;
}
/** Part of the WebGL API and represents an opaque buffer object storing data such as vertices or colors. */
export interface WebGLBuffer extends WebGLObject {
}
/** The WebContextEvent interface is part of the WebGL API and is an interface for an event that is generated in response to a status change to the WebGL rendering context. */
export interface WebGLContextEvent extends Event {
    readonly statusMessage: string;
}
/** Part of the WebGL API and represents a collection of buffers that serve as a rendering destination. */
export interface WebGLFramebuffer extends WebGLObject {
}
export interface WebGLObject {
}
/** The WebGLProgram is part of the WebGL API and is a combination of two compiled WebGLShaders consisting of a vertex shader and a fragment shader (both written in GLSL). */
export interface WebGLProgram extends WebGLObject {
}
export interface WebGLQuery extends WebGLObject {
}
/** Part of the WebGL API and represents a buffer that can contain an image, or can be source or target of an rendering operation. */
export interface WebGLRenderbuffer extends WebGLObject {
}
/** Provides an interface to the OpenGL ES 2.0 graphics rendering context for the drawing surface of an HTML <canvas> element. */
export interface WebGLRenderingContext extends WebGLRenderingContextBase, WebGLRenderingContextOverloads {
}
export interface WebGLRenderingContextBase {
    readonly canvas: HTMLCanvasElement | OffscreenCanvas;
    readonly drawingBufferHeight: GLsizei;
    readonly drawingBufferWidth: GLsizei;
    activeTexture(texture: GLenum): void;
    attachShader(program: WebGLProgram, shader: WebGLShader): void;
    bindAttribLocation(program: WebGLProgram, index: GLuint, name: string): void;
    bindBuffer(target: GLenum, buffer: WebGLBuffer | null): void;
    bindFramebuffer(target: GLenum, framebuffer: WebGLFramebuffer | null): void;
    bindRenderbuffer(target: GLenum, renderbuffer: WebGLRenderbuffer | null): void;
    bindTexture(target: GLenum, texture: WebGLTexture | null): void;
    blendColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void;
    blendEquation(mode: GLenum): void;
    blendEquationSeparate(modeRGB: GLenum, modeAlpha: GLenum): void;
    blendFunc(sfactor: GLenum, dfactor: GLenum): void;
    blendFuncSeparate(srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void;
    checkFramebufferStatus(target: GLenum): GLenum;
    clear(mask: GLbitfield): void;
    clearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void;
    clearDepth(depth: GLclampf): void;
    clearStencil(s: GLint): void;
    colorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void;
    compileShader(shader: WebGLShader): void;
    copyTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: GLint): void;
    copyTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    createBuffer(): WebGLBuffer | null;
    createFramebuffer(): WebGLFramebuffer | null;
    createProgram(): WebGLProgram | null;
    createRenderbuffer(): WebGLRenderbuffer | null;
    createShader(type: GLenum): WebGLShader | null;
    createTexture(): WebGLTexture | null;
    cullFace(mode: GLenum): void;
    deleteBuffer(buffer: WebGLBuffer | null): void;
    deleteFramebuffer(framebuffer: WebGLFramebuffer | null): void;
    deleteProgram(program: WebGLProgram | null): void;
    deleteRenderbuffer(renderbuffer: WebGLRenderbuffer | null): void;
    deleteShader(shader: WebGLShader | null): void;
    deleteTexture(texture: WebGLTexture | null): void;
    depthFunc(func: GLenum): void;
    depthMask(flag: GLboolean): void;
    depthRange(zNear: GLclampf, zFar: GLclampf): void;
    detachShader(program: WebGLProgram, shader: WebGLShader): void;
    disable(cap: GLenum): void;
    disableVertexAttribArray(index: GLuint): void;
    drawArrays(mode: GLenum, first: GLint, count: GLsizei): void;
    drawElements(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr): void;
    enable(cap: GLenum): void;
    enableVertexAttribArray(index: GLuint): void;
    finish(): void;
    flush(): void;
    framebufferRenderbuffer(target: GLenum, attachment: GLenum, renderbuffertarget: GLenum, renderbuffer: WebGLRenderbuffer | null): void;
    framebufferTexture2D(target: GLenum, attachment: GLenum, textarget: GLenum, texture: WebGLTexture | null, level: GLint): void;
    frontFace(mode: GLenum): void;
    generateMipmap(target: GLenum): void;
    getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
    getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
    getAttachedShaders(program: WebGLProgram): WebGLShader[] | null;
    getAttribLocation(program: WebGLProgram, name: string): GLint;
    getBufferParameter(target: GLenum, pname: GLenum): any;
    getContextAttributes(): WebGLContextAttributes | null;
    getError(): GLenum;
    getExtension(extensionName: "EXT_blend_minmax"): EXT_blend_minmax | null;
    getExtension(extensionName: "EXT_texture_filter_anisotropic"): EXT_texture_filter_anisotropic | null;
    getExtension(extensionName: "EXT_frag_depth"): EXT_frag_depth | null;
    getExtension(extensionName: "EXT_shader_texture_lod"): EXT_shader_texture_lod | null;
    getExtension(extensionName: "EXT_sRGB"): EXT_sRGB | null;
    getExtension(extensionName: "OES_vertex_array_object"): OES_vertex_array_object | null;
    getExtension(extensionName: "WEBGL_color_buffer_float"): WEBGL_color_buffer_float | null;
    getExtension(extensionName: "WEBGL_compressed_texture_astc"): WEBGL_compressed_texture_astc | null;
    getExtension(extensionName: "WEBGL_compressed_texture_s3tc_srgb"): WEBGL_compressed_texture_s3tc_srgb | null;
    getExtension(extensionName: "WEBGL_debug_shaders"): WEBGL_debug_shaders | null;
    getExtension(extensionName: "WEBGL_draw_buffers"): WEBGL_draw_buffers | null;
    getExtension(extensionName: "WEBGL_lose_context"): WEBGL_lose_context | null;
    getExtension(extensionName: "WEBGL_depth_texture"): WEBGL_depth_texture | null;
    getExtension(extensionName: "WEBGL_debug_renderer_info"): WEBGL_debug_renderer_info | null;
    getExtension(extensionName: "WEBGL_compressed_texture_s3tc"): WEBGL_compressed_texture_s3tc | null;
    getExtension(extensionName: "OES_texture_half_float_linear"): OES_texture_half_float_linear | null;
    getExtension(extensionName: "OES_texture_half_float"): OES_texture_half_float | null;
    getExtension(extensionName: "OES_texture_float_linear"): OES_texture_float_linear | null;
    getExtension(extensionName: "OES_texture_float"): OES_texture_float | null;
    getExtension(extensionName: "OES_standard_derivatives"): OES_standard_derivatives | null;
    getExtension(extensionName: "OES_element_index_uint"): OES_element_index_uint | null;
    getExtension(extensionName: "ANGLE_instanced_arrays"): ANGLE_instanced_arrays | null;
    getExtension(extensionName: string): any;
    getFramebufferAttachmentParameter(target: GLenum, attachment: GLenum, pname: GLenum): any;
    getParameter(pname: GLenum): any;
    getProgramInfoLog(program: WebGLProgram): string | null;
    getProgramParameter(program: WebGLProgram, pname: GLenum): any;
    getRenderbufferParameter(target: GLenum, pname: GLenum): any;
    getShaderInfoLog(shader: WebGLShader): string | null;
    getShaderParameter(shader: WebGLShader, pname: GLenum): any;
    getShaderPrecisionFormat(shadertype: GLenum, precisiontype: GLenum): WebGLShaderPrecisionFormat | null;
    getShaderSource(shader: WebGLShader): string | null;
    getSupportedExtensions(): string[] | null;
    getTexParameter(target: GLenum, pname: GLenum): any;
    getUniform(program: WebGLProgram, location: WebGLUniformLocation): any;
    getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null;
    getVertexAttrib(index: GLuint, pname: GLenum): any;
    getVertexAttribOffset(index: GLuint, pname: GLenum): GLintptr;
    hint(target: GLenum, mode: GLenum): void;
    isBuffer(buffer: WebGLBuffer | null): GLboolean;
    isContextLost(): boolean;
    isEnabled(cap: GLenum): GLboolean;
    isFramebuffer(framebuffer: WebGLFramebuffer | null): GLboolean;
    isProgram(program: WebGLProgram | null): GLboolean;
    isRenderbuffer(renderbuffer: WebGLRenderbuffer | null): GLboolean;
    isShader(shader: WebGLShader | null): GLboolean;
    isTexture(texture: WebGLTexture | null): GLboolean;
    lineWidth(width: GLfloat): void;
    linkProgram(program: WebGLProgram): void;
    pixelStorei(pname: GLenum, param: GLint | GLboolean): void;
    polygonOffset(factor: GLfloat, units: GLfloat): void;
    renderbufferStorage(target: GLenum, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
    sampleCoverage(value: GLclampf, invert: GLboolean): void;
    scissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    shaderSource(shader: WebGLShader, source: string): void;
    stencilFunc(func: GLenum, ref: GLint, mask: GLuint): void;
    stencilFuncSeparate(face: GLenum, func: GLenum, ref: GLint, mask: GLuint): void;
    stencilMask(mask: GLuint): void;
    stencilMaskSeparate(face: GLenum, mask: GLuint): void;
    stencilOp(fail: GLenum, zfail: GLenum, zpass: GLenum): void;
    stencilOpSeparate(face: GLenum, fail: GLenum, zfail: GLenum, zpass: GLenum): void;
    texParameterf(target: GLenum, pname: GLenum, param: GLfloat): void;
    texParameteri(target: GLenum, pname: GLenum, param: GLint): void;
    uniform1f(location: WebGLUniformLocation | null, x: GLfloat): void;
    uniform1i(location: WebGLUniformLocation | null, x: GLint): void;
    uniform2f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat): void;
    uniform2i(location: WebGLUniformLocation | null, x: GLint, y: GLint): void;
    uniform3f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat, z: GLfloat): void;
    uniform3i(location: WebGLUniformLocation | null, x: GLint, y: GLint, z: GLint): void;
    uniform4f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void;
    uniform4i(location: WebGLUniformLocation | null, x: GLint, y: GLint, z: GLint, w: GLint): void;
    useProgram(program: WebGLProgram | null): void;
    validateProgram(program: WebGLProgram): void;
    vertexAttrib1f(index: GLuint, x: GLfloat): void;
    vertexAttrib1fv(index: GLuint, values: Float32List): void;
    vertexAttrib2f(index: GLuint, x: GLfloat, y: GLfloat): void;
    vertexAttrib2fv(index: GLuint, values: Float32List): void;
    vertexAttrib3f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat): void;
    vertexAttrib3fv(index: GLuint, values: Float32List): void;
    vertexAttrib4f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void;
    vertexAttrib4fv(index: GLuint, values: Float32List): void;
    vertexAttribPointer(index: GLuint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void;
    viewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    readonly ACTIVE_ATTRIBUTES: GLenum;
    readonly ACTIVE_TEXTURE: GLenum;
    readonly ACTIVE_UNIFORMS: GLenum;
    readonly ALIASED_LINE_WIDTH_RANGE: GLenum;
    readonly ALIASED_POINT_SIZE_RANGE: GLenum;
    readonly ALPHA: GLenum;
    readonly ALPHA_BITS: GLenum;
    readonly ALWAYS: GLenum;
    readonly ARRAY_BUFFER: GLenum;
    readonly ARRAY_BUFFER_BINDING: GLenum;
    readonly ATTACHED_SHADERS: GLenum;
    readonly BACK: GLenum;
    readonly BLEND: GLenum;
    readonly BLEND_COLOR: GLenum;
    readonly BLEND_DST_ALPHA: GLenum;
    readonly BLEND_DST_RGB: GLenum;
    readonly BLEND_EQUATION: GLenum;
    readonly BLEND_EQUATION_ALPHA: GLenum;
    readonly BLEND_EQUATION_RGB: GLenum;
    readonly BLEND_SRC_ALPHA: GLenum;
    readonly BLEND_SRC_RGB: GLenum;
    readonly BLUE_BITS: GLenum;
    readonly BOOL: GLenum;
    readonly BOOL_VEC2: GLenum;
    readonly BOOL_VEC3: GLenum;
    readonly BOOL_VEC4: GLenum;
    readonly BROWSER_DEFAULT_WEBGL: GLenum;
    readonly BUFFER_SIZE: GLenum;
    readonly BUFFER_USAGE: GLenum;
    readonly BYTE: GLenum;
    readonly CCW: GLenum;
    readonly CLAMP_TO_EDGE: GLenum;
    readonly COLOR_ATTACHMENT0: GLenum;
    readonly COLOR_BUFFER_BIT: GLenum;
    readonly COLOR_CLEAR_VALUE: GLenum;
    readonly COLOR_WRITEMASK: GLenum;
    readonly COMPILE_STATUS: GLenum;
    readonly COMPRESSED_TEXTURE_FORMATS: GLenum;
    readonly CONSTANT_ALPHA: GLenum;
    readonly CONSTANT_COLOR: GLenum;
    readonly CONTEXT_LOST_WEBGL: GLenum;
    readonly CULL_FACE: GLenum;
    readonly CULL_FACE_MODE: GLenum;
    readonly CURRENT_PROGRAM: GLenum;
    readonly CURRENT_VERTEX_ATTRIB: GLenum;
    readonly CW: GLenum;
    readonly DECR: GLenum;
    readonly DECR_WRAP: GLenum;
    readonly DELETE_STATUS: GLenum;
    readonly DEPTH_ATTACHMENT: GLenum;
    readonly DEPTH_BITS: GLenum;
    readonly DEPTH_BUFFER_BIT: GLenum;
    readonly DEPTH_CLEAR_VALUE: GLenum;
    readonly DEPTH_COMPONENT: GLenum;
    readonly DEPTH_COMPONENT16: GLenum;
    readonly DEPTH_FUNC: GLenum;
    readonly DEPTH_RANGE: GLenum;
    readonly DEPTH_STENCIL: GLenum;
    readonly DEPTH_STENCIL_ATTACHMENT: GLenum;
    readonly DEPTH_TEST: GLenum;
    readonly DEPTH_WRITEMASK: GLenum;
    readonly DITHER: GLenum;
    readonly DONT_CARE: GLenum;
    readonly DST_ALPHA: GLenum;
    readonly DST_COLOR: GLenum;
    readonly DYNAMIC_DRAW: GLenum;
    readonly ELEMENT_ARRAY_BUFFER: GLenum;
    readonly ELEMENT_ARRAY_BUFFER_BINDING: GLenum;
    readonly EQUAL: GLenum;
    readonly FASTEST: GLenum;
    readonly FLOAT: GLenum;
    readonly FLOAT_MAT2: GLenum;
    readonly FLOAT_MAT3: GLenum;
    readonly FLOAT_MAT4: GLenum;
    readonly FLOAT_VEC2: GLenum;
    readonly FLOAT_VEC3: GLenum;
    readonly FLOAT_VEC4: GLenum;
    readonly FRAGMENT_SHADER: GLenum;
    readonly FRAMEBUFFER: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: GLenum;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: GLenum;
    readonly FRAMEBUFFER_BINDING: GLenum;
    readonly FRAMEBUFFER_COMPLETE: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_ATTACHMENT: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_DIMENSIONS: GLenum;
    readonly FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: GLenum;
    readonly FRAMEBUFFER_UNSUPPORTED: GLenum;
    readonly FRONT: GLenum;
    readonly FRONT_AND_BACK: GLenum;
    readonly FRONT_FACE: GLenum;
    readonly FUNC_ADD: GLenum;
    readonly FUNC_REVERSE_SUBTRACT: GLenum;
    readonly FUNC_SUBTRACT: GLenum;
    readonly GENERATE_MIPMAP_HINT: GLenum;
    readonly GEQUAL: GLenum;
    readonly GREATER: GLenum;
    readonly GREEN_BITS: GLenum;
    readonly HIGH_FLOAT: GLenum;
    readonly HIGH_INT: GLenum;
    readonly IMPLEMENTATION_COLOR_READ_FORMAT: GLenum;
    readonly IMPLEMENTATION_COLOR_READ_TYPE: GLenum;
    readonly INCR: GLenum;
    readonly INCR_WRAP: GLenum;
    readonly INT: GLenum;
    readonly INT_VEC2: GLenum;
    readonly INT_VEC3: GLenum;
    readonly INT_VEC4: GLenum;
    readonly INVALID_ENUM: GLenum;
    readonly INVALID_FRAMEBUFFER_OPERATION: GLenum;
    readonly INVALID_OPERATION: GLenum;
    readonly INVALID_VALUE: GLenum;
    readonly INVERT: GLenum;
    readonly KEEP: GLenum;
    readonly LEQUAL: GLenum;
    readonly LESS: GLenum;
    readonly LINEAR: GLenum;
    readonly LINEAR_MIPMAP_LINEAR: GLenum;
    readonly LINEAR_MIPMAP_NEAREST: GLenum;
    readonly LINES: GLenum;
    readonly LINE_LOOP: GLenum;
    readonly LINE_STRIP: GLenum;
    readonly LINE_WIDTH: GLenum;
    readonly LINK_STATUS: GLenum;
    readonly LOW_FLOAT: GLenum;
    readonly LOW_INT: GLenum;
    readonly LUMINANCE: GLenum;
    readonly LUMINANCE_ALPHA: GLenum;
    readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS: GLenum;
    readonly MAX_CUBE_MAP_TEXTURE_SIZE: GLenum;
    readonly MAX_FRAGMENT_UNIFORM_VECTORS: GLenum;
    readonly MAX_RENDERBUFFER_SIZE: GLenum;
    readonly MAX_TEXTURE_IMAGE_UNITS: GLenum;
    readonly MAX_TEXTURE_SIZE: GLenum;
    readonly MAX_VARYING_VECTORS: GLenum;
    readonly MAX_VERTEX_ATTRIBS: GLenum;
    readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS: GLenum;
    readonly MAX_VERTEX_UNIFORM_VECTORS: GLenum;
    readonly MAX_VIEWPORT_DIMS: GLenum;
    readonly MEDIUM_FLOAT: GLenum;
    readonly MEDIUM_INT: GLenum;
    readonly MIRRORED_REPEAT: GLenum;
    readonly NEAREST: GLenum;
    readonly NEAREST_MIPMAP_LINEAR: GLenum;
    readonly NEAREST_MIPMAP_NEAREST: GLenum;
    readonly NEVER: GLenum;
    readonly NICEST: GLenum;
    readonly NONE: GLenum;
    readonly NOTEQUAL: GLenum;
    readonly NO_ERROR: GLenum;
    readonly ONE: GLenum;
    readonly ONE_MINUS_CONSTANT_ALPHA: GLenum;
    readonly ONE_MINUS_CONSTANT_COLOR: GLenum;
    readonly ONE_MINUS_DST_ALPHA: GLenum;
    readonly ONE_MINUS_DST_COLOR: GLenum;
    readonly ONE_MINUS_SRC_ALPHA: GLenum;
    readonly ONE_MINUS_SRC_COLOR: GLenum;
    readonly OUT_OF_MEMORY: GLenum;
    readonly PACK_ALIGNMENT: GLenum;
    readonly POINTS: GLenum;
    readonly POLYGON_OFFSET_FACTOR: GLenum;
    readonly POLYGON_OFFSET_FILL: GLenum;
    readonly POLYGON_OFFSET_UNITS: GLenum;
    readonly RED_BITS: GLenum;
    readonly RENDERBUFFER: GLenum;
    readonly RENDERBUFFER_ALPHA_SIZE: GLenum;
    readonly RENDERBUFFER_BINDING: GLenum;
    readonly RENDERBUFFER_BLUE_SIZE: GLenum;
    readonly RENDERBUFFER_DEPTH_SIZE: GLenum;
    readonly RENDERBUFFER_GREEN_SIZE: GLenum;
    readonly RENDERBUFFER_HEIGHT: GLenum;
    readonly RENDERBUFFER_INTERNAL_FORMAT: GLenum;
    readonly RENDERBUFFER_RED_SIZE: GLenum;
    readonly RENDERBUFFER_STENCIL_SIZE: GLenum;
    readonly RENDERBUFFER_WIDTH: GLenum;
    readonly RENDERER: GLenum;
    readonly REPEAT: GLenum;
    readonly REPLACE: GLenum;
    readonly RGB: GLenum;
    readonly RGB565: GLenum;
    readonly RGB5_A1: GLenum;
    readonly RGBA: GLenum;
    readonly RGBA4: GLenum;
    readonly SAMPLER_2D: GLenum;
    readonly SAMPLER_CUBE: GLenum;
    readonly SAMPLES: GLenum;
    readonly SAMPLE_ALPHA_TO_COVERAGE: GLenum;
    readonly SAMPLE_BUFFERS: GLenum;
    readonly SAMPLE_COVERAGE: GLenum;
    readonly SAMPLE_COVERAGE_INVERT: GLenum;
    readonly SAMPLE_COVERAGE_VALUE: GLenum;
    readonly SCISSOR_BOX: GLenum;
    readonly SCISSOR_TEST: GLenum;
    readonly SHADER_TYPE: GLenum;
    readonly SHADING_LANGUAGE_VERSION: GLenum;
    readonly SHORT: GLenum;
    readonly SRC_ALPHA: GLenum;
    readonly SRC_ALPHA_SATURATE: GLenum;
    readonly SRC_COLOR: GLenum;
    readonly STATIC_DRAW: GLenum;
    readonly STENCIL_ATTACHMENT: GLenum;
    readonly STENCIL_BACK_FAIL: GLenum;
    readonly STENCIL_BACK_FUNC: GLenum;
    readonly STENCIL_BACK_PASS_DEPTH_FAIL: GLenum;
    readonly STENCIL_BACK_PASS_DEPTH_PASS: GLenum;
    readonly STENCIL_BACK_REF: GLenum;
    readonly STENCIL_BACK_VALUE_MASK: GLenum;
    readonly STENCIL_BACK_WRITEMASK: GLenum;
    readonly STENCIL_BITS: GLenum;
    readonly STENCIL_BUFFER_BIT: GLenum;
    readonly STENCIL_CLEAR_VALUE: GLenum;
    readonly STENCIL_FAIL: GLenum;
    readonly STENCIL_FUNC: GLenum;
    readonly STENCIL_INDEX8: GLenum;
    readonly STENCIL_PASS_DEPTH_FAIL: GLenum;
    readonly STENCIL_PASS_DEPTH_PASS: GLenum;
    readonly STENCIL_REF: GLenum;
    readonly STENCIL_TEST: GLenum;
    readonly STENCIL_VALUE_MASK: GLenum;
    readonly STENCIL_WRITEMASK: GLenum;
    readonly STREAM_DRAW: GLenum;
    readonly SUBPIXEL_BITS: GLenum;
    readonly TEXTURE: GLenum;
    readonly TEXTURE0: GLenum;
    readonly TEXTURE1: GLenum;
    readonly TEXTURE10: GLenum;
    readonly TEXTURE11: GLenum;
    readonly TEXTURE12: GLenum;
    readonly TEXTURE13: GLenum;
    readonly TEXTURE14: GLenum;
    readonly TEXTURE15: GLenum;
    readonly TEXTURE16: GLenum;
    readonly TEXTURE17: GLenum;
    readonly TEXTURE18: GLenum;
    readonly TEXTURE19: GLenum;
    readonly TEXTURE2: GLenum;
    readonly TEXTURE20: GLenum;
    readonly TEXTURE21: GLenum;
    readonly TEXTURE22: GLenum;
    readonly TEXTURE23: GLenum;
    readonly TEXTURE24: GLenum;
    readonly TEXTURE25: GLenum;
    readonly TEXTURE26: GLenum;
    readonly TEXTURE27: GLenum;
    readonly TEXTURE28: GLenum;
    readonly TEXTURE29: GLenum;
    readonly TEXTURE3: GLenum;
    readonly TEXTURE30: GLenum;
    readonly TEXTURE31: GLenum;
    readonly TEXTURE4: GLenum;
    readonly TEXTURE5: GLenum;
    readonly TEXTURE6: GLenum;
    readonly TEXTURE7: GLenum;
    readonly TEXTURE8: GLenum;
    readonly TEXTURE9: GLenum;
    readonly TEXTURE_2D: GLenum;
    readonly TEXTURE_BINDING_2D: GLenum;
    readonly TEXTURE_BINDING_CUBE_MAP: GLenum;
    readonly TEXTURE_CUBE_MAP: GLenum;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_X: GLenum;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_Y: GLenum;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_Z: GLenum;
    readonly TEXTURE_CUBE_MAP_POSITIVE_X: GLenum;
    readonly TEXTURE_CUBE_MAP_POSITIVE_Y: GLenum;
    readonly TEXTURE_CUBE_MAP_POSITIVE_Z: GLenum;
    readonly TEXTURE_MAG_FILTER: GLenum;
    readonly TEXTURE_MIN_FILTER: GLenum;
    readonly TEXTURE_WRAP_S: GLenum;
    readonly TEXTURE_WRAP_T: GLenum;
    readonly TRIANGLES: GLenum;
    readonly TRIANGLE_FAN: GLenum;
    readonly TRIANGLE_STRIP: GLenum;
    readonly UNPACK_ALIGNMENT: GLenum;
    readonly UNPACK_COLORSPACE_CONVERSION_WEBGL: GLenum;
    readonly UNPACK_FLIP_Y_WEBGL: GLenum;
    readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL: GLenum;
    readonly UNSIGNED_BYTE: GLenum;
    readonly UNSIGNED_INT: GLenum;
    readonly UNSIGNED_SHORT: GLenum;
    readonly UNSIGNED_SHORT_4_4_4_4: GLenum;
    readonly UNSIGNED_SHORT_5_5_5_1: GLenum;
    readonly UNSIGNED_SHORT_5_6_5: GLenum;
    readonly VALIDATE_STATUS: GLenum;
    readonly VENDOR: GLenum;
    readonly VERSION: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_ENABLED: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_NORMALIZED: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_POINTER: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_SIZE: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_STRIDE: GLenum;
    readonly VERTEX_ATTRIB_ARRAY_TYPE: GLenum;
    readonly VERTEX_SHADER: GLenum;
    readonly VIEWPORT: GLenum;
    readonly ZERO: GLenum;
}
export interface WebGLRenderingContextOverloads {
    bufferData(target: GLenum, size: GLsizeiptr, usage: GLenum): void;
    bufferData(target: GLenum, data: BufferSource | null, usage: GLenum): void;
    bufferSubData(target: GLenum, offset: GLintptr, data: BufferSource): void;
    compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, data: ArrayBufferView): void;
    compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, data: ArrayBufferView): void;
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    uniform1fv(location: WebGLUniformLocation | null, v: Float32List): void;
    uniform1iv(location: WebGLUniformLocation | null, v: Int32List): void;
    uniform2fv(location: WebGLUniformLocation | null, v: Float32List): void;
    uniform2iv(location: WebGLUniformLocation | null, v: Int32List): void;
    uniform3fv(location: WebGLUniformLocation | null, v: Float32List): void;
    uniform3iv(location: WebGLUniformLocation | null, v: Int32List): void;
    uniform4fv(location: WebGLUniformLocation | null, v: Float32List): void;
    uniform4iv(location: WebGLUniformLocation | null, v: Int32List): void;
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Float32List): void;
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Float32List): void;
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Float32List): void;
}
export interface WebGLSampler extends WebGLObject {
}
/** The WebGLShader is part of the WebGL API and can either be a vertex or a fragment shader. A WebGLProgram requires both types of shaders. */
export interface WebGLShader extends WebGLObject {
}
/** Part of the WebGL API and represents the information returned by calling the WebGLRenderingContext.getShaderPrecisionFormat() method. */
export interface WebGLShaderPrecisionFormat {
    readonly precision: GLint;
    readonly rangeMax: GLint;
    readonly rangeMin: GLint;
}
export interface WebGLSync extends WebGLObject {
}
/** Part of the WebGL API and represents an opaque texture object providing storage and state for texturing operations. */
export interface WebGLTexture extends WebGLObject {
}
export interface WebGLTransformFeedback extends WebGLObject {
}
/** Part of the WebGL API and represents the location of a uniform variable in a shader program. */
export interface WebGLUniformLocation {
}
export interface WebGLVertexArrayObject extends WebGLObject {
}
export interface WebGLVertexArrayObjectOES extends WebGLObject {
}
export interface WebKitPoint {
    x: number;
    y: number;
}
export interface WebSocketEventMap {
    "close": CloseEvent;
    "error": Event;
    "message": MessageEvent;
    "open": Event;
}
/** Provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection. */
export interface WebSocket extends EventTarget {
    /**
     * Returns a string that indicates how binary data from the WebSocket object is exposed to scripts:
     *
     * Can be set, to change how binary data is returned. The default is "blob".
     */
    binaryType: BinaryType;
    /**
     * Returns the number of bytes of application data (UTF-8 text and binary data) that have been queued using send() but not yet been transmitted to the network.
     *
     * If the WebSocket connection is closed, this attribute's value will only increase with each call to the send() method. (The number does not reset to zero once the connection closes.)
     */
    readonly bufferedAmount: number;
    /**
     * Returns the extensions selected by the server, if any.
     */
    readonly extensions: string;
    onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
    onerror: ((this: WebSocket, ev: Event) => any) | null;
    onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
    onopen: ((this: WebSocket, ev: Event) => any) | null;
    /**
     * Returns the subprotocol selected by the server, if any. It can be used in conjunction with the array form of the constructor's second argument to perform subprotocol negotiation.
     */
    readonly protocol: string;
    /**
     * Returns the state of the WebSocket object's connection. It can have the values described below.
     */
    readonly readyState: number;
    /**
     * Returns the URL that was used to establish the WebSocket connection.
     */
    readonly url: string;
    /**
     * Closes the WebSocket connection, optionally using code as the the WebSocket connection close code and reason as the the WebSocket connection close reason.
     */
    close(code?: number, reason?: string): void;
    /**
     * Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView.
     */
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Events that occur due to the user moving a mouse wheel or similar input device. */
export interface WheelEvent extends MouseEvent {
    readonly deltaMode: number;
    readonly deltaX: number;
    readonly deltaY: number;
    readonly deltaZ: number;
    readonly DOM_DELTA_LINE: number;
    readonly DOM_DELTA_PAGE: number;
    readonly DOM_DELTA_PIXEL: number;
}
export interface WindowEventMap extends GlobalEventHandlersEventMap, WindowEventHandlersEventMap {
    "abort": UIEvent;
    "afterprint": Event;
    "beforeprint": Event;
    "beforeunload": BeforeUnloadEvent;
    "blur": FocusEvent;
    "canplay": Event;
    "canplaythrough": Event;
    "change": Event;
    "click": MouseEvent;
    "compassneedscalibration": Event;
    "contextmenu": MouseEvent;
    "dblclick": MouseEvent;
    "devicelight": DeviceLightEvent;
    "devicemotion": DeviceMotionEvent;
    "deviceorientation": DeviceOrientationEvent;
    "deviceorientationabsolute": DeviceOrientationEvent;
    "drag": DragEvent;
    "dragend": DragEvent;
    "dragenter": DragEvent;
    "dragleave": DragEvent;
    "dragover": DragEvent;
    "dragstart": DragEvent;
    "drop": DragEvent;
    "durationchange": Event;
    "emptied": Event;
    "ended": Event;
    "error": ErrorEvent;
    "focus": FocusEvent;
    "hashchange": HashChangeEvent;
    "input": Event;
    "invalid": Event;
    "keydown": KeyboardEvent;
    "keypress": KeyboardEvent;
    "keyup": KeyboardEvent;
    "load": Event;
    "loadeddata": Event;
    "loadedmetadata": Event;
    "loadstart": Event;
    "message": MessageEvent;
    "mousedown": MouseEvent;
    "mouseenter": MouseEvent;
    "mouseleave": MouseEvent;
    "mousemove": MouseEvent;
    "mouseout": MouseEvent;
    "mouseover": MouseEvent;
    "mouseup": MouseEvent;
    "mousewheel": Event;
    "MSGestureChange": Event;
    "MSGestureDoubleTap": Event;
    "MSGestureEnd": Event;
    "MSGestureHold": Event;
    "MSGestureStart": Event;
    "MSGestureTap": Event;
    "MSInertiaStart": Event;
    "MSPointerCancel": Event;
    "MSPointerDown": Event;
    "MSPointerEnter": Event;
    "MSPointerLeave": Event;
    "MSPointerMove": Event;
    "MSPointerOut": Event;
    "MSPointerOver": Event;
    "MSPointerUp": Event;
    "offline": Event;
    "online": Event;
    "orientationchange": Event;
    "pagehide": PageTransitionEvent;
    "pageshow": PageTransitionEvent;
    "pause": Event;
    "play": Event;
    "playing": Event;
    "popstate": PopStateEvent;
    "progress": ProgressEvent<Window>;
    "ratechange": Event;
    "readystatechange": ProgressEvent<Window>;
    "reset": Event;
    "resize": UIEvent;
    "scroll": Event;
    "seeked": Event;
    "seeking": Event;
    "select": Event;
    "stalled": Event;
    "storage": StorageEvent;
    "submit": Event;
    "suspend": Event;
    "timeupdate": Event;
    "unload": Event;
    "volumechange": Event;
    "vrdisplayactivate": Event;
    "vrdisplayblur": Event;
    "vrdisplayconnect": Event;
    "vrdisplaydeactivate": Event;
    "vrdisplaydisconnect": Event;
    "vrdisplayfocus": Event;
    "vrdisplaypointerrestricted": Event;
    "vrdisplaypointerunrestricted": Event;
    "vrdisplaypresentchange": Event;
    "waiting": Event;
}
/** A window containing a DOM document; the document property points to the DOM document loaded in that window. */
export interface Window extends EventTarget, AnimationFrameProvider, GlobalEventHandlers, WindowConsole, WindowEventHandlers, WindowLocalStorage, WindowOrWorkerGlobalScope, WindowSessionStorage {
    readonly applicationCache: ApplicationCache;
    readonly clientInformation: Navigator;
    readonly closed: boolean;
    customElements: CustomElementRegistry;
    defaultStatus: string;
    readonly devicePixelRatio: number;
    readonly doNotTrack: string;
    readonly document: Document;
    /** @deprecated */
    readonly event: Event | undefined;
    /** @deprecated */
    readonly external: External;
    readonly frameElement: Element;
    readonly frames: Window;
    readonly history: History;
    readonly innerHeight: number;
    readonly innerWidth: number;
    readonly isSecureContext: boolean;
    readonly length: number;
    location: Location;
    readonly locationbar: BarProp;
    readonly menubar: BarProp;
    readonly msContentScript: ExtensionScriptApis;
    name: string;
    readonly navigator: Navigator;
    offscreenBuffering: string | boolean;
    oncompassneedscalibration: ((this: Window, ev: Event) => any) | null;
    ondevicelight: ((this: Window, ev: DeviceLightEvent) => any) | null;
    ondevicemotion: ((this: Window, ev: DeviceMotionEvent) => any) | null;
    ondeviceorientation: ((this: Window, ev: DeviceOrientationEvent) => any) | null;
    ondeviceorientationabsolute: ((this: Window, ev: DeviceOrientationEvent) => any) | null;
    onmousewheel: ((this: Window, ev: Event) => any) | null;
    onmsgesturechange: ((this: Window, ev: Event) => any) | null;
    onmsgesturedoubletap: ((this: Window, ev: Event) => any) | null;
    onmsgestureend: ((this: Window, ev: Event) => any) | null;
    onmsgesturehold: ((this: Window, ev: Event) => any) | null;
    onmsgesturestart: ((this: Window, ev: Event) => any) | null;
    onmsgesturetap: ((this: Window, ev: Event) => any) | null;
    onmsinertiastart: ((this: Window, ev: Event) => any) | null;
    onmspointercancel: ((this: Window, ev: Event) => any) | null;
    onmspointerdown: ((this: Window, ev: Event) => any) | null;
    onmspointerenter: ((this: Window, ev: Event) => any) | null;
    onmspointerleave: ((this: Window, ev: Event) => any) | null;
    onmspointermove: ((this: Window, ev: Event) => any) | null;
    onmspointerout: ((this: Window, ev: Event) => any) | null;
    onmspointerover: ((this: Window, ev: Event) => any) | null;
    onmspointerup: ((this: Window, ev: Event) => any) | null;
    /** @deprecated */
    onorientationchange: ((this: Window, ev: Event) => any) | null;
    onreadystatechange: ((this: Window, ev: ProgressEvent<Window>) => any) | null;
    onvrdisplayactivate: ((this: Window, ev: Event) => any) | null;
    onvrdisplayblur: ((this: Window, ev: Event) => any) | null;
    onvrdisplayconnect: ((this: Window, ev: Event) => any) | null;
    onvrdisplaydeactivate: ((this: Window, ev: Event) => any) | null;
    onvrdisplaydisconnect: ((this: Window, ev: Event) => any) | null;
    onvrdisplayfocus: ((this: Window, ev: Event) => any) | null;
    onvrdisplaypointerrestricted: ((this: Window, ev: Event) => any) | null;
    onvrdisplaypointerunrestricted: ((this: Window, ev: Event) => any) | null;
    onvrdisplaypresentchange: ((this: Window, ev: Event) => any) | null;
    opener: any;
    /** @deprecated */
    readonly orientation: string | number;
    readonly outerHeight: number;
    readonly outerWidth: number;
    readonly pageXOffset: number;
    readonly pageYOffset: number;
    readonly parent: Window;
    readonly personalbar: BarProp;
    readonly screen: Screen;
    readonly screenLeft: number;
    readonly screenTop: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly scrollX: number;
    readonly scrollY: number;
    readonly scrollbars: BarProp;
    readonly self: Window & typeof globalThis;
    readonly speechSynthesis: SpeechSynthesis;
    status: string;
    readonly statusbar: BarProp;
    readonly styleMedia: StyleMedia;
    readonly toolbar: BarProp;
    readonly top: Window;
    readonly window: Window & typeof globalThis;
    alert(message?: any): void;
    blur(): void;
    /** @deprecated */
    captureEvents(): void;
    close(): void;
    confirm(message?: string): boolean;
    departFocus(navigationReason: NavigationReason, origin: FocusNavigationOrigin): void;
    focus(): void;
    getComputedStyle(elt: Element, pseudoElt?: string | null): CSSStyleDeclaration;
    getMatchedCSSRules(elt: Element, pseudoElt?: string | null): CSSRuleList;
    getSelection(): Selection | null;
    matchMedia(query: string): MediaQueryList;
    moveBy(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    msWriteProfilerMark(profilerMarkName: string): void;
    open(url?: string, target?: string, features?: string, replace?: boolean): Window | null;
    postMessage(message: any, targetOrigin: string, transfer?: Transferable[]): void;
    print(): void;
    prompt(message?: string, _default?: string): string | null;
    /** @deprecated */
    releaseEvents(): void;
    resizeBy(x: number, y: number): void;
    resizeTo(x: number, y: number): void;
    scroll(options?: ScrollToOptions): void;
    scroll(x: number, y: number): void;
    scrollBy(options?: ScrollToOptions): void;
    scrollBy(x: number, y: number): void;
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
    stop(): void;
    webkitCancelAnimationFrame(handle: number): void;
    webkitConvertPointFromNodeToPage(node: Node, pt: WebKitPoint): WebKitPoint;
    webkitConvertPointFromPageToNode(node: Node, pt: WebKitPoint): WebKitPoint;
    webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
    addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    [index: number]: Window;
}
export interface WindowConsole {
    readonly console: Console;
}
export interface WindowEventHandlersEventMap {
    "afterprint": Event;
    "beforeprint": Event;
    "beforeunload": BeforeUnloadEvent;
    "hashchange": HashChangeEvent;
    "languagechange": Event;
    "message": MessageEvent;
    "messageerror": MessageEvent;
    "offline": Event;
    "online": Event;
    "pagehide": PageTransitionEvent;
    "pageshow": PageTransitionEvent;
    "popstate": PopStateEvent;
    "rejectionhandled": PromiseRejectionEvent;
    "storage": StorageEvent;
    "unhandledrejection": PromiseRejectionEvent;
    "unload": Event;
}
export interface WindowEventHandlers {
    onafterprint: ((this: WindowEventHandlers, ev: Event) => any) | null;
    onbeforeprint: ((this: WindowEventHandlers, ev: Event) => any) | null;
    onbeforeunload: ((this: WindowEventHandlers, ev: BeforeUnloadEvent) => any) | null;
    onhashchange: ((this: WindowEventHandlers, ev: HashChangeEvent) => any) | null;
    onlanguagechange: ((this: WindowEventHandlers, ev: Event) => any) | null;
    onmessage: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null;
    onoffline: ((this: WindowEventHandlers, ev: Event) => any) | null;
    ononline: ((this: WindowEventHandlers, ev: Event) => any) | null;
    onpagehide: ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null;
    onpageshow: ((this: WindowEventHandlers, ev: PageTransitionEvent) => any) | null;
    onpopstate: ((this: WindowEventHandlers, ev: PopStateEvent) => any) | null;
    onrejectionhandled: ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null;
    onstorage: ((this: WindowEventHandlers, ev: StorageEvent) => any) | null;
    onunhandledrejection: ((this: WindowEventHandlers, ev: PromiseRejectionEvent) => any) | null;
    onunload: ((this: WindowEventHandlers, ev: Event) => any) | null;
    addEventListener<K extends keyof WindowEventHandlersEventMap>(type: K, listener: (this: WindowEventHandlers, ev: WindowEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WindowEventHandlersEventMap>(type: K, listener: (this: WindowEventHandlers, ev: WindowEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface WindowLocalStorage {
    readonly localStorage: Storage;
}
export interface WindowOrWorkerGlobalScope {
    readonly caches: CacheStorage;
    readonly crypto: Crypto;
    readonly indexedDB: IDBFactory;
    readonly origin: string;
    readonly performance: Performance;
    atob(data: string): string;
    btoa(data: string): string;
    clearInterval(handle?: number): void;
    clearTimeout(handle?: number): void;
    createImageBitmap(image: ImageBitmapSource): Promise<ImageBitmap>;
    createImageBitmap(image: ImageBitmapSource, sx: number, sy: number, sw: number, sh: number): Promise<ImageBitmap>;
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
    queueMicrotask(callback: VoidFunction): void;
    setInterval(handler: TimerHandler, timeout?: number, ...args: any[]): number;
    setTimeout(handler: TimerHandler, timeout?: number, ...args: any[]): number;
}
export interface WindowSessionStorage {
    readonly sessionStorage: Storage;
}
export interface WorkerEventMap extends AbstractWorkerEventMap {
    "message": MessageEvent;
}
/** This Web Workers API interface represents a background task that can be easily created and can send messages back to its creator. Creating a worker is as simple as calling the Worker() constructor and specifying a script to be run in the worker thread. */
export interface Worker extends EventTarget, AbstractWorker {
    onmessage: ((this: Worker, ev: MessageEvent) => any) | null;
    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: PostMessageOptions): void;
    terminate(): void;
    addEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface Worklet {
    addModule(moduleURL: string, options?: WorkletOptions): Promise<void>;
}
/** This Streams API interface provides a standard abstraction for writing streaming data to a destination, known as a sink. This object comes with built-in backpressure and queuing. */
export interface WritableStream<W = any> {
    readonly locked: boolean;
    abort(reason?: any): Promise<void>;
    getWriter(): WritableStreamDefaultWriter<W>;
}
/** This Streams API interface represents a controller allowing control of a WritableStream's state. When constructing a WritableStream, the underlying sink is given a corresponding WritableStreamDefaultController instance to manipulate. */
export interface WritableStreamDefaultController {
    error(error?: any): void;
}
/** This Streams API interface is the object returned by WritableStream.getWriter() and once created locks the < writer to the WritableStream ensuring that no other streams can write to the underlying sink. */
export interface WritableStreamDefaultWriter<W = any> {
    readonly closed: Promise<void>;
    readonly desiredSize: number | null;
    readonly ready: Promise<void>;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk: W): Promise<void>;
}
/** An XML document. It inherits from the generic Document and does not add any specific methods or properties to it: nevertheless, several algorithms behave differently with the two types of documents. */
export interface XMLDocument extends Document {
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: XMLDocument, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: XMLDocument, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface XMLHttpRequestEventMap extends XMLHttpRequestEventTargetEventMap {
    "readystatechange": Event;
}
/** Use XMLHttpRequest (XHR) objects to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing. */
export interface XMLHttpRequest extends XMLHttpRequestEventTarget {
    onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null;
    /**
     * Returns client's state.
     */
    readonly readyState: number;
    /**
     * Returns the response's body.
     */
    readonly response: any;
    /**
     * Returns the text response.
     *
     * Throws an "InvalidStateError" DOMException if responseType is not the empty string or "text".
     */
    readonly responseText: string;
    /**
     * Returns the response type.
     *
     * Can be set to change the response type. Values are: the empty string (default), "arraybuffer", "blob", "document", "json", and "text".
     *
     * When set: setting to "document" is ignored if current global object is not a Window object.
     *
     * When set: throws an "InvalidStateError" DOMException if state is loading or done.
     *
     * When set: throws an "InvalidAccessError" DOMException if the synchronous flag is set and current global object is a Window object.
     */
    responseType: XMLHttpRequestResponseType;
    readonly responseURL: string;
    /**
     * Returns the document response.
     *
     * Throws an "InvalidStateError" DOMException if responseType is not the empty string or "document".
     */
    readonly responseXML: Document | null;
    readonly status: number;
    readonly statusText: string;
    /**
     * Can be set to a time in milliseconds. When set to a non-zero value will cause fetching to terminate after the given time has passed. When the time has passed, the request has not yet completed, and the synchronous flag is unset, a timeout event will then be dispatched, or a "TimeoutError" DOMException will be thrown otherwise (for the send() method).
     *
     * When set: throws an "InvalidAccessError" DOMException if the synchronous flag is set and current global object is a Window object.
     */
    timeout: number;
    /**
     * Returns the associated XMLHttpRequestUpload object. It can be used to gather transmission information when data is transferred to a server.
     */
    readonly upload: XMLHttpRequestUpload;
    /**
     * True when credentials are to be included in a cross-origin request. False when they are to be excluded in a cross-origin request and when cookies are to be ignored in its response. Initially false.
     *
     * When set: throws an "InvalidStateError" DOMException if state is not unsent or opened, or if the send() flag is set.
     */
    withCredentials: boolean;
    /**
     * Cancels any network activity.
     */
    abort(): void;
    getAllResponseHeaders(): string;
    getResponseHeader(name: string): string | null;
    /**
     * Sets the request method, request URL, and synchronous flag.
     *
     * Throws a "SyntaxError" DOMException if either method is not a valid HTTP method or url cannot be parsed.
     *
     * Throws a "SecurityError" DOMException if method is a case-insensitive match for `CONNECT`, `TRACE`, or `TRACK`.
     *
     * Throws an "InvalidAccessError" DOMException if async is false, current global object is a Window object, and the timeout attribute is not zero or the responseType attribute is not the empty string.
     */
    open(method: string, url: string): void;
    open(method: string, url: string, async: boolean, username?: string | null, password?: string | null): void;
    /**
     * Acts as if the `Content-Type` header value for response is mime. (It does not actually change the header though.)
     *
     * Throws an "InvalidStateError" DOMException if state is loading or done.
     */
    overrideMimeType(mime: string): void;
    /**
     * Initiates the request. The body argument provides the request body, if any, and is ignored if the request method is GET or HEAD.
     *
     * Throws an "InvalidStateError" DOMException if either state is not opened or the send() flag is set.
     */
    send(body?: Document | BodyInit | null): void;
    /**
     * Combines a header in author request headers.
     *
     * Throws an "InvalidStateError" DOMException if either state is not opened or the send() flag is set.
     *
     * Throws a "SyntaxError" DOMException if name is not a header name or if value is not a header value.
     */
    setRequestHeader(name: string, value: string): void;
    readonly DONE: number;
    readonly HEADERS_RECEIVED: number;
    readonly LOADING: number;
    readonly OPENED: number;
    readonly UNSENT: number;
    addEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface XMLHttpRequestEventTargetEventMap {
    "abort": ProgressEvent<XMLHttpRequestEventTarget>;
    "error": ProgressEvent<XMLHttpRequestEventTarget>;
    "load": ProgressEvent<XMLHttpRequestEventTarget>;
    "loadend": ProgressEvent<XMLHttpRequestEventTarget>;
    "loadstart": ProgressEvent<XMLHttpRequestEventTarget>;
    "progress": ProgressEvent<XMLHttpRequestEventTarget>;
    "timeout": ProgressEvent<XMLHttpRequestEventTarget>;
}
export interface XMLHttpRequestEventTarget extends EventTarget {
    onabort: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onerror: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onload: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onloadend: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onloadstart: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    onprogress: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    ontimeout: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
    addEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestEventTarget, ev: XMLHttpRequestEventTargetEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestEventTarget, ev: XMLHttpRequestEventTargetEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export interface XMLHttpRequestUpload extends XMLHttpRequestEventTarget {
    addEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestUpload, ev: XMLHttpRequestEventTargetEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestUpload, ev: XMLHttpRequestEventTargetEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/** Provides the serializeToString() method to construct an XML string representing a DOM tree. */
export interface XMLSerializer {
    serializeToString(root: Node): string;
}
/** The XPathEvaluator interface allows to compile and evaluate XPath expressions. */
export interface XPathEvaluator extends XPathEvaluatorBase {
}
export interface XPathEvaluatorBase {
    createExpression(expression: string, resolver?: XPathNSResolver | null): XPathExpression;
    createNSResolver(nodeResolver: Node): XPathNSResolver;
    evaluate(expression: string, contextNode: Node, resolver?: XPathNSResolver | null, type?: number, result?: XPathResult | null): XPathResult;
}
/** This interface is a compiled XPath expression that can be evaluated on a document or specific node to return information its DOM tree. */
export interface XPathExpression {
    evaluate(contextNode: Node, type?: number, result?: XPathResult | null): XPathResult;
}
/** The results generated by evaluating an XPath expression within the context of a given node. */
export interface XPathResult {
    readonly booleanValue: boolean;
    readonly invalidIteratorState: boolean;
    readonly numberValue: number;
    readonly resultType: number;
    readonly singleNodeValue: Node | null;
    readonly snapshotLength: number;
    readonly stringValue: string;
    iterateNext(): Node | null;
    snapshotItem(index: number): Node | null;
    readonly ANY_TYPE: number;
    readonly ANY_UNORDERED_NODE_TYPE: number;
    readonly BOOLEAN_TYPE: number;
    readonly FIRST_ORDERED_NODE_TYPE: number;
    readonly NUMBER_TYPE: number;
    readonly ORDERED_NODE_ITERATOR_TYPE: number;
    readonly ORDERED_NODE_SNAPSHOT_TYPE: number;
    readonly STRING_TYPE: number;
    readonly UNORDERED_NODE_ITERATOR_TYPE: number;
    readonly UNORDERED_NODE_SNAPSHOT_TYPE: number;
}
/** An XSLTProcessor applies an XSLT stylesheet transformation to an XML document to produce a new XML document as output. It has methods to load the XSLT stylesheet, to manipulate <xsl:param> parameter values, and to apply the transformation to documents. */
export interface XSLTProcessor {
    clearParameters(): void;
    getParameter(namespaceURI: string, localName: string): any;
    importStylesheet(style: Node): void;
    removeParameter(namespaceURI: string, localName: string): void;
    reset(): void;
    setParameter(namespaceURI: string, localName: string, value: any): void;
    transformToDocument(source: Node): Document;
    transformToFragment(source: Node, document: Document): DocumentFragment;
}
export interface webkitRTCPeerConnection extends RTCPeerConnection {
    addEventListener<K extends keyof RTCPeerConnectionEventMap>(type: K, listener: (this: webkitRTCPeerConnection, ev: RTCPeerConnectionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof RTCPeerConnectionEventMap>(type: K, listener: (this: webkitRTCPeerConnection, ev: RTCPeerConnectionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export declare type EventListenerOrEventListenerObject = EventListener | EventListenerObject;
export interface BlobCallback {
    (blob: Blob | null): void;
}
export interface CustomElementConstructor {
    new (): HTMLElement;
}
export interface DecodeErrorCallback {
    (error: DOMException): void;
}
export interface DecodeSuccessCallback {
    (decodedData: AudioBuffer): void;
}
export interface EventHandlerNonNull {
    (event: Event): any;
}
export interface ForEachCallback {
    (keyId: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | null, status: MediaKeyStatus): void;
}
export interface FrameRequestCallback {
    (time: number): void;
}
export interface FunctionStringCallback {
    (data: string): void;
}
export interface IntersectionObserverCallback {
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}
export interface MSLaunchUriCallback {
    (): void;
}
export interface MutationCallback {
    (mutations: MutationRecord[], observer: MutationObserver): void;
}
export interface NavigatorUserMediaErrorCallback {
    (error: MediaStreamError): void;
}
export interface NavigatorUserMediaSuccessCallback {
    (stream: MediaStream): void;
}
export interface NotificationPermissionCallback {
    (permission: NotificationPermission): void;
}
export interface OnBeforeUnloadEventHandlerNonNull {
    (event: Event): string | null;
}
export interface OnErrorEventHandlerNonNull {
    (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error): any;
}
export interface PerformanceObserverCallback {
    (entries: PerformanceObserverEntryList, observer: PerformanceObserver): void;
}
export interface PositionCallback {
    (position: Position): void;
}
export interface PositionErrorCallback {
    (positionError: PositionError): void;
}
export interface QueuingStrategySizeCallback<T = any> {
    (chunk: T): number;
}
export interface RTCPeerConnectionErrorCallback {
    (error: DOMException): void;
}
export interface RTCSessionDescriptionCallback {
    (description: RTCSessionDescriptionInit): void;
}
export interface RTCStatsCallback {
    (report: RTCStatsReport): void;
}
export interface ReadableByteStreamControllerCallback {
    (controller: ReadableByteStreamController): void | PromiseLike<void>;
}
export interface ReadableStreamDefaultControllerCallback<R> {
    (controller: ReadableStreamDefaultController<R>): void | PromiseLike<void>;
}
export interface ReadableStreamErrorCallback {
    (reason: any): void | PromiseLike<void>;
}
export interface TransformStreamDefaultControllerCallback<O> {
    (controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}
export interface TransformStreamDefaultControllerTransformCallback<I, O> {
    (chunk: I, controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}
export interface VoidFunction {
    (): void;
}
export interface WritableStreamDefaultControllerCloseCallback {
    (): void | PromiseLike<void>;
}
export interface WritableStreamDefaultControllerStartCallback {
    (controller: WritableStreamDefaultController): void | PromiseLike<void>;
}
export interface WritableStreamDefaultControllerWriteCallback<W> {
    (chunk: W, controller: WritableStreamDefaultController): void | PromiseLike<void>;
}
export interface WritableStreamErrorCallback {
    (reason: any): void | PromiseLike<void>;
}
export interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "basefont": HTMLBaseFontElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}
export interface HTMLElementDeprecatedTagNameMap {
    "listing": HTMLPreElement;
    "xmp": HTMLPreElement;
}
export interface SVGElementTagNameMap {
    "a": SVGAElement;
    "circle": SVGCircleElement;
    "clipPath": SVGClipPathElement;
    "defs": SVGDefsElement;
    "desc": SVGDescElement;
    "ellipse": SVGEllipseElement;
    "feBlend": SVGFEBlendElement;
    "feColorMatrix": SVGFEColorMatrixElement;
    "feComponentTransfer": SVGFEComponentTransferElement;
    "feComposite": SVGFECompositeElement;
    "feConvolveMatrix": SVGFEConvolveMatrixElement;
    "feDiffuseLighting": SVGFEDiffuseLightingElement;
    "feDisplacementMap": SVGFEDisplacementMapElement;
    "feDistantLight": SVGFEDistantLightElement;
    "feFlood": SVGFEFloodElement;
    "feFuncA": SVGFEFuncAElement;
    "feFuncB": SVGFEFuncBElement;
    "feFuncG": SVGFEFuncGElement;
    "feFuncR": SVGFEFuncRElement;
    "feGaussianBlur": SVGFEGaussianBlurElement;
    "feImage": SVGFEImageElement;
    "feMerge": SVGFEMergeElement;
    "feMergeNode": SVGFEMergeNodeElement;
    "feMorphology": SVGFEMorphologyElement;
    "feOffset": SVGFEOffsetElement;
    "fePointLight": SVGFEPointLightElement;
    "feSpecularLighting": SVGFESpecularLightingElement;
    "feSpotLight": SVGFESpotLightElement;
    "feTile": SVGFETileElement;
    "feTurbulence": SVGFETurbulenceElement;
    "filter": SVGFilterElement;
    "foreignObject": SVGForeignObjectElement;
    "g": SVGGElement;
    "image": SVGImageElement;
    "line": SVGLineElement;
    "linearGradient": SVGLinearGradientElement;
    "marker": SVGMarkerElement;
    "mask": SVGMaskElement;
    "metadata": SVGMetadataElement;
    "path": SVGPathElement;
    "pattern": SVGPatternElement;
    "polygon": SVGPolygonElement;
    "polyline": SVGPolylineElement;
    "radialGradient": SVGRadialGradientElement;
    "rect": SVGRectElement;
    "script": SVGScriptElement;
    "stop": SVGStopElement;
    "style": SVGStyleElement;
    "svg": SVGSVGElement;
    "switch": SVGSwitchElement;
    "symbol": SVGSymbolElement;
    "text": SVGTextElement;
    "textPath": SVGTextPathElement;
    "title": SVGTitleElement;
    "tspan": SVGTSpanElement;
    "use": SVGUseElement;
    "view": SVGViewElement;
}
/** @deprecated Directly use HTMLElementTagNameMap or SVGElementTagNameMap as appropriate, instead. */
export declare type ElementTagNameMap = HTMLElementTagNameMap & Pick<SVGElementTagNameMap, Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>>;
/** @deprecated */
/** @deprecated */
/** @deprecated */
/** @deprecated */
/** @deprecated */
/** @deprecated */
/**
 * Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
 */
/**
 * Fires when the user aborts the download.
 * @param ev The event.
 */
/**
 * Fires when the object loses the input focus.
 * @param ev The focus event.
 */
/**
 * Occurs when playback is possible, but would require further buffering.
 * @param ev The event.
 */
/**
 * Fires when the contents of the object or selection have changed.
 * @param ev The event.
 */
/**
 * Fires when the user clicks the left mouse button on the object
 * @param ev The mouse event.
 */
/**
 * Fires when the user clicks the right mouse button in the client area, opening the context menu.
 * @param ev The mouse event.
 */
/**
 * Fires when the user double-clicks the object.
 * @param ev The mouse event.
 */
/**
 * Fires on the source object continuously during a drag operation.
 * @param ev The event.
 */
/**
 * Fires on the source object when the user releases the mouse at the close of a drag operation.
 * @param ev The event.
 */
/**
 * Fires on the target element when the user drags the object to a valid drop target.
 * @param ev The drag event.
 */
/**
 * Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
 * @param ev The drag event.
 */
/**
 * Fires on the target element continuously while the user drags the object over a valid drop target.
 * @param ev The event.
 */
/**
 * Fires on the source object when the user starts to drag a text selection or selected object.
 * @param ev The event.
 */
/**
 * Occurs when the duration attribute is updated.
 * @param ev The event.
 */
/**
 * Occurs when the media element is reset to its initial state.
 * @param ev The event.
 */
/**
 * Occurs when the end of playback is reached.
 * @param ev The event
 */
/**
 * Fires when an error occurs during object loading.
 * @param ev The event.
 */
/**
 * Fires when the object receives focus.
 * @param ev The event.
 */
/**
 * Fires when the user presses a key.
 * @param ev The keyboard event
 */
/**
 * Fires when the user presses an alphanumeric key.
 * @param ev The event.
 */
/**
 * Fires when the user releases a key.
 * @param ev The keyboard event
 */
/**
 * Fires immediately after the browser loads the object.
 * @param ev The event.
 */
/**
 * Occurs when media data is loaded at the current playback position.
 * @param ev The event.
 */
/**
 * Occurs when the duration and dimensions of the media have been determined.
 * @param ev The event.
 */
/**
 * Occurs when Internet Explorer begins looking for media data.
 * @param ev The event.
 */
/**
 * Fires when the user clicks the object with either mouse button.
 * @param ev The mouse event.
 */
/**
 * Fires when the user moves the mouse over the object.
 * @param ev The mouse event.
 */
/**
 * Fires when the user moves the mouse pointer outside the boundaries of the object.
 * @param ev The mouse event.
 */
/**
 * Fires when the user moves the mouse pointer into the object.
 * @param ev The mouse event.
 */
/**
 * Fires when the user releases a mouse button while the mouse is over the object.
 * @param ev The mouse event.
 */
/**
 * Occurs when playback is paused.
 * @param ev The event.
 */
/**
 * Occurs when the play method is requested.
 * @param ev The event.
 */
/**
 * Occurs when the audio or video has started playing.
 * @param ev The event.
 */
/**
 * Occurs to indicate progress while downloading media data.
 * @param ev The event.
 */
/**
 * Occurs when the playback rate is increased or decreased.
 * @param ev The event.
 */
/**
 * Fires when the user resets a form.
 * @param ev The event.
 */
/**
 * Fires when the user repositions the scroll box in the scroll bar on the object.
 * @param ev The event.
 */
/**
 * Occurs when the seek operation ends.
 * @param ev The event.
 */
/**
 * Occurs when the current playback position is moved.
 * @param ev The event.
 */
/**
 * Fires when the current selection changes.
 * @param ev The event.
 */
/**
 * Occurs when the download has stopped.
 * @param ev The event.
 */
/**
 * Occurs if the load operation has been intentionally halted.
 * @param ev The event.
 */
/**
 * Occurs to indicate the current playback position.
 * @param ev The event.
 */
/**
 * Occurs when the volume is changed, or playback is muted or unmuted.
 * @param ev The event.
 */
/**
 * Occurs when playback stops because the next frame of a video resource is not available.
 * @param ev The event.
 */
export declare type HeadersInit = Headers | string[][] | Record<string, string>;
export declare type BodyInit = Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string;
export declare type RequestInfo = Request | string;
export declare type BlobPart = BufferSource | Blob | string;
export declare type DOMHighResTimeStamp = number;
export declare type RenderingContext = CanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext;
export declare type HTMLOrSVGImageElement = HTMLImageElement | SVGImageElement;
export declare type CanvasImageSource = HTMLOrSVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas;
export declare type OffscreenRenderingContext = OffscreenCanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext;
export declare type MessageEventSource = WindowProxy | MessagePort | ServiceWorker;
export declare type HTMLOrSVGScriptElement = HTMLScriptElement | SVGScriptElement;
export declare type ImageBitmapSource = CanvasImageSource | Blob | ImageData;
export declare type OnErrorEventHandler = OnErrorEventHandlerNonNull | null;
export declare type OnBeforeUnloadEventHandler = OnBeforeUnloadEventHandlerNonNull | null;
export declare type TimerHandler = string | Function;
export declare type ConstrainULong = number | ConstrainULongRange;
export declare type ConstrainDouble = number | ConstrainDoubleRange;
export declare type ConstrainBoolean = boolean | ConstrainBooleanParameters;
export declare type ConstrainDOMString = string | string[] | ConstrainDOMStringParameters;
export declare type PerformanceEntryList = PerformanceEntry[];
export declare type ReadableStreamReadResult<T> = ReadableStreamReadValueResult<T> | ReadableStreamReadDoneResult<T>;
export declare type VibratePattern = number | number[];
export declare type COSEAlgorithmIdentifier = number;
export declare type AuthenticatorSelectionList = AAGUID[];
export declare type AAGUID = BufferSource;
export declare type AuthenticationExtensionsSupported = string[];
export declare type UvmEntry = number[];
export declare type UvmEntries = UvmEntry[];
export declare type AlgorithmIdentifier = string | Algorithm;
export declare type HashAlgorithmIdentifier = AlgorithmIdentifier;
export declare type BigInteger = Uint8Array;
export declare type NamedCurve = string;
export declare type GLenum = number;
export declare type GLboolean = boolean;
export declare type GLbitfield = number;
export declare type GLint = number;
export declare type GLsizei = number;
export declare type GLintptr = number;
export declare type GLsizeiptr = number;
export declare type GLuint = number;
export declare type GLfloat = number;
export declare type GLclampf = number;
export declare type TexImageSource = ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | OffscreenCanvas;
export declare type Float32List = Float32Array | GLfloat[];
export declare type Int32List = Int32Array | GLint[];
export declare type GLint64 = number;
export declare type GLuint64 = number;
export declare type Uint32List = Uint32Array | GLuint[];
export declare type BufferSource = ArrayBufferView | ArrayBuffer;
export declare type DOMTimeStamp = number;
export declare type LineAndPositionSetting = number | AutoKeyword;
export declare type FormDataEntryValue = File | string;
export declare type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
export declare type IDBValidKey = number | string | Date | BufferSource | IDBArrayKey;
export declare type MutationRecordType = "attributes" | "characterData" | "childList";
export declare type IDBKeyPath = string;
export declare type Transferable = ArrayBuffer | MessagePort | ImageBitmap | OffscreenCanvas;
export declare type RTCIceGatherCandidate = RTCIceCandidateDictionary | RTCIceCandidateComplete;
export declare type RTCTransport = RTCDtlsTransport | RTCSrtpSdesTransport;
/** @deprecated */
export declare type MouseWheelEvent = WheelEvent;
export declare type WindowProxy = Window;
export declare type AlignSetting = "center" | "end" | "left" | "right" | "start";
export declare type AnimationPlayState = "finished" | "idle" | "paused" | "running";
export declare type AppendMode = "segments" | "sequence";
export declare type AttestationConveyancePreference = "direct" | "indirect" | "none";
export declare type AudioContextLatencyCategory = "balanced" | "interactive" | "playback";
export declare type AudioContextState = "closed" | "running" | "suspended";
export declare type AuthenticatorAttachment = "cross-platform" | "platform";
export declare type AuthenticatorTransport = "ble" | "internal" | "nfc" | "usb";
export declare type AutoKeyword = "auto";
export declare type AutomationRate = "a-rate" | "k-rate";
export declare type BinaryType = "arraybuffer" | "blob";
export declare type BiquadFilterType = "allpass" | "bandpass" | "highpass" | "highshelf" | "lowpass" | "lowshelf" | "notch" | "peaking";
export declare type CanPlayTypeResult = "" | "maybe" | "probably";
export declare type CanvasDirection = "inherit" | "ltr" | "rtl";
export declare type CanvasFillRule = "evenodd" | "nonzero";
export declare type CanvasLineCap = "butt" | "round" | "square";
export declare type CanvasLineJoin = "bevel" | "miter" | "round";
export declare type CanvasTextAlign = "center" | "end" | "left" | "right" | "start";
export declare type CanvasTextBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";
export declare type ChannelCountMode = "clamped-max" | "explicit" | "max";
export declare type ChannelInterpretation = "discrete" | "speakers";
export declare type ClientTypes = "all" | "sharedworker" | "window" | "worker";
export declare type CompositeOperation = "accumulate" | "add" | "replace";
export declare type CompositeOperationOrAuto = "accumulate" | "add" | "auto" | "replace";
export declare type CredentialMediationRequirement = "optional" | "required" | "silent";
export declare type DirectionSetting = "" | "lr" | "rl";
export declare type DisplayCaptureSurfaceType = "application" | "browser" | "monitor" | "window";
export declare type DistanceModelType = "exponential" | "inverse" | "linear";
export declare type DocumentReadyState = "complete" | "interactive" | "loading";
export declare type EndOfStreamError = "decode" | "network";
export declare type EndingType = "native" | "transparent";
export declare type FillMode = "auto" | "backwards" | "both" | "forwards" | "none";
export declare type FullscreenNavigationUI = "auto" | "hide" | "show";
export declare type GamepadHand = "" | "left" | "right";
export declare type GamepadHapticActuatorType = "vibration";
export declare type GamepadMappingType = "" | "standard";
export declare type IDBCursorDirection = "next" | "nextunique" | "prev" | "prevunique";
export declare type IDBRequestReadyState = "done" | "pending";
export declare type IDBTransactionMode = "readonly" | "readwrite" | "versionchange";
export declare type ImageSmoothingQuality = "high" | "low" | "medium";
export declare type IterationCompositeOperation = "accumulate" | "replace";
export declare type KeyFormat = "jwk" | "pkcs8" | "raw" | "spki";
export declare type KeyType = "private" | "public" | "secret";
export declare type KeyUsage = "decrypt" | "deriveBits" | "deriveKey" | "encrypt" | "sign" | "unwrapKey" | "verify" | "wrapKey";
export declare type LineAlignSetting = "center" | "end" | "start";
export declare type ListeningState = "active" | "disambiguation" | "inactive";
export declare type MSCredentialType = "FIDO_2_0";
export declare type MSTransportType = "BT" | "Embedded" | "NFC" | "USB";
export declare type MSWebViewPermissionState = "allow" | "defer" | "deny" | "unknown";
export declare type MSWebViewPermissionType = "geolocation" | "media" | "pointerlock" | "unlimitedIndexedDBQuota" | "webnotifications";
export declare type MediaDeviceKind = "audioinput" | "audiooutput" | "videoinput";
export declare type MediaKeyMessageType = "individualization-request" | "license-release" | "license-renewal" | "license-request";
export declare type MediaKeySessionType = "persistent-license" | "temporary";
export declare type MediaKeyStatus = "expired" | "internal-error" | "output-downscaled" | "output-restricted" | "released" | "status-pending" | "usable";
export declare type MediaKeysRequirement = "not-allowed" | "optional" | "required";
export declare type MediaStreamTrackState = "ended" | "live";
export declare type NavigationReason = "down" | "left" | "right" | "up";
export declare type NavigationType = "back_forward" | "navigate" | "prerender" | "reload";
export declare type NotificationDirection = "auto" | "ltr" | "rtl";
export declare type NotificationPermission = "default" | "denied" | "granted";
export declare type OffscreenRenderingContextId = "2d" | "bitmaprenderer" | "webgl" | "webgl2";
export declare type OrientationLockType = "any" | "landscape" | "landscape-primary" | "landscape-secondary" | "natural" | "portrait" | "portrait-primary" | "portrait-secondary";
export declare type OrientationType = "landscape-primary" | "landscape-secondary" | "portrait-primary" | "portrait-secondary";
export declare type OscillatorType = "custom" | "sawtooth" | "sine" | "square" | "triangle";
export declare type OverSampleType = "2x" | "4x" | "none";
export declare type PanningModelType = "HRTF" | "equalpower";
export declare type PaymentComplete = "fail" | "success" | "unknown";
export declare type PaymentShippingType = "delivery" | "pickup" | "shipping";
export declare type PermissionName = "accelerometer" | "ambient-light-sensor" | "background-sync" | "bluetooth" | "camera" | "clipboard" | "device-info" | "geolocation" | "gyroscope" | "magnetometer" | "microphone" | "midi" | "notifications" | "persistent-storage" | "push" | "speaker";
export declare type PermissionState = "denied" | "granted" | "prompt";
export declare type PlaybackDirection = "alternate" | "alternate-reverse" | "normal" | "reverse";
export declare type PositionAlignSetting = "auto" | "center" | "line-left" | "line-right";
export declare type PublicKeyCredentialType = "public-key";
export declare type PushEncryptionKeyName = "auth" | "p256dh";
export declare type PushPermissionState = "denied" | "granted" | "prompt";
export declare type RTCBundlePolicy = "balanced" | "max-bundle" | "max-compat";
export declare type RTCDataChannelState = "closed" | "closing" | "connecting" | "open";
export declare type RTCDegradationPreference = "balanced" | "maintain-framerate" | "maintain-resolution";
export declare type RTCDtlsRole = "auto" | "client" | "server";
export declare type RTCDtlsTransportState = "closed" | "connected" | "connecting" | "failed" | "new";
export declare type RTCDtxStatus = "disabled" | "enabled";
export declare type RTCErrorDetailType = "data-channel-failure" | "dtls-failure" | "fingerprint-failure" | "hardware-encoder-error" | "hardware-encoder-not-available" | "idp-bad-script-failure" | "idp-execution-failure" | "idp-load-failure" | "idp-need-login" | "idp-timeout" | "idp-tls-failure" | "idp-token-expired" | "idp-token-invalid" | "sctp-failure" | "sdp-syntax-error";
export declare type RTCIceCandidateType = "host" | "prflx" | "relay" | "srflx";
export declare type RTCIceComponent = "rtcp" | "rtp";
export declare type RTCIceConnectionState = "checking" | "closed" | "completed" | "connected" | "disconnected" | "failed" | "new";
export declare type RTCIceCredentialType = "oauth" | "password";
export declare type RTCIceGatherPolicy = "all" | "nohost" | "relay";
export declare type RTCIceGathererState = "complete" | "gathering" | "new";
export declare type RTCIceGatheringState = "complete" | "gathering" | "new";
export declare type RTCIceProtocol = "tcp" | "udp";
export declare type RTCIceRole = "controlled" | "controlling" | "unknown";
export declare type RTCIceTcpCandidateType = "active" | "passive" | "so";
export declare type RTCIceTransportPolicy = "all" | "relay";
export declare type RTCIceTransportState = "checking" | "closed" | "completed" | "connected" | "disconnected" | "failed" | "new";
export declare type RTCPeerConnectionState = "closed" | "connected" | "connecting" | "disconnected" | "failed" | "new";
export declare type RTCPriorityType = "high" | "low" | "medium" | "very-low";
export declare type RTCRtcpMuxPolicy = "negotiate" | "require";
export declare type RTCRtpTransceiverDirection = "inactive" | "recvonly" | "sendonly" | "sendrecv" | "stopped";
export declare type RTCSctpTransportState = "closed" | "connected" | "connecting";
export declare type RTCSdpType = "answer" | "offer" | "pranswer" | "rollback";
export declare type RTCSignalingState = "closed" | "have-local-offer" | "have-local-pranswer" | "have-remote-offer" | "have-remote-pranswer" | "stable";
export declare type RTCStatsIceCandidatePairState = "cancelled" | "failed" | "frozen" | "inprogress" | "succeeded" | "waiting";
export declare type RTCStatsIceCandidateType = "host" | "peerreflexive" | "relayed" | "serverreflexive";
export declare type RTCStatsType = "candidatepair" | "datachannel" | "inboundrtp" | "localcandidate" | "outboundrtp" | "remotecandidate" | "session" | "track" | "transport";
export declare type ReadyState = "closed" | "ended" | "open";
export declare type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
export declare type RequestCache = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
export declare type RequestCredentials = "include" | "omit" | "same-origin";
export declare type RequestDestination = "" | "audio" | "audioworklet" | "document" | "embed" | "font" | "image" | "manifest" | "object" | "paintworklet" | "report" | "script" | "sharedworker" | "style" | "track" | "video" | "worker" | "xslt";
export declare type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
export declare type RequestRedirect = "error" | "follow" | "manual";
export declare type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
export declare type ScopedCredentialType = "ScopedCred";
export declare type ScrollBehavior = "auto" | "smooth";
export declare type ScrollLogicalPosition = "center" | "end" | "nearest" | "start";
export declare type ScrollRestoration = "auto" | "manual";
export declare type ScrollSetting = "" | "up";
export declare type SelectionMode = "end" | "preserve" | "select" | "start";
export declare type ServiceWorkerState = "activated" | "activating" | "installed" | "installing" | "parsed" | "redundant";
export declare type ServiceWorkerUpdateViaCache = "all" | "imports" | "none";
export declare type ShadowRootMode = "closed" | "open";
export declare type SpeechSynthesisErrorCode = "audio-busy" | "audio-hardware" | "canceled" | "interrupted" | "invalid-argument" | "language-unavailable" | "network" | "not-allowed" | "synthesis-failed" | "synthesis-unavailable" | "text-too-long" | "voice-unavailable";
export declare type SupportedType = "application/xhtml+xml" | "application/xml" | "image/svg+xml" | "text/html" | "text/xml";
export declare type TextTrackKind = "captions" | "chapters" | "descriptions" | "metadata" | "subtitles";
export declare type TextTrackMode = "disabled" | "hidden" | "showing";
export declare type TouchType = "direct" | "stylus";
export declare type Transport = "ble" | "nfc" | "usb";
export declare type UserVerificationRequirement = "discouraged" | "preferred" | "required";
export declare type VRDisplayEventReason = "mounted" | "navigation" | "requested" | "unmounted";
export declare type VideoFacingModeEnum = "environment" | "left" | "right" | "user";
export declare type VisibilityState = "hidden" | "visible";
export declare type WebGLPowerPreference = "default" | "high-performance" | "low-power";
export declare type WorkerType = "classic" | "module";
export declare type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text";
