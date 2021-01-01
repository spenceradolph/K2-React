import { adminLogin, BLUE, FullState, login, RED, SPEC, TeamType } from '@monorepo/common';
import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const Homepage = (): any => {
    const dispatch = useDispatch();
    const { session, databaseStatus } = useSelector((state: FullState) => state.auth);

    const history = useHistory();
    useEffect(() => {
        if (session) {
            if (session.courseDirector) {
                history.push('/courseDirector');
            } else if (session.teacher) {
                history.push('/teacher');
            } else if (session.game) {
                history.push('/game');
            }
        }
    });

    const gameLoginError = ''; // TODO: list errors here (from dispatch reducer?)
    const databaseStatuses = ['Loading...', 'FAILED', 'SUCCESS'];
    const databaseColors = ['grey', 'red', 'green'];
    const dbStatus = <div style={{ color: databaseColors[databaseStatus], display: 'inline-block' }}>{databaseStatuses[databaseStatus]}</div>;

    const [section, setSection] = useState('');
    const [instructor, setInstructor] = useState('');
    const [team, setTeam] = useState<TeamType>(SPEC);
    const [adminSection, setAdminSection] = useState('');
    const [adminInstructor, setAdminInstructor] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const gameLoginSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login(section, instructor, team));
    };

    const adminLoginSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(adminLogin(adminSection, adminInstructor, adminPassword));
    };

    return (
        <>
            Database Active Status: {dbStatus}
            <table cellPadding="30" cellSpacing="10">
                <tbody>
                    <tr>
                        <td>
                            <h3>Player Login</h3>
                            <form
                                onSubmit={(event) => {
                                    gameLoginSubmit(event);
                                }}
                            >
                                <table cellPadding="3" cellSpacing="1">
                                    <tbody>
                                        <tr>
                                            <td colSpan={2}>
                                                <div className="formError" style={{ color: 'red' }}>
                                                    {gameLoginError}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Section</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="ex: m1a1"
                                                    required
                                                    onChange={(event) => {
                                                        setSection(event.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Teacher Last Name</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="ex: Smith"
                                                    required
                                                    onChange={(event) => {
                                                        setInstructor(event.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Team</td>
                                            <td>
                                                <input type="radio" value={SPEC} defaultChecked onClick={() => setTeam(SPEC)} />
                                                {' Spectator -> Click this unless told otherwise by instructor.'}
                                                <br />
                                                <input type="radio" value={BLUE} onClick={() => setTeam(BLUE)} />
                                                <div style={{ color: 'blue', display: 'inline-block', marginLeft: '100' }}>
                                                    &nbsp;Vestrland Commander
                                                </div>
                                                <br />
                                                <input type="radio" value={RED} onClick={() => setTeam(RED)} />
                                                <div style={{ color: 'red', display: 'inline-block' }}>&nbsp;Zuun Commander</div>
                                                <br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <br />
                                                <input type="submit" value="Game Login" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </td>
                        <td>
                            <h3>Teacher Login</h3>
                            <form
                                onSubmit={(event) => {
                                    adminLoginSubmit(event);
                                }}
                            >
                                <table cellPadding="3" cellSpacing="1">
                                    <tbody>
                                        <tr>
                                            <td>Section</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="ex: m1a1"
                                                    required
                                                    onChange={(event) => {
                                                        setAdminSection(event.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Teacher Last Name</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="ex: Smith"
                                                    required
                                                    onChange={(event) => {
                                                        setAdminInstructor(event.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Password</td>
                                            <td>
                                                <input
                                                    type="password"
                                                    required
                                                    onChange={(event) => {
                                                        setAdminPassword(event.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <br />
                                                <input type="submit" value="Admin Login" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};
