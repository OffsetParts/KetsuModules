// MARK:GLOBAL
(window as any).KETSU_ASYNC = true
const emptyKeyVal: KeyValue[] = [{ key: "", value: "" }]

/**
 * Ketsu Framework - A TypeScript/JavaScript framework to simplify KETSU module making.
 * 
 * This framework provides utilities for:
 * - Making HTTP requests with caching and site loading capabilities
 * - Creating UI layouts and views for content display
 * - Handling different page types (main, search, info, chapters)
 * - Managing video content with resolvers and subtitles
 * - Storing and retrieving data
 * - Logging and debugging
 */


// MARK: TYPE HELPERS

type Prettify<T> = { [K in keyof T]: T[K] } & {}

// MARK: REQUEST

type FetchMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE";

/**
 * Standard fetch options for HTTP requests
 */
interface FetchOptions {
    /** HTTP method to use (default: "GET") */
    method?: FetchMethods;
    /** Request headers as key-value object */
    headers?: Record<string, string>;
    /** Request body content */
    body?: string;
}

/**
 * Extended fetch options with Ketsu-specific features
 */
interface KetsuFetchOptions extends FetchOptions {
    /** Whether to remove JavaScript from fetched HTML (default: false) */
    removeScripts?: boolean;
    /** Whether to load the content within the site's webview (default: false) */
    loadInSite?: boolean;
}

/**
 * Function that runs within a fetched site's context
 */
type RunWithinSite<T extends any = any> = [run?: (window: Window) => T]

/**
 * Extracts the return type from an async function
 */
type ResolveAsync<T> = T extends Promise<infer R> ? R : T

/**
 * Extracts the return type from a function
 */
type ExtractReturnType<T> = T extends ((...args: any[]) => infer U) ? ResolveAsync<U> : never

/**
 * Makes an HTTP request to a website, you can also run javascript directly on the website.
 * @param url - The URL to fetch
 * @param options - Fetch configuration options
 * @param run - Optional function to execute within the fetched site's context
 * @returns Promise resolving to either HTML element or the result of the run function
 * 
 * @example
 * // Simple fetch
 * const html = await fetch("https://example.com");
 * 
 * @example
 * // Fetch and execute code in site context
 * const result = await fetch("https://example.com", {}, (window) => {
 *   return window.document.title;
 * });
 */
export async function fetch<T extends RunWithinSite>(
    url: string,
    options: Prettify<KetsuFetchOptions> = {},
    ...run: T
): Promise<T extends [] ? HTMLElement : ExtractReturnType<T[0]>> {
    let meta = metadata()
    let metaUrl = meta.request.url
    if (url === metaUrl) {
        let res = run.length > 0 ? await run[0]?.(window) : window.document.documentElement.outerHTML
        store.set(url, res)
        return run.length > 0 ? res : window.document.documentElement as any
    }
    let cached = store.get(url)
    if (cached === undefined) {
        meta.request = request(url, options)
        meta.javascriptConfig.loadInWebView = options.loadInSite ?? false
        meta.javascriptConfig.removeJavascript = options.removeScripts ?? false
        return finish() as any
    }
    return (typeof cached === "string" && cached.trim().startsWith('<')) ?
        (new DOMParser()).parseFromString(cached, "text/html").documentElement as any :
        cached as any
}

/**
 * Extended fetch options for dynamic requests
 */
interface DynamicFetchOptions extends KetsuFetchOptions {
    /** Test URL to use instead of dynamic resolution */
    testURL?: string;
}

/**
 * Same as fetch but used on parts of the module where the Request is dynamic, must be used at first of the Info, Chapters and Resolvers scripts.
 * @param options - Dynamic fetch configuration options
 * @param run - Optional function to execute within the fetched site's context
 * @returns Promise resolving to either HTML element or the result of the run function
 * 
 * @example
 * // Dynamic fetch with test URL
 * const result = await dynamicFetch({ testURL: "https://api.example.com" });
 */
