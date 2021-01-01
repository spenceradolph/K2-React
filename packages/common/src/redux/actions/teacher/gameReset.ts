/**
 * This Action only flows from server -> client.
 */

export const GAME_RESET = 'GAME_RESET';

export type GameResetAction = {
    type: typeof GAME_RESET;
    payload: {
        newGame: {
            gameId: number;
            gameSection: string;
            gameInstructor: string;
            gameActive: number;
        };
    };
};
