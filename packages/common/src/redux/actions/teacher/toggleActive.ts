import { Dispatch } from 'redux';
import { FullState } from '../../reducers';

export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';

export type ToggleActiveAction = {
    type: typeof TOGGLE_ACTIVE;
};

export const toggleActive = () => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: any) => {
        const toggleActiveAction: ToggleActiveAction = {
            type: TOGGLE_ACTIVE
        };

        sendToServer(toggleActiveAction);
    };
};
