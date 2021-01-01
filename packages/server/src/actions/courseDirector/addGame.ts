import { AddGameAction, GameAddedAction, GAME_ADDED, SERVER_ACTION, SERVER_REDIRECT } from '@monorepo/common';
import md5 from 'md5';
import { Socket } from 'socket.io';
import { Game } from '../../classes';

export const addGame = async (socket: Socket, action: AddGameAction) => {
    const session = socket.request.session;

    if (!session.ir2 || !session.ir2.courseDirector) {
        socket.emit(SERVER_REDIRECT, 'bad_session');
        return;
    }

    const { section, instructor, password } = action.payload;

    const passwordHash = md5(password);

    const game = await Game.add(section, instructor, passwordHash);
    if (!game) {
        // TODO: client side knows about the error when adding the game
        // could redirect to /courseDirector?gameAdd=fail or something similar
        // could send a socket action and have a component show an error based on state? (probably the best idea, but url error is more k2)
        // could have an alert that pops up?
        console.log('COULD NOT ADD GAME');

        return;
    }

    const { gameId, gameSection, gameInstructor, gameActive } = game;

    const gameAddedAction: GameAddedAction = {
        type: GAME_ADDED,
        payload: {
            game: {
                gameId,
                gameSection,
                gameInstructor,
                gameActive
            }
        }
    };

    socket.emit(SERVER_ACTION, gameAddedAction);
};