export async function dynamicFetch<T extends RunWithinSite>(
    _options: Prettify<DynamicFetchOptions> = {},
    ...run: T
): Promise<T extends [] ? HTMLElement : ExtractReturnType<T[0]>> {
    let meta = metadata();
    let currentURL = meta.request.url;
    let url: string | undefined = store.get("ketsu_dynamic");
    let options = _options;

    if (options.testURL) {
        url = options.testURL;
    }

    if (!url) {
        if (!currentURL.includes("ketsu_dynamic=")) {
            throw new Error("No dynamic URL available and no testURL provided.");
        }

        const encoded = currentURL.split("ketsu_dynamic=")[1];
        const originalRequest: Request = JSON.parse(decodeURIComponent(encoded));

        url = originalRequest.url;

        // Merge headers/body/method only if not already defined
        options.method ??= originalRequest.method;
        options.body ??= originalRequest.httpBody;
        const originalHeaders = Object.fromEntries(originalRequest.headers.map(kv => [kv.key, kv.value]));
        options.headers = {
            ...originalHeaders,
            ...options.headers
        };
        // Save resolved URL to prevent repeating decoding later
        store.set("ketsu_dynamic", url);
    }

    return fetch(url, options, ...run);
}


export function toast(text: string): void {
    action("KETSU_MSG", text)
}

// MARK: REQUEST

/**
 * Creates a request object for KETSU
 * @param url - The target URL
 * @param options - Request configuration options
 * @returns Request object formatted for the Ketsu framework
 * 
 * @example
 * const req = request("https://api.example.com", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({ data: "example" })
 * });
 */
export function request(url: string, options: Prettify<FetchOptions> = {}): Request {
    return {
        url: url,
        method: options.method || "GET",
        headers: options.headers ? Object.keys(options.headers).map((k) => ({ key: k, value: options.headers?.[k] || "" })) : emptyKeyVal,
        httpBody: options.body
    }
}

function dynamicRequest(request: Request): Request {
    return {
        url: `https://google.com/?ketsu_dynamic=${encodeURIComponent(JSON.stringify(request))}`,
        method: "GET",
        headers: emptyKeyVal,
        httpBody: undefined
    }
}

// MARK: LAYOUT

/**
 * Layout distribution options for organizing content views
 */
type Distributions =
    | 'ultraWideFull' | 'ultraWide'
    | 'wideFull' | 'wide' | 'wideStrechedFull' | 'WideStrechedFullDouble'
    | 'wideStreched' | 'wideStrechedDouble' | 'wideStrechedFullList' | 'wideStrechedList'
    | 'doublets' | 'doubletsDouble' | 'doubletsFull' | 'doubletsFullDouble'
    | 'doubletsConstant' | 'doubletsDoubleConstant' | 'doubletsFullConstant' | 'doubletsFullDoubleConstant'
    | 'longDoublets' | 'longDoubletsDouble' | 'longDoubletsFull' | 'longDoubletsFullDouble'
    | 'longDoubletsConstant' | 'longDoubletsDoubleConstant' | 'longDoubletsFullConstant' | 'longDoubletsFullDoubleConstant'
    | 'triplets' | 'tripletsDouble' | 'tripletsFull' | 'tripletsFullDouble'
    | 'tripletsConstant' | 'tripletsDoubleConstant' | 'tripletsFullConstant' | 'tripletsFullDoubleConstant'
    | 'longTriplets' | 'longTripletsDouble' | 'longTripletsFull' | 'longTripletsFullDouble'
    | 'longTripletsConstant' | 'longTripletsDoubleConstant' | 'longTripletsFullConstant' | 'longTripletsFullDoubleConstant';

/**
 * Visual design styles for content cells
 */
type Designs =
    | 'Special1' | 'Special2' | 'Special3' | 'CELLHelperText'
    | 'small1' | 'small2'
    | 'normal1' | 'normal2' | 'normal3' | 'normal4' | 'normal5' | 'normal7'
    | 'wide1' | 'wide2' | 'wide3' | 'wide4' | 'wide5' | 'wide6' | 'wide7' | 'wide8' | 'wide9' | 'wide10' | 'wide11';


const defaultImage = request("https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg")
const defaultRequest = request("https://www.google.com/")

/**
 * Container for organizing multiple content views
 */
interface ViewsHolder {
    /** Section title */
    title: string;
    /** Visual design style for the views */
    design: Designs;
    /** Layout distribution pattern */
    distribution: Distributions;
    /** Orientation of the layout */
    orientation: "vertical" | "horizontal";
    /** Array of content views */
    views: View[];
}

type _ViewsHolder = Prettify<Partial<ViewsHolder>>

