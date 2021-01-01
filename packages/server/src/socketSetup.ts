// prettier-ignore
import { AddGameAction, ADD_GAME, AdminLoginAction, ADMIN_LOGIN, AuthenticateAction, AUTHENTICATED, CLIENT_ACTION, DatabaseStatusAction, DATABASE_STATUS, DB_FAIL, DB_SUCCESS, DeleteGameAction, DELETE_GAME, LOGIN, LoginAction, ResetGameAction, RESET_GAME, SERVER_ACTION, ToggleActiveAction, TOGGLE_ACTIVE, UNAUTHENTICATE, UnauthenticateAction } from '@monorepo/common';
import { Socket } from 'socket.io';
import { addGame, adminLogin, deleteGame, login, resetGame, toggleActive, unauthenticate } from './actions';
import { Game } from './classes';
import { pool } from './database';

export const socketSetup = async (socket: Socket) => {
    console.log('socket connected');

    try {
        const conn = await pool.getConnection();
        const databaseStatusAction: DatabaseStatusAction = {
            type: DATABASE_STATUS,
            payload: DB_SUCCESS
        };
        socket.emit(SERVER_ACTION, databaseStatusAction);
        conn.release();
    } catch (error) {
        const databaseStatusAction: DatabaseStatusAction = {
            type: DATABASE_STATUS,
            payload: DB_FAIL
        };
        socket.emit(SERVER_ACTION, databaseStatusAction);
    }

    if (socket.request.session.ir2) {
        const ir2 = socket.request.session.ir2;
        const authenticateAction: AuthenticateAction = {
            type: AUTHENTICATED,
            payload: {
                ir2,
                games: ir2.courseDirector ? await Game.all() : undefined
            }
        };

        socket.emit(SERVER_ACTION, authenticateAction);
    }

    // TODO: could import redux types for here
    socket.on(CLIENT_ACTION, (action: { type: string }) => {
        try {
            switch (action.type) {
                case LOGIN:
                    login(socket, action as LoginAction);
                    break;
                case ADMIN_LOGIN:
                    adminLogin(socket, action as AdminLoginAction);
                    break;
                case UNAUTHENTICATE:
                    unauthenticate(socket, action as UnauthenticateAction);
                    break;
                case ADD_GAME:
                    addGame(socket, action as AddGameAction);
                    break;
                case DELETE_GAME:
                    deleteGame(socket, action as DeleteGameAction);
                    break;
                case TOGGLE_ACTIVE:
                    toggleActive(socket, action as ToggleActiveAction);
                    break;
                case RESET_GAME:
                    resetGame(socket, action as ResetGameAction);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });
};
