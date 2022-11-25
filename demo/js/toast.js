function toast(scope) {
    return scope.compose('div', {
        class: 'jque-toast',
        style: {
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 4444,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            pointerEvents: 'none',
        },
    }, (s1) => {
        const data = s1.remember(() => {
            return {
                boxes: [],
            };
        });
        console.log('s1', data.boxes);
        for (let box of data.boxes) {
            console.log('for');
            s1.view('div', {
                class: 'jque-toast-box',
                style: {
                    padding: '5em 2em',
                    margin: '2em',
                    borderRadius: '1em',
                    background: 'red',
                    color: 'white',
                },
            }, (s) => s.text(box.text));
        }
        return (text, ms = 3000) => {
            console.log('toast');
            const now = (new Date).getTime();
            const box = {
                text: text,
                startTime: now + ms,
            };
            data.boxes.push(box);
            if (data.boxes.length <= 1) {
                const tick = () => {
                    const n = (new Date).getTime();
                    data.boxes = data.boxes.filter(i => i.startTime > n);
                    console.log('toast tick', n, data.boxes);
                    if (data.boxes.length > 0) {
                        setTimeout(tick, 444);
                    }
                };
                setTimeout(tick, 444);
            }
        };
    });
}