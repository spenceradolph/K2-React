import { AnyAction } from 'redux';
import { Ir2Session } from '..';
import {
    AuthenticateAction,
    AUTHENTICATED,
    DatabaseStatusAction,
    DATABASE_STATUS,
    DB_STATUS_TYPES,
    GameActiveToggledAction,
    GameResetAction,
    GAME_RESET,
    GAME_TOGGLED
} from '../actions';

export type AuthState = {
    session: Ir2Session; // TODO: possibly rename sesson to ir2 so it is consistent
    databaseStatus: DB_STATUS_TYPES;
};

const initialState: AuthState = {
    session: {},
    databaseStatus: 0
};

export function auth(state = initialState, action: AnyAction): AuthState {
    switch (action.type) {
        case DATABASE_STATUS:
            return {
                ...state,
                databaseStatus: (action as DatabaseStatusAction).payload
            };

        case AUTHENTICATED:
            return {
                ...state,
                session: (action as AuthenticateAction).payload.ir2
            };

        case GAME_TOGGLED:
            return {
                ...state,
                session: {
                    ...state.session,
                    teacher: state.session.teacher
                        ? {
                              ...state.session.teacher,
                              gameActive: (action as GameActiveToggledAction).payload.gameActive
                          }
                        : undefined
                }
            };

        case GAME_RESET:
            return {
                ...state,
                session: {
                    ...state.session,
                    teacher: (action as GameResetAction).payload.newGame
                }
            };

        default:
            return state;
    }
}
