/**
 * This Action only flows from server -> client.
 */

export const DATABASE_STATUS = 'DATABASE_STATUS';

export const DB_SUCCESS = 2;
export const DB_FAIL = 1;
export const DB_UNKNOWN = 0;
export type DB_STATUS_TYPES = typeof DB_SUCCESS | typeof DB_FAIL | typeof DB_UNKNOWN;

export type DatabaseStatusAction = {
    type: typeof DATABASE_STATUS;
    payload: DB_STATUS_TYPES;
};
