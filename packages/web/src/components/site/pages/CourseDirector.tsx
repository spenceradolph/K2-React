import { addGame, AuthState, CourseDirectorState, deleteGame } from '@monorepo/common';
import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { Properties } from 'csstype';

interface Props {
    auth: AuthState;
    courseDirector: CourseDirectorState;
    addGame: typeof addGame;
    deleteGame: typeof deleteGame;
}

const styling: Properties = {
    border: '1px solid #555555'
};

export const CourseDirector = ({ auth, courseDirector, addGame, deleteGame }: Props) => {
    const history = useHistory();

    if (!auth.session.courseDirector) {
        history.push('/');
    }

    const [addSection, setAddSection] = useState('');
    const [addInstructor, setAddInstructor] = useState('');
    const [addPassword, setAddPassword] = useState('');
    const [addPasswordConfirm, setAddPasswordConfirm] = useState('');

    const [deleteGameId, setDeleteGameId] = useState('');

    const addGameSubmit = (e: FormEvent) => {
        e.preventDefault();
        addGame(addSection, addInstructor, addPassword, addPasswordConfirm);
    };

    const deleteGameSubmit = (e: FormEvent) => {
        e.preventDefault();
        // TODO: disable for entire project?
        // eslint-disable-next-line no-restricted-globals
        if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS GAME?')) {
            deleteGame(parseInt(deleteGameId));
        }
    };

    const currentGames = courseDirector.games.map((game) => {
        const { gameId, gameSection, gameInstructor, gameActive } = game;

        return (
            <tr key={gameId}>
                <td style={styling}>{gameId}</td>
                <td style={styling}>{gameSection}</td>
                <td style={styling}>{gameInstructor}</td>
                <td style={styling}>{gameActive === 1 ? 'True' : 'False'}</td>
            </tr>
        );
    });

    return (
        <>
            <h1>Add a Game</h1>
            <form
                onSubmit={(event) => {
                    addGameSubmit(event);
                }}
            >
                <table cellPadding={3} cellSpacing={1}>
                    <tbody>
                        <tr>
                            <td>Section</td>
                            <td>Teacher Last Name</td>
                            <td>Password</td>
                            <td>Password Confirm</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="ex: m1a1"
                                    required
                                    onChange={(event) => {
                                        setAddSection(event.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="ex: Smith"
                                    required
                                    onChange={(event) => {
                                        setAddInstructor(event.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="password"
                                    required
                                    onChange={(event) => {
                                        setAddPassword(event.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="password"
                                    required
                                    onChange={(event) => {
                                        setAddPasswordConfirm(event.target.value);
                                    }}
                                />
                            </td>
                            <td colSpan={2}>
                                <input type="submit" value="Add Game" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <h1>Current Games</h1>
            <table style={styling}>
                <tbody>
                    <tr>
                        <td style={styling}>Game Id</td>
                        <td style={styling}>Section</td>
                        <td style={styling}>Teacher Last Name</td>
                        <td style={styling}>Game Active</td>
                    </tr>
                    {currentGames}
                </tbody>
            </table>
            <h1>Delete a Game</h1>
            <form onSubmit={deleteGameSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Game Id</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Game Id #"
                                    required
                                    onChange={(event) => {
                                        setDeleteGameId(event.target.value);
                                    }}
                                />
                            </td>
                            <td colSpan={2}>
                                <input type="submit" value="Delete Game" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <br />
            <input
                type="submit"
                className="btn btn-danger"
                value="RESET DATABASE"
                onClick={() => {
                    alert('Function No Longer Supported');
                }}
            />
        </>
    );
};
