import { IUser, IBoard, IComment } from "./";

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  storyPoints: number;
  description: string;
  board?: IBoard;
  user?: IUser;
  comments?: IComment[];
}