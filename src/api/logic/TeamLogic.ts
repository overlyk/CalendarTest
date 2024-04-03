import { useState } from "react";
import { variables } from "../../common/Variables";
import { Team } from "../models/Team";

export const getUser = async (teamId: number): Promise<Team | null> => {
    try {
        const response = await fetch(variables.API_URL + `/api/Team/${teamId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        // Assuming the JSON directly contains the user properties

        //TODO - update properties here
        const team: Team = {
            id: json.id,
            sport: json.sport,
            coachid: json.coachid,
            name: json.name
        };

        return team;
    } catch (error) {
        console.error(`error happened getting user with id ${teamId}: `, error);
        return null;
    }
};

export const getAllTeams = async (): Promise<Team[] | null> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Team/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        //parse the response into a json object
        const json = await response.json();
        //"map" the objects to an array
        const teams: Team[] = json.map((team: Team) => {

            //TODO-UPDATE PROPERTIES HERE
            return {
                id: team.id,
                sport: team.sport,
                coachid: team.coachid,
                name: team.name
            };
        });
        return teams;
    } catch (error) {
        console.error('error happened getting all users: ', error);
        return null;
    }
};

export const createTeam = async (team: Team): Promise<boolean> => {
    //console.log('test '  + user.username + ' ' + user.password + ' ' + user.firstname + ' ' + user.lastname + ' ' + user.TeamId + ' ' + user.isCoach);
    try {
        const response = await fetch(variables.API_URL + '/api/Team/team', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            //UPDATE PROPERTIES TODO
            body: JSON.stringify({
                id: 0,
                sport: team.sport,
                coachid: team.coachid,
                name: team.name
            })
        });
        const json = await response.json();
        console.log('test '  + response.url);
        console.log('test '  + response.status);
        return response.ok;
    } catch (error) {
        console.log('test error '  + error);
        console.error('error happened: ', error);
        return false;
    }
};

export const updateTeam = async (team: Team): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Team', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(team)
        });

        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};

export const deleteTeam = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Team/' + id, {
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