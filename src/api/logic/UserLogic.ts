import { variables } from "../../common/Variables";
import { User } from "../models/User";

export const getUser = async (userId: number): Promise<User | null> => {
    try {
        const response = await fetch(variables.API_URL + `/api/User/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        const user: User = {
            id: json.id,
            username: json.username,
            password: json.password,
            firstname: json.firstname,
            lastname: json.lastname,
            TeamId: json.TeamId,
            isCoach: json.isCoach
        };

        return user;
    } catch (error) {
        console.error(`error happened getting user with id ${userId}: `, error);
        return null;
    }
};

export const getAllUsers = async (): Promise<User[] | null> => {
    try {
        const response = await fetch(variables.API_URL + '/api/User/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        const users: User[] = json.map((user: User) => {
            return {
                id: user.id,
                username: user.username,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                TeamId: user.TeamId,
                isCoach: user.isCoach
            };
        });
        return users;
    } catch (error) {
        console.error('error happened getting all users: ', error);
        return null;
    }
};

export const loginUser = async (username: string, password: string): Promise<User | null> => {
    try {
        const response = await fetch(variables.API_URL + '/api/User/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const json = await response.json();
        const user: User = {
            id: json.id,
            username: json.username,
            password: json.password,
            firstname: json.firstname || "",
            lastname: json.lastname || "",
            TeamId: json.TeamId || null,
            isCoach: json.isCoach || false
        };
        if (user.id > 0)
        {
            return user;
        }
        else
        {
            console.error('returned nothing: ', json);
            return null;
        }
    } catch (error) {
        console.error('error happened: ', error);
        return null;
    }
};
export const createUser = async (user: User): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/User/user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                username: user.username,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                TeamId: 0,
                isCoach: 0
            })
        });
        const json = await response.json();
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

export const updateUserTeam = async (user: User): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/User/updateteam', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user.id,
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                TeamId: user.TeamId,
                isCoach: 0
            })
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