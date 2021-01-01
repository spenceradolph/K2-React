import { setupStore } from '@monorepo/common';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { App } from './components';
import './Style.css';

const socket = io(`${window.location.hostname}`, {
    transports: ['websocket', 'polling'],
    upgrade: true,
    rememberUpgrade: true,
    secure: true
});

ReactDOM.render(
    <Provider store={setupStore(socket)}>
        <App />
    </Provider>,
    document.getElementById('root')
);
