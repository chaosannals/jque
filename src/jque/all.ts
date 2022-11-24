import { JQueApplication } from './app';
import { VNode } from './vnode';
import { compose } from './attrs';
import type { VNodeAttrs } from './attrs';

export class JQue {
    private vnode: VNode;

    constructor() {
        this.vnode = new VNode();
    }

    app(selector: string, inner: Function) {

    }

    view(attrs: VNodeAttrs, inner: Function) {
        const content = inner();
        return `<div ${compose(attrs)}>${content}</div>`;
    }
}