export function viewsHolder(h: _ViewsHolder): ViewsHolder {
    return {
        cellDesing: h.design || "wide5",
        defaultLayout: h.distribution || "wideStrechedFullList",
        orientation: h.orientation || "vertical",
        section: {
            sectionName: h.title || "",
            separator: true
        },
        paging: "leading",
        data: h.views || [],
        layout: undefined,
    } as any
}


/**
 * Individual content view item
 */
interface View {
    /** Navigation link for the view */
    link: Request;
    /** Image/thumbnail for the view */
    image: Request;
    /** Primary title text */
    title: string;
    /** Description text */
    description: string;
    /** Additional field 1 */
    field1: string;
    /** Additional field 2 */
    field2: string;
    /** Additional field 3 */
    field3: string;
    /** Additional field 4 */
    field4: string;
    /** Whether this view represents a chapter */
    isChapter: boolean;
    /** Whether to open in webview */
    openInWebView: boolean;
}


/**
 * Creates a views holder container with default values
 * @param h - Partial views holder configuration
 * @returns Complete ViewsHolder object with defaults applied
 * 
 * @example
 * const holder = viewsHolder({
 *   title: "Popular Movies",
 *   design: "wide5",
 *   distribution: "doublets",
 *   views: [view1, view2, view3]
 * });
 */
type _View = Prettify<Partial<Omit<View, "openInWebView" | "isChapter">>>

/**
 * Creates a content view with default values
 * @param v - Partial view configuration
 * @returns Complete View object with defaults applied
 * 
 * @example
 * const movieView = view({
 *   title: "The Matrix",
 *   description: "A computer hacker learns about reality",
 *   image: request("https://example.com/matrix.jpg"),
 *   link: request("https://example.com/matrix")
 * });
 */
export function view(v: _View): View {
    return {
        link: dynamicRequest(v.link || defaultRequest),
        image: v.image || defaultImage,
        title: v.title || "",
        description: v.description || "",
        field1: v.field1 || "",
        field2: v.field2 || "",
        field3: v.field3 || "",
        field4: v.field4 || "",
        isChapter: false,
        openInWebView: false
    }
}


// MARK: MAINPAGE

/**
 * Sets up the main page layout with the provided view holders
 * @param layout - Array of ViewsHolder objects to display on the main page
 * 
 * @example
 * main([
 *   viewsHolder({ title: "Featured", views: featuredViews }),
 *   viewsHolder({ title: "Popular", views: popularViews })
 * ]);
 */
export function main(layout: ViewsHolder[]): void {
    metadata().output = layout
    finish()
}

// MARK: SEARCHPAGE

/**
 * Sets up the search results page layout
 * @param layout - Array of ViewsHolder objects to display search results
 * 
 * @example
 * search([
 *   viewsHolder({ title: "Search Results", views: searchResults })
 * ]);
 */
export function search(layout: ViewsHolder[]): void {
    metadata().output = layout
    finish()
}

/**
 * Search metadata information
 */
interface SearchMetadata {
    /** Current search query */
    searched: string;
    /** Current page number (0-based) */
    page: number;
}

/**
 * Retrieves current search metadata (query and page), must be used at the start of the search script.
 * @param test - Optional test metadata to override URL parsing
 * @returns Search metadata object
 * 
 * @example
 * const { searched, page } = searchMetadata();
 * console.log(`Searching for: ${searched}, Page: ${page}`);
 */
export function searchMetadata(test?: Prettify<Partial<SearchMetadata>>): Prettify<SearchMetadata>{
    let meta = metadata()
    let searchMeta = store.get<SearchMetadata>("ketsu_search")

    if (!searchMeta && meta.request.url.includes("?ketsu_search=")) {
        let url = new URL(meta.request.url).searchParams
        let searched = url.get("ketsu_search") || ""
        let page = parseInt(url.get("page") || "0", 10)
        searchMeta = {
            searched: test?.searched ? test.searched : searched,
            page: test?.page ? test.page : page
        }
        store.set("ketsu_search", searchMeta)
    }

    return searchMeta || { searched: "", page: 0 }
}

// MARK: INFOPAGE
/**
 * Chapter request configuration
 */
interface ChapterRequest {
  /** Optional chapter name */
  chapName?: string;
  /** Navigation link for the chapter */
  link: Request;
  /** Whether to open in webview */
  openInWebView: boolean;
}

/**
 * Options for creating chapter requests
 */
interface ChapterRequestOptions extends FetchOptions {
  /** Chapter name */
  name?: string;
  /** Whether to open in webview */
  openInWebView?: boolean;
}

