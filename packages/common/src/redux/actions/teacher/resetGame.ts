import { Dispatch } from 'redux';
import { FullState } from '../../reducers';

export const RESET_GAME = 'RESET_GAME';

export type ResetGameAction = {
    type: typeof RESET_GAME;
};

export const resetGame = () => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: any) => {
        const resetGameAction: ResetGameAction = {
            type: RESET_GAME
        };

        sendToServer(resetGameAction);
    };
};
