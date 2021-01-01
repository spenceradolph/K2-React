import { Dispatch } from 'redux';
import { FullState } from '../../reducers';

export const UNAUTHENTICATE = 'UNAUTHENTICATE';

export type UnauthenticateAction = {
    type: typeof UNAUTHENTICATE;
};

export const unauthenticate = (section: string, instructor: string, team: number) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: any) => {
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
