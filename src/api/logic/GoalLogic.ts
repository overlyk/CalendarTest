import { variables } from "../../common/Variables";
import { Goal } from "../models/Goal";

export const getGoal = async (goalId: number): Promise<Goal | null> => {
    try {
        const response = await fetch(variables.API_URL + `/api/Goal/${goalId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        const goal: Goal = {
            id: json.id,
            userid: json.userid,
            name: json.name,
            description: json.description,
            isCompleted: json.isCompleted,
            teamid: json.teamid
        };

        return goal;
    } catch (error) {
        console.error(`error happened getting user with id ${goalId}: `, error);
        return null;
    }
};
export const getAllGoals = async (): Promise<Goal[] | null> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Goal/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        const goals: Goal[] = json.map((goal: Goal) => {
            return {
                id: goal.id,
                userid: goal.userid,
                name: goal.name,
                description: goal.description,
                isCompleted: goal.isCompleted,
                teamid: goal.teamid
            };
        });
        return goals;
    } catch (error) {
        console.error('error happened getting all users: ', error);
        return null;
    }
};

export const createGoal = async (goal: Goal): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Goal/goal', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                userid: goal.userid,
                name: goal.name,
                description: goal.description,
                isCompleted: goal.isCompleted,
                teamid: goal.teamid
            })
        });
        const json = await response.json();
        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};

export const updateGoal = async (goal: Goal): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Goal', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(goal)
        });

        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};

export const toggleGoalCompletion = async (goal: Goal): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Goal/toggle', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(goal)
        });

        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};

export const deleteGoal = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Goal/' + id, {
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