import { AuthenticateAction, AUTHENTICATED, SERVER_ACTION, UnauthenticateAction } from '@monorepo/common';
import { Socket } from 'socket.io';

export const unauthenticate = async (socket: Socket, action: UnauthenticateAction) => {
    const session = socket.request.session;

    session.ir2 = {};
    session.save();

    const authAction: AuthenticateAction = {
        type: AUTHENTICATED,
        payload: {
            ir2: session.ir2
        }
    };

    socket.emit(SERVER_ACTION, authAction);
};
