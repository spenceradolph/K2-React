import { AuthenticateAction, AUTHENTICATED, LoginAction, SERVER_ACTION, SERVER_REDIRECT } from '@monorepo/common';
import { BLUE, LOGGED_IN, RED, SPEC } from '@monorepo/common';
import { Socket } from 'socket.io';
import { Game } from '../../classes';

export const login = async (socket: Socket, action: LoginAction) => {
    const session = socket.request.session;

    const { section, instructor, team } = action.payload;

    // Get the game
    const game = await Game.getBySection(section, instructor);
    if (!game) {
        socket.emit(SERVER_REDIRECT, 'game_does_not_exist');
        return;
    }

    // Is the game active?
    const { gameActive, gameBlueJoined, gameRedJoined } = game;
    if (!gameActive) {
        socket.emit(SERVER_REDIRECT, 'game_not_active');
        return;
    }

    // Input validation
    if (![SPEC, BLUE, RED].includes(team)) {
        socket.emit(SERVER_REDIRECT, 'invalid_team_input');
        return;
    }

    // Additional Checks for team controllers
    if (team != SPEC) {
        const teamAlreadyJoined = team === BLUE ? gameBlueJoined : gameRedJoined;
        if (teamAlreadyJoined) {
            socket.emit(SERVER_REDIRECT, 'already_logged_in');
            return;
        }

        await game.setLoggedIn(team, LOGGED_IN);
    }

    // set the session
    session.ir2 = {
        game: {
            gameId: game.gameId,
            gameTeam: team
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