/**
 * Creates a chapter request object
 * @param url - Chapter URL
 * @param options - Chapter configuration options
 * @returns ChapterRequest object
 * 
 * @example
 * const chapter = chapterRequest("https://example.com/chapter1", {
 *   name: "Chapter 1: The Beginning",
 *   openInWebView: false
 * });
 */
export function chapterRequest(url: string, options: Prettify<ChapterRequestOptions> = {}): ChapterRequest {
    return {
        chapName: options.name,
        link: dynamicRequest(request(url, options)),
        openInWebView: options.openInWebView ?? false
    };
}


/**
 * Information page structure for detailed content view
 */
interface InfoPage {
  /** Main image for the content */
  image: Request;
  /** Navigation link */
  link: Request;
  /** Content title */
  title: string;
  /** Content description */
  description: string;
  /** Array of genre tags */
  genres: string[];
  /** Additional field 1 */
  field1: string;
  /** Additional field 2 */
  field2: string;
  /** Additional field 3 */
  field3: string;
  /** Additional field 4 */
  field4: string;
  /** Array of available chapters */
  chapters: ChapterRequest[];
}


type _InfoPage = Prettify<Partial<InfoPage>>

/**
 * Sets up an information/detail page
 * @param data - Partial info page configuration
 * 
 * @example
 * info({
 *   title: " Some title",
 *   description: "A high school chemistry teacher turned meth cook",
 *   genres: ["Drama", "Crime", "Thriller"],
 *   chapters: [chapter1, chapter2, chapter3]
 * });
 */
export function info(data: _InfoPage): void {
    let l: InfoPage = {
        image: data.image || defaultImage,
        link: data.link || metadata().request, 
        title: data.title || "",
        description: data.description || "",
        genres: data.genres || [],
        field1: data.field1 || "",
        field2: data.field2 || "",
        field3: data.field3 || "",
        field4: data.field4 || "",
        chapters: data.chapters || []
    }
    metadata().output = l
    finish()
}

// MARK: CHAPTERS 

/**
 * Chapter content with video support
 */
interface ChapterVideos {
  videos?: {
    /** Videos that need URL resolution */
    needsResolver?: ResolverRequest[];
    /** Direct video URLs */
    rawVideo?: VideoRequest[];
  };
}

/**
 * Chapter content with image support
 */
interface ChapterImages {
  /** Array of image requests */
  images?: Request[];
}


/**
 * Chapter content with text support
 */
interface ChapterText {
  text?: {
    /** Text content */
    text: string;
  };
}


/**
 * Combined chapter content interface
 */
interface Chapter extends ChapterVideos, ChapterImages, ChapterText {

}

/**
 * Sets up chapter content (videos, images, or text)
 * @param data - Chapter content data (images, videos, or text string)
 * 
 * @example
 * // For image-based content (manga)
 * chapters([
 *   request("https://example.com/page1.jpg"),
 *   request("https://example.com/page2.jpg")
 * ]);
 * 
 * @example
 * // For video content
 * chapters([
 *   videoRequest("https://example.com/video.mp4"),
 *   resolverRequest("https://example.com/embed")
 * ]);
 * 
 * @example
 * // For text content
 * chapters("This is the chapter text content...");
 */
export function chapters(data: Request[] | (VideoRequest | ResolverRequest)[] | string): void {
    let output: Chapter = {
        videos: undefined,
        text: undefined,
        images: undefined
    };

    if (!Array.isArray(data)) {
        if (typeof data !== "string") {
            throw new Error("Chapters type is wrong")
        }
        output.text = { text: data };
    }

    if (Array.isArray(data) && data.some((k) => ("url" in k))) {
        output.images = data as Request[]
    } else if (Array.isArray(data)) {

        output.videos = {
            needsResolver: [],
            rawVideo: []
        }

        data.forEach((v) => "video" in v ? output!.videos!.rawVideo!.push(v) : output!.videos!.needsResolver!.push(v as any))

    }

    metadata().output = output;
    finish();
}


// MARK: RESOLVE

/**
 * Returns the video resolved from the embeded website.
 * @param video - VideoRequest object to resolve
 * 
 * @example
 * const resolvedVideo = videoRequest("https://cdn.example.com/video.mp4");
 * resolver(resolvedVideo);
 */
