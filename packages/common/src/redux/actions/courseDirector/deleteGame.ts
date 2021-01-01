import { Dispatch } from 'redux';
import { FullState } from '../../reducers';
import { Emit } from '../../setupStore';

export const DELETE_GAME = 'DELETE_GAME';

export type DeleteGameAction = {
    type: typeof DELETE_GAME;
    payload: {
        gameId: number;
    };
};

export const deleteGame = (gameId: number) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: Emit) => {
        const deleteGameAction: DeleteGameAction = {
            type: DELETE_GAME,
            payload: {
                gameId
            }
        };

        sendToServer(deleteGameAction);
    };
};
