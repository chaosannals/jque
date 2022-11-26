import { JQueHTMLElementAttrs, express } from "./attrs";

export type JQueComposeAction = (s: JQueScope, ...params: any[]) => any | undefined;
export type JQueRememberAction = () => any;

/**
 * 作用域，用来动态刷新时候确认刷新范围。
 * 
 */
export class JQueScope {
    private composeAction: (...params: any[]) => any;
    public element: HTMLElement;
    public children: Array<JQueScope>;
    public data: any | undefined;

    constructor(element: HTMLElement) {
        this.composeAction = () => { };
        this.element = element;
        this.children = [];
    }

    compose(tag: string, attrs: JQueHTMLElementAttrs, action: JQueComposeAction, ...params: any[]): any {
        const scope = this.scoped(tag, attrs, action);
        return scope.composeAction(...params);
    }

    remember(action: JQueRememberAction): any {
        if (!this.data) {
            const v = action();
            this.data = new Proxy(v, {
                get: (obj, prop, r) => {
                    return Reflect.get(obj, prop, r);
                },
                set: (obj, prop, value) => {
                    const r = Reflect.set(obj, prop, value);
                    this.composeAction();
                    this.children.forEach(child => {
                        child.composeAction();
                    });
                    return r;
                },
            });
        }
        return this.data;
    }

    scoped(tag: string, attrs: JQueHTMLElementAttrs, action: JQueComposeAction): JQueScope {
        const element = document.createElement(tag);
        const scope = new JQueScope(element);
        scope.composeAction = () => {
            if (scope.element) {
                const ne = document.createElement(tag);
                this.element.replaceChild(ne, scope.element);
                scope.element = ne;
            }
            express(scope.element, attrs);
            return action(scope);
        };
        this.element.appendChild(element);
        this.children.push(scope);
        return scope;
    }

    view(tag: string, attrs: JQueHTMLElementAttrs, action: JQueComposeAction): any {
        const scope = this.scoped(tag, attrs, action);
        return scope.composeAction();
    }

    text(content: string) {
        this.element.innerHTML = content;
    }
}