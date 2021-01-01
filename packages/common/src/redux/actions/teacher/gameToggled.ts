/**
 * This Action only flows from server -> client.
 */

export const GAME_TOGGLED = 'GAME_TOGGLED';

// TODO: types from the game class? (unlikely?)
export type GameActiveToggledAction = {
    type: typeof GAME_TOGGLED;
    payload: {
        gameActive: number;
    };
};
