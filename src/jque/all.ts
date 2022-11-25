import { JQueScope, JQueComposeAction } from './scope';

export interface JQue {
    app(selector: string, inner: Function): void;

}

export const jQue : JQue = {
    app(selector: string, action: JQueComposeAction) {
        const element = document.body.querySelector(selector) as HTMLElement;
        const scope = new JQueScope(element);
        scope.composeAction = action;
        action(scope);
    },
};
