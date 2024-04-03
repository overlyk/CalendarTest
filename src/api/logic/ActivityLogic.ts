import { useState } from "react";
import { variables } from "../../common/Variables";
import { Activity } from "../models/Activity";

export const getActivity = async (activityId: number): Promise<Activity | null> => {
    try {
        const response = await fetch(variables.API_URL + `/api/Activity/${activityId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        // Assuming the JSON directly contains the user properties
        const activity: Activity = {
            id: json.id,
            name: json.name,
            description: json.description,
            starttime: json.starttime,
            endtime: json.endtime,
            userid: json.userid,
            teamid: json.teamid,
            location: json.location
        };

        return activity;
    } catch (error) {
        console.error(`error happened getting user with id ${activityId}: `, error);
        return null;
    }
};

export const getAllActivities = async (): Promise<Activity[] | null> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Activity/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        //parse the response into a json object
        const json = await response.json();
        //"map" the objects to an array
        const activities: Activity[] = json.map((activity: Activity) => {
            return {
                id: activity.id,
                name: activity.name,
                description: activity.description,
                starttime: activity.starttime,
                endtime: activity.endtime,
                userid: activity.userid,
                teamid: activity.teamid,
                location: activity.location
            };
        });
        return activities;
    } catch (error) {
        console.error('error happened getting all users: ', error);
        return null;
    }
};
export const createActivity = async (activity: Activity): Promise<boolean> => {
    //console.log('test '  + user.username + ' ' + user.password + ' ' + user.firstname + ' ' + user.lastname + ' ' + user.TeamId + ' ' + user.isCoach);
    try {
        const response = await fetch(variables.API_URL + '/api/Activity/activity', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                name: activity.name,
                description: activity.description,
                starttime: activity.starttime,
                endtime: activity.endtime,
                userid: activity.userid,
                teamid: activity.teamid,
                location: activity.location
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

export const updateActivity = async (activity: Activity): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Activity', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        });

        return response.ok;
    } catch (error) {
        console.error('error happened: ', error);
        return false;
    }
};

export const deleteActivity = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(variables.API_URL + '/api/Activity/' + id, {
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