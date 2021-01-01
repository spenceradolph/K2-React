import { Dispatch } from 'redux';
import { FullState } from '../../reducers';
import { Emit } from '../../setupStore';

export const UNAUTHENTICATE = 'UNAUTHENTICATE';

export type UnauthenticateAction = {
    type: typeof UNAUTHENTICATE;
};

export const unauthenticate = () => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: Emit) => {
        const { auth } = getState();

        // Already Unauthenticated
        if (Object.keys(auth.session).length === 0) {
            return;
        }

        const unauthenticateAction: UnauthenticateAction = {
            type: UNAUTHENTICATE
        };

        sendToServer(unauthenticateAction);
    };
};
