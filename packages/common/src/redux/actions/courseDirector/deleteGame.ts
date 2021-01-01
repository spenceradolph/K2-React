import { Dispatch } from 'redux';
import { FullState } from '../../reducers';

export const DELETE_GAME = 'DELETE_GAME';

export type DeleteGameAction = {
    type: typeof DELETE_GAME;
    payload: {
        gameId: number;
    };
};

export const deleteGame = (gameId: number) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: any) => {
        const deleteGameAction: DeleteGameAction = {
            type: DELETE_GAME,
            payload: {
                gameId
            }
        };

        sendToServer(deleteGameAction);
    };
};
