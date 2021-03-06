import * as React from 'react';
import { Card, Form, Popup, Icon, Grid, Image } from 'semantic-ui-react';
import { ITask } from '../../lib/types';
import {
  BoardDropdownContainer,
  UserDropdownContainer,
} from '../dropdowns';
import { CommentsContainer } from '../comments/';

export interface ITaskDetailProps {
  taskDetail?: ITask;
  onTaskSave: (task: ITask) => void;
  onTaskComplete?: (task: string) => void;
  onTaskDelete?: (id: number) => void;
}
 
const TaskDetail: React.FC<any> = ({
  taskDetail,
  onTaskSave,
  onTaskComplete,
  onTaskDelete,
}) => {

  const [task, setTask] = React.useState(taskDetail);
  const [showUser, setShowUser] = React.useState(false);
  const [showBoard, setShowBoard] = React.useState(false);

  const [selectedBoard, onSelectedBoard] = React.useState(
    (task && task.board && task.board.id) ? task.board.id : null
  );

  const [selectedUser, onSelectedUser] = React.useState(
    (task && task.user && task.user.id) ? task.user.id : null
  );

  const handleFormChange = (e: any) => {
    const taskNew = {...task};
    let value = e.target.value;

    if (e.target.name === 'storyPoints') {
      value = Number.parseFloat(value);
    }

    taskNew[e.target.name] = value;

    setTask({
      ...taskNew,
    });
  };

  const handleUserChange = (selectItem: any) => {
    const taskNew = {...task}

    let value = selectItem.value;

    taskNew.userId = +value;

    setTask({
      ...taskNew
    });

    onSelectedUser(value);
  };

  const handleBoardChange = (selectItem: any) => {
    const taskNew = {...task}

    let value = selectItem.value;

    taskNew.boardId = +value;

    setTask({
      ...taskNew
    });

    onSelectedBoard(value);
  };

  const handleCompleteClick = () => {
    onTaskComplete(task.id);
  };

  const handleSubmitClick = () => {
    onTaskSave({...task});
  };

  const handleDeleteClick = () => {
    onTaskDelete(task.id);
  };

  const getCompletedText = (): string => {
    if (!task.completed) {
      return 'Complete Task';
    }
    return 'Mark as incomplete';
  };

  const getIconFill = (completed: boolean): 'check circle' | 'check circle outline' => {
    if (!completed) {
      return 'check circle outline';
    }
    return 'check circle';
  };

  const getUserInput = () => {
    if (showUser) {
      return (
        <Grid.Column>
          <Form.Field>
            <label>User</label>
            <UserDropdownContainer
              onSelectUser={handleUserChange}
              selectedUser={selectedUser}
              name={'userId'}
            />
          </Form.Field>
        </Grid.Column>
      )
    }

    return <></>;
  };

  const getBoardInput = () => {
    if (showBoard) {
      return (
        <Grid.Column>
          <Form.Field>
            <label>Board</label>
            <BoardDropdownContainer
              handleBoardSelect={handleBoardChange}
              selectedBoard={selectedBoard}
              name={'boardId'}
            />
          </Form.Field>
        </Grid.Column>
      )
    }

    return <></>;
  };

  return (
    <Form>
      <Card className={'task-detail'}>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Card.Content>
                <Card.Header
                  style={{
                    borderBottom: '1px solid #d6d2d2',
                    minHeight: '40px'
                  }}
                >
                  <>
                    <Popup
                      content={'Save'}
                      key={`taskcompleteicon`}
                      trigger={
                        <Icon
                          color={'green'}
                          name={'save'}
                          size={'large'}
                          style={{
                            cursor: 'pointer',
                            marginTop: '10px',
                            marginLeft: '10px',
                            float: 'left'
                          }}
                          onClick={handleSubmitClick}
                        />
                      }
                    />
                    <Popup
                      content={'Change Board'}
                      key={`iconchangeboard`}
                      trigger={
                        <Icon
                          color={'blue'}
                          name={'columns'}
                          size={'large'}
                          style={{
                            cursor: 'pointer',
                            marginTop: '10px',
                            marginLeft: '10px',
                            float: 'right'
                          }}
                          onClick={() => setShowBoard(!showBoard)}
                        />
                      }
                    />
                    <Popup
                      content={getCompletedText}
                      key={`taskcompleteicon`}
                      trigger={
                        <Icon
                          color={'green'}
                          name={getIconFill(task.completed)}
                          size={'large'}
                          style={{
                            cursor: 'pointer',
                            marginTop: '10px',
                            marginLeft: '10px',
                            float: 'right'
                          }}
                          onClick={handleCompleteClick}
                        />
                      }
                    />
                    <Popup
                      content={'Delete Task '}
                      key={`taskdeleteicon`}
                      trigger={
                        <Icon
                          color={'red'}
                          name={'trash'}
                          size={'large'}
                          style={{
                            cursor: 'pointer',
                            marginTop: '10px',
                            marginRight: '10px',
                            float: 'right'
                          }}
                          onClick={handleDeleteClick}
                        />
                      }
                    />
                  </>
                </Card.Header>
              </Card.Content>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <Card.Content className={'body'}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Popup
                        content={task.user.displayName}
                        key={`taskuserphoto`}
                        trigger={
                          <Image
                            src={task.user.photoURL}
                            onClick={() => setShowUser(!showUser)}
                            circular={true}
                            size={'tiny'}
                            style={{
                              width: '60px'
                            }}
                          />
                        }
                      />
                    </Grid.Column>
                    <Grid.Column width={11}>
                    <Form.Field>
                      <label>Title</label>
                      <input
                        placeholder='Title...'
                        value={task.title}
                        name={'title'}
                        onChange={handleFormChange}
                      />
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Form.Field>
                        <label>Story Points</label>
                        <input 
                          placeholder='Story Points...' 
                          value={task!.storyPoints} 
                          type='number' 
                          name={'storyPoints'}
                          onChange={handleFormChange}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row
                    columns={2}
                  >
                    {getUserInput()}
                    {getBoardInput()}
                  </Grid.Row>
                </Grid>
                <Form.Field>
                  <label>Description</label>
                  <textarea
                    className={'description'}
                    placeholder='Description...'
                    value={task.description}
                    name={'description'}
                    onChange={handleFormChange}
                  />
                </Form.Field>
                {
                  (taskDetail.comments && <CommentsContainer
                    taskId={taskDetail.id}
                  />)
                }
              </Card.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
    </Form>
  );
};

export default TaskDetail;