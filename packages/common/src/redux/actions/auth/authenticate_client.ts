/**
 * This Action only flows from server -> client.
 */

import { Ir2Session } from '../..';

export const AUTHENTICATED = 'AUTHENTICATED';

export type AuthenticateAction = {
    type: typeof AUTHENTICATED;
    payload: {
        ir2: Ir2Session;
        games?: {
            gameId: number;
            gameSection: string;
            gameInstructor: string;
            gameActive: number;
        }[];
    };
};
