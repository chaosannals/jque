import { JQue } from './jque/all';

declare global {
    interface Window {
        $v: JQue
    }
}

(function() {
    window.$v = new JQue();
})();
