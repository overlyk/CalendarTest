// Purpose: Model for User object.
export interface Goal {
    id: number;
    Name: string;
    UserId: number;
    isCompleted: boolean;
    TeamId: number;
}
