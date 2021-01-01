import { BLUE, RED } from '@monorepo/common';
import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../database';

export type GameType = {
    gameId: number;
    gameSection: string;
    gameInstructor: string;
    gameAdminPassword: string;
    gameActive: 0 | 1; // TODO: potentially type for this? (ActivatedTypes) ... could also figure out sql boolean type instead of INT(1)
    gameBlueJoined: 0 | 1;
    gameRedJoined: 0 | 1;
};

class GameProperties {
    readonly gameId: GameType['gameId'];
    readonly gameSection!: GameType['gameSection'];
    readonly gameInstructor!: GameType['gameInstructor'];
    gameAdminPassword!: GameType['gameAdminPassword'];
    gameActive!: GameType['gameActive'];
    gameBlueJoined!: GameType['gameBlueJoined'];
    gameRedJoined!: GameType['gameBlueJoined'];

    constructor(gameId: GameType['gameId']) {
        this.gameId = gameId;
    }
}

export class Game extends GameProperties implements GameType {
    static async all() {
        const queryString = 'SELECT gameId, gameSection, gameInstructor, gameActive FROM games';
        const [results] = await pool.query<RowDataPacket[] & GameType[]>(queryString);
        return results;
    }

    static async getId(gameSection: GameType['gameSection'], gameInstructor: GameType['gameInstructor']) {
        const queryString = 'SELECT * FROM games WHERE gameSection = ? AND gameInstructor = ?';
        const inserts = [gameSection, gameInstructor];
        const [results] = await pool.query<RowDataPacket[] & GameType[]>(queryString, inserts);

        if (results.length !== 1) return null;
        return results[0].gameId;
    }

    static async getById(gameId: GameType['gameId']) {
        const queryString = 'SELECT * FROM games WHERE gameId = ?';
        const inserts = [gameId];

        const [results] = await pool.query<RowDataPacket[] & GameType[]>(queryString, inserts);
        if (results.length !== 1) return null;

        const game = new Game(gameId);
        Object.assign(game, results[0]);
        return game;
    }

    static async getBySection(section: GameType['gameSection'], instructor: GameType['gameInstructor']) {
        const id = await Game.getId(section, instructor);
        if (!id) return null;

        const game = await Game.getById(id);
        return game;
    }

    static async add(section: GameType['gameSection'], instructor: GameType['gameInstructor'], passwordHash: GameType['gameAdminPassword']) {
        const queryString = 'INSERT INTO games (gameSection, gameInstructor, gameAdminPassword) VALUES (?, ?, ?)';
        const inserts = [section, instructor, passwordHash];
        await pool.query(queryString, inserts);

        const game = await Game.getBySection(section, instructor);
        return game;
    }

    async delete() {
        const queryString = 'DELETE FROM games WHERE gameId = ?';
        const inserts = [this.gameId];
        await pool.query(queryString, inserts);
    }

    async toggleActive() {
        const queryString = 'UPDATE games SET gameActive = (gameActive + 1) % 2, gameBlueJoined = 0, gameRedJoined = 0 WHERE gameId = ?';
        const inserts = [this.gameId];
        await pool.query(queryString, inserts);
        this.gameActive = this.gameActive === 0 ? 1 : 0;
    }

    async reset() {
        // TODO: keep the old id if possible (multiple add methods? (k3 had options for add function that included optional id)
        await this.delete();
        const newGame = await Game.add(this.gameSection, this.gameInstructor, this.gameAdminPassword);
        return newGame;
    }

    async setLoggedIn(gameTeam: typeof BLUE | typeof RED, value: GameType['gameBlueJoined']) {
        const queryString = 'UPDATE games SET ?? = ? WHERE gameId = ?';
        const inserts = [`game${gameTeam}Joined`, value, this.gameId];
        await pool.query(queryString, inserts);
        this[gameTeam === BLUE ? 'gameBlueJoined' : 'gameRedJoined'] = value;
    }
}
