// Purpose: Model for User object.
export interface User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    TeamId: number | null;
    isCoach: boolean;
}
