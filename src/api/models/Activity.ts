// Purpose: Model for Activity object
export interface Activity {
    id: number;
    name: string;
    description: string;
    starttime: string;
    endtime: string;
    userid: number;
    teamid: number;
    location: string;
}
