// Purpose: Model for User object.
export interface Goal {
    id: number;
    userid: number;
    name: string;
    description: string;
    isCompleted: boolean;
    teamid: number;
}
