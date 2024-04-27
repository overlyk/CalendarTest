import { useState } from "react";
import { variables } from "../../common/Variables";
import { Game } from "../models/Game";

export const getGame = async (gameId: number): Promise<Game | null> => {
    try {
        const response = await fetch(variables.API_URL + `/api/Game/${gameId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        // Assuming the JSON directly contains the user properties  
        const game: Game = {
            id: json.id,
            hometeamid: json.hometeamid,
            awayteamid: json.awayteamid,
            starttime: json.starttime,
            endtime: json.endtime,
        };
        return game;
    } catch (error) {
        console.error(`error happened getting user with id ${gameId}: `, error);
        return null;
    }
};
export const getAllGames = async (): Promise<Game[] | null> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Game/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        const games: Game[] = json.map((game: Game) => {
            return {
                id: game.id,
                hometeamid: game.hometeamid,
                awayteamid: game.awayteamid,
                starttime: game.starttime,
                endtime: game.endtime
            };
        });
        return games;
    } catch (error) {
        console.error('error happened getting all users: ', error);
        return null;
    }
};
export const createGame = async (game: Game): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Game/game', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                hometeamid: game.hometeamid,
                awayteamid: game.awayteamid,
                starttime: game.starttime,
                endtime: game.endtime,
            })
        });
        const json = await response.json();
        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};
export const updateGame = async (game: Game): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Game', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        });

        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};
export const deleteGame = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Game/' + id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};