export function resolver(video: VideoRequest): void {
    metadata().output = video;
    finish();
}

/**
 * Resolver request options
 */
interface ResolverRequestOptions extends FetchOptions {
  /** Unique resolver identifier, example https://streamwebsite.com/..  
   * The id would be: STREAMWEBSITE this is automatically extracted if left unedfined.*/
  resolverID?: string;
}

/**
 * Video resolver request for extracting video URLs
 */
interface ResolverRequest {
  /** Unique resolver identifier */
  resolverIdentifier: string;
  /** Request to the resolver endpoint */
  link: Request;
}


/**
 * Creates a resolver request for extracting video URLs from embed pages
 * @param url - URL to the video resolver/embed page
 * @param options - Resolver configuration options
 * @returns ResolverRequest object
 * 
 * @example
 * const resolver = resolverRequest("https://streamwebsite.com/video123", {
 *   resolverID: "STREAMWEBSITE" // 
 * });
 */
export function resolverRequest(url: string, options?: Prettify<ResolverRequestOptions>): ResolverRequest {
    return {
        link: dynamicRequest(request(url, options)),
        resolverIdentifier: options?.resolverID || ""
    }
}

/**
 * Subtitle request options
 */
interface SubsRequestOptions extends FetchOptions {
  /** Subtitle language */
  language?: string;
}

/**
 * Subtitle request configuration
 */
interface SubsRequest {
  /** Request to subtitle file */
  link: Request;
  /** Subtitle language */
  language: string;
}

/**
 * Creates a subtitle request
 * @param url - URL to subtitle file
 * @param options - Subtitle configuration options
 * @returns SubsRequest object
 * 
 * @example
 * const subtitles = subsRequest("https://example.com/subs.vtt", {
 *   language: "English"
 * });
 */
export function subsRequest(url: string, options?: Prettify<SubsRequestOptions>): SubsRequest {
    return {
        link: request(url, options),
        language: options?.language || "unknown"
    }
}

/**
 * Video request options
 */
interface VideoRequestOptions extends FetchOptions {
  /** Video quality identifier */
  quality?: string;
  /** Array of subtitle requests */
  subs?: SubsRequest[];
}

/**
 * Internal video request structure
 */
interface _VideoRequest {
  /** Request to video file */
  videoLink: Request;
  /** Video quality identifier */
  videoQuality: string;
}
/**
 * Complete video request with subtitles
 */
interface VideoRequest extends VideoRequestOptions {
  /** Array of video sources */
  video: _VideoRequest[];
  /** Array of subtitle requests */
  subs?: SubsRequest[];
}


/**
 * Creates a video request with quality and subtitle options
 * @param url - Direct video URL
 * @param options - Video configuration options
 * @returns VideoRequest object
 * 
 * @example
 * const video = videoRequest("https://example.com/video.mp4", {
 *   quality: "1080p",
 *   subs: [
 *     subsRequest("https://example.com/en.vtt", { language: "English" }),
 *     subsRequest("https://example.com/es.vtt", { language: "Spanish" })
 *   ]
 * });
 */
export function videoRequest(url: string, options?: VideoRequestOptions): VideoRequest {
    return {
        video: [{
            videoLink: request(url, options),
            videoQuality: options?.quality || "auto"
        }],
        subs: options?.subs
    }
}


// MARK: METADATA

interface KeyValue {
    key: string;
    value: string;
}

interface Request {
    url: string;
    method: FetchMethods;
    headers: KeyValue[];
    httpBody?: string
}

interface JavascriptConfig {
    loadInWebView: boolean;
    javaScript: string;
    removeJavascript: boolean;
}

interface Command {
    commandName: string;
    params: KeyValue[];
}

interface Extra {
    commands: Command[];
    extraInfo: KeyValue[];
}

interface Global {
    cookies: KeyValue[];
    headers: KeyValue[];
    variables: KeyValue[];
}

interface ResponseInfo {
    headers: KeyValue[];
    responseUrl: string;
    httpBody: string;
}

interface KetsuMetadata {
    request: Request;
    separator: string;
    javascriptConfig: JavascriptConfig;
    extra: Extra;
    global: Global;
    responseInfo: ResponseInfo;
    output: any
}

var _metadata: KetsuMetadata | undefined = undefined

function metadata(): KetsuMetadata {

    if (!_metadata) {
        const savedData = document.getElementById('ketsu-final-data');
        _metadata = JSON.parse(savedData?.textContent || "")
    }

    return _metadata as KetsuMetadata
}

