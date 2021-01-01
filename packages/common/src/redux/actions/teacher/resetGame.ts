import { Dispatch } from 'redux';
import { FullState } from '../../reducers';
import { Emit } from '../../setupStore';

export const RESET_GAME = 'RESET_GAME';

export type ResetGameAction = {
    type: typeof RESET_GAME;
};

export const resetGame = async () => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: Emit) => {
        const resetGameAction: ResetGameAction = {
            type: RESET_GAME
        };

        sendToServer(resetGameAction);
    };
};
