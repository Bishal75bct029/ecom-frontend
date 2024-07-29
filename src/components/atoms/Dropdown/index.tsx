import React from 'react';
import { Dropdown } from 'react-bootstrap';
import style from './style.module.scss';

interface DropdownProps {
  title: string;
  image?: string;
  variant: string;
  items: {
    value: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon?: string;
    className?: string | '';
  }[];
  className?: string | '';
  id?: string;
}

export const DropDown: React.FC<DropdownProps> = (props: DropdownProps) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id={props?.id || ''}
        className={`${props.className}  ${style.user_profile}`}
        variant={props.variant}
      >
        {props.image ? (
          <>
            <img
              src="https://cdn.dribbble.com/users/183729/avatars/small/769273fda9f25846e3bf0ab4246c5753.jpg?1641371228"
              className={style.profileImage}
            />
            {props.title}
          </>
        ) : (
          <>{props.title}</>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu className={style.menu}>
        {props.image && (
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 20px 10px 10px',
              cursor: 'text',
            }}
          >
            <img
              src="https://cdn.dribbble.com/users/183729/avatars/small/769273fda9f25846e3bf0ab4246c5753.jpg?1641371228"
              width={'50px'}
              height={'50px'}
              style={{ borderRadius: '50%' }}
            />
            <div>
              <Dropdown.Item
                className={style.profileTitle}
                style={{ fontWeight: 'normal', fontSize: 18, padding: 0, cursor: 'text' }}
              >
                {props.title}
              </Dropdown.Item>
              <Dropdown.Item
                className={style.profileTitle}
                style={{ fontWeight: 'normal', fontSize: 14, padding: 0, color: '#505962', cursor: 'text' }}
              >
                user1@gmail.com
              </Dropdown.Item>
            </div>
          </div>
        )}
        {props.items.map((item, index) => {
          return (
            <Dropdown.Item
              onClick={item.onClick}
              key={index}
              className={`${[style.items]} ${
                item.className &&
                item.className
                  .split(' ')
                  .map((className) => style[className])
                  .join(' ')
              }`}
            >
              {item.value}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
