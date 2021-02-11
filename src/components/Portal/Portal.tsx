import { _Window } from 'openfin-adapter/src/api/window';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';

import Styles from './Portal.module.scss';

type Props = {
    id: string;
    initialBounds: { x: number; y: number; width: number; height: number };
    onWindowClose?: () => void;
};

const Portal: React.FC<Props> = (props) => {
    const { initialBounds, id, onWindowClose, children } = props;
    const portalWindow = React.useRef<_Window>();
    const portalWebWindow = React.useRef<Window>();

    const renderPortal = () => {
        if (portalWebWindow.current) {
            ReactDOM.render(
                <Provider store={store}><div className={Styles.resets}>{children}</div></Provider>,
                portalWebWindow.current.document.getElementById('root')
            );
        }
    }

    const setupListeners = () => {
        if (portalWindow.current) {
            portalWindow.current.on('close-requested', onWindowClose);
        }
    }
    console.log(1444423);

    React.useEffect(() => {
        (async () => {
            const existingWindow = (await fin.Application.getCurrentSync().getChildWindows()).find(e => e.identity.name === id);

            if (existingWindow) {
                portalWindow.current = existingWindow;
            } else {
                portalWindow.current = await fin.Window.create({
                    url: '/template.html',
                    name: id,
                    autoShow: false,
                    defaultLeft: initialBounds.x,
                    defaultTop: initialBounds.y,
                    defaultWidth: initialBounds.width,
                    defaultHeight: initialBounds.height,
                    saveWindowState: false
                });
            }
            portalWebWindow.current = portalWindow.current.getWebWindow();

            setupListeners();
            renderPortal();

            portalWindow.current.show();
        })();

        return () => {
            portalWindow.current.removeAllListeners();
            portalWindow.current.close(true);
        };
    }, []);

    React.useEffect(() => {
        renderPortal();
    }, [children]);

    return null;
};

export default Portal;
