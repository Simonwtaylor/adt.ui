import * as React from 'react';
import { ITask } from '../../lib/types/';
import { TaskCard } from '../task-card';
import { Popup, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';

export interface IBoardColumnProps {
  id: number;
  columnTitle: string;
  tasks: ITask[];
  onBoardRemove: (id: number) => void;
}
 
const BoardColumn: React.FC<IBoardColumnProps> = ({ 
  columnTitle, 
  id,
  tasks,
  onBoardRemove,
}) => {

  const router = useRouter();

  const handleTaskClick = (id: number) => {
    router.push(`/task/${id}`);
  };

  const handleAddClick = () => {
    router.push(`/task/new`);
  };

  const handleBoardRemove = () => {
    onBoardRemove(id);
  };

  const getTasks = () => {
    return tasks
      .filter(a => !a.completed);
  };

  return (
    <div className="col card">
      <div className="card-body card-container">
        <h4>{columnTitle}</h4>
        <Popup
          content={`Add task to ${columnTitle}`}
          key={`boardaddtask`}
          trigger={
            <Icon
              color={'green'}
              name={'plus circle'}
              style={{
                cursor: 'pointer',
                marginTop: '5px'
              }}
              onClick={handleAddClick}
            />
          }
        />
        <Popup
          content={`Change settings for ${columnTitle}`}
          key={`boardsettings`}
          trigger={
            <Icon
              color={'blue'}
              name={'settings'}
              style={{
                cursor: 'pointer',
                marginTop: '5px'
              }}
            />
          }
        />
        <Popup
          content={`Delete ${columnTitle}`}
          key={`boarddelete`}
          trigger={
            <Icon
              color={'red'}
              name={'trash'}
              style={{
                cursor: 'pointer',
                marginTop: '5px'
              }}
              onClick={handleBoardRemove}
            />
          }
        />
        {
          getTasks()
            .map((task, index) => {
            return(
              <TaskCard 
                onTaskClick={handleTaskClick}
                key={`taskcard${index}`}
                {...task}
              />
            ) 
          })
        }
      </div>
    </div> 
  );
}

export default BoardColumn;