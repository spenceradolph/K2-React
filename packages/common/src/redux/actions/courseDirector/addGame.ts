import { Dispatch } from 'redux';
import { FullState } from '../../reducers';

export const ADD_GAME = 'ADD_GAME';

export type AddGameAction = {
    type: typeof ADD_GAME;
    payload: {
        section: string;
        instructor: string;
        password: string;
    };
};

export const addGame = (section: string, instructor: string, password: string, passwordConfirm: string) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: any) => {
        if (password !== passwordConfirm) {
            alert("passwords don't match"); // TODO: better user feedback about matching passwords? (what did k2 do?)
            return;
        }

        const addGameAction: AddGameAction = {
            type: ADD_GAME,
            payload: {
                section,
                instructor,
                password
            }
        };

        sendToServer(addGameAction);
    };
};
