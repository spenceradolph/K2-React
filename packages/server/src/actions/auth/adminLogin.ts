import { AdminLoginAction, AuthenticateAction, AUTHENTICATED, SERVER_ACTION, SERVER_REDIRECT } from '@monorepo/common';
import md5 from 'md5';
import { Socket } from 'socket.io';
import { Game } from '../../classes';

export const adminLogin = async (socket: Socket, action: AdminLoginAction) => {
    const session = socket.request.session;

    const { section, instructor, password } = action.payload;

    // TODO: better authentication here (combine with authentication below?) (md5 + env variables?)
    if (section == 'CourseDirector' && instructor == 'adolph' && password == 'asdf') {
        session.ir2 = {
            courseDirector: true
        };
        session.save();

        const games = await Game.all();

        const authAction: AuthenticateAction = {
            type: AUTHENTICATED,
            payload: {
                ir2: session.ir2,
                games
            }
        };

        socket.emit(SERVER_ACTION, authAction);
        return;
    }

    // Get the game
    const game = await Game.getBySection(section, instructor);
    if (!game) {
        socket.emit(SERVER_REDIRECT, 'game_does_not_exist');
        return;
    }

    const { gameAdminPassword } = game;

    // verify password
    if (md5(password) != gameAdminPassword) {
        socket.emit(SERVER_REDIRECT, 'teacher_unauthorized');
        return;
    }

    const { gameId, gameSection, gameInstructor, gameActive } = game;

    // set the session
    session.ir2 = {
        teacher: {
            gameId,
            gameSection,
            gameInstructor,
            gameActive
        }
    };
    session.save();

    // authenticate client
    const authAction: AuthenticateAction = {
        type: AUTHENTICATED,
        payload: {
            ir2: session.ir2
        }
    };

    socket.emit(SERVER_ACTION, authAction);
};
