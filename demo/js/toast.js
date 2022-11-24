function toast() {
    $v.div({
        class: 'jque-toast',
        style: {
            background: 'red',
        },
    }, () => {
        $v.div({
            class: 'jque-toast-box',
        }, () => {

        })
    });
}