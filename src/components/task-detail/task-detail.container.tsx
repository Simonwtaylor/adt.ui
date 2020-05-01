import * as React from 'react';
import { 
  TaskDetail,
} from './';
import { ITask } from '../../lib/types';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { Loader, Button } from 'semantic-ui-react';
import { getTask, getSprintById } from '../../lib/queries/';
import { completeTask, updateTask, removeTask } from '../../lib/mutations';
import { useSelector } from 'react-redux';
import { selectCurrentSprint } from '../../redux/sprint/sprint.selector';
import { useRouter } from 'next/router';
import { TaskDetailMode } from '../../lib/enums';

export interface ITaskDetailContainerProps {
  taskId: number;
}

const TaskDetailContainer: React.FC<ITaskDetailContainerProps> = ({
  taskId,
}) => {
  const router = useRouter();
  const client = useApolloClient();
  const currentSprint = useSelector(selectCurrentSprint);

  console.log(currentSprint);

  const [completeTaskMutation] = useMutation(completeTask, {
    client,
  });

  const [updateTaskMutation] = useMutation(updateTask, {
    client,
    refetchQueries: [
      {
        query: getSprintById,
        variables: {
          id: +currentSprint?.id
        }
      }
    ]
  });

  const [removeTaskMutation] = useMutation(removeTask, {
    client,
    refetchQueries: [
      {
        query: getSprintById,
        variables: {
          id: +currentSprint?.id
        }
      }
    ]
  });

  const handleBoardNavigation = () => {
    router.push('/sprint');
  };

  const handleTaskComplete = async (id: number) => {
    await completeTaskMutation({
      variables: {
        id: +id,
      }
    });

    router.push('/sprint');
  };

  const handleTaskSave = async (task: ITask) => {
    await updateTaskMutation({
      variables: {
        t: {...task},
      }
    });

    router.push('/sprint');
  };

  const handleTaskDelete = async (id: number) => {
    await removeTaskMutation({
      variables: {
        id: +id,
      }
    });

    router.push('/sprint');
  };

  const { loading, error, data } = useQuery(getTask, {
    variables: { 
      id: +taskId,
    },
    client,
  });

  if (error) return (
    <div
      style={{
        width: '200px',
        margin: '0px auto'
      }}
    >
      <h4>Error loading task <span role="img" aria-label="locks">😞</span></h4>
      <Button
        color={'blue'}
        onClick={handleBoardNavigation}
      >
        Back to boards
      </Button>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <TaskDetail
      onTaskSave={handleTaskSave}
      taskDetail={data.task}
      buttonText={'Update Task'}
      mode={TaskDetailMode.EDIT}
      onTaskComplete={handleTaskComplete}
      onTaskDelete={handleTaskDelete}
    />
  );
}
 
export default TaskDetailContainer;