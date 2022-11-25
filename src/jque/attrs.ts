export interface JQueHTMLElementAttrs {
    class: Array<string> | string | undefined;
    style: any | undefined;
}

export function express(element: HTMLElement, vna: JQueHTMLElementAttrs) {
    // 类
    if (vna.class instanceof Array<string>) {
        element.className = vna.class.map(i => `.${i}`).join(' ');
    } else if (typeof vna.class == 'string') {
        element.className = vna.class
    }

    // 样式
    if (vna.style instanceof Object) {
        for (let key of Object.keys(vna.style)) {
            // @ts-ignore
            element.style[key] = vna.style[key];
        }
    }

    // 事件
    for (let key of Object.keys(vna)) {
        if (key.startsWith('on')) {
            const name = key.toLowerCase().substring(2);
            // @ts-ignore
            const action = vna[key];
            element.addEventListener(name, action);
        }
    }
}