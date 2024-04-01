// Purpose: Model for Activity object
export interface Activity {
    id: number;
    name: string;
    description: string;
    starttime: string;
    endttime: string;
    userid: number;
    teamid: number;
    location: string;
}
