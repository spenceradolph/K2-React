import { Dispatch } from 'redux';
import { FullState } from '../../reducers';
import { Emit } from '../../setupStore';

export const ADMIN_LOGIN = 'ADMIN_LOGIN';

export type AdminLoginAction = {
    type: typeof ADMIN_LOGIN;
    payload: {
        section: string;
        instructor: string;
        password: string;
    };
};

export const adminLogin = (section: string, instructor: string, password: string) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: Emit) => {
        const adminLoginAction: AdminLoginAction = {
            type: ADMIN_LOGIN,
            payload: {
                section,
                instructor,
                password
            }
        };

        sendToServer(adminLoginAction);
    };
};
