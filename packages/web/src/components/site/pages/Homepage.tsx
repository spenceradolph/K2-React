import { AuthState, BLUE, RED, SPEC } from '@monorepo/common';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    auth: AuthState;
    login: (section: string, instructor: string, team: number) => void; // TODO: figure out better typing (ideally -> 'typeof login')
    adminLogin: (section: string, instructor: string, password: string) => void;
}

export const Homepage = ({ login, auth, adminLogin }: Props): any => {
    let history = useHistory();

    const gameLoginError = ''; // TODO: list errors here (from dispatch reducer?)
    const databaseStatuses = ['Loading...', 'FAILED', 'SUCCESS'];
    const databaseColors = ['grey', 'red', 'green'];
    const databaseStatus = (
        <div style={{ color: databaseColors[auth.databaseStatus], display: 'inline-block' }}>{databaseStatuses[auth.databaseStatus]}</div>
    );

    const [section, setSection] = useState('');
    const [instructor, setInstructor] = useState('');
    const [team, setTeam] = useState(SPEC);

    const [adminSection, setAdminSection] = useState('');
    const [adminInstructor, setAdminInstructor] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const gameLoginSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(section, instructor, team);
    };

    const adminLoginSubmit = (e: FormEvent) => {
        e.preventDefault();
        adminLogin(adminSection, adminInstructor, adminPassword);
    };

    if (auth.session) {
        if (auth.session.courseDirector) {
            history.push('/courseDirector');
        } else if (auth.session.teacher) {
            history.push('/teacher');
        } else if (auth.session.game) {
            history.push('/game');
        }
    }

    return (
        <>
            Database Active Status: {databaseStatus}
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
