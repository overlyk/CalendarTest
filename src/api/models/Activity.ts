// Purpose: Model for Activity object
export interface Activity {
    id: number;
    name: string;
    description: string;
    starttime: Date;
    endtime: Date;
    userid: number;
    teamid: number;
    location: string;
}
