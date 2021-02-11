import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Blue from '../components/Blue';
import store from '../store/store';

const urlParams = new URLSearchParams(window.location.search);

ReactDOM.render(
    <Provider store={store}>
        <p>I am a normal page in a window. I get my original parent state count as a query string. I cannot have dynamic children, and despite me having a store, I can't talk to the main store like the other windows can.</p>
        <Blue title="Page Window" onDecrement={() => { }} onIncrement={() => { }} parentCount={parseInt(urlParams.get('count'))} />
    </Provider>,
    document.getElementById('root')
);