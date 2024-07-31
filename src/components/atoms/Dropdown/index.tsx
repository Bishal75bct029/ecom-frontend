import React, { ReactNode } from 'react';
import { Dropdown } from 'react-bootstrap';
import style from './style.module.scss';

type DropdownItemVariant = 'red' | 'purple';

const varaints: Record<DropdownItemVariant, string> = {
  purple: style['items--purple'],
  red: style['items--red'],
};

interface DropdownProps {
  title?: string;
  profile?: { image: string; username: string; email: string; fallBackImage?: ReactNode };
  items: {
    value: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon?: ReactNode;
    className?: string;
    variant?: DropdownItemVariant;
  }[];
  className?: string;
  id?: string;
}

export const DropDown: React.FC<DropdownProps> = (props: DropdownProps) => {
  return (
    <Dropdown className={style.dropdown}>
      <Dropdown.Toggle id={props?.id || ''} className={[props.className, style.user_profile].join(' ')}>
        {props.profile ? (
          <div
            className={[
              !props.profile?.image && props.profile.fallBackImage ? style.fallbackIcon : '',
              'w-100',
              'h-100',
            ].join(' ')}
          >
            {props.profile?.image && (
              <img src={props.profile?.image} className={style.profileImage} width={50} height={50} />
            )}
            {!props.profile?.image && props.profile.fallBackImage}
          </div>
        ) : (
          <>{props.title}</>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu className={[style.menu, 'pb-0'].join(' ')}>
        {props.profile && (
          <div className={style.profile}>
            <div
              style={{ width: 80 }}
              className={[
                !props.profile?.image && props.profile.fallBackImage ? style.innerIcon : '',
                'w-100',
                'h-100',
              ].join(' ')}
            >
              {props.profile?.image && <img src={props.profile?.image} className={style.image} />}
              {!props.profile?.image && props.profile.fallBackImage && props.profile.fallBackImage}
            </div>
            <div>
              <Dropdown.Item className={style.profileTitle}>{props.profile.username}</Dropdown.Item>
              <Dropdown.Item className={style.profileInfo}>{props.profile.email}</Dropdown.Item>
            </div>
          </div>
        )}
        {props.items.map(({ variant = 'purple', ...item }, index) => {
          return (
            <Dropdown.Item
              onClick={item.onClick}
              key={index}
              className={[style.items, varaints[variant], style[item.className || 'className']].join(' ')}
            >
              <div className={style.icons}>{item.icon}</div>
              {item.value}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
