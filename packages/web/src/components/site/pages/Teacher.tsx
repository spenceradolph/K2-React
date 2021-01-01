import { FullState, resetGame, toggleActive } from '@monorepo/common';
import { useEffect } from 'react';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const Teacher = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: FullState) => state);

    const history = useHistory();
    useEffect(() => {
        if (!auth.session.teacher) {
            history.push('/');
        }
    });

    const submitToggleActive = (e: FormEvent) => {
        e.preventDefault();
        dispatch(toggleActive());
    };

    const submitResetGame = (e: FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        if (confirm('ARE YOU SURE YOU WANT TO COMPLETELY RESET THIS GAME?')) {
            if (
                // eslint-disable-next-line no-restricted-globals
                confirm(
                    'This will delete all information for the game and set it back to the initial start state of the game.\n\n   ARE YOU SURE YOU WANT TO RESET?'
                )
            ) {
                dispatch(resetGame());
                // TODO: also resets the gameActive? (in session and in reducer)
                // TODO: consider disabling the button temporarily while the request is being processed by the server...
            }
        }
    };

    return (
        <>
            <h2>Teacher Tools</h2>
            <span className="important" id="section">
                Section: {auth.session.teacher ? auth.session.teacher.gameSection : 'loading...'}
            </span>
            <br />
            <span className="important" id="instructor">
                Instructor: {auth.session.teacher ? auth.session.teacher.gameInstructor : 'loading...'}
            </span>
            <br />
            <hr />
            <h3>Activate / Deactivate Game</h3>
            <span>Inactive</span>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={auth.session.teacher ? (auth.session.teacher.gameActive ? true : false) : false}
                    onChange={(event) => {
                        submitToggleActive(event);
                    }}
                />
                <span id="slider1" className="slider round"></span>
            </label>
            <span>Active</span>
            <hr />
            <h3>News Alerts for this game:</h3>
            <h1>/ / TODO</h1>
            <hr />
            <button
                className="btn btn-danger"
                onClick={(event) => {
                    submitResetGame(event);
                }}
            >
                RESET GAME
            </button>
            <br />
        </>
    );
};
