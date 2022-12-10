import { JQueScope, JQueComposeAction } from './scope';

export interface JQue {
    app(selector: string, action: JQueComposeAction): void;

}

export const jQue : JQue = {
    app(selector: string, action: JQueComposeAction) {
        const element = document.body.querySelector(selector) as HTMLElement;
        const scope = new JQueScope();
        scope.element = element;
        scope.composeAction = action;
        action(scope);
    },
};
