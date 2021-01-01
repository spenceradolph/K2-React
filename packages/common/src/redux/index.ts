export * from './actions';
export * from './reducers';
export * from './setupStore';

export const SERVER_ACTION = 'SERVER_ACTION';
export const SERVER_REDIRECT = 'SERVER_REDIRECT';
export const CLIENT_ACTION = 'CLIENT_ACTION';

// TODO: might be better if teacher had a reducer like courseDirector, but perhaps simpler to leave as is for now (don't want session and db to desync)
export type Ir2Session = {
    courseDirector?: boolean;
    teacher?: {
        gameId: number;
        gameSection: string;
        gameInstructor: string;
        gameActive: number;
    };
    game?: {
        gameId: number;
        gameTeam: number; // TODO: 0, 1, 2?
    };
};
