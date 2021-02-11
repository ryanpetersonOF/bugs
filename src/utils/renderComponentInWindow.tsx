import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store/store";

/**
 * Render a component into a window.
 * @param Component Component to render.
 * @param target DOM element to render to.
 * @param props Props to pass to the Component.
 */
export function renderComponentInWindow<T>(
    Component: (props: T) => React.ReactElement<T> | null,
    target: Element,
    props: T
): void {
    ReactDOM.render(
        <Provider store={store} >
            <Component {...props} />
        </Provider>,
        target
    );
}