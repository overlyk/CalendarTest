import { useState } from "react";
import { variables } from "../../common/Variables";
import { User } from "../models/User";

export const getUser = async (): Promise<User | null> => {
    try {
        const response = await fetch(variables.API_URL + '/api/User', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();
        // Assuming the JSON directly contains the user properties
        const user: User = {
            id: json.id,
            Name: json.Name,
            Password: json.Password
        };

        return user;
    } catch (error) {
        console.error('error happened: ', error);
        return null;
    }
};

export const createUser = async (user: User): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/User', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};

export const updateUser = async (user: User): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/User', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/User/' + id, {
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

