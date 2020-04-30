import { combineReducers } from 'redux';
import { UserReducer } from './user/';
import { BoardsReducer } from './boards/';
import { TasksReducer } from './tasks/';
import { TeamReducer } from './team/';
import { BacklogReducer } from './backlog/';
import { NotificationsReducer } from './notifications/';
import { SprintReducer } from './sprint/';

export default combineReducers({
  user: UserReducer,
  boards: BoardsReducer,
  tasks: TasksReducer,
  team: TeamReducer,
  backlog: BacklogReducer,
  notifications: NotificationsReducer,
  sprint: SprintReducer,
});