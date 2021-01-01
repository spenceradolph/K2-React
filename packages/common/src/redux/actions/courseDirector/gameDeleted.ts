/**
 * This Action only flows from server -> client.
 * // TODO: consider putting into addGame.ts for simplicity (all game adding action related stuff in one place)
 */

export const GAME_DELETED = 'GAME_DELETED';

// TODO: types from the game class? (unlikely?)
export type GameDeletedAction = {
    type: typeof GAME_DELETED;
    payload: {
        gameId: number;
    };
};
