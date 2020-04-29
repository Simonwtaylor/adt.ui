import { IUser } from "./";

export interface IComment {
    id: number;
    content: string;
    datePosted: Date;
    user: IUser;
}