import * as React from 'react';
import { Grid } from 'semantic-ui-react';
// import { useDispatch } from 'react-redux';
// import { setCurrentTask } from '../../redux/tasks/';
import {
  TaskDetailContainer,
  TaskAddContainer,
} from '../../components/task-detail/';
import { withAuth } from '../../components/hoc';
import { useRouter } from 'next/router';
import { Navbar } from '../../components/navbar';

export interface ITaskProps { }

const Task: React.FC<ITaskProps> = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  
  // dispatch(setCurrentTask(id));
  const handleItemClick = (item: string) => {
    console.log(item);
  };

  return (
    <>
    <Navbar
      activeItem={'task'}
      handleItemClick={handleItemClick}
    />
    <div
      className={'task'}
      style={{
        padding: '10px 40px'
      }}
    >
      <Grid padded>
        <Grid.Row stretched>
          <Grid.Column stretched>
            {
              (id === 'new')
              ? (<TaskAddContainer />)
              : (<TaskDetailContainer taskId={+id} />)
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    </>
  );
};

export default withAuth(Task);