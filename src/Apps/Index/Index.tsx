import React from 'react';
import './Index.scss';

const Index: React.FC = () => {
    const [bounds, setBounds] = React.useState({});


    React.useEffect(() => {
        const win = fin.Window.getCurrentSync();
        window.addEventListener('keydown', (e) => {
            (async () => {

                if (e.key === "1") {
                    await win.animate({ size: { duration: 1000, height: -100, width: -100, relative: true } }, { interrupt: true })
                } else if (e.key === "2") {
                    await win.animate({ size: { duration: 1000, height: 100, width: 100, relative: true } }, { interrupt: true })
                }
            })()
        });

        setInterval(() => {
            (async () => {
                setBounds(await win.getBounds());
            })();
        }, 500);
    }, []);


    return (
        <div style={{ padding: '12px' }}>
            <h2>Window Animating Demo</h2>
            <p>Move the window around and press one of the two buttons below. Observe flaky behavior!</p>
            <p>
                Press '1' to decrease window size
            </p>
            <p>
                Press '2' to increase window size
            </p>

            <div>
                <p>Window Bounds {JSON.stringify(bounds)}</p>
            </div>
        </div>
    )
}

export default Index;