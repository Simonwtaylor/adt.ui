import * as React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Menu, Label } from 'semantic-ui-react';
import { selectOutstandingUnread } from '../../redux/notifications/';
import { selectCurrentUser } from '../../redux/user';
import { selectCurrentSprint } from '../../redux/sprint/';
import { SprintSelectorContainer } from './';

export interface INavbarProps {
  activeItem: string;
  handleItemClick: (name: string) => void;
}

const Navbar: React.FC<INavbarProps> = ({
    activeItem, 
    handleItemClick,
}) => {
  const outstandingUnread = useSelector(selectOutstandingUnread);
  const user = useSelector(selectCurrentUser);
  const currentSprint = useSelector(selectCurrentSprint);

  const onItemClick = (name: string) => {
    handleItemClick(name);
  };

  const getUserOptions = () => {
    if (user) {
      return (
        <Menu.Item
          name='user' 
          icon
          active={activeItem === 'user'} 
          onClick={() => onItemClick('user')}
        >
          <Link
            href={'/user'}
          >
            <a>
              <img 
                width={25} 
                height={25} 
                src={user.photoURL}
                style={{borderRadius: 50}} 
                alt="prof"
              />
              {(outstandingUnread && 
                <Label corner="right" circular color={'red'} empty key={'red'} />
              )}
            </a>
          </Link>
        </Menu.Item>
      );
    }

    return (
      <Menu.Item 
        name='sign-in' 
        active={activeItem === 'sign-in'} 
        onClick={() => onItemClick('sign-in')}
      >
        <Link
          href={'/login'}
        >
          <a>
            <span role="img" aria-label="locks">🔐</span> Login
          </a>
        </Link>
      </Menu.Item>
    );
  };

  const getMenuItems = () => {
    if (user) {
      return (
        <>
          <Menu.Item
            name='sprint'
            active={activeItem === 'sprint'}
            onClick={() => onItemClick('sprint')}
          >
            <Link
              href={'/sprint'}
            >
              <a>
                <span role="img" aria-label="cal">📅</span>
                Plan it
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item
            name='team'
            active={activeItem === 'team'}
            onClick={() => onItemClick('team')}
          >
            <Link
              href={'/team'}
            >
              <a>
                <span role="img" aria-label="hands">🙌</span> The Squad
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item
            name='backlog'
            active={activeItem === 'backlog'}
            onClick={() => onItemClick('backlog')}
          >
            <Link
              href={'/backlog'}
            >
              <a>
                <span role="img" aria-label="backlog">💡</span> Future Stuff
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item
            to=''
          >
            <div className={'sprint dropdown'}>
              <SprintSelectorContainer
                currentSprint={currentSprint}
                addNewSprint={false}
              />
            </div>
          </Menu.Item>
        </>
      )
    }
  }

  return (
    <Menu stackable className={'navbar'}>
      <Menu.Item
        name='sprint'
        onClick={() => onItemClick('sprint')}
      >
        <Link
          href={'/sprint'}
        >
          <span role="img" aria-label="rocket">🚀</span>
        </Link>
      </Menu.Item>
      {getMenuItems()}
      {getUserOptions()}
    </Menu>
  );
}

export default Navbar;