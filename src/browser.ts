import { jQue, JQue } from './jque/all';

declare global {
    interface Window {
        $v: JQue
    }
}

window.$v = jQue;
