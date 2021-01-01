import { BLUE, RED, SPEC } from '../../../constants';
import { Dispatch } from 'redux';
import { FullState } from '../../reducers';

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

export const login = (section: string, instructor: string, team: TeamType) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: any) => {
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
