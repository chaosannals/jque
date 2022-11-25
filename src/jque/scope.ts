import { JQueHTMLElementAttrs, express } from "./attrs";

export type JQueComposeAction = (s: JQueScope, ...params: any[]) => any | undefined;
export type JQueRememberAction = () => any;

/**
 * 作用域，用来动态刷新时候确认刷新范围。
 */
export class JQueScope {
    public element: HTMLElement;
    public composeAction: JQueComposeAction;
    public children: Array<JQueScope>;
    public data: any | undefined;

    constructor(element: HTMLElement) {
        this.composeAction = () => { };
        this.element = element;
        this.children = [];
    }

    compose(tag: string, attrs: JQueHTMLElementAttrs, action: JQueComposeAction, ...params: any[]): any {
        const scope = this.scoped(tag, attrs, action);
        return action(scope, ...params);
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
                    this.element.innerHTML = "";
                    this.composeAction(this);
                    this.children.forEach(child => {
                        child.composeAction(child);
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
        express(element, attrs);
        scope.composeAction = action;
        this.element.appendChild(element);
        this.children.push(scope);
        return scope;
    }

    view(tag: string, attrs: JQueHTMLElementAttrs, action: JQueComposeAction): any {
        const scope = this.scoped(tag, attrs, action);
        return action(scope);
    }

    text(content: string) {
        this.element.innerHTML = content;
    }
}