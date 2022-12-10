import { JQueHTMLElementAttrs, express } from "./attrs";

export type JQueComposeAction = (s: JQueScopable, ...params: any[]) => any | undefined;
export type JQueRememberAction = () => any;

export interface JQueScopable {
    compose(action: JQueComposeAction, ...params: any[]): any;
    remember(action: JQueRememberAction): any;
    view(tag: string, attrs: JQueHTMLElementAttrs, action: JQueComposeAction, sign: string | null): any;
    text(content: string): void;
    clear(): void;
}

/**
 * 作用域，用来动态刷新时候确认刷新范围。
 * 
 */
export class JQueScope implements JQueScopable {
    public composeAction: (...params: any[]) => any;
    public element: HTMLElement | null;
    public elementAttr: JQueHTMLElementAttrs | null;
    public children: { [key: string]: JQueScope };
    public parent: JQueScope | null;
    public data: any | undefined;

    constructor() {
        this.composeAction = () => { };
        this.element = null;
        this.elementAttr = null;
        this.parent = null;
        this.children = {};
    }

    compose(action: JQueComposeAction, ...params: any[]): any {
        const key = this.getCallMark();
        const scope = this.children[key] ?? this.scoped(key, action);
        return scope.composeAction(...params);
    }

    getCallMark(deep: number = 3) {
        // return new Error().stack;
        const stack = new Error().stack?.split('\n').map(i => i.trim());
        return stack![deep];
        // return stack![stack!.length - deep];
    }

    remember(action: JQueRememberAction): any {
        if (!this.data) {
            const v = action();
            this.data = new Proxy(v, {
                get: (obj, prop, r) => {
                    return Reflect.get(obj, prop, r);
                },
                set: (obj, prop, value) => {
                    console.log('remember set', this.composeAction);
                    const r = Reflect.set(obj, prop, value);
                    this.clear();
                    this.composeAction();
                    return r;
                },
            });
        }
        return this.data;
    }

    scoped(key: string, action: JQueComposeAction): JQueScope {
        // console.log('key：', key);
        const scope = new JQueScope();
        scope.parent = this;
        scope.composeAction = (...params) => {
            if (scope.element && scope.elementAttr) {
                express(scope.element, scope.elementAttr);
            }
            console.log('children', scope.children);
            // scope.children = {};
            return action(scope, ...params);
        };
        this.children[key] = scope;
        return scope;
    }

    view(tag: string, attrs: JQueHTMLElementAttrs, action: JQueComposeAction, sign: string | null): any {
        const key = `${this.getCallMark()}-${sign}`;
        let scope = this.children[key];
        if (!scope) {
            const element = document.createElement(tag);
            scope = this.scoped(key, action);
            scope.element = element;
            
            // 向上找父元素
            let pointer: JQueScope | null = this;
            while (pointer != null && !pointer.element) {
                pointer = pointer.parent;
            }
            pointer?.element?.appendChild(element);
        }
        scope.elementAttr = attrs;
        return scope.composeAction();
    }

    text(content: string) {
        if (this.element) {
            this.element.innerHTML = content;
        }
    }

    clear() {
        for (let ck of Object.keys(this.children)) {
            let child = this.children[ck];
            child.clear();
        }
        this.children = {};
        if (this.element) {
            this.parent?.element?.removeChild(this.element);
            this.element = null;
        }
    }
}