// MARK: Finish

function finish(): void {
    const savedData = document.getElementById('ketsu-final-data');
    _metadata ? (savedData!.textContent = JSON.stringify(_metadata)) : (undefined)
    _logs.forEach((l) => action("KETSU_LOG", l))
    action("EXECUTE_KETSU_ASYNC")
    throw new Error()
}

// MARK: STORE



/**
 * Key-value storage interface
 */
interface Store<T extends string = string> {
  /**
   * Stores a value with the given key
   * @param key - Storage key
   * @param val - Value to store
   * @param persist - Whether to persist across scripts
   */
  set: (key: T, val: any, persist?: boolean) => void;
  
  /**
   * Retrieves a value by key
   * @param key - Storage key
   * @returns Stored value or undefined
   */
  get: <R>(key: T) => R | undefined;
  
  /**
   * Checks if a key exists in storage
   * @param key - Storage key
   * @returns True if key exists
   */
  has: (key: T) => boolean;
}


const _store: Record<string, string> = {
    ...[...metadata().extra.extraInfo, ...metadata().global.variables].reduce((acc, val) => {
        acc[val.key] = val.value
        return acc
    }, {} as Record<string, string>)
}

/**
 * Global storage instance for persisting data
 * 
 * @example
 * // Store data
 * store.set("user_preferences", { theme: "dark" });
 * 
 * // Retrieve data
 * const prefs = store.get("user_preferences");
 * 
 * // Check if key exists
 * if (store.has("user_preferences")) {
 *   // Key exists
 * }
 */
export const store: Store = {
    set: (key, value, persist = false) => {
        let val = encodeURIComponent(JSON.stringify({ value: value }))
        persist ? setCommand("persistant", key, val) : setExtraInfo(key, val)
    },
    get: (key) => {
        let val: any = undefined
        try {
            val = JSON.parse(decodeURIComponent(_store[key])).value
        } catch {
            log(`key: ${key} not found in the store.`)
        }
        return val
    },
    has: (key) => (key in _store)
}

function setExtraInfo(key: string, value: string): void {
    let meta = metadata()
    let kv = meta.extra.extraInfo.find((k) => k.key === key)
    if (!kv) {
        kv = {
            key: "",
            value: ""
        }
        meta.extra.extraInfo.push(kv)
    }
    kv.key = key
    kv.value = value
}


// MARK: COMMAND
type Commands = "persistant" | "variable" | "cookie" | "header" | "helperFunction" | (string & {})
function setCommand(name: Commands, key: string, value: string): void {
    let meta = metadata()
    let command = meta.extra.commands.find((c) => c.commandName == name)
    if (!command) {
        command = {
            commandName: name,
            params: []
        }
        meta.extra.commands.push(command)
    }
    command.params.push({ key, value })
}


// MARK: ACTIONS
type Actions = "EXECUTE_KETSU_ASYNC" | "KETSU_LOG" | "KETSU_MSG"
function action(name: Actions, val: string = ""): void {
    if ("webkit" in window) {
        (window as any).webkit.messageHandlers[name].postMessage(val);
    } else if (name === "KETSU_LOG") {
        console.log(val)
    }
}


// MARK: LOGS
let _logs: string[] = []

/**
 * Logs messages for debugging purposes
 * @param args - Values to log
 * 
 * @example
 * log("Debug message", { data: "example" });
 * log("User action:", userAction, "Result:", result);
 */
export function log(...args: any[]): void {
    const stringifiedArgs = args.map(arg => stringify(arg)).join('\n\n');
    _logs.push(stringifiedArgs)
}

function stringify(value: any): string {
    // Primitives
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);

    // Functions
    if (typeof value === 'function') {
        return `[Function: ${value.name || 'anonymous'}]`;
    }

    // Errors
    if (value instanceof Error) {
        return `${value.name}: ${value.message}`;
    }

    // Everything else - just stringify with pretty print
    try {
        return JSON.stringify(value, (key, val) => {
            if (typeof val === 'function') {
                return `[Function: ${val.name || 'anonymous'}]`;
            }
            if (val instanceof Error) {
                return `${val.name}: ${val.message}`;
            }
            return val;
        }, 2);
    } catch (e) {
        return `[${value.constructor?.name || 'Object'}]`;
    }
}