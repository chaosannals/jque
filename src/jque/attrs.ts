import kebabCase from 'lodash/kebabCase';

export interface VNodeAttrs {
    class: Array<string> | string | undefined;
    style: any | undefined;
}

export function compose(vna: VNodeAttrs): string {
    let attrs = [];
    if (vna.class instanceof Array<string>) {
        const classes = vna.class.map(i => `.${i}`).join(' ');
        attrs.push(`class="${classes}"`);
    } else if (typeof vna.class == 'string') {
        attrs.push(`class=".${vna.class}"`);
    }

    if (vna.style instanceof Object) {
        const styles = Object.keys(vna.style).map(k => {
            const n = kebabCase(k);
            return `${n}: ${vna.style[k]}`;
        }).join(';')
        attrs.push(`style="${styles}"`);
    }

    return attrs.join(' ');
}