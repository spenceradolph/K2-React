import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Socket } from 'socket.io-client';
import { CLIENT_ACTION, SERVER_ACTION, SERVER_REDIRECT } from '.';
import { rootReducer } from './reducers';

export type Emit = (action: AnyAction) => Socket;

export const setupStore = (socket: Socket) => {
    socket.on(SERVER_ACTION, (reduxAction: AnyAction) => {
        store.dispatch(reduxAction);
    });

    // TODO: instead of /?error={} make the serverError into nextLocation so you can redirect to other routes (such as /courseDirector?gameAdd=success)
    socket.on(SERVER_REDIRECT, (serverError: string) => {
        window.location.replace(`/?error=${serverError}`);
    });

    const emit = (action: AnyAction) => socket.emit(CLIENT_ACTION, action);
    const middleware = [thunk.withExtraArgument(emit)];

    const initialState = {};

    const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

    return store;
};
