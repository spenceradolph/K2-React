import { BLUE, RED, SPEC } from '../../../constants';
import { Dispatch } from 'redux';
import { FullState } from '../../reducers';
import { Emit } from '../../setupStore';

export const LOGIN = 'LOGIN';

export type TeamType = typeof BLUE | typeof RED | typeof SPEC;

export type LoginAction = {
    type: typeof LOGIN;
    payload: {
        section: string;
        instructor: string;
        team: TeamType;
    };
};

export const login = async (section: string, instructor: string, team: TeamType) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: Emit) => {
        const loginAction: LoginAction = {
            type: LOGIN,
            payload: {
                section,
                instructor,
                team
            }
        };

        sendToServer(loginAction);
    };
};
