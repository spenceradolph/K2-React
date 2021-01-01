/**
 * This Action only flows from server -> client.
 * // TODO: consider putting into addGame.ts for simplicity (all game adding action related stuff in one place)
 */

export const GAME_ADDED = 'GAME_ADDED';

// TODO: types from the game class? (unlikely?)
export type GameAddedAction = {
    type: typeof GAME_ADDED;
    payload: {
        game: {
            gameId: number;
            gameSection: string;
            gameInstructor: string;
            gameActive: number;
        };
    };
};
