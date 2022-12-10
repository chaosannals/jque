function toast(parentScope) {
    // 必须采用这种形式，Compose 包揽住作用域。
    // 类似 Jetpack Compose 的 @Composable 注解
    return parentScope.compose((scope) => {
        const data = scope.remember(() => {
            return {
                boxes: [],
            };
        });

        // 一层
        scope.view('div', {
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
            // 二层 循环
            for (let i in data.boxes) {
                let box = data.boxes[i];
                s1.view('div', {
                    class: 'jque-toast-box',
                    style: {
                        padding: '.5em 2em',
                        margin: '.5em',
                        borderRadius: '1em',
                        background: 'red',
                        color: 'white',
                    },
                }, (s) => s.text(box.text), i);
            }
        });

        return (text, ms = 3000) => {
            const now = (new Date).getTime();
            const box = {
                text: text + '-' + now,
                startTime: now + ms,
            };
            data.boxes.push(box);
            if (data.boxes.length <= 1) {
                const tick = () => {
                    const n = (new Date).getTime();
                    data.boxes = data.boxes.filter(i => i.startTime > n);
                    if (data.boxes.length > 0) {
                        setTimeout(tick, 444);
                    }
                };
                setTimeout(tick, 444);
            }
        };
    });
}