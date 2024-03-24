// Purpose: Model for User object.
export interface Game {
    id: number;
    HomeTeamId: number;
    AwayTeamId: number;
    Location: string;
    StartTime: string;
    EndTime: string;
    Sport: string;
    UserId: number;
    TeamId: number;
}
