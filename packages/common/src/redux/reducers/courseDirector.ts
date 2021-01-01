import { AnyAction } from 'redux';
import { AUTHENTICATED, GameAddedAction, GAME_ADDED } from '..';
import { AuthenticateAction, GameDeletedAction, GAME_DELETED } from '../actions';

export type CourseDirectorState = {
    games: {
        gameId: number;
        gameSection: string;
        gameInstructor: string;
        gameActive: number;
    }[];
};

const initialState: CourseDirectorState = {
    games: [],
};

export function courseDirector(state = initialState, action: AnyAction): CourseDirectorState {
    switch (action.type) {
        case AUTHENTICATED:
            if ((action as AuthenticateAction).payload.ir2.courseDirector) {
                return {
                    ...state,
                    games: (action as AuthenticateAction).payload.games!, // TODO: we know its there because courseDirector authentication action should include it? (could have separate actions for each type of authentication if needed)
                };
            }
            return state;
        case GAME_ADDED:
            return {
                ...state,
                games: [...state.games, (action as GameAddedAction).payload.game].sort((a, b) => a.gameId - b.gameId),
            };
        case GAME_DELETED:
            return {
                ...state,
                games: state.games.filter((game) => game.gameId !== (action as GameDeletedAction).payload.gameId),
            };
        default:
            return state;
    }
}
