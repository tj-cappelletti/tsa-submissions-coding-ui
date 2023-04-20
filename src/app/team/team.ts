import { IParticipant } from "./participant";

export interface ITeam {
    id: string;
    schoolNumber: string;
    teamNumber: string;
    teamId: string;
    participants: IParticipant[];
}