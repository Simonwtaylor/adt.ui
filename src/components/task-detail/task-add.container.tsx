import * as React from 'react';
import { TaskAdd } from './';
import { ITask } from '../../lib/types';
import { getAllSprints } from '../../lib/queries/';
import { addTask } from '../../lib/mutations';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

export interface ITaskAddContainerProps {

}

const TaskAddContainer: React.FC<ITaskAddContainerProps> = () => {

  const client = useApolloClient();
  const router = useRouter();
  const [addTaskMutation] = useMutation(addTask, {
    client,
  });

  const handleTaskSave = (task: ITask) => {
    task.completed = false;
    addTaskMutation({ 
      variables: {
        t: {...task},
      },
      refetchQueries: [
        {
          query: getAllSprints,
        }
      ]
    });

    router.push('/');
  };

  return (
    <TaskAdd 
      onTaskSave={handleTaskSave}
    />
  );
};

export default TaskAddContainer;